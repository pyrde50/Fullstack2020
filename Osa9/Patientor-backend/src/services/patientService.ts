import patientData from '../data/Patients.json';
import { PatientType, NonSensitivePatientEntry } from '../types';

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

export default {
  getEntries,
  getNonSensitiveEntries
};