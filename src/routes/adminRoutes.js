const express = require("express");
const router = express.Router();

const authAdminRoutes = require("./authAdminRoutes");
const categoryRoutes = require("./categoryRoutes");
const courseRoutes = require("./courseRoutes");
const instructorRoutes = require("./instructorRoutes");
const faqRoutes = require("./faqRoutes");
const featuresRoutes = require("./featuresRoutes");
const toolsRoutes = require("./toolsRoutes");
const subjectRoutes = require("./subjectRoutes");
const topicsRoutes = require("./topicsRoutes");
const testPackageRoutes = require("./testPackageRoutes");
const trainingRoutes = require("./trainingRoutes");
const quizRoutes = require("./quizRoutes");
const instructionsRoutes = require("./instructionsRoutes");
const questionRoutes = require("./questionRoutes");
const stdTestimonialRoutes = require("./stdTestimonialRoutes");
const compRequirementRoutes = require("./compRequirementRoutes");
const eventCategoryRoutes = require("./eventCategoryRoutes");
const eventRoutes = require("./eventRoutes");
const pptRoutes = require("./pptRoutes");
const clientRoutes = require("./clientRoutes");
const successStoryRoutes = require("./successStoryRoutes");
const alliedRoutes = require("./alliedRoutes");
const newsupdateRoutes = require("./news&updateRoutes");
const newsRoutes = require("./newsRoutes");
const adminRegistrationsSectionRoutes = require("./adminRegistrationsSectionRoutes");
const certificateRoutes = require("./certificateRoutes");
const testCategoryRoutes = require("./testCategoryRoutes");
const enrolledTestPackageRoutes = require("./enrolledTestPackageRoutes");
const notesCategoryRoutes = require("./notesCategoryRoutes");
const notesSubCategoryRoutes = require("./notesSubCategoryRoutes");
const notesRoutes = require("./notesRoutes");
const userWishlistRoutes = require("./userWishlistRoutes");
const batchRoutes = require("./batchRoutes");
const teamRoutes = require("./teamRoutes");
const liveClassRoutes = require("./liveClassRoutes");
const classesRoutes = require("./classesRoutes");
const locationSettingRoutes = require("./locationSettingRoutes");
<<<<<<< HEAD
const appUserRoutes = require("./appUserRoutes");
const appUserEnrollmentsWishlistsDetailsRoutes = require("./appUserEnrollmentsWishlistsDetailsRoutes");
=======
>>>>>>> 29e460a (refactor: rename location models and add location setting management APIs)




router.use("/auth", authAdminRoutes);
router.use("/category", categoryRoutes);
router.use("/course", courseRoutes);
router.use("/instructor", instructorRoutes);
router.use("/faq", faqRoutes);
router.use("/feature", featuresRoutes);
router.use("/tools", toolsRoutes);
router.use("/subject", subjectRoutes);
router.use("/topics", topicsRoutes);
router.use("/test-package", testPackageRoutes);
router.use("/training", trainingRoutes);
router.use("/quiz", quizRoutes);
router.use("/instructions", instructionsRoutes); 
router.use("/question", questionRoutes);
router.use("/stdtestimonial", stdTestimonialRoutes);
router.use("/comp-requirement", compRequirementRoutes);
router.use("/event-category", eventCategoryRoutes);
router.use("/event", eventRoutes);
router.use("/ppt", pptRoutes);
router.use("/client", clientRoutes);
router.use("/success-story", successStoryRoutes);
router.use("/allied", alliedRoutes);
router.use("/news&updates", newsupdateRoutes);
router.use("/news", newsRoutes);
router.use("/registrations", adminRegistrationsSectionRoutes);
router.use("/certificate", certificateRoutes);
router.use("/test-category", testCategoryRoutes);
router.use("/enrolled-test-packages", enrolledTestPackageRoutes);
router.use("/notes-category", notesCategoryRoutes);
router.use("/notes-sub-category", notesSubCategoryRoutes);
router.use("/notes", notesRoutes);
router.use("/user-wishlist", userWishlistRoutes);
router.use("/batch", batchRoutes);
router.use("/team", teamRoutes);
router.use("/live-class", liveClassRoutes);
router.use("/classes", classesRoutes);
router.use("/location", locationSettingRoutes);
router.use("/app-users", appUserRoutes);
router.use("/app-users-enrollments-wishlists-details", appUserEnrollmentsWishlistsDetailsRoutes);






module.exports = router;