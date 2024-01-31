const notes = require('express').Router();

//Helper function for reading and writing to JSON file
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

//GET route for retrieving all notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);

    readFromFile('/db/db.json').then ((data) => res.json(JSON.parse(data)));
});

//Post