import React, {useState} from 'react'
import TaskData from './TaskData.js'

const FormDayOne = (props) =>{

let tasksTwo = [
  {task:"get car fixed"},
  {task:"get shoes shined"}
]

let taskListTwo = tasksTwo.map(task=>{
  return(
    <TaskData
    field={task.task}
    />
  )
})

const [newTask, setNewTask] = useState({
  field:""
})

const handleFieldChange = (event)=>{
  setNewTask({
    ...newTask,
    [event.currentTarget.name]:
    event.currentTarget.value
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
   <div className = "form-left">
    <h2 className = "form-left-title">Day One</h2>
      <form>
         <label>
               <input
               name="field"
               onchange = {handleFieldChange}
               value= {newTask.field}
               className="form_left_field"
               placeholder="task"
               />
          </label>
          <input className="button_submit_it" type="submit" value="Submit"/>
      </form>
      {taskListTwo}
   </div>
 )
}
export default FormDayOne
