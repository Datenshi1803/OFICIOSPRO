import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://oficios-pro.com"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/admin/",
          "/api/",
          "/recuperar-password",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}