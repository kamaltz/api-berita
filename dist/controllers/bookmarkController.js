"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookmarkController = void 0;
const bookmarkService_js_1 = require("../services/bookmarkService.js");
class BookmarkController {
    static async saveArticle(req, res) {
        try {
            const { id: articleId } = req.params;
            const userId = req.user.id;
            const bookmark = await bookmarkService_js_1.BookmarkService.saveArticle(userId, articleId);
            res.status(201).json({
                success: true,
                message: "Article bookmarked successfully",
                data: { bookmark },
            });
        }
        catch (error) {
            if (error.message === "Article already bookmarked") {
                return res.status(400).json({
                    success: false,
                    message: error.message,
                });
            }
            res.status(500).json({
                success: false,
                message: "Failed to bookmark article",
                error: error.message,
            });
        }
    }
    static async removeBookmark(req, res) {
        try {
            const { id: articleId } = req.params;
            const userId = req.user.id;
            await bookmarkService_js_1.BookmarkService.removeBookmark(userId, articleId);
            res.json({
                success: true,
                message: "Bookmark removed successfully",
            });
        }
        catch (error) {
            if (error.message === "Bookmark not found") {
                return res.status(404).json({
                    success: false,
                    message: error.message,
                });
            }
            res.status(500).json({
                success: false,
                message: "Failed to remove bookmark",
                error: error.message,
            });
        }
    }
    static async getUserBookmarks(req, res) {
        try {
            const userId = req.user.id;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const result = await bookmarkService_js_1.BookmarkService.getUserBookmarks(userId, page, limit);
            res.json({
                success: true,
                message: "Bookmarks retrieved successfully",
                data: result,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to retrieve bookmarks",
                error: error.message,
            });
        }
    }
    static async checkBookmarkStatus(req, res) {
        try {
            const { id: articleId } = req.params;
            const userId = req.user.id;
            const isSaved = await bookmarkService_js_1.BookmarkService.isBookmarked(userId, articleId);
            res.json({
                success: true,
                message: "Bookmark status retrieved",
                data: { isSaved },
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to check bookmark status",
                error: error.message,
            });
        }
    }
}
exports.BookmarkController = BookmarkController;
//# sourceMappingURL=bookmarkController.js.map