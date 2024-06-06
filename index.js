const express = require("express");
const morgan = require("morgan");

const userRouter = require("./src/router/auth.router");
const phrasesRouter = require("./src/router/phrases.router");
const connection = require("./db_manager");

const app = express()

app.use(express.json())
app.use("/api", userRouter)
app.use("/api", phrasesRouter)
app.use(morgan("dev"))

app.listen(3000, async () => {
    try {
        await connection.authenticate();
        await connection.sync();
        console.log('Connection has been established successfully.');
        console.log(`Server is running on port 3000`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})

app.get('/', (req, res) => {
    return res.send({ "message": "Hello World!" })
})