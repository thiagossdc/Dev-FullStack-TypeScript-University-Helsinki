interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

function calculateExercises(dailyHours: number[], target: number): ExerciseResult {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(day => day > 0).length;
    const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
    const average = totalHours / periodLength;
    const success = average >= target;

    let rating: number;
    let ratingDescription: string;

    if (average >= target) {
        rating = 3;
        ratingDescription = 'Great job! You met your goal.';
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'Not too bad but could be better.';
    } else {
        rating = 1;
        ratingDescription = 'You need to improve.';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
}

    const args = process.argv.slice(2).map(Number);
    if (args.length < 2) {
        console.error('Please provide a target and daily exercise hours as arguments.');
        process.exit(1);
    }
    const target = args[0];
    const dailyHours = args.slice(1);

    if (dailyHours.some(isNaN) || isNaN(target)) {
        console.error('All arguments must be valid numbers.');
        process.exit(1);
    }

    console.log(calculateExercises(dailyHours, target));


export { calculateExercises };
