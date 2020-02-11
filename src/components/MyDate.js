import React, {useState, useEffect} from "react";

const MyDate = (props)=>{
  const[date, setDate] = useState(
    ""
  )

  let getDate = () => {
    if(props.day == "today"){
      var date = new Date().toDateString()
      setDate(date)
      }else{
      var tomorrowsDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toDateString()
      setDate(tomorrowsDate)
    }
  }

  useEffect(()=> {
    getDate();
  }, [])

  return(
    <div>{date}</div>
  )
}
export default MyDate
