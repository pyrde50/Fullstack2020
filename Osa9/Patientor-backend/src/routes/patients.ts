/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatientEntry } from '../types';
import { patientEntry, toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients: Array<NonSensitivePatientEntry> = patientService.getNonSensitiveEntries();
  res.json(patients);
});

router.post('/', (req, res) => {
  try {
    const patientEntry = toNewPatientEntry(req.body);
    const finalPatientEntry = patientService.addPatient(patientEntry);
    res.json(finalPatientEntry);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id', (req, res) => {
  try {
    const patient = patientService.findById(req.params.id);
    const entry = req.body;
    if (!patient) {
      throw new Error('patient not found');
    }
    const checkEntry = patientEntry(entry);
    const finalEntry = patientService.addEntry(checkEntry, patient);
    console.log(finalEntry);
    res.send(finalEntry);
  } catch (e) {
    res.sendStatus(404);
  }
  
});

export default router;