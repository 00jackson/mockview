/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://neondb_owner:Slg5iRMkGo2n@ep-snowy-fire-a1ws5n67.ap-southeast-1.aws.neon.tech/mockview?sslmode=require',
    }
};
