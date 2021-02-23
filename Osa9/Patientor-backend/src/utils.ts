/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NewPatientEntry, Gender } from "../src/types";

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

export {toNewPatientEntry};