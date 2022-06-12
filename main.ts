import { MarkdownView, Plugin, debounce } from "obsidian";

export default class TaskStatusBar extends Plugin {
	taskInStatusBar: HTMLElement;

	async onload() {
		console.log("Task Status Bar Plugin loaded.");
		const countDelay = 1000;

		this.taskInStatusBar = this.addStatusBarItem();
		this.taskInStatusBar.setText("");

		this.registerEvent(
			this.app.workspace.on("file-open", this.countTasks)
		);

		this.registerEvent(
			this.app.workspace.on("editor-change", debounce(this.countTasks, countDelay, true))
		);

	}

	async onunload() { console.log("Task Status Bar Plugin unloaded.") }

	countTasks = () => {
		const statusBarStr = "[x]";
		const mdView = this.app.workspace.getActiveViewOfType(MarkdownView);
		const countMatches = (regex: RegExp, str: string) => (str.match(regex) || []).length;
		let newText = "";

		if (mdView !== null && mdView.getViewData()) {
			const content = mdView.getViewData();
			const openTasks = countMatches(/^\s*- \[ ] /gm, content);
			const completedTasks = countMatches(/^\s*- \[x] /gm, content);

			const overallTasks = completedTasks + openTasks;

			if (overallTasks) newText = completedTasks + "/"+ overallTasks + " " + statusBarStr;
		}
		this.taskInStatusBar.setText(newText);
	};
}
