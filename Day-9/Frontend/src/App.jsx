import { useState } from 'react'
import axios from 'axios';

function App() {

  
  
  const [note, setNote] = useState([
    {
      title: "test title 1",
      description: "test description 1"
    },
    {
      title: "test title 1",
      description: "test description 1"
    },
    {
      title: "test title 1",
      description: "test description 1"
    },
    {
      title: "test title 1",
      description: "test description 1"
    },
    {
      title: "test title 1",
      description: "test description 1"
    }

  ])

   axios.get('http://localhost:3000/api/notes') 
  .then((res)=>{
    setNote(res.data.notes)

  })
  return (
    <div className="notes">
      {note.map((note, idx) => {
        return <div key={idx} className="note">
          <h2>{note.title}</h2>
          <p>{note.description}</p>
        </div>
      })}

    </div>
  )
}

export default App
