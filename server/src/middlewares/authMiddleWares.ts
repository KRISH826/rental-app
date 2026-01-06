import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
    sub: string;
    "custom:role"?: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: string;
            };
        }
    }
}

export const authMiddleWare = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        try {
            const decode = jwt.decode(token) as DecodedToken;
            if (!decode) {
                return res.status(401).json({ message: "Invalid Token" });
            }

            const userRole = decode["custom:role"] || '';
            req.user = {
                id: decode.sub,
                role: userRole
            };

            const hasAccess = allowedRoles.includes(userRole.toLowerCase());
            if (!hasAccess) {
                return res.status(403).json({ message: "Forbidden" });
            }
            return next();
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
}
