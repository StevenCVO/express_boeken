const express = require('express');
const cors = require('cors');
const boeken = require('./routes/boeken');

const app = express();

const port = process.env.PORT || 7000;

app.use(cors());

// Routes
app.use("/boeken", boeken);

app.listen(port, () => {
    console.log(`Server luistert op poort ${port}`);    
});