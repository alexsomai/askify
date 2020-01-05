const express = require('express');
const expressJwt = require('express-jwt');
const config = require('./config');
const jwtDecode = require('jwt-decode');

const app = module.exports = express.Router();
const db = require('./db');

const jwtCheck = expressJwt({ secret: config.secret });

app.use('/questions', jwtCheck);

app.get('/questions/:room', (req, res) => {
  const room = req.params.room;
  db.findQuestions(room, questions => {
    res.json({ [room]: questions })
  })
});

app.post('/questions', (req, res) => {
  const id_token = req.headers['authorization'].split(' ')[1];
  const user = jwtDecode(id_token);
  const room = req.body.room;
  const text = req.body.text;

  db.insertQuestion(room, text, user.id, () => {
    res.sendStatus(201)
  })
});

app.put('/question/:id', (req, res) => {
  const id_token = req.headers['authorization'].split(' ')[1];
  const user = jwtDecode(id_token);
  const questionId = req.params.id;

  db.updateQuestion(questionId, user.id, req.body, result => {
    if (result.errors) {
      res.status(400).send({ message: result.first_error })
    } else {
      res.sendStatus(200)
    }
  })
});
