import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export async function GET(context: APIContext) {
  const bp = import.meta.env.BASE_URL;
  const baseTrim = bp.endsWith("/") ? bp.slice(0, -1) : bp;
  const siteOrigin =
    context.site?.toString().replace(/\/$/, "") ?? "https://ngcex.github.io";

  type Item = {
    title: string;
    pubDate: Date;
    link: string;
    description: string;
  };

  const items: Item[] = [];

  try {
    const pubs = await getCollection("publications");
    for (const p of pubs) {
      const year = p.data.year;
      const pubDate = new Date(Date.UTC(year, 0, 1));
      const slug = slugify(p.data.title);
      const external = p.data.doi
        ? p.data.doi.startsWith("http")
          ? p.data.doi
          : `https://doi.org/${p.data.doi}`
        : (p.data.url ?? p.data.adsLink ?? null);
      const link = external ?? `${siteOrigin}${baseTrim}/publications#${slug}`;
      const authors = Array.isArray(p.data.authors)
        ? p.data.authors.join(", ")
        : "";
      const description = `${authors}${authors ? " — " : ""}${p.data.venue}${p.data.venueShort ? ` (${p.data.venueShort})` : ""}`;
      items.push({
        title: p.data.title,
        pubDate,
        link,
        description,
      });
    }
  } catch {
    /* publications collection missing */
  }

  try {
    const projs = await getCollection("projects");
    for (const p of projs) {
      const year = p.data.year;
      const pubDate = new Date(Date.UTC(year, 0, 1));
      const link = `${siteOrigin}${baseTrim}/projects/${p.id}`;
      items.push({
        title: p.data.title,
        pubDate,
        link,
        description: p.data.summary,
      });
    }
  } catch {
    /* projects collection missing */
  }

  items.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
  const top = items.slice(0, 20);

  return rss({
    title: "Cesare Scalia — Publications & Projects",
    description: "New work from Cesare Scalia, PhD — Lead Data Scientist.",
    site: context.site ?? `${siteOrigin}${baseTrim}`,
    items: top.map((i) => ({
      title: i.title,
      pubDate: i.pubDate,
      link: i.link,
      description: i.description,
    })),
    customData: "<language>en-us</language>",
  });
}
