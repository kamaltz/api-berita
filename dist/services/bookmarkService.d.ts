export declare class BookmarkService {
    static saveArticle(userId: string, articleId: string): Promise<{
        userId: string;
        articleId: string;
        savedAt: Date;
    }>;
    static removeBookmark(userId: string, articleId: string): Promise<{
        userId: string;
        articleId: string;
        savedAt: Date;
    }>;
    static getUserBookmarks(userId: string, page?: number, limit?: number): Promise<{
        articles: {
            id: string;
            title: string;
            category: string;
            publishedAt: string;
            readTime: string;
            imageUrl: string;
            isTrending: boolean;
            tags: string[] | null;
            content: string;
            createdAt: Date;
            updatedAt: Date;
            savedAt: Date;
            author: {
                name: string;
                title: string;
                avatar: string;
            };
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            hasMore: boolean;
        };
    }>;
    static isBookmarked(userId: string, articleId: string): Promise<boolean>;
}
//# sourceMappingURL=bookmarkService.d.ts.map