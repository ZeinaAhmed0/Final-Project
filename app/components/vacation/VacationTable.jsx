import React from 'react'

function VacationTable() {
    return (
        <>
            <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 border">From</th>
                        <th className="px-4 py-2 border">To</th>
                        <th className="px-4 py-2 border">Days</th>
                        <th className="px-4 py-2 border">Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}

export default VacationTable