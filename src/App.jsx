import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState("");
  const [toDo, setToDo] = useState([]);
  const [progress, setProgress] = useState([]);
  const [doneTask, setDoneTask] = useState([]);
  const [suspend, setSuspend] = useState([]);
  const [editing, setEditing] = useState("");
  const [editAll, setEditAll] = useState(null);
  
  
  const addTodo = (input) => {
    const newInput = input.trim()
    if (!newInput) {
      return
    }

    toDo.push(input);
    setToDo([...toDo])
    setInput("")
    
   }
  
  const handleProgress = (index) => {
      progress.push(toDo[index])
      setProgress([...progress])
      toDo.splice(index, 1);
  
  }

  const handleDelete = (index) => {
    toDo.splice(index, 1);
    setToDo([...toDo])
  }

  const handleSuspend = (index) => {
    suspend.push(progress[index])
      setSuspend([...suspend])
      progress.splice(index, 1);
  
  }

  const handleDeletePro = (index) => {
    progress.splice(index, 1);
    setProgress([...progress])
  }

  const handleDone = (index) => {
    doneTask.push(progress[index])
    setDoneTask([...doneTask])
    progress.splice(index, 1)
  }

  const handleDeleteDone = (index) => {
    doneTask.splice(index, 1);
    setProgress([...progress])
  }

  const handleUndo = (index) => {
    progress.push(suspend[index])
    setProgress([...progress])
    suspend.splice(index, 1)
  }
  const handleEdit = (index) => {
    toDo[index] = editing
    setToDo([...toDo])
    setEditAll(null)
  }

  return (
    <div>
      <div className='d-flex gap-3 '>
        <input type="text" placeholder='Enter a Task' className='form-control mt-3 w-50 ms-4' value={input} onChange={(e)=>setInput(e.target.value)} />
        <button className='btn btn-info h-25 mt-3'onClick={()=>addTodo(input)}>Add Todo</button>
      </div>
      <main className="d-flex gap-3 w-100 mt-4 p-3">
      <div className='h w-25 bg-info p-2'>
          <h3>TODO</h3>
          {
            toDo.map((value, index) => 
              <div className='w-20 bg-light p-2 rounded-2 mt-4 d-flex justify-content-between' draggable key={index}>
                
                {
                  editAll === index ? <input type="text" placeholder='Enter a Task' className='form-control' value={editing} onChange={(e)=>setEditing(e.target.value) }/> :
                    
                    <span>{value}</span>
                  }

                <span className='d-flex gap-1'>
                  <button className='btn btn-sm btn-info' title='Start' onClick={() => handleProgress(index)}>👉</button>
                  {
                    editAll === index ?  <button className='btn btn-sm btn-secondary' title='Submit' onClick={() => handleEdit(index)}>✔️</button> :
                    <button className='btn btn-sm btn-secondary' title='Edit' onClick={() => setEditAll(index)}>🖊</button>
                      
                  }
                  
                  <button className='btn btn-sm btn-danger' title='Delete' onClick={()=>handleDelete(index)}>🗑</button>
                </span>
              </div>
            )
          }
      </div>
      <div className='h w-25 bg-danger p-2'>
          <h3>IN PROGRESS</h3>
          {
            progress.map((value, index) => 
              <div className='w-20 bg-light p-2 rounded-2 mt-4 d-flex justify-content-between' draggable key={index}>
                <span>{value}</span>
                <span className='d-flex gap-1'>
                  <button className='btn btn-sm btn-warning' title='Suspend' onClick={()=>handleSuspend(index)}>⚠️</button>
                  <button className='btn btn-sm btn-danger' title='Delete' onClick={()=>handleDeletePro(index)}>🗑</button>
                  <button className='btn btn-sm btn-success' title='Done' onClick={()=>handleDone(index)}>✓</button>
                </span>
                
              </div>
            )
          }
      </div>
      <div className='h w-25 bg-success p-2'>
          <h3>COMPLETED</h3>
          {
            doneTask.map((value, index) => 
              <div className='w-20 bg-light p-2 rounded-2 mt-4 d-flex justify-content-between' draggable key={index}>
                <span>{value}</span>
                <span className='d-flex gap-2'>
                  <button className='btn btn-sm btn-warning' title='delete' onClick={()=>handleDeleteDone(index)}>🗑</button>
                </span>
              </div>
            )
          }
      </div>
      <div className='h w-25 bg-secondary p-2'>
          <h3>SUSPENDED</h3>
          {
            suspend.map((value, index) => 
              <div className='w-20 bg-light p-2 rounded-2 mt-4 d-flex justify-content-between' draggable key={index}>
                <span>{value}</span>
                <span className='d-flex gap-1'>
                  <button className='btn btn-sm btn-warning' title='undo' onClick={()=>handleUndo(index)}>👈</button>
                </span>
              </div>
            )
          }
      </div>
    </main>
    </div>
  )
}

export default App
