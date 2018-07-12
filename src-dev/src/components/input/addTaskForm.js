import React from 'react';
import TaskSettings from './TaskSettings';

export default class AddTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            additionalClassesForButtons: '',
            settingsVisibility: 'hidden'
        }

        const date = new Date();

        this.task = {
            name: '',
            priority: 'semi-urgent',
            month: date.getUTCMonth(),
            year: date.getUTCFullYear(),
            day: date.getUTCDate()
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.toggleSettingsVisibility = this.toggleSettingsVisibility.bind(this);
        this.setYear = this.setYear.bind(this);
        this.setMonth = this.setMonth.bind(this);
        this.setDay = this.setDay.bind(this);
        this.setPriority = this.setPriority.bind(this);
    }

    handleNameChange(e){
        this.setState({
            value: e.target.value
        });
        this.task.name = e.target.value;
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.task);
        if(this.verifyName() && this.verifyDay() && this.verifyMonth() && this.verifyYear() && this.verifyName() && this.verifyPriority())
            this.props.addTask(this.task);
        else
            console.error('Something went horrible when trying to create your task. Go take a walk while we fix this.')
    }

    handleFocus() {
        this.setState((prevState) => {
            const className = prevState.additionalClassesForButtons;
            console.log('previous value', className);
            const newClass = (className === '') ? 'translatedButton' : '';
            console.log('new state', newClass);
            return {
                additionalClassesForButtons: newClass
            }
        });
    }

    verifyName() {
        if(typeof this.task.name === 'string' && this.task.name.trim() !== '')
            return true;

        return false;
    }

    verifyPriority() {
        const accepterPriorities = ['urgent', 'semi-urgent', 'normal', 'trivial'];
        if(typeof this.task.priority === 'string' && accepterPriorities.includes(this.task.priority))
            return true;

        return false;
    }

    verifyYear(){
        const date = new Date();
        if(typeof this.task.year === 'number' && this.task.year >= date.getUTCFullYear())
            return true;

        return false;
    }

    verifyMonth() {

        if(typeof this.task.month === 'number' && this.task.month >= 0 && this.task.month < 12)
            return true;

        return false;
    }

    verifyDay(){
        if(typeof this.task.day === 'number' && this.task.day > 0 && this.task.day < 32)
            return true;

        return false;
    }

    setYear(year){
        this.task.year = year;
    }

    setMonth(month){
        this.task.month = month;
    }

    setDay(day){
        this.task.day = day;
    }

    setPriority(priority){
        this.task.priority = priority;
    }

    toggleSettingsVisibility() {
        const settingsVisibilityState = this.state.settingsVisibility;
        const newVisibilityState = (settingsVisibilityState === 'hidden') ? '' : 'hidden';
        this.setState({
            settingsVisibility: newVisibilityState
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form">
                <input type="text" onFocus={this.handleFocus} onBlur={this.handleFocus} placeholder='Task Name.' className="text-input" onChange={this.handleNameChange} value={this.state.value}/>
                
                <button onClick={this.toggleSettingsVisibility} type="button" className={`button settingsButton ${this.state.additionalClassesForButtons}`}>
                    <i className={'fas fa-sliders-h'}></i>
                </button>
                
                <button type="submit" className={`button ${this.state.additionalClassesForButtons}`}>
                    <i className='fas fa-plus'></i>
                </button>

                <TaskSettings   setYear={this.setYear}
                                setMonth={this.setMonth}
                                setDay={this.setDay}
                                setPriority={this.setPriority}
                                hidden={this.state.settingsVisibility} 
                                toggleSettingsVisibility={this.toggleSettingsVisibility}/>

            </form>
        )
    }
}