const fs = require('fs'); //include file system which is built in JS
var entityName = 'EntityName'; // default component name
if (process.argv.length > 2) {
    entityName = process.argv[2]; // argv[0] directory of node argv[1] directory of the file argv[2] commands input
}
var dashTokens = entityName.split('-');
var newName = "";
if (dashTokens.length > 1) {
    dashTokens.forEach(token => {
        newName += token.charAt(0).toUpperCase() + token.substring(1, token.length);
    });
}

if (newName) {
    entityName = newName;
}

var componentProp = entityName + "Prop";
var componentState = entityName + "State";
var componentTemplate = `
export class ${entityName} {
    constructor() {}
}
`;

fs.writeFile('./' + entityName + ".tsx", componentTemplate, function (err) {
    if (err) {
        return console.log(err);
    }
});
