import React from 'react'

const FormDayOne = (props) =>{
 return (
   <div className = "form-left">
    <h2 className = "form-left-title">Day One</h2>
      <form>
         <label>
               <input
               name="form_left_field"
               className="form_left_field"
               placeholder="task"
               />
          </label>
          <input className="button_submit_it" type="submit" value="Submit"/>
      </form>
   </div>
 )
}
export default FormDayOne
