const notes = require('express').Router();

//Import uuid file
const uuid = require('../helpers/uuid');

//Helper function for reading and writing to JSON file
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

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
            text,
            note_id: uuid(),
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
notes.delete('/:note_id', async (req, res) => {
    try {
      // Log that a DELETE request was received
      console.info(`${req.method} request received to delete note`);
  
      const id = req.params.note_id;
      const data = await readFromFile('./db/db.json');
      const notes = JSON.parse(data);
  
      const index = notes.findIndex((note) => note.note_id === id);
  
      if (index !== -1) {
        notes.splice(index, 1);
        await writeToFile('./db/db.json', notes);
        res.json('Note DELETED Successfully!');
      } else {
        res.status(404).json({ error: 'Note not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to Delete Note' });
    }
  });

module.exports = notes;