import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const SITE = "https://matheusbronca.com";

function url(path: string): string {
  return `${SITE}/${path}`.replace(/([^:])\/\/+/g, "$1/");
}

function entry(loc: string, lastmod?: string, priority = "0.7"): string {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : "",
    `    <priority>${priority}</priority>`,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

export const GET: APIRoute = async () => {
  const staticPages = [
    { path: "", priority: "1.0" },
    { path: "projects", priority: "0.9" },
    { path: "work", priority: "0.9" },
    { path: "blog", priority: "0.8" },
  ];

  const projects = await getCollection("projects").then((c) =>
    c.filter((p) => !p.data.draft)
  );

  const blog = await getCollection("blog");

  const staticEntries = staticPages
    .map((p) => entry(url(p.path), undefined, p.priority))
    .join("\n");

  const projectEntries = projects
    .map((p) =>
      entry(
        url(`projects/${p.slug}`),
        p.data.date ? new Date(p.data.date).toISOString().split("T")[0] : undefined,
        "0.8"
      )
    )
    .join("\n");

  const blogEntries = blog
    .map((p) =>
      entry(
        url(`blog/${p.slug}`),
        p.data.date ? new Date(p.data.date).toISOString().split("T")[0] : undefined,
        "0.7"
      )
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${projectEntries}
${blogEntries}
</urlset>`.trim();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
