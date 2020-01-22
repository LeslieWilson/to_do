import React, { useState } from 'react'
import TaskData from './TaskData.js'

const FormDayTwo = (props) =>{

  let tasks = [
    {task:"get bread"},
    {task:"get milk"}
  ]

  let taskList = tasks.map(task =>{
    return(
      <TaskData
      field = {task.task}
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

const handleContactSubmit = (event) =>{
  event.preventDefault()
  let payload = {
    field:newTask.field
  }
  setNewTask({
    field:""
  })
}

 return (
   <div className = "form-right">
   <h2 className = "form-right-title">Day Two</h2>
     <form onSubmit = {handleContactSubmit}>
        <label>
              <input
              name="field"
              onChange = {handleFieldChange}
              value={newTask.field}
              className="form_right_field"
              placeholder="task"
              />
         </label>
         <input className="button_submit_it" type="submit" value="Submit"/>
     </form>
     {taskList}
   </div>
 )
}
export default FormDayTwo
