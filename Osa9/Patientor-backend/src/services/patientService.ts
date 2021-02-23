import patientData from '../data/Patients.json';
import { PatientType, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import {v1 as uuid} from 'uuid';
const id = uuid();

const patients: Array<PatientType> = patientData;

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
    ...object
  }
}

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};