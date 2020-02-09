import React, {useState, useEffect} from 'react'
import TaskData from './TaskData.js'

const FormDayOne = (props) =>{
  const [todoList, setTodoList] = useState([
    {field:"",
    isCompleted:false,
    id: ""}
  ])

  const [newTask, setNewTask] = useState({
    field:""
  })

  useEffect(()=>{
    fetch("/api/v1/todos", {
      method: "GET",
      headers:{
        Accept: "application/json",
        "content-type": "application/json"
      }
    })
    .then(response => {
      if (response.ok){
        return response;
      }else{
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body=>{
      setTodoList([
      ...body
    ])
    })
    .catch((error)=> {console.error("error in fetch")
  })
}, [])

  const handleFieldChange = (event)=>{
    setNewTask({
      ...newTask,
      [event.currentTarget.name]:
      event.currentTarget.value
    })
  }

  const handleContactSubmit = (event) =>{
    event.preventDefault()
    let payload = {
      field:newTask.field,
      isCompleted:false
    }
    setTodoList([
      ...todoList,
      payload
    ])

fetch("/api/v1/todos", {
  method: "POST",
  body: JSON.stringify(payload),
  headers:{
    Accept:"application/json",
    "content-type": "application/json"
  }
})
.then(response => {
  if(response.ok){
    return response;
  }else{
    const errorMessage =
    `${response.status}
    (${response.statusText})`
    const error = new Error(errorMessage)
    throw(error)
  }
})

.then(response => response.json())
.then(body=>{
setTodoList([...body])
})

.catch((error) =>{console.error("error in fetch!")
})
    setNewTask({
      field:""
    })
  }

  let taskList = todoList.map((task, i) =>{
    function toggleTodoCompleteAtIndex(){
      const tempTodos = [...todoList]
      tempTodos[i].isCompleted =!tempTodos[i].isCompleted
      setTodoList(tempTodos)

      fetch("/api/v1/todos/" + task.id,{
        method:"PATCH",
        headers:{
          Accept: "application/json",
          "content-type": "application/json"
        }
      })
      .then(response =>{
        if(response.ok){
          return response;
        }else{
          const errorMessage =
          `${response.status}
          (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }
      })
      .catch((error)=>{console.error("error is fetch!!!")
    })
    }

    return(
      <TaskData
      field={task.field}
      isCompleted = {task.isCompleted}
      onClick = {toggleTodoCompleteAtIndex}
      />
    )
  })

  return(
   <div className = "form-left">
    <h2 className = "form-left-title">Day One</h2>
    <form onSubmit ={handleContactSubmit}>
     <label>
       <input
         name="field"
         onChange = {handleFieldChange}
         value= {newTask.field}
         className="form_left_field"
         placeholder="task"
       />
      </label>
    </form>
    {taskList}
  </div>
  )
}
export default FormDayOne
