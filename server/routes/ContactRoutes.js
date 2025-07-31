import { Router } from "express";
import {
  getAllContacts,
  getDMList,
  searchContacts,
} from "../controllers/ContactController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const contactsRoutes = Router();

contactsRoutes.post("/search", verifyToken, searchContacts);
contactsRoutes.get("/get-contacts-for-dm", verifyToken, getDMList);
contactsRoutes.get("/get-all-contacts", verifyToken, getAllContacts);
export default contactsRoutes;
