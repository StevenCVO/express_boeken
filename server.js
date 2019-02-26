const express = require('express');
const cors = require('cors');
const boeken = require('./routes/boeken');

const app = express();

const port = process.env.PORT || 7000;

app.use(cors());

// Als een JSON object met request wordt meegestuurd
// Steek het object in req.body
app.use(express.json());

// Routes
app.use("/boeken", boeken);

app.listen(port, () => {
    console.log(`Server luistert op poort ${port}`);    
});