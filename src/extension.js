// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const {createNewSpfxSolution} = require('../src/functions/newSPFxSolution');


/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	
	let disposable = vscode.commands.registerCommand('spfx-first-extention.helloWorld', async function () 
		{
			// vscode.window.showInformationMessage('Hello World from spfx first extention!');
			const InitialCommands = ['Create a new SPFx Solution', 'Create a new webpart', 'Update your webpart name', 'Delete your webpart']
			const userInput = await vscode.window.showQuickPick(InitialCommands, {
				matchOnDetail: true,
			})
			console.log(userInput)
			if (userInput === "Create a new SPFx Solution"){
				await createNewSpfxSolution()
			}else if (userInput === "Create a new webpart"){
				
			}
		}
	);

	context.subscriptions.push(disposable);
}

module.exports = {
	activate,
}
