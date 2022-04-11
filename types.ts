import { Request, Response, NextFunction } from "express";

export interface NoteRouterProps {
    req: Request,
    res: Response,
    next: NextFunction
}

export interface Note {
    id: string;
    text: string;
    category: string;
    time: string;
    archived: boolean;
}

export interface StatsType {
  [x: string]: {
    active: number;
    archived: number;
  };
}