import React from 'react';
import ReactDOM from 'react-dom'

//For the electron based version only!! 
const electron =  window.require('electron');

import CSS from './css/styles.css';
import AddTaskForm from './components/input/addTaskForm';
import TaskSettings from './components/input/TaskSettings';
import Task from './components/taskManager/task';

const currWindow = electron.remote.getCurrentWindow();

class App extends React.Component {

    constructor(props){

        super(props);


        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);

        let JSXTasks = [];
        let tasks = currWindow.tasks.tasks; 
        if(tasks){
            tasks.map((task, i) => {
                console.log('pushing task #', i);
                JSXTasks.push(<Task id={task.name} remove={this.removeTask} task={task} />)
            })
        }

        this.state = {
            tasks: JSXTasks
        }

    }

    addTask(task) {
        this.setState((prevState) => {
            console.log(prevState);
            return {
                tasks: prevState.tasks.concat(<Task id={task.name} remove={this.removeTask} task={task} />)
            }
        })
        currWindow.addTask(task);
    }

    removeTask(taskID) {
        this.setState((prevState) => {
            let prevTasks = prevState.tasks;
            return  {tasks: prevTasks.filter(task => task.props.id !== taskID)}
        })
        currWindow.removeTask(taskID);
    }

    render() {
        return(
            <main>
                <AddTaskForm addTask={this.addTask} />
                <section className="tasksContainer">
                    {this.state.tasks}
                </section>
            </main>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
