import React, { useState } from 'react'
import './Pagination.css'

function Pagination({ handleCurrentPage, currentPage, handleGoto,  }) {
    const [pageNumber, setPageNumber] = useState();

    return (
        <div className="pagination">
            <div className="pagination-gotoButton">
                <button onClick={() => handleGoto(pageNumber)} className='pagination-button'>GoTo</button>
                <input onChange={(e) => setPageNumber(e.target.value)} type='number' placeholder='Enter Page Number'></input>
            </div>
            <div className='pagination-next-prev'>
                <button onClick={() => handleCurrentPage(false)} className='pagination-button'>Prev</button>
                <div className="pagination-currentPage">{currentPage}</div>
                <button onClick={() => handleCurrentPage(true)} className='pagination-button'>Next</button>
            </div>
        </div>
    )
}

export default Pagination