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

app.post('/players/', async (request, response) => {
  const playerDetails = request.body
  const {player_id, player_name, jersey_number, role} = playerDetails
  const updatePlayerDetails = `INSERT INTO cricket_team (player_id, player_name, jersey_number, role) VALUES ('${player_id}', '${player_name}', '${jersey_number}', '${role}')`
  const dbResponse = await db.run(updatePlayerDetails)
  const playerId = dbResponse.lastID
  response.send(`Player Added to Team`)
})

