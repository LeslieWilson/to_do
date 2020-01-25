import React, {useState} from 'react'
import TaskData from './TaskData.js'

const FormDayOne = (props) =>{

// theres going to be a field or multiple with a field and iscompleted variable, setting the state
const [todoList, setTodoList] = useState([
  {field:"",
  isCompleted:false}
])

// this is storing what is typed in state, last thing before you see it on page
const [newTask, setNewTask] = useState({
  field:""
})

// this is setting whats typed to be stored in state, field:""
const handleFieldChange = (event)=>{
  setNewTask({
    ...newTask,
    [event.currentTarget.name]:
    event.currentTarget.value
  })
}

// this is setting the payload to equel whatever was typed into the field in first part. payload is the connection between newtask and todolist because setting payload to newtask.field. settodolist is adding the payload to todolist, then setNewTask clears the field. accessing the newtask hash and then .field gives you the value of the hash

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


// im mapping through todoList and this makes a new set of data, im setting it to tasklist. im mapping through and getting a task and index for each task and Im returning the component taskdata. < /> is how you create the html. this function is returning multiples of taskdata with the information inside the carrots and saving it to tasklist which you are rendering below. thats why you're not just rendering <TaskData />, because you need to render multiples. map is spreading out whats already there. Taskdata is getting set to have props. Task.field is coming from, todolist is getting mapped thru and each task has two key value pairs and you're accessing field.

function toggleTodoCompleteAtIndex(index) {
    const temporaryTodos = [...todoList];
    temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
    setTodoList(temporaryTodos);
  }

let taskList = todoList.map((task, i) =>{
  return(
    <TaskData
    field={task.field}
    isCompleted = {task.isCompleted}
    onClick = {()=>toggleTodoCompleteAtIndex(i)}
    />
  )
})


 return (
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
