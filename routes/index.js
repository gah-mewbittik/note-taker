const router = require('express').Router();

//import files containing the routes
const notesRouter = require('./notes');

router.use('/notes', notesRouter);

module.exports = router;