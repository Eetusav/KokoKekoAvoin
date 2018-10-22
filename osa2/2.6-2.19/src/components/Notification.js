import React from "react"

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div style={{ color:  'green', background: 'white', fontSize: '20px', borderRadius: '5px', padding: '10px', marginBottom: '10px'}}>
      {message}
    </div>
  )
}
export default Notification;
