const cron = require("node-cron");
const Scholarship = require("../models/Scholarship");

/**
 * Scheduler to mark expired scholarships as inactive
 * Runs daily at midnight (00:00)
 */
const markExpiredScholarships = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day

    // Find all published scholarships with date_limite in the past
    const result = await Scholarship.updateMany(
      {
        statut_publication: true, // Only published scholarships
        date_limite: { $lt: today }, // Deadline has passed
      },
      {
        $set: {
          statut_publication: false, // Mark as inactive/unpublished
        },
      }
    );

    if (result.modifiedCount > 0) {
      console.log(
        `✅ Scheduler: Marked ${result.modifiedCount} expired scholarship(s) as inactive`
      );
    }
  } catch (error) {
    console.error("❌ Scheduler Error: Failed to mark expired scholarships:", error.message);
  }
};

/**
 * Start the scholarship scheduler
 * Runs daily at 00:00 (midnight)
 * Cron format: "0 0 * * *" = minute 0, hour 0, every day
 */
const startScholarshipScheduler = () => {
  // Run daily at midnight
  cron.schedule("0 0 * * *", markExpiredScholarships, {
    scheduled: true,
    timezone: "UTC",
  });

  console.log("⏰ Scholarship scheduler started (runs daily at 00:00 UTC)");

  // Run immediately on startup to catch any expired scholarships
  markExpiredScholarships();
};

module.exports = {
  startScholarshipScheduler,
  markExpiredScholarships, // Export for manual testing
};

