import { Plugin } from "obsidian";

export default class TaskStatusBar extends Plugin {

	async onload() { console.log("Task Status Bar Plugin loaded.") }

	async onunload() { console.log("Task Status Bar Plugin unloaded.") }

}
