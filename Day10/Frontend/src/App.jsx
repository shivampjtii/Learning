import { useEffect, useState } from 'react';
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([{}]);

  async function featch(){
    const res = await axios.get("http://localhost:3000/notes")
    setNotes(res.data.notes);
  }

  featch();

  async function formHandler(e){
    e.preventDefault();
    const {title, description} = e.target.elements;

    await axios.post("http://localhost:3000/notes",{
      title:title.value,
      description:description.value
    })

    title.value = "";
    description.value = "";

    featch();
  }


  useEffect(() => {
    featch();
  }, [])

  async function deleteHandler(noteId){
    await axios.delete("http://localhost:3000/notes/"+noteId);
    console.log(noteId)
    featch();
  }


  async function updateHandler(noteId){
    const description = prompt("Enter the Description");
    await axios.patch("http://localhost:3000/notes/"+noteId,{description});
    featch();
  }
  

  return (
    <>
      <form onSubmit={formHandler}>
        <input type="text" placeholder='Title' name='title' required/>
        <input type="text" placeholder='Description' name='description' required/>
        <button id='create-note'>Create Note</button>
      </form>
      <div className="notes">
        {notes.map((note,index)=>{
          return (
            <div className="note" key={index}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button id='Delete' onClick={()=>deleteHandler(note._id)}>Delete</button>
              <button id='Update' onClick={()=>updateHandler(note._id)}>Update</button>
           </div>
          )
        })}
        
      </div>
    </>
  )
}

export default App
