import express from 'express';
import {calculateBMI} from './bmiCalculator';
import {exerciseCalculator} from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('hello World');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height?.toString();
  const weight = req.query.weight?.toString();
  if (height === undefined || weight === undefined) {
    throw new Error('height or weight not found');
  }
  const NHeight = Number(height);
  const NWeight = Number(weight);
  if (!NHeight || !NWeight) {
    throw new Error(`weren't numbers`);
  }
  const message = calculateBMI(NWeight, NHeight);
  const returnObject = {
    height: NHeight,
    weight: NWeight,
    bmi: message
  };
  res.send(returnObject);
});

interface exProps {
  target: number,
  daily_exercises: Array<number>
}

app.post('/exercises', (request, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: exProps = request.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const target = body.target;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const daily_exercises = body.daily_exercises;
  const targetNo = Number(target);
  if (daily_exercises === undefined || target === undefined) {
    throw new Error(`parameters missing`);
  }
  if (isNaN(targetNo) || !Array.isArray(daily_exercises)) {
    throw new Error(`malformatted parameters`);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const check: Array<number> = daily_exercises;
  if (check.map(a => isNaN(a)).filter(a => a === true).length > 0) {
    throw new Error(`malformatted parameters`);
  }
  const final = exerciseCalculator(daily_exercises, targetNo);
  res.json(final);
  

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});