import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { DOCS_NAVIGATION, ORDERED_DOC_ROUTES } from "../src/lib/docs/navigation";
import { DOC_PAGES, getDocPageBySlug } from "../src/lib/docs/data";
import robots from "../src/app/robots";
import sitemap from "../src/app/sitemap";
import { SITE_CONFIG, createPageMetadata } from "../src/lib/seo/config";
import {
  getSoftwareApplicationSchema,
  getWebSiteSchema,
  getBreadcrumbListSchema,
  getTechArticleSchema,
  getFaqPageSchema,
  getPersonSchema,
} from "../src/lib/seo/structured-data";

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
    assert.equal(
      config.sitemap,
      "https://behavioursim.vedaangsharma.in/sitemap.xml",
      "Robots must declare canonical sitemap URL"
    );
    assert.equal(
      config.host,
      "https://behavioursim.vedaangsharma.in",
      "Robots must declare canonical host"
    );
  });

  it("verifies sitemap generates unique, canonical URLs for all public pages", () => {
    const entries = sitemap();
    assert.ok(entries.length >= 20, "Sitemap must include core and doc pages.");

    const urls = new Set<string>();
    for (const entry of entries) {
      assert.ok(entry.url.startsWith("https://behavioursim.vedaangsharma.in"), "Sitemap URLs must use HTTPS canonical origin.");
      assert.ok(
        !entry.url.includes("/login") && !entry.url.includes("/account") && !entry.url.includes("/playground"),
        `Sitemap must not include noindex routes: ${entry.url}`
      );
      assert.ok(!urls.has(entry.url), `Sitemap must not contain duplicate URL: ${entry.url}`);
      urls.add(entry.url);
    }
  });
});

