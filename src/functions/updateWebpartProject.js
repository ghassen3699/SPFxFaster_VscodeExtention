const vscode = require('vscode');
const fs = require('fs');


async function updateWebpartNameProject() {
    if (vscode.workspace.workspaceFolders) {

        const oldName = await vscode.window.showInputBox({ prompt: 'Enter the current name of the web part' });
        if (!oldName) return;

        const newName = await vscode.window.showInputBox({ prompt: 'Enter the new name of the web part' });
        if (!newName) return;

        const currentFolderUri = vscode.workspace.workspaceFolders[0].uri;
        const currentFolderPath = currentFolderUri.fsPath;
        console.log(currentFolderPath);

        try {
            fs.renameSync(`${currentFolderPath}/src/webparts/${oldName}WebPart.ts`, `${currentFolderPath}/src/webparts/${newName}WebPart.ts`);
            fs.renameSync(`${currentFolderPath}/src/webparts/${oldName}WebPart.manifest.json`, `${currentFolderPath}/src/webparts/${newName}WebPart.manifest.json`);
            vscode.window.showInformationMessage('Web part renamed successfully!');
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to rename web part: ${error.message}`);
        }

    } else {
        vscode.window.showInformationMessage('No folder opened in workspace');
    }
}



module.exports = {
    updateWebpartNameProject
};

