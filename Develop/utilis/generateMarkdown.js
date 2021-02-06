// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
    const licenceLink = renderLicenseLink(license)
    switch (license) {
        case "MIT":
            license = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]${licenceLink}`
            break;
        case "Apache":
            license = `[![License](https://img.shields.io/badge/License-Apache%202.0-yellow.svg)]${licenceLink}`
            break;
        case "BSD 3-Clause License":
            license = `[![License](https://img.shields.io/badge/License-BSD%203--Clause-yellow.svg)]${licenceLink}`
            break;
        default: ''
    }
    return license
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
    switch (license) {
        case "MIT":
            license = "(https://opensource.org/licenses/MIT)"

            break;
        case "Apache":
            license = "(https://opensource.org/licenses/Apache-2.0)"

            break;
        case "BSD 3-Clause License":
            license = "(https://opensource.org/licenses/BSD-3-Clause)"
            break;
        default: ''
    }
    return license
}
// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(Licence) {
    return `
 ## Licence
This Licence belongs to ${Licence} 
`
}
// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
    var { GitHub, Email, Title, Description, TableOfContent, Installation, Usage, Credits, Licence, Features, contributing, Tests, screenshot } = data
    // var renderLicence = renderLicenseSection(Licence)

    if (TableOfContent) {
        var sections = { Installation, Usage, Credits, Licence, Features, contributing, Tests }
        TableOfContent = `## Table of Content\n`

        for (let i in sections) {
            if (sections[i]) {
                TableOfContent += `* [${i}](#${i})\n`
            } else {
                sections[i] = ''
            }
        }
    } else {
        TableOfContent = ''
    }
    if (Credits) {
        Credits = `## Credits
${Credits}
`
    } else {
        Credits = ''
    }
    if (Features) {
        Features = `
## Features
${Features}`
    } else {
        Features = ''
    }
    if (contributing) {
        contributing = `
## Contributing
${contributing}`
    } else {
        contributing = ''
    }
  
    return `
# ${Title}
${renderLicenseBadge(Licence)}
## Description

${Description}
${TableOfContent}
## Installation
\`\`\`${Installation}\`\`\`  
## Usage
${Usage}   
![project image](../Assets/images/${screenshot})
${Credits}
${renderLicenseSection(Licence)} 

${Features}  
${contributing}
## Tests
\`\`\`${Tests}\`\`\`  

## Questions
If you have any question about the repo, open an issue or contact me directly at [${GitHub}](https://github.com/${GitHub}/)\n
If you want to reach me for further questions please contact me through ${Email}
    `
}

module.exports = generateMarkdown;
