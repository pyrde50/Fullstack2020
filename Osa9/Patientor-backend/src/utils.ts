/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NewPatientEntry, Gender, Entry, HealthCheckRating } from "../src/types";
import {v1 as uuid} from 'uuid';
const id = uuid();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (object: any): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseName(object.occupation),
        ssn: parseName(object.ssn),

    };
    return newEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseName = (comment: any): string => {
    if (!comment || !isString(comment)) {
      throw new Error('Incorrect or missing comment: ' + comment);
    }
  
    return comment;
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing weather: ' + gender);
    }
    return gender;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
  const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckType = (type: any): "HealthCheck" => {
  if (type === "HealthCheck") {
    return "HealthCheck";
  } else {
    throw new Error ('invalid type');
  }
};

const parseHospitalType = (type: any): "Hospital" => {
  if (type === "Hospital") {
    return "Hospital";
  } else {
    throw new Error ('invalid type');
  }
};

const parseOccupationalType = (type: any): "OccupationalHealthcare" => {
  if (type === "OccupationalHealthcare") {
    return "OccupationalHealthcare";
  } else {
    throw new Error ('invalid type');
  }
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing healthCheckRating: ' + rating);
  } else {
    return rating;
  }
};
/*

const parseCodes = (codes: any): Array<DiagnoseType['code']> => {
  if (!codes) {
    return [];
  } else {
    if (codes.)
  }
};*/

export const patientEntry = (entry: any): Entry => {
  switch (entry.type) {
    case 'Hospital': 
      return newHospitalEntry(entry);
    case 'HealthCheck':
      return newHealthCheckEntry(entry);
    case 'OccupationalHealthcare':
      return newOccupationalCheckEntry(entry);
    default:
      return assertNever(entry);
  }
};

const assertNever = (entry: any): never => {
  throw new Error('incorrect or missing entry type' + JSON.stringify(entry));
};

const newHospitalEntry = (entry: any): Entry => {
  const newEntry = {
    description: parseName(entry.description),
    date: parseDate(entry.date),
    specialist: parseName(entry.specialist),
    type: parseHospitalType(entry.type),
    // diagnosisCodes: entry.diagnosisCodes,
    discharge: {
      date: parseDate(entry.discharge.date),
      criteria: parseName(entry.discharge.criteria)
    },
    id: id
  };

  return newEntry;
};

const newHealthCheckEntry = (entry: any): Entry => {
  const newEntry: Entry = {
    description: parseName(entry.description),
    date: parseDate(entry.date),
    specialist: parseName(entry.specialist),
    type: parseHealthCheckType(entry.type),
    healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
    id: id
  };

  return newEntry;
};

const newOccupationalCheckEntry = (entry: any): Entry=> {
  const newEntry = {
    description: parseName(entry.description),
    date: parseDate(entry.date),
    specialist: parseName(entry.specialist),
    type: parseOccupationalType(entry.type),
    // diagnosisCodes: entry.diagnosisCodes,
    employerName: parseName(entry.employerName),
    sickLeave: {
      startDate: parseDate(entry.sickLeave.startDate),
      endDate: parseDate(entry.sickLeave.endDate)
    },
    id: id
  };

  return newEntry;
};

export {toNewPatientEntry};