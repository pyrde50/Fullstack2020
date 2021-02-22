interface values {
    height: number,
    weight: number
}

export const parseArgs = (args: Array<string>): values => {
    if (args.length !== 4) throw new Error('incorrect amount of args');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {height: Number(args[2]), weight: Number(args[3])};
    }
    throw new Error('not numbers');
};

export const calculateBMI = (a: number, b: number): string => {
    const heightInM = a / 100;
    const bmi = b / Math.pow(heightInM, 2);
    if (bmi < 18) {
        return 'underweight';
    } else if (bmi < 25) {
        return 'normalweight';
    } else {
        return 'overweight';
    }
};

try {
    const {height, weight} = parseArgs(process.argv);
    console.log(calculateBMI(height, weight));
} catch (e) {
    console.log('Something went wrong, error message: ', e);
}
