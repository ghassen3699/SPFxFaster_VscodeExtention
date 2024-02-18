const vscode = require('vscode');
const util = require('util');
const { exec } = require('child_process');

const execAsync = util.promisify(exec);

async function packageProject() {
    if (vscode.workspace.workspaceFolders) {
        const currentFolderUri = vscode.workspace.workspaceFolders[0].uri;
        const currentFolderPath = currentFolderUri.fsPath;
        console.log(currentFolderPath);
        const gulpCommand1 = `gulp clean`;
        const gulpCommand2 = `gulp bundle --ship`;
        const gulpCommand3 = `gulp package-solution --ship`;

        try {
            await execAsync(gulpCommand1, { cwd: currentFolderPath });
            await execAsync(gulpCommand2, { cwd: currentFolderPath });
            await execAsync(gulpCommand3, { cwd: currentFolderPath });
            vscode.window.showInformationMessage('Your Artifact .sppkg is created with success');
            vscode.window.showInformationMessage('You can check it in ' + currentFolderPath + '/sharepoint/solution folder.');
        } catch (error) {
            vscode.window.showErrorMessage(`Error: ${error.message}`);
        }
    } else {
        vscode.window.showInformationMessage('No folder opened in workspace');
    }
}

module.exports = {
    packageProject
};

