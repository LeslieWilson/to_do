import React, {useState, useEffect} from 'react'
import TaskData from './TaskData.js'
import MyDate from './MyDate.js'

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

  let deleteTask=(id)=>{
  fetch("/api/v1/todos/" + id,{
    method:"DELETE",
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

  let toggleTodoCompleteAtIndex=(i)=>{
    const tempTodos = [...todoList]
    tempTodos[i].isCompleted =!tempTodos[i].isCompleted
    setTodoList(tempTodos)
    let obj = tempTodos.find(obj => obj.id === 3);
    if(obj){
    fetch("/api/v1/todos/" + i,{
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
    .catch((error)=>{console.error("error in fetch!!!")
  })
  }
}

  let taskList = todoList.map((task, i) =>{
    return(
      <TaskData
      field={task.field}
      isCompleted = {task.isCompleted}
      onClick = { () => {
        toggleTodoCompleteAtIndex(task.id)
      }}
      deleteTask= { () => {
	      deleteTask(task.id);
      }}
      id = {task.id}
      />
    )
  })

  return(
   <div className = "form-left">
    <MyDate
    day = "today"/>
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
