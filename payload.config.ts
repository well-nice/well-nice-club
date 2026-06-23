import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import { collections } from "./src/lib/payload/collections.ts";

export default buildConfig({
  admin: {
    dateFormat: "dd MMM yyyy",
    livePreview: {
      breakpoints: [
        {
          height: 900,
          label: "Responsive",
          name: "responsive",
          width: "100%"
        },
        {
          height: 844,
          label: "Mobile",
          name: "mobile",
          width: 390
        },
        {
          height: 1024,
          label: "Tablet",
          name: "tablet",
          width: 768
        }
      ],
      collections: ["journal"],
      url: ({ data }) => {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        const slug = typeof data?.slug === "string" ? data.slug : "";
        return `${appUrl}/app/journal${slug ? `?preview=${encodeURIComponent(slug)}` : ""}`;
      }
    },
    theme: "dark",
    user: "admins",
    meta: {
      titleSuffix: " - Well Nice Club"
    }
  },
  collections,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "postgres://wellnice:wellnice@localhost:5432/wellnice"
    },
    push: process.env.PAYLOAD_DB_PUSH === "true"
  }),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "development-only-payload-secret",
  typescript: {
    outputFile: "src/payload-types.ts"
  }
});
