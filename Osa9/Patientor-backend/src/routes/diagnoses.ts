import express from 'express';
import diagnoseService from '../services/diagnoseService';
import { DiagnoseType } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  const diagnoses: Array<DiagnoseType> = diagnoseService.getEntries();
  res.json(diagnoses);
});

export default router;