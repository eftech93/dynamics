import { Request } from "express";
export interface CRequest<T> extends Request{
    body: T
}