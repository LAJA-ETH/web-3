import './style.scss'
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

function Paginate({
  className,
  ...restProps
}) {
  //onPageChange={handlePageClick}
  //pageCount={10}
  return (<div className={`arb-paginate ${className}`}>
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      pageRangeDisplayed={1}
      previousLabel="<"
      renderOnZeroPageCount={null}
      {...restProps}
    />
  </div>)
}

export default Paginate;