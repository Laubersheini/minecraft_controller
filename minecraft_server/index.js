const express = require('express')
const app = express()

const exec = require("child_process").exec

port = 8080

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/start_server', (req, res) => {

  exec("minecraftd start")
  res.send('starting')
})


app.get('/server_state', (req, res) => {
  exec("minecraftd status", (err, stdout, stderr) => {

    res.send(stdout.split("\n")[0])
  })
})

app.get("/stop_server", (req, res) => {
  exec("minecraftd stop")
  res.send("stopping")
})

app.get("/shutdown_server", (req, res) => {
  exec("sudo systemctl poweroff")
})

app.get("/restart_server", (req, res) => {
  exec("minecraftd restart")
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
