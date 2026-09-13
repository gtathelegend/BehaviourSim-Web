import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { DOCS_NAVIGATION, ORDERED_DOC_ROUTES } from "../src/lib/docs/navigation";
import { DOC_PAGES, getDocPageBySlug } from "../src/lib/docs/data";
import robots from "../src/app/robots";
import sitemap from "../src/app/sitemap";

// All known existing top-level and application routes
const KNOWN_ROUTES = new Set([
  "/",
  "/concepts",
  "/methodology",
  "/features",
  "/use-cases",
  "/docs",
  "/api",
  "/login",
  "/account",
  "/playground",
]);

describe("Navigation Route Verification", () => {
  it("verifies all documentation navigation items point to valid routes", () => {
    for (const section of DOCS_NAVIGATION) {
      for (const item of section.items) {
        if (item.href.startsWith("/docs/")) {
          const slug = item.href.replace("/docs/", "").split("/");
          const page = getDocPageBySlug(slug);
          assert.ok(
            page,
            `Doc navigation href '${item.href}' must map to a registered DOC_PAGE.`
          );
        } else {
          assert.ok(
            KNOWN_ROUTES.has(item.href) || item.href === "/docs",
            `Navigation href '${item.href}' must be a known application route.`
          );
        }
      }
    }
  });

  it("verifies continuous linear ordering in pagination without broken links", () => {
    assert.ok(ORDERED_DOC_ROUTES.length >= 15);
    for (const item of ORDERED_DOC_ROUTES) {
      if (item.href.startsWith("/docs/")) {
        const slug = item.href.replace("/docs/", "").split("/");
        const page = getDocPageBySlug(slug);
        assert.ok(page, `Pagination route '${item.href}' must resolve to a valid page.`);
      }
    }
  });

  it("verifies robots configuration protects private application routes", () => {
    const config = robots();
    assert.ok(config.rules);
    const rule = Array.isArray(config.rules) ? config.rules[0] : config.rules;
    assert.ok(rule.disallow);
    const disallowed = Array.isArray(rule.disallow) ? rule.disallow : [rule.disallow];

    assert.ok(disallowed.includes("/login"), "Robots must disallow /login");
    assert.ok(disallowed.includes("/account"), "Robots must disallow /account");
    assert.ok(disallowed.includes("/playground"), "Robots must disallow /playground");
    assert.ok(config.sitemap?.includes("sitemap.xml"), "Robots must declare sitemap URL");
  });

  it("verifies sitemap generates unique, canonical URLs for all public pages", () => {
    const entries = sitemap();
    assert.ok(entries.length >= 20, "Sitemap must include core and doc pages.");

    const urls = new Set<string>();
    for (const entry of entries) {
      assert.ok(entry.url.startsWith("https://"), "Sitemap URLs must use HTTPS canonical origin.");
      assert.ok(
        !entry.url.includes("/login") && !entry.url.includes("/account") && !entry.url.includes("/playground"),
        `Sitemap must not include noindex routes: ${entry.url}`
      );
      assert.ok(!urls.has(entry.url), `Sitemap must not contain duplicate URL: ${entry.url}`);
      urls.add(entry.url);
    }
  });
});
