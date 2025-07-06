"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookmarkService = void 0;
const index_js_1 = require("../db/index.js");
const schema_js_1 = require("../db/schema.js");
const drizzle_orm_1 = require("drizzle-orm");
class BookmarkService {
    static async saveArticle(userId, articleId) {
        const existingBookmark = await index_js_1.db
            .select()
            .from(schema_js_1.savedArticles)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_js_1.savedArticles.userId, userId), (0, drizzle_orm_1.eq)(schema_js_1.savedArticles.articleId, articleId)))
            .limit(1);
        if (existingBookmark.length > 0) {
            throw new Error("Article already bookmarked");
        }
        const result = await index_js_1.db
            .insert(schema_js_1.savedArticles)
            .values({ userId, articleId })
            .returning();
        return result[0];
    }
    static async removeBookmark(userId, articleId) {
        const result = await index_js_1.db
            .delete(schema_js_1.savedArticles)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_js_1.savedArticles.userId, userId), (0, drizzle_orm_1.eq)(schema_js_1.savedArticles.articleId, articleId)))
            .returning();
        if (result.length === 0) {
            throw new Error("Bookmark not found");
        }
        return result[0];
    }
    static async getUserBookmarks(userId, page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const bookmarkedArticles = await index_js_1.db
            .select({
            id: schema_js_1.articles.id,
            title: schema_js_1.articles.title,
            category: schema_js_1.articles.category,
            publishedAt: schema_js_1.articles.publishedAt,
            readTime: schema_js_1.articles.readTime,
            imageUrl: schema_js_1.articles.imageUrl,
            isTrending: schema_js_1.articles.isTrending,
            tags: schema_js_1.articles.tags,
            content: schema_js_1.articles.content,
            createdAt: schema_js_1.articles.createdAt,
            updatedAt: schema_js_1.articles.updatedAt,
            savedAt: schema_js_1.savedArticles.savedAt,
            author: {
                name: schema_js_1.users.name,
                title: schema_js_1.users.title,
                avatar: schema_js_1.users.avatar,
            },
        })
            .from(schema_js_1.savedArticles)
            .innerJoin(schema_js_1.articles, (0, drizzle_orm_1.eq)(schema_js_1.savedArticles.articleId, schema_js_1.articles.id))
            .innerJoin(schema_js_1.users, (0, drizzle_orm_1.eq)(schema_js_1.articles.authorId, schema_js_1.users.id))
            .where((0, drizzle_orm_1.eq)(schema_js_1.savedArticles.userId, userId))
            .orderBy(schema_js_1.savedArticles.savedAt)
            .limit(limit)
            .offset(offset);
        const totalCount = await index_js_1.db
            .select({ count: schema_js_1.savedArticles.userId })
            .from(schema_js_1.savedArticles)
            .where((0, drizzle_orm_1.eq)(schema_js_1.savedArticles.userId, userId));
        return {
            articles: bookmarkedArticles,
            pagination: {
                page,
                limit,
                total: totalCount.length,
                hasMore: offset + limit < totalCount.length,
            },
        };
    }
    static async isBookmarked(userId, articleId) {
        const bookmark = await index_js_1.db
            .select()
            .from(schema_js_1.savedArticles)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_js_1.savedArticles.userId, userId), (0, drizzle_orm_1.eq)(schema_js_1.savedArticles.articleId, articleId)))
            .limit(1);
        return bookmark.length > 0;
    }
}
exports.BookmarkService = BookmarkService;
//# sourceMappingURL=bookmarkService.js.map