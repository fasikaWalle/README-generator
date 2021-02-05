// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer')
const colors = require('colors')
var figlet = require('figlet');
var validator = require('email-validator');
const generateMarkdown = require('./Develop/utilis/generateMarkdown')

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, data, error => {
            if (error) {
                reject(error)
            }
            resolve({
                ok: true,
                message: 'file created!'
            })
        })
    })
}

// TODO: Create a function to initialize app
function createReadMe() {
    console.log(figlet.textSync('README', {
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 'full',
        font: 'Doom',
        whitespaceBreak: true
    }).brightYellow)

    return inquirer.prompt([{
        type: 'input',
        name: 'GitHub',
        message: 'What is your GitHub username?',
        validate: function (input) {
            if (input) {
                return true
            } else {
                console.log('please provide your GitHub username'.red)
                return false
            }
        }
    }, {
        type: 'input',
        message: 'What is your email address?',
        name: 'Email',
        default: () => { },
        validate: function (Email) {
            if (validator.validate(Email)) {
                return validator.validate(Email)
            } else {
                console.log('please provide a valid email address'.red)
            }
        }
    }, {
        type: 'input',
        name: 'Title',
        message: "what is your project's name?",
        validate: function (input) {
            if (input) {
                return true
            } else {
                console.log('please provide your project name'.red)
                return false
            }
        }
    },
    {
        type: 'input',
        name: 'Description',
        message: 'Please write a short description about your project',
        validate: function (input) {
            if (input) {
                return true
            } else {
                console.log('please provide a description about your project'.red)
                return false
            }
        }
    },
    {
        type: 'confirm',
        name: 'TableOfContent',
        message: 'Do you want table of content?',
        default: false
    },
    {
        type: 'input',
        name: 'Installation',
        message: 'What command should be run to run to install dependencies?',
        validate: function (input) {
            if (input) {
                return true
            } else {
                console.log('please provide how to install dependencies'.red)
                return false
            }
        }
    }, {
        type: 'input',
        name: 'Usage',
        message: 'What does the user need to know about using the repo?',
        validate: function (input) {
            if (input) {
                return true
            } else {
                console.log('please provide a guide to use the repo'.red)
                return false
            }
        }
    }, {
        type: 'confirm',
        name: 'Collaborator',
        message: 'do you have collaborators?',
        default: false
    },
    {
        type: 'input',
        name: 'Credits',
        message: 'Please list all your collaborators',
        when: function (data) {
            if (data.Collaborator) {
                return true
            } else {
                return false
            }
        }
    },
    {
        type: 'list',
        name: 'Licence',
        message: 'What kind of Licence should your project have?',
        choices: ['MIT', 'Apache', 'BSD 3-Clause License'],
        default: 'MIT'
    },
    {
        type: 'confirm',
        name: 'FeaturesConfirm',
        message: 'Do you want to add features? ',
        default: false
    },

    {
        type: 'input',
        name: 'Features',
        message: 'Please list features of your project',
        when: function (data) {
            if (data.FeaturesConfirm) {
                return true
            } else {
                return false
            }
        }
    }, {
        type: 'confirm',
        name: 'contributingConfirm',
        message: 'Do you want that other users contributing to your repo?',
        default: false
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'What does the user need to know about contributing to the repo?',
        when: function (data) {
            if (data.contributingConfirm) {
                return true
            } else {
                return false
            }
        }
    },
    {
        type: 'input',
        name: 'Tests',
        message: 'What command should be run to run tests?',
        validate: function (input) {
            if (input) {
                return true
            } else {
                console.log('please provide the command to run tests'.red)
                return false
            }
        }
    }, {
        type: 'confirm',
        name: 'screenshot',
        message: 'Do you want to include screenshot of your project?',
        default: false
    },
    {
        name: 'image',
        message: 'Add your project screenshot in(Assets/images/ and rename it as screenshot.png)'.yellow,
        when: function (data) {
            if (data.screenshot) {
                return true
            } else {
                return false
            }
        }
    }
    ]).then(data => {
        return generateMarkdown(data)
    }).then(READMEFile => {
        writeToFile('./Develop/utilis/README.md', READMEFile)
        console.log('README created!!')
    })
}

// Function call to initialize app
createReadMe()

