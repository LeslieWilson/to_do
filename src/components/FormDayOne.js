import React, {useState} from 'react'
import TaskData from './TaskData.js'

const FormDayOne = (props) =>{
const [todoList, setTodoList] = useState([
  {field:"get car fixed"}
])

let taskListTwo = todoList.map(task=>{
  return(
    <TaskData
    field={task.field}
    />
  )
  console.log(todoList)
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

  setTodoList([
    ...todoList,
    payload
  ])

  setNewTask({
    field:""
  })
}

 return (
   <div className = "form-left">
    <h2 className = "form-left-title">Day One</h2>
      <form onSubmit = {handleContactSubmit}>
         <label>
               <input
               name="field"
               onChange = {handleFieldChange}
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
