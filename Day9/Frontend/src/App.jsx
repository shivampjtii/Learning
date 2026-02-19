import { useEffect, useState } from 'react'
import axios from "axios";

function App() {

  const [note, setNote] = useState([{}])

  async function fet(){
    const res = await axios.get("http://localhost:3000/notes");
    setNote(res.data.notes);
  }

  async function formHandler(e){
    e.preventDefault();
    const {title, description} = e.target.elements;

    await axios.post("http://localhost:3000/notes",{
      title:title.value,
      description:description.value
    })
    fet();
  }

  useEffect(() => {
      fet();
  }, [])

  async function upd(noteId){
    const description = prompt("Enter new description");
    await axios.patch("http://localhost:3000/notes/"+noteId,{
      description
    })
    fet();
  }
  
  async function deletee(noteId){
    console.log(noteId);
    
    await axios.delete("http://localhost:3000/notes/"+noteId);
    await fet()
  }

  return (
    <>
      <form className="inputF" onSubmit={formHandler}>
        <input type="text" name="title" id="title" placeholder='Title'/>
        <input type="description" name="description" id="description" placeholder='Description'/>
        <button>Add</button>
      </form>
      <div className="notes">
          {
            note.map((notes,index)=>{
                  return (<div className="note" key={index}>
                      <h1>{notes.title}</h1>
                      <p>{notes.description}</p>
                      <button id='del' onClick={()=>deletee(notes._id)}>Delete</button>
                      <button id='update' onClick={()=>upd(notes._id)}>Update</button>
                  </div>)
            })
          }
      </div>
    </>
  )
}

export default App
