let inquirer;

import('inquirer').then(module => {
    inquirer = module.default; // Get the default export from inquirer ES module
    generateSVG(); // Call your main function here
});

const fs = require('fs');
const { Circle, Square, Triangle } = require('./lib/shapes');

async function promptUser() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'text',
            message: 'Enter up to three characters for the logo:',
            validate: (input) => {
                if (input.length > 3) {
                    return "Please enter up to three characters only.";
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'Enter text color (keyword or hexadecimal):',
            validate: (input) => {
                const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^[a-zA-Z]+$/;
                if (!regex.test(input)) {
                    return "Please enter a valid color keyword or hexadecimal value.";
                }
                return true;
            }
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Choose a shape:',
            choices: ['circle', 'triangle', 'square']
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: 'Enter shape color (keyword or hexadecimal):',
            validate: (input) => {
                const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^[a-zA-Z]+$/;
                if (!regex.test(input)) {
                    return "Please enter a valid color keyword or hexadecimal value.";
                }
                return true;
            }
        }
    ]);
}

async function generateSVG() {
    const answers = await promptUser();
    let shape;

    switch (answers.shape) {
        case 'circle':
            shape = new Circle(answers.shapeColor);
            break;
        case 'triangle':
            shape = new Triangle(answers.shapeColor);
            break;
        case 'square':
            shape = new Square(answers.shapeColor);
            break;
    }

    const svgContent = `
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            ${shape.render()}
            <text x="150" y="110" font-family="Arial" font-size="40" fill="${answers.textColor}" text-anchor="middle">${answers.text}</text>
        </svg>
    `;

    fs.writeFileSync('logo.svg', svgContent.trim());

    console.log('Generated logo.svg');
}
