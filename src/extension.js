// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { createNewSpfxSolution } = require('../src/functions/newSPFxSolution');
const { addSPFxWebPart } = require('../src/functions/newSPFxWebPart');
const { cleanProject } = require('../src/functions/cleanProject') ;
const { buildProject } = require('../src/functions/buildProject') ;
const { bundleProject } = require('../src/functions/bundleProject') ;
const { packageProject } = require('../src/functions/packageProject') ;


/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) { 


    // Create new solution
    let manageSPFxCommands = vscode.commands.registerCommand('spfx-first-extention.manageSPFx', async function () {
        const InitialCommands = ['Create a new SPFx Solution', 'Create a new webpart', 'Update your webpart name', 'Delete your webpart']
        const userInput = await vscode.window.showQuickPick(InitialCommands, {
            matchOnDetail: true,
        })
        console.log(userInput)
        if (userInput === "Create a new SPFx Solution") {
            await createNewSpfxSolution()
        } else if (userInput === "Create a new webpart") {
            await addSPFxWebPart()
        }
    });


    // Clean project command
    let cleanProjectCommand = vscode.commands.registerCommand('spfx-first-extention.cleanProject', async function () {
        await cleanProject() ;
    });


    // Build project command
    let buildProjectCommand = vscode.commands.registerCommand('spfx-first-extention.buildProject', async function () {
        await buildProject() ;
    });


    // bundle project command
    let bundleProjectCommand = vscode.commands.registerCommand('spfx-first-extention.bundleProject', async function () {
        await bundleProject() ;
    });


    // package project command
    let packageProjectCommand = vscode.commands.registerCommand('spfx-first-extention.packageProject', async function () {
        await packageProject() ;
    });



    context.subscriptions.push(manageSPFxCommands, cleanProjectCommand, buildProjectCommand, bundleProjectCommand, packageProjectCommand);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
