import React, { useState, useEffect } from 'react'
import TaskData from './TaskData.js'
import MyDate from './MyDate.js'

const FormDayTwo = (props) =>{
  const [todoList, setTodoList]=useState([

    ])

  let taskList = todoList.map(task => {
    return(
      <TaskData
      field = {task.field}
      isComplete={task.isComplete}
      id={task.id}
      />
    )
  })

  const [newTask, setNewTask] = useState({
    field:""
  })

  const handleFieldChange = (event)=>{
    setNewTask({
      ...newTask,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const clearFields = (event)=>{
    event.preventDefault()
    setNewTask({
      field:""
    })
  }

  const handleTaskSubmit = (event) =>{
    event.preventDefault()
    let payload = {
      field:newTask.field,
      isCompleted:false
    }
    setTodoList([
      ...todoList,
        payload
    ])
    setNewTask({
      field:""
    })
    fetch("/api/v1/daytwo_todos", {
      method: "POST",
      body:JSON.stringify(payload),
      headers:{
        Accept:
        "application/json",
        "content-type":
        "application/json"
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
    .then((response)=>{
      return response.json()
    })
    .catch((error)=>
      {console.error("error in fetch!!!!")
    })
  }

  useEffect(()=>{
    fetch("/api/v1/daytwo_todos")
    .then((response)=>{
      if(response.ok){
        return response
      }else{
        let errorMessage = `${response.status}
        (${response.statusText})`,
        error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(body =>{
      setTodoList([
        ...body
      ])
    })
    .catch(error => console.error(`error in fetch:${error.message}`))
  }, [])

 return (
   <div className = "form-right">

   <MyDate
   day = "tomorrow"
   />

   <h2 className = "form-right-title">Day Two</h2>
     <form onSubmit = {handleTaskSubmit}>
        <label>
              <input
              name="field"
              onChange = {handleFieldChange}
              value={newTask.field}
              className="form_right_field"
              placeholder="task"
              />
         </label>
     </form>
     {taskList}
   </div>
 )
}
export default FormDayTwo
