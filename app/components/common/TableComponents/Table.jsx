import React from 'react'

function Table({ children }) {
    return (
    <div className="overflow-x-auto">
      <table className='table-auto w-full border-collapse border border-gray-300 text-[var(--color-primary)]'>
        {children}
      </table>
    </div>
  )
}

export default Table