const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");

getNotes().forEach((note)=>{ //each note one by one
  const noteEl = createNoteEl(note.id, note.content);
  appEl.insertBefore(noteEl, btnEl);
});

function createNoteEl(id, content){
  console.log(id, content);
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Empty note";
  element.value = content;
  element.addEventListener("dblclick", ()=>{
    const warning = confirm("Do you want to delete this note?");
    if(warning){
      deleteNote(id, element);
    }
  })

  element.addEventListener("input", ()=>{
    updateNote(id, element.value);
  });

  return element;
}

function addNote(){
  const notes = getNotes();

  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };
  const noteEl = createNoteEl(noteObj.id, noteObj.content);
  appEl.insertBefore(noteEl, btnEl); //add noteEl before btnEl

  notes.push(noteObj);

  saveNote(notes);
}

function deleteNote(id, element){
  const notes = getNotes().filter((note)=>note.id != id); //keep all notes except for the one that is supposed to be deleted
  saveNote(notes);
  appEl.removeChild(element); //to remove note instantly
}

function updateNote(id, content){
  const notes = getNotes();
  const target = notes.filter((note)=>note.id == id)[0]; //exact note
  target.content = content;
  saveNote(notes);
}

function saveNote(notes){
  localStorage.setItem("note-app", JSON.stringify(notes));
}

function getNotes(){ //will get notes that are already in a local storage
  return JSON.parse(localStorage.getItem("note-app") || "[]")
  //we want to get everything which is inside note-app
}

btnEl.addEventListener("click", addNote);