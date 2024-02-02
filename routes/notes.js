const notes = require('express').Router();

//Helper function for reading and writing to JSON file
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

//GET route for retrieving all notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);

    readFromFile('./db/db.json').then ((data) => res.json(JSON.parse(data)));
});

//Post rout for submitting a note
notes.post('/', (req, res) => {
    //Log that a POST request was received
    console.info(`${req.method} request received to submit note`);

    //Destructing for the items in req.body
    const { title, text } = req.body;

    //check if all required properties are present
    if(title && text){
        //variable being saved
        const newNote = {
            title,
            text
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote
        };

        res.json(response);
    }else{
        res.json('Error in creating note.');
    }

});

//TODO: remember to tackle delete
// notes.delete('/', (req, res) => {
//     //Log that a POST request was received
//     console.info(`${req.method} request received to submit note`);


// });

module.exports = notes;