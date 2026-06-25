import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import { collections } from "./src/lib/payload/collections.ts";

const databaseURL = process.env.DATABASE_URL;
const payloadSecret = process.env.PAYLOAD_SECRET;

const fallbackDatabaseURL = "postgresql://payload:payload@127.0.0.1:5432/payload";
const fallbackPayloadSecret = "development-payload-secret";

export default buildConfig({
  admin: {
    dateFormat: "dd MMM yyyy",
    user: "admins",
    meta: {
      titleSuffix: " - Well Nice Club"
    }
  },
  collections,
  db: postgresAdapter({
    pool: {
      connectionString: databaseURL || fallbackDatabaseURL
    },
    push: process.env.PAYLOAD_DB_PUSH === "true"
  }),
  editor: lexicalEditor(),
  secret: payloadSecret || fallbackPayloadSecret,
  typescript: {
    outputFile: "src/payload-types.ts"
  }
});
