interface argsValues {
    array: number[],
    amount: number
}

interface NonEmptyArray<T> extends Array<T> {
    pop: () => T
}


function isNonEmpty<T>(arr: Array<T>): arr is NonEmptyArray<T> {
    return arr.length > 0;
}

type trainingObject = {
    periodLength: number
        trainingDays: number
        success: boolean
        rating: number
        ratingDescription: string
        target: number
        average: number
};

const parseArguements = (args: Array<string>): argsValues => {
    if (args.length < 4) throw new Error('incorrect amount of args');
    const numbers = args.filter(a => !isNaN(Number(a))).map(a => Number(a));
    const numbersLength = numbers.length;
    if (numbersLength < args.length - 2) throw new Error('not numbers');
    if (isNonEmpty(numbers)) {
        const target = numbers.pop();
    return {array: numbers, amount: target};
    } else {
        throw new Error('incorrect amount of args');
    }
};

export const exerciseCalculator = (a: Array<number>, b: number): trainingObject=> {
    const training = a.reduce((first ,second) => first + second);
    const periodLength = a.length;
    const trainingDays = a.filter(c => c > 0).length;
    const average = training / periodLength;
    let success;
    if (training > a.length * b) {
        success = true;
    } else {
        success = false;
    }
    let rating;
    let ratingDescription;
    if (average < b * periodLength * 0.5) {
        rating = 1;
        ratingDescription = 'could have been way better';
    } else if (average < b * periodLength) {
        rating = 2;
        ratingDescription = 'could have been a bit better';
    } else {
        rating = 3;
        ratingDescription = 'good job! You achieved your goals';
    }
    const final: trainingObject = {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: b,
        average: average
    };
    return final;
};

try {
    const {array, amount} = parseArguements(process.argv);
    console.log(exerciseCalculator(array, amount));
} catch (e) {
    console.log('Something went wrong, error message: ', e);
}