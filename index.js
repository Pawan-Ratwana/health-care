const express = require('express');
const app = express();
const port = 8000;

const db = require('./config/mongoose')

app.use('/', require('./routes'))

// app.get('/', (req, res) => {
//     res.send("<h1>Hello</h1>")
// })




app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is running on http://localhost:${port}`)
    }
})