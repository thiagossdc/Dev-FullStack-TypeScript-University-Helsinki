function calculateBmi(height: number, weight: number): string {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters ** 2);

    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        return 'Normal range';
    } else if (bmi >= 25 && bmi < 30) {
        return 'Overweight';
    } else {
        return 'Obesity';
    }
}

// Handle command-line arguments
if (require.main === module) {
    const [,, height, weight] = process.argv.map(Number);
    if (!height || !weight) {
        console.error('Please provide valid height and weight as arguments.');
        process.exit(1);
    }
    console.log(calculateBmi(height, weight));
}

export { calculateBmi };
