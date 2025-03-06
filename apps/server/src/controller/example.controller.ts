import { GetTestResponse } from "@monorepo/types";
import { Request, Response } from "express";

export const getTest = async (_: Request, res: Response) => {
  const testJson: GetTestResponse = {
    message: "Hello from Express API!",
  };
  res.json(testJson);
};
