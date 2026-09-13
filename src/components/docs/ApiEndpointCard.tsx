import React from "react";
import { Badge } from "@/components/ui/Badge";
import { CodeBlock } from "@/components/ui/CodeBlock";

export interface ParameterItem {
  name: string;
  type: string;
  required: boolean;
  description: string;
  default?: string;
}

export interface ApiEndpointCardProps {
  method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
  path: string;
  title: string;
  description: string;
  auth: "Public" | "Session Cookie or API Key" | "Session Cookie Only" | "API Key Only";
  rateLimit?: string;
  parameters?: ParameterItem[];
  requestBody?: string;
  responseBody: string;
  statusCodes?: { code: number; description: string }[];
  curlExample?: string;
}

export function ApiEndpointCard({
  method,
  path,
  title,
  description,
  auth,
  rateLimit,
  parameters,
  requestBody,
  responseBody,
  statusCodes,
  curlExample,
}: ApiEndpointCardProps) {
  const methodColor = {
    GET: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300 border-sky-200 dark:border-sky-800",
    POST: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    DELETE: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800",
    PUT: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    PATCH: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  }[method];

  return (
    <div className="rounded-lg border border-border bg-surface shadow-sm overflow-hidden mb-8 text-xs">
      {/* Header Bar */}
      <div className="p-4 border-b border-border bg-surface-elevated flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 font-mono">
          <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${methodColor}`}>
            {method}
          </span>
          <span className="font-semibold text-foreground text-sm">{path}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="neutral" size="sm">
            {auth}
          </Badge>
          {rateLimit && (
            <Badge variant="outline" size="sm">
              {rateLimit}
            </Badge>
          )}
        </div>
      </div>

      <div className="p-5 space-y-5">
        <div>
          <h4 className="font-semibold text-foreground text-sm mb-1">{title}</h4>
          <p className="text-foreground-muted leading-relaxed">{description}</p>
        </div>

        {/* Parameters Table */}
        {parameters && parameters.length > 0 && (
          <div className="space-y-2">
            <h5 className="font-semibold text-foreground text-xs uppercase tracking-wider text-foreground-subtle">
              Parameters
            </h5>
            <div className="overflow-x-auto rounded border border-border">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-elevated text-foreground border-b border-border">
                  <tr>
                    <th className="py-2 px-3">Name</th>
                    <th className="py-2 px-3">Type</th>
                    <th className="py-2 px-3">Required</th>
                    <th className="py-2 px-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-mono">
                  {parameters.map((p) => (
                    <tr key={p.name}>
                      <td className="py-2 px-3 text-accent font-semibold">{p.name}</td>
                      <td className="py-2 px-3 text-foreground">{p.type}</td>
                      <td className="py-2 px-3">
                        {p.required ? (
                          <span className="text-rose-600 dark:text-rose-400 font-semibold font-sans">Yes</span>
                        ) : (
                          <span className="text-foreground-subtle font-sans">No</span>
                        )}
                      </td>
                      <td className="py-2 px-3 font-sans text-foreground-muted">{p.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Request Body */}
        {requestBody && (
          <div className="space-y-1.5">
            <h5 className="font-semibold text-xs uppercase tracking-wider text-foreground-subtle">
              Request Payload (JSON)
            </h5>
            <CodeBlock code={requestBody} language="json" filename="request.json" />
          </div>
        )}

        {/* Example Response */}
        <div className="space-y-1.5">
          <h5 className="font-semibold text-xs uppercase tracking-wider text-foreground-subtle">
            Response Payload (JSON)
          </h5>
          <CodeBlock code={responseBody} language="json" filename="response.json" />
        </div>

        {/* Status Codes */}
        {statusCodes && statusCodes.length > 0 && (
          <div className="space-y-2 pt-1">
            <h5 className="font-semibold text-xs uppercase tracking-wider text-foreground-subtle">
              Status Codes
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
              {statusCodes.map((sc) => (
                <div key={sc.code} className="p-2 rounded bg-surface-elevated border border-border flex items-center gap-2">
                  <span className="font-bold text-accent">{sc.code}</span>
                  <span className="font-sans text-foreground-muted">{sc.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* curl Example */}
        {curlExample && (
          <div className="space-y-1.5 pt-1">
            <h5 className="font-semibold text-xs uppercase tracking-wider text-foreground-subtle">
              curl Request
            </h5>
            <CodeBlock code={curlExample} language="bash" filename="terminal" />
          </div>
        )}
      </div>
    </div>
  );
}
