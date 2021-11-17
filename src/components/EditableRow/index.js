import React from 'react'
import {GiCancel} from 'react-icons/gi'
import {FaRegSave} from 'react-icons/fa'

import './index.css'
const EditableRow = props => {
  const {
    editContactData,
    handleEditFormChange,
    handleCancelClick,
    handleEditFormSubmit,
  } = props
  const {name, email, role} = editContactData
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter name..."
          name="name"
          value={name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter email..."
          name="email"
          value={email}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter role..."
          name="role"
          value={role}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button
          type="submit"
          className="button saveBtn"
          onClick={handleEditFormSubmit}
        >
          <FaRegSave />
        </button>
        <button
          type="button"
          className="button cancelBtn"
          onClick={handleCancelClick}
        >
          <GiCancel />
        </button>
      </td>
    </tr>
  )
}

export default EditableRow
