import { useState, useEffect } from 'react'
import axios from 'axios';

function App() {



  const [note, setNote] = useState([])

  function fetchNotes() {
    axios.get('https://backend-cohort-2-0.onrender.com/api/notes')
      .then((res) => {
        setNote(res.data.notes)
      })
  }

  useEffect(() => {
    fetchNotes();
  }, [])

  function handleSubmit(e) {
    e.preventDefault();

    const { title, description } = e.target.elements

    console.log(title.value, description.value)

    axios.post('https://backend-cohort-2-0.onrender.com/api/notes', {
      title: title.value,
      description: description.value
    })
      .then((res) => {
        console.log(res.data)
        fetchNotes();
      })

  }

  function handleDeleteNote(noteId) {
      axios.delete('https://backend-cohort-2-0.onrender.com/api/notes/'+noteId)
      .then((res)=>{
        console.log(res.data)
        fetchNotes()
      })

  }

  function handleUpdateNote(noteId){
    console.log(noteId)

    axios.patch('https://backend-cohort-2-0.onrender.com/api/notes/'+noteId,{
      description: 'modified description 2'
    })
    .then((res)=>{
      console.log(res.data)
      fetchNotes();
    })
  }


  return (
    <>
      <form className="note-created-form" onSubmit={handleSubmit}>
        <input name='title' type="text" placeholder='Enter title' />
        <input name='description' type="text" placeholder='Enter description' />
        <button>create note</button>
      </form>
      <div className="notes">
        {note.map((note, idx) => {
          return <div key={idx} className="note">
            <h2>{note.title}</h2>
            <p>{note.description}</p>
            <button onClick={() => { handleDeleteNote(note._id) }}>delete</button>
            <button onClick={()=>{handleUpdateNote(note._id)}}>update</button>
          </div>
        })}

      </div>
    </>
  )
}

export default App
