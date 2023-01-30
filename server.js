const express = require('express');
const path = require('path');
const fs = require('fs');
const allNotes = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/api/notes', (rew,res) =>
 res.json(allNotes.slice(1))
);

 app.get('./',(req,res) =>
 res.sendFile(path.join(__dirname, '/public/index.html'))
 );

 app.get('/notes',(req,res)=>
 res.sendFile(path.join(__dirname,'/public/notes.html'))
 );

 app.get('*', (req,res) =>
 res.sendFile(path.json(__dirname,'/public/index.html'))
 );

 function addNewNote(body, notesArray){
    const newNote = body;
    if(!Array.isArray(notesArray))
      notesArray = [];
    if(notesArray.length === 0)
    notesArray.push(0);
    body.id = notesArray[0];
    notesArray[0]++;
    notesArray.push(newNote);
    fs.writeFileSync(path.join(__dirname, './db/db.json'),
      JSON.stringify(notesArray, null, 2)
    );
    return newNote;  
 }

 app.post('/api/notes', (req,res) => {
   const newNote = addNewNote(req.body, allNotes);
   res.json(newNote);
 })
   
 function deleteNote(id, notesArray){
   for(let i=0; i<notesArray.length; i++){
     let note = notesArray[i];

      if(note.id == id){
         notesArray.splice(i, 1);
         fs.appendFileSync(path.json(__dirname, './db/db.json'),
          JSON.stringify(notesArray, null, 2));
          break;
      }
   }
 }
 
 app.delete('/api/notes/:id', (req, res) =>{
   deleteNote(req.params.id, allNotes);
   res.json(true);
 });

 app.listen(PORT, () =>
  console.log(`App listening at http:localhost:${PORT} 🚀`)
 )