class Exercise {
    constructor(description, duration, date) {
        this.description = description;
        this.duration = duration;
        this.date = date;
    }

    exerciseInfo() {
        return {
            description: this.description,
            duration: this.duration,
            date: this.date.toDateString()
        }
    }

    dateIsBetween(from, to) {
        if (from) {from.setUTCHours(0,0,0,0);}
        if (to) {to.setUTCHours(22,59,59,999);}
        const exerciseTS = this.date.getTime();
        const fromTS = from ? from.getTime() : 0;
        const toTS = to ? to.getTime() : Infinity;
        return (fromTS <= exerciseTS) &&
            (exerciseTS <= toTS);
    }
}

module.exports = Exercise;