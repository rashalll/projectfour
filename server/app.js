const express = require('express')
const http = require('http')
const morgan = require('morgan')
require('dotenv').config()
const bodyparser = require('body-parser')
const cors = require('cors')
const Websocket = require('ws')
const accountsRoutes = require('./routes/accountRoutes')
const blogRoutes = require('./routes/blogsRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
const PORT = process.env.PORT || 3000
//middleware
app.use(morgan('dev'))

app.use(bodyparser.json())

app.use(
    cors({
        origin: ["http://127.0.0.1:5500", "https://ClassWork/projectfour/login.html"],
        Credentials: true
    })
)
app.use('/accounts', accountsRoutes)
app.use('/blogs', blogRoutes)
app.use('/user', userRoutes)

const server = http.createServer(app)

const wss = new Websocket.server({ server });

wss.on('connection', (ws) => {
    console.log('connection Established')
});

ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`${message}`)
});

ws.on('close', () => {
    console.log(`Websocket disconnected:`);
});
server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})