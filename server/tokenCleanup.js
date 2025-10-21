import cron from "node-cron";
import db from "./db.js";

cron.schedule("0 3 * * *", async () => {
  try {
    const result = await db.query(
      "DELETE FROM refresh_tokens WHERE expires_at < NOW()"
    );
    console.log(`Expired refresh tokens cleaned: ${result.rowCount}`);
  } catch (error) {
    console.error("Token cleanup error:", error);
  }
});
