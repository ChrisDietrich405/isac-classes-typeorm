// import { NextFunction, Request, Response } from "express";

// export default class Auth {
//   async errHandler(
//     err: Error,
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) {
//     const statusCode = res.statusCode ? res.statusCode : 500;

//     res.status(statusCode);

//     // Return the error message as JSON
//     res.json({
//       error: err.message,
//     });
//   }
// }

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

class Auth {
  verifyToken(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json("Unauthorized");
    }

    token = token.split(" ")[1];

    try {
      const decodedToken: { id: number } = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as { id: number };
      req.user = decodedToken.id;
      next();
    } catch (error) {
      res.status(401).json("Invalid token");
    }
  }

  errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);

    res.json({
      message: err.message,
      // stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
    next();
  }
}

export default new Auth();
