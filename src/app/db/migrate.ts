import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";

const db = drizzle({ connection: { uri: process.env.DATABASE_URL } });

const main = async () => {
    try {
        await migrate(db, {migrationsFolder: "./src/app/db/drizzle"});
        console.log("Migration Completed!");
    } catch(error){
        console.log("Error during migration: ", error);
        process.exit(1)
    }
}

main()