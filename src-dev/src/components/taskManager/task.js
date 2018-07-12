import React from 'react';

export default class Task extends React.Component {

    constructor(props) {
        super(props);

        this.dateAnnotation = '';

        const currentDate = new Date();
        const taskDate = new Date(this.props.task.year, this.props.task.month, this.props.task.day);
        if (currentDate.toDateString() === taskDate.toDateString()) {
            this.dateAnnotation = 'Today'
        } else if (currentDate.setDate(currentDate.getDate() + 1) && //Just adding a day to the exzisting date!
            currentDate.toDateString() === taskDate.toDateString()) {
            this.dateAnnotation = 'Tomorrow'
        } else {
            this.dateAnnotation = taskDate.toDateString();
        }

        this.state = {
            className: 'task hidden',
            priorityAnnotation: '',
            checked: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }


    componentDidMount() {
        const priority = this.props.task.priority;
        let text = '';
        let className = '';
        if (priority === 'semi-urgent') {
            text = 'Semi-Urgent';
            className = 'task semi-urgent';
        } else if (priority === 'urgent') {
            text = 'Urgent';
            className = 'task urgent';
        } else if (priority === 'normal') {
            text = 'Normal';
            className = 'task normal';

        } else {
            text = 'Trivial';
            className = 'task trivial';
        }
        setTimeout(_ => {
            this.setState({
                className: className,
                priorityAnnotation: text
            })
        }, 50);
    }

    handleChange(e) {
        e.preventDefault();
        this.props.remove(this.props.id);
    }

    render() {
        return (

            <article id={this.props.task.name} className={this.state.className}>
                <div className="name-priority-container">
                    <div className="task-check-container">
                        <label className={`priority-label ${this.state.checked}`}>
                            <input onChange={this.handleChange} className='priority-input' type="checkbox" name="isTaskDone" value="done" />
                            <span className='checkmark'></span>
                        </label>
                    </div>
                    <div>
                        <h3 className={`task-name header`}>{this.props.task.name}</h3>
                        <h4 className={`task-priority header`}>{this.state.priorityAnnotation}</h4>
                    </div>
                </div>
                <h4 className={`task-date header`}>{this.dateAnnotation}</h4>
            </article>
        )
    }
}