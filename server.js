const express = require('express');
const path = require('path');
const fs = require('fs');
const allNotes = require('./db/db.json');

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/api/notes', (req,res) =>
 res.json(allNotes.slice(1))
);

 // GET Route for homepage
 app.get('./', (req,res) =>
 res.sendFile(path.join(__dirname, '/public/index.html'))
 );

 // GET Route for notes page
 app.get('/notes', (req,res)=>
 res.sendFile(path.join(__dirname,'/public/notes.html'))
 );

 app.get('*', (req,res) =>
 res.sendFile(path.join(__dirname,'/public/index.html'))
 );

 // Creating the new note
 function addNewNote(body, notesArray){
  console.log(body, "body");
  console.log(notesArray,"notesArray");
    const newNote = body;
    if(!Array.isArray(notesArray))
      notesArray = [];
      newNote.id = notesArray.length + 1;
     console.log(body); 
      notesArray.push(newNote);
     // Write the new note to a file
    fs.writeFileSync(path.join(__dirname, './db/db.json'),
    // Convert the data to a string so we can save it
      JSON.stringify(notesArray, null, 2)
    );
    return newNote;  
 }
 // POST request to add new note
 app.post('/api/notes', (req,res) => {
   const newNote = addNewNote(req.body, allNotes);
   res.json(newNote);
 })
   
 //Deleting the note
 function deleteNote(id, notesArray){

   for(let i=0; i<notesArray.length; i++){
     let note = notesArray[i];
      if(note.id == id){
         notesArray.splice(i, 1);
         fs.writeFileSync(path.join(__dirname, './db/db.json'),
         // Convert the data to a string so we can save it
          JSON.stringify(notesArray, null, 2));
          break;
      }
   }
 }
 // Delete request for a note based on id
 app.delete('/api/notes/:id', (req, res) =>{
   deleteNote(req.params.id, allNotes);
   res.json(true);
 });

 //It binds and listens to the connections on the specified host and port
 app.listen(PORT, () =>
  console.log(`App listening at http:localhost:${PORT} 🚀`)
 )