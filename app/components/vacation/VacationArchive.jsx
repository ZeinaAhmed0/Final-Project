import React from 'react'
function VacationArchive() {

    return (
        <>
            <table className="min-w-full border-collapse border border-black bg-gray-100 text-sky-700">
                <thead>
                    <tr>
                        <th className="border border-black px-4 py-2">Insert Date</th>
                        <th className="border border-black px-4 py-2">Approve Date</th>
                        <th className="border border-black px-4 py-2">Manager Approval</th>
                        <th className="border border-black px-4 py-2">Direct Manager Approval</th>
                        <th className="border border-black px-4 py-2">Type</th>
                        <th className="border border-black px-4 py-2">Start Date</th>
                        <th className="border border-black px-4 py-2">End Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='text-center'>
                        <td className='border border-black'>3</td>
                        <td className='border border-black'>3</td>
                        <td className='border border-black'>3</td>
                        <td className='border border-black'>3</td>
                        <td className='border border-black'>3</td>
                        <td className='border border-black'>3</td>
                        <td className='border border-black'>3</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default VacationArchive