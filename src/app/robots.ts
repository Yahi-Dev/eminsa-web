import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/(authenticated)/"],
      },
    ],
    sitemap: "https://eminsa.com/sitemap.xml",
    host: "https://eminsa.com",
  };
}
