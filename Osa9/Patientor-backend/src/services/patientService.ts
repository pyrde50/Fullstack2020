import { PatientType, NonSensitivePatientEntry, NewPatientEntry, Entry } from '../types';
import {v1 as uuid} from 'uuid';
import patientsData from '../data/entries';
const id = uuid();

const patients: Array<PatientType> = patientsData;

const getEntries = (): Array<PatientType> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (object: NewPatientEntry): PatientType => {
  return {
    id: id,
    entries: [],
    ...object
  };
};

const findById = (id: string): PatientType | undefined => {
  const patient = patients.find(a => a.id === id);
  return patient;
};

const addEntry = (entry: Entry, patient: PatientType): Entry=> {
  patient.entries.concat(entry);
  return entry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry
};