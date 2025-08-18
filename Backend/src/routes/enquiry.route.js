import express from "express";
import { addEnquiry, listEnquiry } from "../controllers/enquiry.controller.js";

const enquiryRouter = express.Router();

enquiryRouter.post("/add-enquiry", addEnquiry);
enquiryRouter.get("/list-enquiry", listEnquiry);

export default enquiryRouter;
