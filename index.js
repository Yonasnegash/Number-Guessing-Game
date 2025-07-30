const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const DIFFICULTY_LEVEL = {
    1: { 'name': 'Easy', 'chances': 10},
    2: { 'name': 'Medium', 'chances': 5},
    3: { 'name': 'Hard', 'chances': 3}
}

let targetNumber
let attemptsLeft
let win = false

function prompt(query) {
    return new Promise((resolve) => rl.question(query, resolve))
}

async function playGame() {
    console.log("Welcome to the Number Guessing Game!");
    console.log("I'm thinking of a number between 1 and 100.");

    console.log("\nPlease select the difficulty level:");
    console.log("1. Easy (10 chances)");
    console.log("2. Medium (5 chances)");
    console.log("3. Hard (3 chances)");

    let choice
    while (true) {
        choice = await prompt("Please select the difficulty level: ")
        if (Object.keys(DIFFICULTY_LEVEL).includes(choice)) break
        console.log("Invalid choice. Please enter a number between 1 and 3.")
    }

    const { name, chances } = DIFFICULTY_LEVEL[choice]
    attemptsLeft = chances
    let attemptsMade = 0
    targetNumber = Math.floor(Math.random() * 100) + 1

    console.log(`\nGreat you have selected the ${name} difficulty level.`)
    console.log(`\nYou have ${chances} chances. Let's start the game!`)

    while (attemptsLeft > 0) {
        const input = await prompt('Enter your guess: ')
        const guess = Number(input)

        if (isNaN(guess) || guess < 1 || guess > 100) {
            console.log("Please enter a valid number between 1 and 100.");
            continue;
        }

        attemptsMade++
        attemptsLeft--


        if (guess === targetNumber) {
            console.log(`Congratulations! You have guessed the correct number in ${attemptsMade} attempts.`)
            win = true
        } else if (guess < targetNumber) {
            console.log(`Incorrect. The number is greater than ${guess}`)
        } else {
            console.log(`Incorrect. The number is less than ${guess}`)
        }

        if (win === true) {
            attemptsLeft = 0
        } else {
            if (attemptsLeft > 0 ) {
                console.log(`Attempts left: ${attemptsLeft}\n`)
            } else {
                console.log(`Game Over! You’ve used all your attempts. The correct number was ${targetNumber}.`)
            }
        }
    }
}

async function main() {
    let playAgain = true

    while (playAgain) {
        await playGame();

        let answer;
        while (true) {
            answer = await prompt("Do you want to play again? (yes/no): ");
            if (['yes', 'no'].includes(answer.toLowerCase())) break;
            console.log("❓ Please type 'yes' or 'no'.");
        }

        playAgain = answer.toLowerCase() === 'yes';

        if (playAgain) {
                console.log("\n🔁 Starting a new game...\n");
        } else {
            console.log("\n👋 Thanks for playing! Goodbye!");
            rl.close();
        }
    }
}

main()