import React from 'react'

const TaskData = props =>{
    console.log(props.crossOut)
    if(props.isCompleted === true){
      let banana = "crossedOut"
    }else{
      let banana = "notCrossedOut"
    }
    }
  return(
    <div className={banana} onClick ={props.onClick}>
    <p>{props.field}</p>
    </div>
  </div>
  )
}

export default TaskData
