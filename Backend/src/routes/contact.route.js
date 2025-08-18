import express from 'express';
import { sendQueryEmail } from '../controllers/enquiry.controller.js';
const conntactRouter = express.Router();

conntactRouter.post('/send-email',sendQueryEmail);

export default conntactRouter;