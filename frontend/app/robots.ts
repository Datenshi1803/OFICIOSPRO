import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://oficiospro.com"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/login",
          "/registro",
          "/dashboard",
          "/dashboard/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}