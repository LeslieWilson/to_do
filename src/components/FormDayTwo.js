import React, { useState } from 'react'
import TaskData from './TaskData.js'

const FormDayTwo = (props) =>{
const [todoList, setTodoList]=useState([
  {field:'take out dishes'}
])

  let taskList = todoList.map(task => {
    return(
      <TaskData
      field = {task.field}
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
    field:newTask.field
  }

  setTodoList([
    ...todoList,
      payload
  ])

  setNewTask({
    field:""
  })
}

 return (
   <div className = "form-right">
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
