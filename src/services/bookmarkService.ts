import { db } from "../db/index.js";
import { savedArticles, articles, users } from "../db/schema.js";
import { eq, and } from "drizzle-orm";

export class BookmarkService {
    static async saveArticle(userId: string, articleId: string) {
        const existingBookmark = await db
            .select()
            .from(savedArticles)
            .where(
                and(
                    eq(savedArticles.userId, userId),
                    eq(savedArticles.articleId, articleId)
                )
            )
            .limit(1);

        if (existingBookmark.length > 0) {
            throw new Error("Article already bookmarked");
        }

        const result = await db
            .insert(savedArticles)
            .values({ userId, articleId })
            .returning();

        return result[0];
    }

    static async removeBookmark(userId: string, articleId: string) {
        const result = await db
            .delete(savedArticles)
            .where(
                and(
                    eq(savedArticles.userId, userId),
                    eq(savedArticles.articleId, articleId)
                )
            )
            .returning();

        if (result.length === 0) {
            throw new Error("Bookmark not found");
        }

        return result[0];
    }

    static async getUserBookmarks(userId: string, page = 1, limit = 10) {
        const offset = (page - 1) * limit;

        const bookmarkedArticles = await db
            .select({
                id: articles.id,
                title: articles.title,
                category: articles.category,
                publishedAt: articles.publishedAt,
                readTime: articles.readTime,
                imageUrl: articles.imageUrl,
                isTrending: articles.isTrending,
                tags: articles.tags,
                content: articles.content,
                createdAt: articles.createdAt,
                updatedAt: articles.updatedAt,
                savedAt: savedArticles.savedAt,
                author: {
                    name: users.name,
                    title: users.title,
                    avatar: users.avatar,
                },
            })
            .from(savedArticles)
            .innerJoin(articles, eq(savedArticles.articleId, articles.id))
            .innerJoin(users, eq(articles.authorId, users.id))
            .where(eq(savedArticles.userId, userId))
            .orderBy(savedArticles.savedAt)
            .limit(limit)
            .offset(offset);

        const totalCount = await db
            .select({ count: savedArticles.userId })
            .from(savedArticles)
            .where(eq(savedArticles.userId, userId));

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

    static async isBookmarked(userId: string, articleId: string) {
        const bookmark = await db
            .select()
            .from(savedArticles)
            .where(
                and(
                    eq(savedArticles.userId, userId),
                    eq(savedArticles.articleId, articleId)
                )
            )
            .limit(1);

        return bookmark.length > 0;
    }
}