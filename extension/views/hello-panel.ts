import { Disposable, ExtensionContext, ViewColumn, WebviewPanel, window } from "vscode";
import { WebviewHelper } from "./helper";

export class HelloPanel {
  public static currentPanel: HelloPanel | undefined;
  private readonly _panel: WebviewPanel;
  private _disposables: Disposable[] = [];

  private constructor(panel: WebviewPanel, context: ExtensionContext) {
    this._panel = panel;

    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    this._panel.webview.html = WebviewHelper.setupHtml(this._panel.webview, context);

    WebviewHelper.setupWebviewHooks(this._panel.webview, this._disposables);
  }

  public static render(context: ExtensionContext) {
    if (HelloPanel.currentPanel) {
      HelloPanel.currentPanel._panel.reveal(ViewColumn.One);
    } else {
      const panel = window.createWebviewPanel("showHelloWorld", "Hello World", ViewColumn.One, {
        enableScripts: true,
      });

      HelloPanel.currentPanel = new HelloPanel(panel, context);
    }
    HelloPanel.currentPanel._panel.webview.postMessage({ type: "hello", data: "Hello World!" });
  }

  /**
   * Cleans up and disposes of webview resources when the webview panel is closed.
   */
  public dispose() {
    HelloPanel.currentPanel = undefined;

    // Dispose of the current webview panel
    this._panel.dispose();

    // Dispose of all disposables (i.e. commands) for the current webview panel
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }
}
