import React, {useState} from 'react'
import TaskData from './TaskData.js'

const FormDayOne = (props) =>{
const [todoList, setTodoList] = useState([
  {field:"get car fixed"}
])
const [crossOut, setCrossOut] = useState('notCrossedOut')
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




const crossOutClick = (event, i)=>{
  event.preventDefault()
  if(crossOut === 'notCrossedOut'){
    setCrossOut('crossedOut')
  }else if(crossOut === 'crossedOut'){
    setCrossOut("notCrossedOut")
  }
}

let taskList = todoList.map((task, i) =>{
  return(
    <TaskData
    field={task.field}
    crossOut = {crossOut}
    onClick = {crossOutClick}
    />
  )
  console.log(todoList)
})


function toggleTodoCompleteAtIndex(index) {
    const temporaryTodos = [...todoList];
    temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
    setTodoList(temporaryTodos);
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
      </form>
      {taskList}
   </div>
 )
}
export default FormDayOne
