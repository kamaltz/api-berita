import { Request, Response } from "express";
import { BookmarkService } from "../services/bookmarkService.js";

export class BookmarkController {
    static async saveArticle(req: Request, res: Response) {
        try {
            const { id: articleId } = req.params;
            const userId = (req as any).user.id;

            const bookmark = await BookmarkService.saveArticle(userId, articleId);

            res.status(201).json({
                success: true,
                message: "Article bookmarked successfully",
                data: { bookmark },
            });
        } catch (error: any) {
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

    static async removeBookmark(req: Request, res: Response) {
        try {
            const { id: articleId } = req.params;
            const userId = (req as any).user.id;

            await BookmarkService.removeBookmark(userId, articleId);

            res.json({
                success: true,
                message: "Bookmark removed successfully",
            });
        } catch (error: any) {
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

    static async getUserBookmarks(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const result = await BookmarkService.getUserBookmarks(userId, page, limit);

            res.json({
                success: true,
                message: "Bookmarks retrieved successfully",
                data: result,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: "Failed to retrieve bookmarks",
                error: error.message,
            });
        }
    }

    static async checkBookmarkStatus(req: Request, res: Response) {
        try {
            const { id: articleId } = req.params;
            const userId = (req as any).user.id;

            const isSaved = await BookmarkService.isBookmarked(userId, articleId);

            res.json({
                success: true,
                message: "Bookmark status retrieved",
                data: { isSaved },
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: "Failed to check bookmark status",
                error: error.message,
            });
        }
    }
}