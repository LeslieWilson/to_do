import React from 'react'

const TaskData = props =>{
  let theTask
  if(props.isCompleted === true){
    theTask = "crossedOut"
  }else{
    theTask = "notCrossedOut"
  }

  return(
    <div onClick ={props.onClick}>
    <button onClick= {props.deleteTask}>delete</button>
    <p className={theTask}>{props.field}</p>
    </div>
  )
}

export default TaskData


// tried comparing to old one, taskdata should be working if I take out the button because they are sharing a div, tried making each in theri own div for the click, still getting cannot  read property 'iscomplete' of undefined, tried looking this up https://stackoverflow.com/questions/48421066/typeerror-cannot-read-property-iscompleted-of-undefined-react-simple-todo-a. they said to return the todos, I tried returning TempTodos in formdayone, did not do anything.wondered if I should structure iscomplete like toggletodocomplete where it's being passed to tasklist, but cant. dont really know how to use this:
// let obj = array.find(obj => obj.id === 3); but I think it  goes in the toggle todo complete at index function to  make it so you're only togging if the task at index can be found? tried putting it in there...
