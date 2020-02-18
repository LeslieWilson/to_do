import React, { useState, useEffect } from 'react'
import TaskData from './TaskData.js'
import MyDate from './MyDate.js'
import Editable from './Editable'

const FormDayTwo = (props) =>{
  const [todoList, setTodoList]=useState([])

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

  let taskList = todoList.map(task => {
    return(
      <>
      <Editable
      text = {task.field}
      isComplete = {task.isComplete}
      id = {task.id}
      type = "input"
      placeholder = "write here"
      >
      <input
      name = "field"
      value={newTask.field}
      className = "form_right_field"
      placeholder = "task"
      onChange={handleFieldChange}
      />

      </Editable>

      <TaskData
      field = {task.field}
      isComplete={task.isComplete}
      id={task.id}
      />
      </>
    )
  })

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
     {taskList}
   </div>
 )
}
export default FormDayTwo
