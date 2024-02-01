// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { exec } = require('child_process');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

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
				const userInput = await vscode.window.showInputBox({
					prompt: 'Enter your new SPFx Solution name :',
					placeHolder: 'Type here...',
					value: '' 
				});
				const languageTypeCommands = ['Using React', 'Using Vanilla Javascript']
				const languageType = await vscode.window.showQuickPick(languageTypeCommands, {
					matchOnDetail: true,
				})
				if (userInput && languageType) {
					vscode.window.showInformationMessage(`Your new Project ${userInput} with ${languageType} is loading ...`);
					if (languageType === "Using React"){

						const options = {
							canSelectFiles: false,
							canSelectFolders: true,
							canSelectMany: false,
							openLabel: 'Select Folder'
						};
				
						const result = await vscode.window.showOpenDialog(options);
				
						if (result && result.length > 0) {
							const selectedFolderUri = result[0];
							const selectedFolderPath = selectedFolderUri.fsPath;
							// Run the Yeoman command
							const yeomanCommand = `yo @microsoft/sharepoint --solutionName ${userInput} --componentType "webpart" --framework "react"`;
							// exec(yeomanCommand, (error, stdout, stderr) => {
							// 	if (error) {
							// 		vscode.window.showInformationMessage(`Error: ${error.message}`);
							// 		return;
							// 	}
							// 	if (stderr) {
							// 		vscode.window.showInformationMessage(`Error: ${stderr}`);
							// 		return;
							// 	}
							// 	vscode.window.showInformationMessage(`Message: ${stdout}`);
							// });
						} else {
							vscode.window.showErrorMessage('No folder selected.');
							return 
						}
											
					}else {
						const options = {
							canSelectFiles: false,
							canSelectFolders: true,
							canSelectMany: false,
							openLabel: 'Select Folder'
						};
				
						const result = await vscode.window.showOpenDialog(options);
						if (result && result.length > 0) {
							const selectedFolderUri = result[0];
							const selectedFolderPath = selectedFolderUri.fsPath;
							const yeomanCommand = `yo @microsoft/sharepoint --solutionName ${userInput} --componentType "webpart"`;
							// Run the Yeoman command
							// exec(yeomanCommand, (error, stdout, stderr) => {
							// 	if (error) {
							// 		vscode.window.showInformationMessage(`Error: ${error.message}`);
							// 		return;
							// 	}
							// 	if (stderr) {
							// 		vscode.window.showInformationMessage(`Error: ${stderr}`);
							// 		return;
							// 	}
							// 	vscode.window.showInformationMessage(`Message: ${stdout}`);
							// });	
						} else {
							vscode.window.showErrorMessage('No folder selected.');
						}
														
					}
				}
			}
		}
	);

	context.subscriptions.push(disposable);
}

module.exports = {
	activate,
}
