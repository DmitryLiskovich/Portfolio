import React from 'react'

export function MessageBox(props) {
  const currentUser = props.user;
  const message = props.messages;

  function dateFormater(date) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
      ]
    const newDate = new Date(date);
    return `${newDate.getDate()} ${months[newDate.getMonth()+1]} - ${newDate.getHours()}:${newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes()}`;
  }

  return (
    <>
      {message.map((message, index) => {
        const newdate = dateFormater(message.date);

        return (
          <div className={message.user === currentUser.id ? 'right' : 'left'} key={index}>
            <p className='message-text'>{message.message}</p>
            <p className='date'>{newdate}</p>
          </div>
        )
      })}
    </>
  )
}
