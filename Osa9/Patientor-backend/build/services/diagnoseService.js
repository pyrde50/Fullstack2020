"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Diagnoses_json_1 = __importDefault(require("../data/Diagnoses.json"));
const diagnoses = Diagnoses_json_1.default;
const getEntries = () => {
    return diagnoses;
};
exports.default = {
    getEntries,
};
