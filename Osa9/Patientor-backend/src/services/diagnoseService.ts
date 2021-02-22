import diagnoseData from '../data/Diagnoses.json';
import { DiagnoseType } from '../types';

const diagnoses: Array<DiagnoseType> = diagnoseData;

const getEntries = (): Array<DiagnoseType> => {
  return diagnoses;
};


export default {
  getEntries,
};