import { Request, Response } from "express";
export declare class BookmarkController {
    static saveArticle(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static removeBookmark(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getUserBookmarks(req: Request, res: Response): Promise<void>;
    static checkBookmarkStatus(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=bookmarkController.d.ts.map