const r = require('rethinkdb')
const _ = require('lodash')

// #### Connection details

// RethinkDB database settings. Defaults can be overridden using environment variables.
const dbConfig = {
  host: process.env.RDB_HOST || 'localhost',
  port: parseInt(process.env.RDB_PORT) || 28015,
  db  : process.env.RDB_DB || 'test'
}

/**
 * Connect to RethinkDB instance and perform a basic database setup:
 *
 * - create the `RDB_DB` database (defaults to `test`)
 * - create tables `questions` and `users` in this database
 * - create secondary index on `room` row from `questions` table
 */
module.exports.setup = function(callback) {
  r.connect({ host: dbConfig.host, port: dbConfig.port }, function (err, connection) {
    if (err) throw err

    // r.dbDrop(dbConfig.db).run(connection, function(err, result) { })

    r.dbCreate(dbConfig.db).run(connection, function(err, result) {
      if (err) {
        console.log("[DEBUG] RethinkDB database '%s' already exists (%s:%s)\n%s", dbConfig.db, err.name, err.msg, err.message)
        callback()
      } else {
        console.log("[INFO ] RethinkDB database '%s' created", dbConfig.db)

        const questions = 'questions'
        r.db(dbConfig.db).tableCreate(questions).run(connection, function(err, result) {
          if (err) {
            console.log("[DEBUG] RethinkDB table '%s' already exists (%s:%s)\n%s", table, err.name, err.msg, err.message)
          } else {
            console.log("[INFO ] RethinkDB table '%s' created", questions)

            r.db(dbConfig.db).table(questions).indexCreate('room').run(connection, function(err, result){
              if (err) {
                console.log("[DEBUG] RethinkDB index 'room' already exists for table 'questions' (%s:%s)\n%s", err.name, err.msg, err.message)
              } else {
                console.log("[INFO ] RethinkDB index 'room' created")
              }
            })
          }
        })

        const users = 'users'
        r.db(dbConfig.db).tableCreate(users).run(connection, function(err, result) {
          if (err) {
            console.log("[DEBUG] RethinkDB table '%s' already exists (%s:%s)\n%s", table, err.name, err.msg, err.message)
          } else {
            console.log("[INFO ] RethinkDB table '%s' created", users)

            r.db(dbConfig.db).table(users).indexCreate('username').run(connection, function(err, result) {
              if (err) {
                console.log("[DEBUG] RethinkDB index 'username' already exists for table 'users' (%s:%s)\n%s", err.name, err.msg, err.message)
              } else {
                console.log("[INFO ] RethinkDB index 'username' created")
                callback()
              }
            })
          }
        })
      }
    })
  })
}

// #### Functions on `questions` table

module.exports.findQuestions = function (room, callback) {
  onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('questions')
      .filter(r.row('room').eq(room))
      .eqJoin('user_id', r.table('users')).without({ right: 'id' }).zip()
      .run(connection, function(err, cursor) {
        if (err) throw err
        cursor.toArray(function(err, results) {
            if (err) throw err
            console.log(JSON.stringify(results, null, 2))
            callback(results)
        })
        connection.close()
    })
  })
}

module.exports.insertQuestion = function (room, text, user_id, callback) {
  const question = {
    text: text, room: room, votes: 0,
    user_id: user_id, voted_by: [], done: false
  }

  onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('questions')
      .insert(question)
      .run(connection, function(err, result) {
        if (err) throw err
        console.log(JSON.stringify(result, null, 2))
        callback(result)
        connection.close()
    })
  })
}

module.exports.updateQuestion = function (questionId, userId, params, callback) {
  const votes = params.votes
  if (typeof votes !== 'undefined') {
    return voteQuestion(questionId, userId, votes, callback)
  }

  const done = params.done
  if (typeof done !== 'undefined') {
    return doneQuestion(questionId, userId, done, callback)
  }
}

