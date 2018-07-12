import React from 'react';
import InputCalender from './inputCalender';
import TaskPriorityInput from './TaskPriorityInput';

export default class TaskSettings extends React.Component {

    constructor(props){
        super(props);
        this.handleOkBtn = this.handleOkBtn.bind(this);

        const date = new Date();
        
        this.taskSettings = {
            priority: 'semi-urgent',
            month: date.getUTCMonth(),
            year: date.getUTCFullYear(),
            day: date.getUTCDate()
        }
        this.setYear = this.setYear.bind(this);
        this.setMonth = this.setMonth.bind(this);
        this.setDay = this.setDay.bind(this);
        this.setPriority = this.setPriority.bind(this);
    }

    handleOkBtn() {
        this.props.toggleSettingsVisibility();

        this.props.setDay(this.taskSettings.day);
        this.props.setYear(this.taskSettings.year);
        this.props.setMonth(this.taskSettings.month);
        this.props.setPriority(this.taskSettings.priority);
    }

    setYear(year){
        this.taskSettings.year = year;
    }

    setMonth(month){
        this.taskSettings.month = month;
    }

    setDay(day){
        this.taskSettings.day = day;
    }

    setPriority(priority){
        this.taskSettings.priority = priority;
    }

    render() {
        return (
            <div className={`settings ${this.props.hidden}`}>
                <InputCalender  setYear={this.setYear}
                                setMonth={this.setMonth}
                                setDay={this.setDay} />
                <TaskPriorityInput setPriority={this.setPriority} />
                <button className="day-btn settingsBtn" onClick={this.handleOkBtn} type="button">
                    {'OK'}
                </button>
            </div>
        )
    }
}