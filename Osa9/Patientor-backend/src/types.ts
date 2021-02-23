// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}


export interface DiagnoseType {
    code: string,
    name: string,
    latin?: string
  }

  export interface PatientType {
      id: string, 
      name: string,
      dateOfBirth: string,
      ssn: string,
      gender: string,
      occupation: string,
      entries: Entry[]
  }

  export interface NonSensitivePatientEntry {
    id: string, 
    name: string,
    dateOfBirth: string,
    gender: string,
    occupation: string,
  }

  export type NewPatientEntry = Omit<PatientType, 'id' | 'entries'>;