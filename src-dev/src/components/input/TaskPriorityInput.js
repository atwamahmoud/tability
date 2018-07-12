import React from 'react';

export default class TaskPriorityInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: ['', 'checked', '', ''],
            value: 'semi-urgent'
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let checkedArray = ['', '', '', ''];
        const index = parseInt(e.target.parentElement.getAttribute('index'));
        checkedArray[index] = 'checked';
        this.setState({
            checked: checkedArray,
            value: e.target.value            
        });
        this.props.setPriority(e.target.value);
    }


    render() {
        return(
            <fieldset className='priority-field'>
                <legend><h3 className='header'>Priority</h3></legend>
                <label index={0} className={`priority-label ${this.state.checked[0]}`}> 
                    Urgent
                    <input onChange={this.handleChange} className='priority-input' type="radio" name="priority" value="urgent" />
                    <span className='checkmark'></span>
                </label>
                <label index={1} className={`priority-label ${this.state.checked[1]}`}> 
                    Semi-Urgent
                    <input onChange={this.handleChange} className='priority-input' type="radio" name="priority" value="semi-urgent" />
                    <span className='checkmark'></span>
                </label>
                <label index={2} className={`priority-label ${this.state.checked[2]}`}> 
                    Normal
                    <input onChange={this.handleChange} className='priority-input' type="radio" name="priority" value="normal" />
                    <span className='checkmark'></span>
                </label>
                <label index={3} className={`priority-label ${this.state.checked[3]}`}> 
                    Trivial
                    <input onChange={this.handleChange} className='priority-input' type="radio" name="priority" value="trivial" />
                    <span className='checkmark'></span>
                </label>
            </fieldset>
        )
    }
}