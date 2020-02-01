import React, {useState, useEffect} from 'react'
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
  }

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
      let info = JSON.stringify(body)
      setTodoList([
        info
      ])
    })
    .catch((error)=> {console.error("error in fetch")
  })
})

  let taskList = todoList.map((task, i) =>{
    function toggleTodoCompleteAtIndex(){
      const tempTodos = [...todoList]
      tempTodos[i].isCompleted =!tempTodos[i].isCompleted
      setTodoList(tempTodos)
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