describe("SEO & Structured Data Verification", () => {
  it("verifies centralized SITE_CONFIG consistency and canonical origin", () => {
    assert.equal(SITE_CONFIG.name, "BehaviourSim");
    assert.equal(SITE_CONFIG.siteUrl, "https://behavioursim.vedaangsharma.in");
    assert.equal(SITE_CONFIG.author.name, "Vedaang Sharma");
    assert.equal(SITE_CONFIG.pypi, "https://pypi.org/project/behaviorsim/");
    assert.equal(SITE_CONFIG.repository, "https://github.com/gtathelegend/BehaviourSim");
  });

  it("verifies createPageMetadata produces correct canonical URLs and robots tags", () => {
    const meta = createPageMetadata({
      title: "Test Page",
      description: "Test description",
      path: "/test",
    });

    assert.equal(meta.title, "Test Page");
    assert.equal(meta.description, "Test description");
    assert.equal(meta.alternates?.canonical, "https://behavioursim.vedaangsharma.in/test");
    assert.equal((meta.openGraph as Record<string, unknown>)?.type, "website");
    assert.equal((meta.twitter as Record<string, unknown>)?.card, "summary_large_image");

    const noIndexMeta = createPageMetadata({
      title: "Private Page",
      description: "Private description",
      path: "/private",
      noIndex: true,
    });
    assert.deepEqual(noIndexMeta.robots, { index: false, follow: false });
  });

  it("verifies Schema.org SoftwareApplication structured data", () => {
    const appSchema = getSoftwareApplicationSchema();
    assert.equal(appSchema["@context"], "https://schema.org");
    assert.equal(appSchema["@type"], "SoftwareApplication");
    assert.equal(appSchema.name, "BehaviourSim");
    assert.equal(appSchema.url, "https://behavioursim.vedaangsharma.in");
    assert.equal(appSchema.downloadUrl, "https://pypi.org/project/behaviorsim/");
    assert.equal(appSchema.codeRepository, "https://github.com/gtathelegend/BehaviourSim");
    assert.equal(appSchema.author.name, "Vedaang Sharma");
  });

  it("verifies Schema.org WebSite structured data", () => {
    const siteSchema = getWebSiteSchema();
    assert.equal(siteSchema["@context"], "https://schema.org");
    assert.equal(siteSchema["@type"], "WebSite");
    assert.equal(siteSchema.name, "BehaviourSim");
    assert.equal(siteSchema.url, "https://behavioursim.vedaangsharma.in");
  });

  it("verifies Schema.org BreadcrumbList structured data", () => {
    const breadcrumbs = getBreadcrumbListSchema([
      { name: "Home", path: "/" },
      { name: "Docs", path: "/docs" },
      { name: "Quickstart", path: "/docs/getting-started/quickstart" },
    ]);
    assert.equal(breadcrumbs["@context"], "https://schema.org");
    assert.equal(breadcrumbs["@type"], "BreadcrumbList");
    assert.equal(breadcrumbs.itemListElement.length, 3);
    assert.equal(breadcrumbs.itemListElement[0].position, 1);
    assert.equal(breadcrumbs.itemListElement[0].item, "https://behavioursim.vedaangsharma.in/");
    assert.equal(breadcrumbs.itemListElement[2].item, "https://behavioursim.vedaangsharma.in/docs/getting-started/quickstart");
  });

  it("verifies Schema.org TechArticle structured data", () => {
    const article = getTechArticleSchema({
      title: "Markov Simulation",
      description: "Mathematical modeling guide",
      path: "/docs/concepts",
    });
    assert.equal(article["@context"], "https://schema.org");
    assert.equal(article["@type"], "TechArticle");
    assert.equal(article.headline, "Markov Simulation");
    assert.equal(article.url, "https://behavioursim.vedaangsharma.in/docs/concepts");
    assert.equal(article.author.name, "Vedaang Sharma");
  });

  it("verifies Schema.org FAQPage structured data", () => {
    const faq = getFaqPageSchema([
      { question: "What is BehaviourSim?", answer: "An open-source simulation platform." },
    ]);
    assert.equal(faq["@context"], "https://schema.org");
    assert.equal(faq["@type"], "FAQPage");
    assert.equal(faq.mainEntity.length, 1);
    assert.equal(faq.mainEntity[0].name, "What is BehaviourSim?");
    assert.equal(faq.mainEntity[0].acceptedAnswer.text, "An open-source simulation platform.");
  });

  it("verifies Schema.org Person structured data — name, @id, url", () => {
    const person = getPersonSchema();
    assert.equal(person["@context"], "https://schema.org");
    assert.equal(person["@type"], "Person");
    assert.equal(person["@id"], "https://vedaangsharma.in/#person", "Person @id must be canonical");
    assert.equal(person.name, "Vedaang Sharma", "Person name must be exact");
    assert.equal(person.url, "https://vedaangsharma.in", "Person url must be canonical");
    assert.equal(person.email, "mailto:info@vedaangsharma.in", "Person email must be mailto URI");
  });

  it("verifies Person sameAs contains all four verified identity URLs", () => {
    const person = getPersonSchema();
    assert.ok(Array.isArray(person.sameAs), "Person.sameAs must be an array");

    const REQUIRED_SAME_AS = [
      "https://vedaangsharma.in",
      "https://github.com/gtathelegend",
      "https://pypi.org/user/vedaangsharma2006/",
      "https://www.linkedin.com/in/vedaangsharma2006/",
    ];
    // Cast: sameAs is inferred as a readonly literal tuple from SITE_CONFIG.author.sameAs as const
    const personSameAs = person.sameAs as readonly string[];
    for (const url of REQUIRED_SAME_AS) {
      assert.ok(
        personSameAs.includes(url),
        `Person.sameAs must include verified identity URL: ${url}`
      );
    }
  });

  it("verifies Person sameAs does NOT contain incorrect identity URLs", () => {
    const person = getPersonSchema();
    const FORBIDDEN = [
      "https://pypi.org/user/gtathelegend/",
    ];
    const personSameAsB = person.sameAs as readonly string[];
    for (const url of FORBIDDEN) {
      assert.ok(
        !personSameAsB.includes(url),
        `Person.sameAs must NOT contain incorrect URL: ${url}`
      );
    }
  });

  it("verifies Person has no worksFor relationship", () => {
    const person = getPersonSchema() as Record<string, unknown>;
    assert.ok(
      !("worksFor" in person),
      "Person schema must not include worksFor (BehaviourSim is not an employer)"
    );
  });

  it("verifies Person knowsAbout and creator relationships", () => {
    const person = getPersonSchema();
    assert.ok(Array.isArray(person.knowsAbout), "Person.knowsAbout must be an array");
    assert.ok(person.knowsAbout.length >= 3, "Person.knowsAbout must list at least 3 areas");

    const creator = person.creator as Record<string, unknown> | undefined;
    assert.ok(creator, "Person.creator must exist (BehaviourSim project relationship)");
    assert.equal(creator["@type"], "SoftwareApplication", "Person.creator @type must be SoftwareApplication");
    assert.equal(creator.name, "BehaviourSim", "Person.creator name must be BehaviourSim");
  });

  it("verifies cross-schema @id consistency for author entity", () => {
    const personId = "https://vedaangsharma.in/#person";

    const appSchema = getSoftwareApplicationSchema();
    assert.equal(
      appSchema.author["@id"],
      personId,
      "SoftwareApplication.author must reference the canonical Person @id"
    );

    const siteSchema = getWebSiteSchema();
    assert.equal(
      siteSchema.publisher["@id"],
      personId,
      "WebSite.publisher must reference the canonical Person @id"
    );

    const personSchema = getPersonSchema();
    assert.equal(
      personSchema["@id"],
      personId,
      "Person schema @id must match the canonical person identifier"
    );

    const article = getTechArticleSchema({
      title: "Test",
      description: "Test",
      path: "/docs/test",
    });
    assert.equal(
      article.author["@id"],
      personId,
      "TechArticle.author must reference the canonical Person @id"
    );
    assert.equal(
      article.publisher["@id"],
      personId,
      "TechArticle.publisher must reference the canonical Person @id"
    );
  });

  it("verifies SITE_CONFIG.author.sameAs contains all verified identity URLs", () => {
    const REQUIRED = [
      "https://vedaangsharma.in",
      "https://github.com/gtathelegend",
      "https://pypi.org/user/vedaangsharma2006/",
      "https://www.linkedin.com/in/vedaangsharma2006/",
    ];
    assert.ok(Array.isArray(SITE_CONFIG.author.sameAs), "SITE_CONFIG.author.sameAs must be an array");
    // Cast required: as const makes sameAs a readonly literal tuple; widen to string[] for .includes()
    const configSameAs = SITE_CONFIG.author.sameAs as readonly string[];
    for (const url of REQUIRED) {
      assert.ok(
        configSameAs.includes(url),
        `SITE_CONFIG.author.sameAs must include: ${url}`
      );
    }
    assert.ok(
      !configSameAs.includes("https://pypi.org/user/gtathelegend/"),
      "SITE_CONFIG.author.sameAs must NOT contain incorrect PyPI URL"
    );
  });

  it("verifies sitemap includes /about for crawl discoverability", () => {
    const entries = sitemap();
    const aboutEntry = entries.find((e) => e.url.endsWith("/about"));
    assert.ok(aboutEntry, "Sitemap must include /about page for author discoverability");
    assert.ok(
      aboutEntry.url.startsWith("https://behavioursim.vedaangsharma.in"),
      "/about sitemap URL must use canonical origin"
    );
  });
});
