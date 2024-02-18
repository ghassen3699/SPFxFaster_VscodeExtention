const vscode = require('vscode');
const util = require('util');
const exec = util.promisify(require('child_process').exec);


async function addSPFxWebPart(){
    const options = {
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: false,
        openLabel: 'Select your folder project'
    };
    const result = await vscode.window.showOpenDialog(options);

    // Check if a folder is selected
    if (result && result.length > 0) {
        const selectedFolderUri = result[0];
        const selectedFolderPath = selectedFolderUri.fsPath;
        console.log(selectedFolderPath) ;

        // Get webpart name from user
        const webPartName = await vscode.window.showInputBox({
            prompt: 'Enter your Web Part name:',
            placeHolder: 'Type here...',
            value: 'MyWebPart'
        });

        // Get webpart language
        const languageTypeCommands = ['Using React', 'Using Vanilla Javascript', 'Minimal'];
        const languageType = await vscode.window.showQuickPick(languageTypeCommands, {
            matchOnDetail: true,
        });

        // If the user entered userInput, languageType, and webPartName
        if (languageType && webPartName) {
            vscode.window.showInformationMessage(`Your new Webpart ${webPartName} ${languageType} is loading ...`);

            // Check if a folder is selected
            if (result && result.length > 0) {
                const selectedFolderUri = result[0];
                const selectedFolderPath = selectedFolderUri.fsPath;

                // Run the Yeoman command based on the selected languageType
                let yeomanCommand;
                if (languageType === 'Using React') {
                    yeomanCommand = `yo @microsoft/sharepoint --componentType "webpart" --framework "react" --component-name ${webPartName} --skip-install`;
                } else if (languageType === 'Using Vanilla Javascript'){
                    yeomanCommand = `yo @microsoft/sharepoint --componentType "webpart" --framework "none"--component-name ${webPartName} --skip-install`;
                }else {
                    yeomanCommand = `yo @microsoft/sharepoint --componentType "webpart" --framework "minimal"--component-name ${webPartName} --skip-install`;
                }

                try {
                    // Run the Yeoman command
                    await exec(yeomanCommand, { cwd: selectedFolderPath });
                    vscode.window.showInformationMessage(`Your new Webpart ${webPartName} is ready now.`);
                } catch (error) {
                    vscode.window.showErrorMessage(`Error: ${error.message}`);
                }
            } else {
                vscode.window.showErrorMessage('No folder selected.');
            }
        }
    }

    
}

module.exports = {
    addSPFxWebPart
};