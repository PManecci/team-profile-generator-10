const fs = require('fs');
const inquirer = require('inquirer');

const generateHTML = require('./src/generateHTML');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const { type } = require('os');

const teamArray = [];

const addManager = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'Enter employee name (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Must enter the employee's name.");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter the employee's ID",
            validate: idInput => {
                if (idInput) {
                    return true;
                } else {
                    console.log ("Must enter the employee's ID")
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter employee's email address",
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log ("Must enter employee's email address")
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Enter manager's office number if applicapble",
        }
    ])
    .then(managerInput => {
        const  { name, id, email, officeNumber } = managerInput;
        const manager = new Manager (name, id, email, officeNumber);

        teamArray.push(manager);
        console.log(manager);
    })
};

//user prompts for engineer or intern additions
const addEmployee = () => {
    console.log(`
    =========================
    Add employees to the team
    =========================
    `);

    return inquirer.prompt ([
        {
            type: 'list',
            name: 'role',
            message: "Choose the employee's role",
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the employee',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("You must enter the employee's name");
                    return false;
                }
            }
        }, 
        {
            type: 'input',
            name: 'id',
            message: "Enter the employee's ID",
            validate: idInput => {
                if (idInput) {
                    return true;
                } else {
                    console.log("You must enter the employee's ID")
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter employee's email address",
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log("Must enter the employee's email address")
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "Enter the employee's GitHub username",
            when: (input) => input.role === "Engineer",
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log("You must enter the employee's GitHub username")
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: "Enter the Intern's school name",
            when: (input) => input.role === "Intern",
            validate: schoolInput => {
                if (schoolInput) {
                    return true;
                } else {
                    console.log("You must enter the intern's school name")
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Would you like to add more team members?',
            default: false
        }
    ])
    .then(employeeData => {
        let { name, id, email, role, github, school, confirmAddEmployee} = employeeData;
        let employee;

        if (role === "Engineer") {
            employee = new Engineer (name, id, email, github);

            console.log(employee);
        } else if (role === "Intern") {
            employee = new Intern (name, id, email, school);

            console.log(employee);
        }

        teamArray.push(employee);

        if (confirmAddEmployee) {
            return addEmployee(teamArray);
        } else {
            return teamArray;
        }
    })
};

const writeFile = data => {
    fs.writeFile('./dist/index.html',  data, err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Your team has been successfully created!")
        }
    })
};

addManager()
    .then(addEmployee)
    .then(teamArray => {
        return generateHTML(teamArray);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .catch(err => {
        console.log(err);
    });