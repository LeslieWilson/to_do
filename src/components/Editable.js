// Editable.js
import React, { useState } from "react";

const Editable = ({
  onSubmit,
  text,
  type,
  placeholder,
  children,
  ...props
}) => {

  const [isEditing, setEditing] = useState(false);

  const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        onSubmit(event);

      }
  }
  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={e => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div
          onClick={() => setEditing(true)}
        >
          <span>
            {text || placeholder || "Editable content"}
          </span>
        </div>
      )}
    </section>
  );
};

export default Editable;
