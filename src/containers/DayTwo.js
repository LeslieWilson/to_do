import React from 'react'
import FormDayTwo from '../components/FormDayTwo.js'
import FormDayTwoSecond from '../components/FormDayTwoSecond.js'
import Notes from '../components/Notes.js'

const DayTwo = (props) =>{

 return (
   <div className = "block-form-right">
   <FormDayTwo />
   <FormDayTwoSecond />
   <Notes />
   </div>
 )
}
export default DayTwo
