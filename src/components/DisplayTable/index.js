import React, {useState, Fragment, useEffect} from 'react'
import axios from 'axios'
import ReadRow from '../ReadRow'
import EditableRow from '../EditableRow'
import Pagination from '../Pagination'
import './index.css'

const getContactListFromLocalStorage = () => {
  const stringifiedContactList = localStorage.getItem('contactsList')
  const parsedContactList = JSON.parse(stringifiedContactList)
  if (parsedContactList === null) {
    return []
  }
  return parsedContactList
}

const DisplayTable = () => {
  const [contactsData, setContactsData] = useState(
    getContactListFromLocalStorage(),
  )
  const [perPage, setPerPage] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [editContactId, setEditContactId] = useState()
  const [editContactData, setEditContactData] = useState({
    name: '',
    email: '',
    role: '',
  })

  useEffect(() => {
    axios
      .get(
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json',
      )
      .then(res => {
        setContactsData(res.data)
        setPerPage(res.data.slice(0, 10))
      })
  }, [])

  const handlePageNum = page => {
    setCurrentPage(page)
    const currentPage = page * 10
    const data = contactsData.slice(currentPage - 10, currentPage)
    setPerPage(data)
  }

  const handleDeleteClick = id => {
    const updatedData = perPage.filter(eachItem => eachItem.id !== id)
    setPerPage(updatedData)
    const ModifiedData = contactsData.filter(
      eachContact => eachContact.id !== id,
    )
    setContactsData(ModifiedData)
  }

  const handleEditFormChange = event => {
    const filename = event.target.getAttribute('name')
    const fileValue = event.target.value
    const newData = {...editContactData}
    newData[filename] = fileValue
    setEditContactData(newData)
  }

  const handleEditFormSubmit = event => {
    event.preventDefault()
    const editedContact = {
      id: editContactId,
      name: editContactData.name,
      email: editContactData.email,
      role: editContactData.role,
    }
    const newContacts = [...contactsData]
    const index = contactsData.findIndex(
      contact => contact.id === editContactId,
    )
    newContacts[index] = editedContact
    setContactsData(newContacts)

    const newPerPageData = [...perPage]
    const pageIndex = newPerPageData.findIndex(
      page => page.id === editContactId,
    )
    newPerPageData[pageIndex] = editedContact
    setPerPage(newPerPageData)
    setEditContactId(null)
  }

  const handleEditClick = (event, contact) => {
    event.preventDefault()
    setEditContactId(contact.id)

    const formValue = {
      name: contact.name,
      email: contact.email,
      role: contact.role,
    }

    setEditContactData(formValue)
  }

  const handleCancelClick = () => {
    setEditContactId(null)
  }

  const handleSearch = value => {
    filterData(value)
  }

  const filterData = value => {
    const lowerCaseValue = value.toLowerCase().trim()
    if (!lowerCaseValue) {
      const oldData = contactsData.slice(
        currentPage * 10 - 10,
        currentPage * 10,
      )
      console.log('old', oldData, currentPage)
      setPerPage(oldData)
    } else {
      const filterData = contactsData.filter(item => {
        return Object.keys(item).some(key => {
          return item[key].toString().toLowerCase().includes(lowerCaseValue)
        })
      })
      setPerPage(filterData)
    }
  }

  return (
    <div className="app-container">
      <div className="search-box-container">
        <input
          className="search-box"
          type="search"
          placeholder="Search by name email or role"
          onChange={event => handleSearch(event.target.value)}
        />
      </div>
      <form>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {perPage.map(contact => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editContactData={editContactData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                    handleEditFormSubmit={handleEditFormSubmit}
                  />
                ) : (
                  <ReadRow
                    contact={contact}
                    key={contact.id}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <center>
        {perPage.length === 0 ? (
          <div className="Not-found-section">
            <img
              className="not-found-image"
              src="https://res.cloudinary.com/dbmvwqck0/image/upload/v1637142519/Pngtree_no_result_search_icon_6511543_ufvyo3.png"
              alt="Not-Found"
            />
            <h3 className="no-result-text">No Search Results</h3>
          </div>
        ) : (
          <Pagination
            contactsData={contactsData}
            handlePageNum={handlePageNum}
            currentPage={currentPage}
          />
        )}
      </center>
    </div>
  )
}
export default DisplayTable
