export const SITE_URL = "https://kavolith.com";

/** 12 months out — used for Offer.priceValidUntil. */
export const PRICE_VALID_UNTIL = "2027-08-16";

/** BreadcrumbList JSON-LD node. Pass the trail after Home. */
export function breadcrumbSchema(
  trail: ReadonlyArray<{ name: string; path: string }> = [],
) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${items[items.length - 1]!.path}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
