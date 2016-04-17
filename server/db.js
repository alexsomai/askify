const r = require('rethinkdb')

// #### Connection details

// RethinkDB database settings. Defaults can be overridden using environment variables.
const dbConfig = {
  host: process.env.RDB_HOST || 'localhost',
  port: parseInt(process.env.RDB_PORT) || 28015,
  db  : process.env.RDB_DB || 'test',
  tables: ['questions', 'users']
}

/**
 * Connect to RethinkDB instance and perform a basic database setup:
 *
 * - create the `RDB_DB` database (defaults to `test`)
 * - create tables `questions` and `users` in this database
 * - create secondary index on `room` row from `questions` table
 */
module.exports.setup = function() {
  r.connect({ host: dbConfig.host, port: dbConfig.port }, function (err, connection) {
    if (err) throw err
    r.dbCreate(dbConfig.db).run(connection, function(err, result) {
      if (err) {
        console.log("[DEBUG] RethinkDB database '%s' already exists (%s:%s)\n%s", dbConfig.db, err.name, err.msg, err.message)
      } else {
        console.log("[INFO ] RethinkDB database '%s' created", dbConfig.db)
      }

      dbConfig.tables.map (table => {
        r.db(dbConfig.db).tableCreate(table).run(connection, function(err, result) {
          if (err) {
            console.log("[DEBUG] RethinkDB table '%s' already exists (%s:%s)\n%s", table, err.name, err.msg, err.message)
          } else {
            console.log("[INFO ] RethinkDB table '%s' created", table)
          }
        })
      })

      r.db(dbConfig.db).table('questions').indexCreate('room').run(connection, function(err, result){
        if (err) {
          console.log("[DEBUG] RethinkDB index 'room' already exists for table 'questions' (%s:%s)\n%s", err.name, err.msg, err.message)
        } else {
          console.log("[INFO ] RethinkDB index 'room' created")
        }
      })

      r.db(dbConfig.db).table('users').indexCreate('username').run(connection, function(err, result){
        if (err) {
          console.log("[DEBUG] RethinkDB index 'username' already exists for table 'users' (%s:%s)\n%s", err.name, err.msg, err.message)
        } else {
          console.log("[INFO ] RethinkDB index 'username' created")
        }
      })
    })
  })
}

// #### Functions on `questions` table

module.exports.findQuestions = function (room, callback) {
  onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('questions').filter(r.row('room').eq(room))
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

module.exports.insertQuestion = function (question, callback) {
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

module.exports.voteQuestion = function (question_id, votes, user_id, callback) {
  onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('questions').get(question_id)
      .update({
        votes: votes,
        voted_by: r.row('voted_by').append(user_id)
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
            callback(row.new_val)
        })
    })
  })
}

module.exports.listenForEditQuestion = function (callback) {
  onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('questions').changes()
      .run(connection, function(err, cursor) {
        if (err) throw err
        cursor.each(function(err, row) {
            if (err) throw err
            console.log(JSON.stringify(row, null, 2))
            callback(row.new_val)
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
      .insert({ username: username, password: password }, { returnChanges: true })
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
            callback(result)
        })
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
