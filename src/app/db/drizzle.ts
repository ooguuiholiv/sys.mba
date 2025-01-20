import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";

import * as schema from "./schema/schema";

const db = drizzle({ connection: { uri: process.env.DATABASE_URL } });

export { db };
