import express from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatientEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients: Array<NonSensitivePatientEntry> = patientService.getNonSensitiveEntries();
  res.json(patients);
});

export default router;