const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser");
const userDB = require("./user-db");
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use(bodyParser.urlencoded({ extended: false }))

function userListHandler(req, res) {
  res.json(userDB.userList());
}

app.get("/api/users", userListHandler);

function createUsersHandler(req, res) {
  const user = userDB.createUser(req.body.username);
  console.log("user", user)
  res.json(user);
}
app.post("/api/users", createUsersHandler);

function createUserExercises(req, res) {
  console.log(userDB);
  const userId = req.params._id;
  const description = req.body.description;
  const duration = parseInt(req.body.duration);
  let date = req.body.date || Date.now();
  date = new Date(date);
  const user = userDB.getUserByID(userId);
  if (user) {
    res.json(user.createExercise(description, duration, date));
  } else {
    res.json({ error: "not found" })
  }
}
app.post("/api/users/:_id/exercises", createUserExercises);

function logsHandler(req, res) {
  const userId = req.params._id;
  const user = userDB.getUserByID(userId);
  const from = new Date(req.query.from);
  const to = new Date(req.query.to);
  const limit = parseInt(req.query.limit);
  console.log("LOGS: ", req.query, from, to, limit);
  if (user) {
    res.json(user.exerciseLog(from, to, limit));
  } else {
    res.json({ error: "not found" })
  }
}
app.get("/api/users/:_id/logs", logsHandler);



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
