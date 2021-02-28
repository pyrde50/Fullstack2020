export type Entry =
| HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseType['code']>;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string,
    sickLeave: {
      startDate: string,
      endDate: string
    }
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string,
    criteria: string
  }
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface DiagnoseType {
    code: string,
    name: string,
    latin?: string
  }

  export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
  }

  export interface PatientType {
      id: string, 
      name: string,
      dateOfBirth: string,
      ssn: string,
      gender: Gender,
      occupation: string,
      entries: Entry[]
  }

  export interface NonSensitivePatientEntry {
    id: string, 
    name: string,
    dateOfBirth: string,
    gender: Gender,
    occupation: string,
  }

  export type NewPatientEntry = Omit<PatientType, 'id' | 'entries'>;