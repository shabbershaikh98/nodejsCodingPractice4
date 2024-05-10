const sqlite3 = require('sqlite3')
const {open} = require('sqlite')
const express = require('express')
const path = require('path')
const app = express()
let db = null

const dbpath = path.join(__dirname, 'cricketTeam.db')

const initializeDb = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })
    app.listen(3000)
  } catch (e) {
    console.log(`${e.message}`)
    process.exit(1)
  }
}

initializeDb()
app.get('/players/', async (request, response) => {
  const getPlayersQuery = `select * from cricket_team`
  const playersArray = await db.all(getPlayersQuery)
  response.send(playersArray)
})
