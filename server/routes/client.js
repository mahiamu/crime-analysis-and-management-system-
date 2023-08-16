import express from "express";
import {
  getCrimeData,
  getGeography,
  createCrimeData,
  DeleteCrimeData,UpdateCrimeData
} from "../controllers/client.js";
import auth from '../middleware/auth.js';

const router = express.Router();

router.get("/crimedata", getCrimeData);
router.get("/geography", getGeography);
router.post('/', auth, createCrimeData);
router.delete('/:crimeDataId', DeleteCrimeData);
router.patch('/:crimeDataId', UpdateCrimeData);

export default router;