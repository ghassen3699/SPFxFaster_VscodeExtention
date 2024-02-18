const vscode = require('vscode');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function cleanProject() {
    if (vscode.workspace.workspaceFolders) {
        const currentFolderUri = vscode.workspace.workspaceFolders[0].uri;
        const currentFolderPath = currentFolderUri.fsPath;
        console.log(currentFolderPath)
        const gulpCommand = `gulp clean`;
        try {
            await exec(gulpCommand, { cwd: currentFolderPath });
        } catch (error) {
            vscode.window.showErrorMessage(`Error: ${error.message}`);
        }


        vscode.window.showInformationMessage(`Your project is clean now`);
    } else {
        vscode.window.showInformationMessage('No folder opened in workspace');
    }
}


module.exports = {
    cleanProject
};