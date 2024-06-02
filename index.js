const express = require("express");

const app = express()

app.use(express.json())

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

app.get('/', (req, res) => {
    const status = {
        "status": "success"
    }
    res.send(status);
})