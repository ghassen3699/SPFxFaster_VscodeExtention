const vscode = require('vscode');
const fs = require('fs');

async function updateWebpartNameProject() {
    if (vscode.workspace.workspaceFolders) {
        const newName = await vscode.window.showInputBox({ prompt: 'Enter the new name of project' });
        if (!newName) return;

        try {
            const currentFolderUri = vscode.workspace.workspaceFolders[0].uri;
            const currentFolderPath = currentFolderUri.fsPath;

            const packageJsonPath = currentFolderPath + "/package.json";
            const packageLockJsonPath = currentFolderPath + "/package-lock.json";
            const yoRCFilePath = currentFolderPath + "/.yo-rc.json";
            const packageSolutionPATH = currentFolderPath + "/config/package-solution.json";

            let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            let packageLockJson = JSON.parse(fs.readFileSync(packageLockJsonPath, 'utf8'));
            let yoRCFile = JSON.parse(fs.readFileSync(yoRCFilePath, 'utf8'));
            let packageSolutionFile = JSON.parse(fs.readFileSync(packageSolutionPATH, 'utf8'));

            packageJson.name = newName;
            packageLockJson.name = newName ;
            yoRCFile["@microsoft/generator-sharepoint"].solutionName = newName ;
            yoRCFile["@microsoft/generator-sharepoint"].libraryName = newName ;
            packageSolutionFile["solution"].name = newName + "-client-side-solution" ;
            packageSolutionFile["solution"]["metadata"]["shortDescription"].default = newName + " description" ;
            packageSolutionFile["solution"]["metadata"]["longDescription"].default = newName + " description" ;
            packageSolutionFile["solution"]["features"][0].title = newName + " Feature" ;
            packageSolutionFile["solution"]["features"][0].description = `The feature that activates elements of the ${newName} solution.` ;
            packageSolutionFile["paths"].zippedPackage = `solution/${newName}.sppkg` ;



            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
            fs.writeFileSync(packageLockJsonPath, JSON.stringify(packageLockJson, null, 2));
            fs.writeFileSync(yoRCFilePath, JSON.stringify(yoRCFile, null, 2));
            fs.writeFileSync(packageSolutionPATH, JSON.stringify(packageSolutionFile, null, 2));

            vscode.window.showInformationMessage('Your project renamed with success');
        } catch (err) {
            console.log(err);
        }
    } else {
        vscode.window.showInformationMessage('No folder opened in workspace');
    }
}

module.exports = {
    updateWebpartNameProject
};
