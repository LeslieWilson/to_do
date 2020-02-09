import React, {useState, useEffect} from 'react'

const Notes = (props) =>{
  const [newNotes, setNewNotes] = useState({
    content:""
  })
  useEffect(()=>{
    fetch ("/api/v1/notes", {
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
    console.log(body)
    setNewNotes(
    ...body
  )
  console.log(newNotes)
  })
  .catch((error)=> {console.error("error in fetch")
  })
  }, [])

const handleFieldChange = (event)=>{
  setNewNotes({
    ...newNotes,
    [event.currentTarget.name]:
    event.currentTarget.value
  })
}
  return(
    <>
   <div className = "notes">
    <h2 className = "notes">Notes Here</h2>
    <form>
       <textarea
         name="content"
         value= {newNotes.content}
         className="notes"
         onChange = {handleFieldChange}
       />
    </form>
  </div>
  </>
  )

}
export default Notes
