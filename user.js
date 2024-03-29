const crypto = require('crypto');
const Exercise = require('./exercise')
class User {
    constructor(username) {
        this.username = username;
        this._id = crypto.randomUUID();
        this.__v = 0;
        this.exercises = new Array();
    }

    matchUserID(id) {
        return this._id === id;
    }

    userInfoRaw() {
        return {
            username: this.username,
            _id: this._id,
            __v: this.__v
        }
    }

    userInfo() {
        return {
            username: this.username,
            _id: this._id
        }
    }

    createExercise(description, duration, date) {
        const exercise = new Exercise(description, duration, date)
        this.exercises.push(exercise);

        return exercise.exerciseInfo();
    }

    exerciseLog(from, to, limit) {
        let exerciseLog = this.userInfo();
        const exercises = this.exercises;
        const log = Array.from(exercises).reduce(
            (acc, exercise) => {
                if (exercise.dateIsBetween(from, to)) {
                    acc.push(exercise.exerciseInfo());
                    return acc;
                }
                else {
                    return acc;
                }
            },
            [],
        )
        if (limit) {
            exerciseLog.log = log.slice(0, limit);
        } else {
            exerciseLog.log = log;
        }
        if (from) {
            exerciseLog.from = from.toDateString();
        }
        if (to) {
            exerciseLog.to = to.toDateString();
        }
        exerciseLog.count = exerciseLog.log.length;

        return exerciseLog;
    }

}

// const user = new User("Milena");
// user.createExercise("TestA", 60, new Date("2024-03-29"));
// user.createExercise("TestB", 30, new Date("2024-03-28"));
// user.createExercise("TestC", 45, new Date("2024-03-29"));
// console.log(user.exerciseLog());
// console.log(user.exerciseLog(
//     new Date("2024-03-28"),
//     new Date("2024-03-28")));
// console.log(user.exerciseLog(
//     new Date("2024-03-28"),
//     new Date("2024-03-29")
// ));
// console.log(user.exerciseLog(
//     new Date("2024-03-28"),
//     new Date("2024-03-29"),
//     2));
// console.log(user.exerciseLog(
//     null,
//     new Date("2024-03-29"),
//     2));
// console.log(user.exerciseLog(
//     new Date("2024-03-28"),
//     null,
//     2));
// console.log(user.exerciseLog());



module.exports = User;