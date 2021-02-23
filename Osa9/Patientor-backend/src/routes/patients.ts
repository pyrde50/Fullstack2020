import express from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatientEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients: Array<NonSensitivePatientEntry> = patientService.getNonSensitiveEntries();
  res.json(patients);
});

router.post('/', (req, res) => {
  const { name, ssn,  dateOfBirth, gender, occupation} = req.body;
  const newDiaryEntry = patientService.addPatient({
    name,
    ssn,
    dateOfBirth,
    gender,
    occupation
  });
  res.json(newDiaryEntry);
})

export default router;