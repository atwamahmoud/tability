const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

let tasks = [];

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600
  });

  win.tasks = {};

  fs.readFile(path.join(__dirname, "tasks.json"), "utf8", (err, data) => {
    if (err) {
      win.tasks.tasks = [];
      throw err;
    }
    else win.tasks = JSON.parse(data);
    tasks = win.tasks.tasks;
  });

  //Adding helper functions

  win.addTask = addTask;
  win.removeTask = removeTask;
  // and load the index.html of the app.
  win.loadFile(path.join(__dirname, "index.html"));

  win.on('closed', _ => {
    win = null
  })

}

function addTask(task) {
  tasks.push(task);
}

function removeTask(taskID) {
  tasks = tasks.filter(task => task.name !== taskID)
  console.log(tasks);
}

function saveTasks() {
  fs.writeFileSync(path.join(__dirname, "tasks.json"), JSON.stringify({tasks}));
}


app.on('ready', createWindow);

app.on('before-quit', saveTasks);