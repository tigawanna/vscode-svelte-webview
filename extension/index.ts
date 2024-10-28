import { commands, ExtensionContext } from 'vscode';
import { HelloPanel } from './views/hello-panel';
import { MainPanel } from './views/main-panel';

export function activate(context: ExtensionContext) {
  // Add command to the extension context
  context.subscriptions.push(
    commands.registerCommand("markMyWords.showHelloWorld", async () => {
      HelloPanel.render(context);
    })
  );
    context.subscriptions.push(
      commands.registerCommand("markMyWords.publishSelected", async () => {
        MainPanel.render(context);
      })
    );
}

export function deactivate() {}
