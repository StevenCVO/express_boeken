const express = require("express");
const boeken = require("../boekenlijst");

const router = express.Router();

router.get("/", (req, res) => {
    return res.send(boeken);    
});

router.get("/:id", (req, res) => {
    const gevondenBoek = boeken.find(boek => {
        // if (boek.id === +req.params.id) {
        //     return true;
        // } else {
        //     return false;
        // }

        // Zelfde als
        return boek.id === +req.params.id;
    });

    if (!gevondenBoek) {
        // Boek niet gevonden, is undefined
        return res.status(404).send(`Boek met id ${req.params.id} niet gevonden.`);
    }

    // Boek wel gevonden, terugsturen
    return res.send(gevondenBoek);    
});

router.post("/", (req, res) => {
    // Json data zit in req.body object
    const data = req.body;

    // Zoek naar hoogste id
    const laatsteId = boeken[boeken.length - 1].id;

    // Tel 1 op bij hoogste id om unieke te houden
    data.id = laatsteId + 1;
    
    // Voeg nieuw boek toe aan lijst boeken
    boeken.push(data);
    
    // Stuur het nieuw toegevoegde boek terug naar aanvrager
    return res.send(data);
});

router.delete("/:id", (req, res) => {
    const gevondenBoekIndex = boeken.findIndex(boek => {
        return boek.id === +req.params.id;
    });

    if (gevondenBoekIndex === -1) {
        return res.status(404).send(`Boek met id ${req.params.id} niet gevonden.`);
    }

    boeken.splice(gevondenBoekIndex, 1);

    return res.send(`Boek met id ${req.params.id} werd verwijderd.`);
});

router.put("/:id", (req, res) => {
    const data = req.body;
    
    const gevondenBoek = boeken.find(boek => {
        return boek.id === +req.params.id;
    });

    if (!gevondenBoek) {
        return res.status(404).send(`Boek met id ${req.params.id} niet gevonden.`);
    }

    // Zoek de index van het gevonden boek in de array via indexOf()
    const boekIndex = boeken.indexOf(gevondenBoek);

    // Vervang in de array een bestaand object met een nieuw object
    // Het nieuwe object bevat de eigenschappen van het bestaande
    // samengevoegd met de eigenschappen van het doorgestuurde object
    boeken.splice(boekIndex, 1, { ...gevondenBoek, ...data });

    return res.send(boeken[boekIndex]);    
})


module.exports = router;