import React from 'react'
import {RiEditBoxLine} from 'react-icons/ri'
import {AiOutlineDelete} from 'react-icons/ai'

import './index.css'
const ReadRow = props => {
  const {contact, handleEditClick, handleDeleteClick} = props
  const {name, email, role} = contact
  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td>
        <button
          type="button"
          className="button edit-button"
          onClick={event => handleEditClick(event, contact)}
        >
          <RiEditBoxLine />
        </button>
        <button
          type="button"
          className="button delete-button"
          onClick={() => handleDeleteClick(contact.id)}
        >
          <AiOutlineDelete />
        </button>
      </td>
    </tr>
  )
}

export default ReadRow
