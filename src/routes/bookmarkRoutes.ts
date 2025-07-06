import { Router } from "express";
import { BookmarkController } from "../controllers/bookmarkController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

// All bookmark routes require authentication
router.use(authenticateToken);

// Save article to bookmarks
router.post("/:id/bookmark", BookmarkController.saveArticle);

// Remove article from bookmarks
router.delete("/:id/bookmark", BookmarkController.removeBookmark);

// Get bookmark status for an article
router.get("/:id/bookmark", BookmarkController.checkBookmarkStatus);

// Get user's bookmarked articles
router.get("/bookmarks/list", BookmarkController.getUserBookmarks);

export default router;