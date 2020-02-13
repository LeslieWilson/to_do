import React, { useState, useEffect } from 'react'
import Editable from "./Editable"

const FormDayTwoSecond = (props) => {
  const [task, setTask] = useState("");

  return (
    <Editable
      text={task}
      placeholder="Write a task name"
      type="input"
    >
      <input
        type="text"
        name="task"
        placeholder="Write a task name"
        value={task}
        onChange={e => setTask(e.target.value)}
      />
    </Editable>
  );
}

export default FormDayTwoSecond;
