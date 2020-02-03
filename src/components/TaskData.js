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
    <p className={theTask}>{props.field}</p>
    </div>
  )
}

export default TaskData
