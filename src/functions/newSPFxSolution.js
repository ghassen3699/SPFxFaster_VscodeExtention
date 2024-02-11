const vscode = require('vscode');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function createNewSpfxSolution() {
    const userInput = await vscode.window.showInputBox({
        prompt: 'Enter your new SPFx Solution name :',
        placeHolder: 'Type here...',
        value: ''
    });

    const webPartName = await vscode.window.showInputBox({
        prompt: 'Enter your Web Part name:',
        placeHolder: 'Type here...',
        value: 'MyWebPart' // You can set a default value or leave it empty
    });

    const languageTypeCommands = ['Using React', 'Using Vanilla Javascript', ''];
    const languageType = await vscode.window.showQuickPick(languageTypeCommands, {
        matchOnDetail: true,
    });

    // If the user entered userInput, languageType, and webPartName
    if (userInput && languageType && webPartName) {
        vscode.window.showInformationMessage(`Your new Project ${userInput} ${languageType} is loading ...`);
        const options = {
            canSelectFiles: false,
            canSelectFolders: true,
            canSelectMany: false,
            openLabel: 'Select Folder'
        };
        const result = await vscode.window.showOpenDialog(options);

        // Check if a folder is selected
        if (result && result.length > 0) {
            const selectedFolderUri = result[0];
            const selectedFolderPath = selectedFolderUri.fsPath;

            // Run the Yeoman command based on the selected languageType
            let yeomanCommand;
            if (languageType === 'Using React') {
                yeomanCommand = `yo @microsoft/sharepoint --solutionName ${userInput} --componentType "webpart" --framework "react" --component-name ${webPartName} --skip-install`;
            } else {
                yeomanCommand = `yo @microsoft/sharepoint --solutionName ${userInput} --componentType "webpart" --framework "none"--component-name ${webPartName} --skip-install`;
            }

            try {
                // Run the Yeoman command using promisified exec
                const { stdout } = await exec(yeomanCommand, { cwd: selectedFolderPath });
                console.log('Yeoman command output:', stdout);
                vscode.window.showInformationMessage(`Your new Project ${userInput} is ready now.`);
                vscode.window.showInformationMessage(`Please run 'npm install' in the terminal to complete the installation.`);
            } catch (error) {
                vscode.window.showErrorMessage(`Error: ${error.message}`);
            }
        } else {
            vscode.window.showErrorMessage('No folder selected.');
        }
    }
}

module.exports = {
    createNewSpfxSolution
};
