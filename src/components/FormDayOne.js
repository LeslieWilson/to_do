import React, {useState, useEffect} from 'react'
import TaskData from './TaskData.js'

const FormDayOne = (props) =>{

// making a placeholder for something called field and something called iscompleted to be one entry in a stateful todolist. whenever anything in the list gets changed you'd rerender the page with usestate.
  const [todoList, setTodoList] = useState([
    {field:"",
    isCompleted:false,
    id: ""}
  ])

// this is storing what is typed in the field as you set a new task, whenever anything gets typed in the field you change the state
  const [newTask, setNewTask] = useState({
    field:""
  })

// this is setting whats typed to be stored in newTask (which is a dictionary with field:"")
  const handleFieldChange = (event)=>{
    setNewTask({
      ...newTask,
      [event.currentTarget.name]:
      event.currentTarget.value
    })
  }

// you're making a new entry in todolist and iscomplete starts as false, field is whatever is stored in newtask. you're setting it all to payload

 // settodolist is adding the payload to todolist using object destructuring because todolist is an array of hashes

 // setNewTask clears the field

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

 // I defined this api in my rails server and upon pageload is fetching from it using get method, its receiving right now a list with one item in it.
 //
 // headers are indicating what it will accept

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

    //
    // this is turning the information you sucessfully got from a response object into a json object. setting it to variable body, setting body to be a json string. setting todolist to be whatever info is because info is already an array of hashes.

    .then(response => response.json())
    .then(body=>{
      console.log(body)
      setTodoList([
      ...body
    ])
     console.log(todoList)


    })
    .catch((error)=> {console.error("error in fetch")
  })
}, [])



//
// mapping through whatever is in todo list and adding an index, setting whatever is in todolist to a variable temp todolist. looking at an item at index[i], looking at the iscomplete status which starts as false, setting it equel to the opposit which would be true. if already true setting it to false. setting todolist to whatever temptodos equels.

// you cant use the getter to change the variables stored in state. todolist just gets the items, you cant say  todolist.iscompleted = false. you need to copy it, change the copy, use setter to set whatever new value is.

  let taskList = todoList.map((task, i) =>{
    function toggleTodoCompleteAtIndex(){
      const tempTodos = [...todoList]
      tempTodos[i].isCompleted =!tempTodos[i].isCompleted
      setTodoList(tempTodos)

      fetch("/api/v1/todos/" + task.id,{
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

      .then(response => response.json())
      .then(body=>{
        setTodoList([...body])
      })

      .catch((error)=>{console.error("error is fetch!!!")
    })


    }

    return(
      <TaskData
      field={task.field}
      isCompleted = {task.isCompleted}
      onClick = {toggleTodoCompleteAtIndex}
      id = {task.id}
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
