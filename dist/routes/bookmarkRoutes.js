"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookmarkController_js_1 = require("../controllers/bookmarkController.js");
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
// All bookmark routes require authentication
router.use(auth_js_1.authenticateToken);
// Save article to bookmarks
router.post("/:id/bookmark", bookmarkController_js_1.BookmarkController.saveArticle);
// Remove article from bookmarks
router.delete("/:id/bookmark", bookmarkController_js_1.BookmarkController.removeBookmark);
// Get bookmark status for an article
router.get("/:id/bookmark", bookmarkController_js_1.BookmarkController.checkBookmarkStatus);
// Get user's bookmarked articles
router.get("/bookmarks/list", bookmarkController_js_1.BookmarkController.getUserBookmarks);
exports.default = router;
//# sourceMappingURL=bookmarkRoutes.js.map