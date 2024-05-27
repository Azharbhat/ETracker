import express from "express";
import {
  addItem,
  getAllItems,
  createSource

} from "../controllers/item-controller.js";

const itemRouter = express.Router();

itemRouter.post("/", addItem); // Route to add an item
itemRouter.get("/", getAllItems); // Route to get all items for a user
itemRouter.post("/createSource",createSource)

export default itemRouter;
