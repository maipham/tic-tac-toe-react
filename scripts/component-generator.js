const fs = require('fs'); //include file system which is built in JS
var componentName = 'ComponentName'; // default component name
if (process.argv.length > 2) {
    componentName = process.argv[2]; // argv[0] directory of node argv[1] directory of the file argv[2] commands input
}
var dashTokens = componentName.split('-');
var newName = "";
if (dashTokens.length > 1) {
    dashTokens.forEach(token => {
        newName += token.charAt(0).toUpperCase() + token.substring(1, token.length);
    });
}

if (newName) {
    componentName = newName;
}

var componentProp = componentName + "Prop";
var componentState = componentName + "State";
var componentTemplate = `
import * as React from 'react';
import './${componentName}.css';

interface ${componentProp} {
}

interface ${componentState} {
}

export default class ${componentName} extends React.Component<${componentProp}, ${componentState}> {
    constructor(props: Readonly<${componentProp}>) {
        super(props);
        this.state = {
        };
    };
    render() {
        return (
            <div>
            ${componentName} works!
            </div>
        );
    }
}
`;

var dir = './' + componentName;

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

var path = './' + componentName + '/';

fs.writeFile(path + componentName + ".css", "", function (err) {
    if (err) {
        return console.log(err);
    }
});

fs.writeFile(path + componentName + ".tsx", componentTemplate, function (err) {
    if (err) {
        return console.log(err);
    }
});