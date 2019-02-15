import React from 'react';

export default class InputCalender extends React.Component {

    constructor(props){
        super(props);

        const date = new Date();

        this.months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];

        this.state = {
            month: date.getUTCMonth(),
            year: date.getUTCFullYear(),
            day: date.getUTCDate()
        }

        this.currentDayBtn = false;
        this.handleClickedDay = this.handleClickedDay.bind(this);
        this.handleNextMonthArrowClick = this.handleNextMonthArrowClick.bind(this); 
        this.handlePrevMonthArrowClick = this.handlePrevMonthArrowClick.bind(this);

    }

    handleNextMonthArrowClick() {

        const prevMonth = this.state.month;
        const nextMonth = (prevMonth > 10) ? 0 : prevMonth + 1;
        const nextYear = (nextMonth === 0) ? this.state.year + 1: this.state.year;
        this.setState({
            month: nextMonth,
            year: nextYear
        });

        this.props.setYear(nextYear);
        this.props.setMonth(nextMonth);

        // TODO:: Use refs. instead ya mot5alef.
        const backBtn = document.querySelector('.disabled-month-nav-btn');
        if(backBtn)
            backBtn.classList.remove('disabled-month-nav-btn');
    }

    handlePrevMonthArrowClick(e) {
        
        const date = new Date();
        const currentRealMonth = date.getUTCMonth();
        const currentRealYear = date.getUTCFullYear();

        if(this.state.month > currentRealMonth || this.state.year > currentRealYear){
            
            const prevMonth = this.state.month;
            const nextMonth = (prevMonth < 1) ? 11 : prevMonth - 1;
            const nextYear = (nextMonth === 11) ? this.state.year - 1: this.state.year;

            this.setState({
                month: nextMonth,
                year: nextYear
            });

            this.props.setYear(nextYear);
            this.props.setMonth(nextMonth);

            
            if(nextMonth <= currentRealMonth && this.state.year <= currentRealYear) {
                if(!e.target.classList.contains('disabled-month-nav-btn'))
                    e.target.classList.add('disabled-month-nav-btn');
            }else{
                if(e.target.classList.contains('disabled-month-nav-btn'))
                    e.target.classList.remove('disabled-month-nav-btn');
            }
        
        }


    }

    handleClickedDay(e) {
        const newDay = parseInt(e.target.value);
        this.setState({
            day: newDay
        });

        this.props.setDay(newDay);


        // TODO:: Use refs. instead.
        // Removing the CURRENT__DAY flag from the previous button.
        document.querySelector('.current-day-btn').classList.remove('current-day-btn');
        // Adding the CURRENT__DAY flag to the real current button!!
        e.target.classList.add('current-day-btn');
    }


    getDaysBtns(numberOfDays){
        let daysBtns = [];
        for(let i = 1; i <= numberOfDays; i++){
            daysBtns.push(
                <button type="button" onClick={this.handleClickedDay} value={i} className={`day-btn ${this.state.day === i ? 'current-day-btn' : ''}`}>
                    {i}
                </button>
            )
        }
        return daysBtns;
    }

    getDaysForCurrentMonth(){
        const month = this.state.month;
        const thirtyDaysMonths = [3, 5, 8, 10];
        let numberOfDays = -1;
        if(thirtyDaysMonths.includes(month)) {
            numberOfDays = 30;
        }else if(month === 1){
            const year = this.state.year;
            const isLeap = year % 4 === 0 || year % 100 === 0;
            numberOfDays = isLeap ? 29 : 28;
        }else{
            numberOfDays = 31;
        }

        return this.getDaysBtns(numberOfDays);
    }

    render() {
        return (
            <div className='calender-input-container'>
                <h3 className='header'>Pick a deadline.</h3>
                <div className='months-container'>
                    <button type="button" onClick={this.handlePrevMonthArrowClick} className='disabled-month-nav-btn button no-margin-left calender-navigation-btn'>
                        <i class="fas fa-chevron-left"></i>
                    </button>
                        <h4 className='header'>{`${this.months[this.state.month]} ${this.state.year}`}</h4>
                    <button type="button" onClick={this.handleNextMonthArrowClick} className='button no-margin-left calender-navigation-btn'>
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                <div className='days-container'>
                    {this.getDaysForCurrentMonth()}
                </div>
            </div>
        )
    }
}
