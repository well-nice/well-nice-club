import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { collections } from "./src/lib/payload/collections.ts";

export default buildConfig({
  admin: {
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
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: "src/payload-types.ts"
  }
});
