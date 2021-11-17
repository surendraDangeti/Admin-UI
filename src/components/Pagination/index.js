import {AiOutlineDoubleLeft, AiOutlineDoubleRight} from 'react-icons/ai'
import './index.css'
const Pagination = props => {
  const {contactsData, handlePageNum, currentPage} = props
  let PageNumbers = []
  for (let i = 1; i < Math.ceil(contactsData.length / 10) + 1; i++) {
    PageNumbers.push(i)
  }

  return (
    <div>
      <center>
        <button className="paginationBtn">
          <AiOutlineDoubleLeft />
        </button>
        {PageNumbers.map(page => (
          <button
            type="button"
            className={
              currentPage !== page ? 'paginationBtn' : 'empty-paginationBtn'
            }
            onClick={() => handlePageNum(page)}
          >
            {page}
          </button>
        ))}
        <button className="paginationBtn">
          <AiOutlineDoubleRight />
        </button>
      </center>
    </div>
  )
}
export default Pagination
