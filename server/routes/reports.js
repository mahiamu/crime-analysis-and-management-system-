import express from "express";
import { getReports } from "../controllers/reports.js";
import auth from '../middleware/auth.js';

const router = express.Router();

router.get("/reports", getReports);

export default router;