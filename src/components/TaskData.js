import React from 'react'

const TaskData = props =>{
    if(props.isCompleted === true){
      let theTask = "crossedOut"
    }else{
      let theTask = "notCrossedOut"
    }
    }
  return(
    <div className={theTask} onClick ={props.onClick}>
    <p>{props.field}</p>
    </div>
  </div>
  )
}

export default TaskData


onClick={() => toggleTodoCompleteAtIndex(i)}

so to change that one particular thing immidiatly in their browser you give it state and its stored temporarily in their browser and the information is at the same time sent to the server via a fetch call and the server is updated with this new information so when you return, componentdidmount will fire and get this information from the server and put it back into state and this is how it has persisted. instead of componentdidmount we are using useeffect.

the component didmount also saves that same thing to the server at the sametime?

i think i like reading it better yeah can you type what lifecycle methods do

im just talking about componentDidMount -
It is commonly used to fetch whatever data is stored on t he server to populate state whenever a page or component is loaded - then your handlesubmit will both update the state and send it to your server, then when the page refreshes or is browsed away from and back to - componentDidMount will fire again and get the information stored on the server to populate state ahgain
so like once a react app is pushed up, when state cchanges, it changes on the browser of whoever is viewing it, and its saved in THEIR temporary memory in their browser but if i wanted the state not to go away on page refresh, and you'd use rails so it woulden't go away on page refresh. state will ALWAYS go away on page refresh but you have event things that happen on pageload. componentDidMount

can you just type that here so i can read it instead of ...hearing you - code runs on their browser - this is saved in temporary memory in their browser - goes away on page refresh - NO SERVER