function voteQuestion (questionId, userId, votes, callback) {
  onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('questions').get(questionId)
      .update(function(question) {
        return r.branch(
            question('voted_by').contains(userId),
            r.error('You are not allowed to vote twice!'),
            r.branch(
              question('done').eq(true),
              r.error('You are not allowed to vote questions marked as done!'),
              {
                votes: votes,
                voted_by: question('voted_by').append(userId)
              }
            )
        )
      }).run(connection, function(err, result) {
        if (err) throw err
        console.log(JSON.stringify(result, null, 2))
        callback(result)
        connection.close()
    })
  })
}

function doneQuestion (questionId, userId, done, callback) {
  onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('questions').get(questionId)
      .update(function(question) {
        return r.branch(
            question('user_id').ne(userId),
            r.error('You are allowed to mark as done/undone only your own questions!'),
            {
              done: done
            }
        )
      }).run(connection, function(err, result) {
        if (err) throw err
        console.log(JSON.stringify(result, null, 2))
        callback(result)
        connection.close()
    })
  })
}

module.exports.listenForAddQuestion = function (callback) {
  onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('questions').changes().filter(r.row('old_val').eq(null))
      .run(connection, function(err, cursor) {
        if (err) throw err
        cursor.each(function(err, row) {
            if (err) throw err
            console.log(JSON.stringify(row, null, 2))

            const question = row.new_val
            /* hackish solution to get user details based on the user_id
             for the question being added */
            r.db(dbConfig['db']).table('users').get(question.user_id).without('id')
              .run(connection, function(err, user){
                if (err) throw err
                console.log(JSON.stringify(user, null, 2))
                callback(_.merge({}, row.new_val, user))
            })
        })
    })
  })
}

module.exports.listenForUpdateQuestion = function (callback) {
  onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('questions')
      .changes()
      .filter(r.row('old_val').ne(null))
      .run(connection, function(err, cursor) {
        if (err) throw err
        cursor.each(function(err, row) {
            if (err) throw err
            console.log(JSON.stringify(row, null, 2))
            callback(row.old_val, row.new_val)
        })
    })
  })
}

// #### Functions on `users` table

module.exports.findUsers = function (callback) {
  onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('users')
      .run(connection, function(err, cursor) {
        if (err) throw err
        cursor.toArray(function(err, result) {
            if (err) throw err
            console.log(JSON.stringify(result, null, 2))
            callback(result)
        })
        connection.close()
    })
  })
}

module.exports.createUser = function (username, password, callback) {
  onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('users')
      .insert({
        username: username,
        password: password,
        picture: `https://robohash.org/${username}`
      }, { returnChanges: true })
      .run(connection, function(err, result) {
        if (err) throw err
        console.log(JSON.stringify(result, null, 2))
        callback(result.changes[0].new_val)
        connection.close()
      })
  })
}

module.exports.findUserByUsername = function (username, callback) {
  onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('users')
      .filter(r.row('username').eq(username))
      .run(connection, function(err, cursor) {
        if (err) throw err
        cursor.toArray(function(err, result) {
            if (err) throw err
            console.log(JSON.stringify(result, null, 2))
            callback(result[0])
        })
        connection.close()
    })
  })
}

module.exports.findUserById = function (id, callback) {
  onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('users').get(id).without('password')
      .run(connection, function(err, result) {
        if (err) throw err
        console.log(JSON.stringify(result, null, 2))
        callback(result)
        connection.close()
    })
  })
}

// #### Helper functions

/**
 * A wrapper function for the RethinkDB API `r.connect`
 * to keep the configuration details in a single function
 * and fail fast in case of a connection error.
 *
 * TODO - replace with https://github.com/neumino/rethinkdbdash
 */
function onConnect(callback) {
  r.connect({ host: dbConfig.host, port: dbConfig.port }, function(err, connection) {
    if (err) throw err
    connection['_id'] = Math.floor(Math.random()*10001)
    callback(err, connection)
  })
}
