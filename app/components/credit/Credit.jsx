import React from 'react'

function Credit() {
    return (
        <>
            <div className="flex flex-col gap-2 rounded shadow-md">
                <div>
                    <h1 className='text-xl p-5 capitalize'>credit</h1>
                    <hr className='opacity-25' />
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>type</th>
                                <th>Your vacations</th>
                                <th>Remaining </th>
                                <th>Used</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-base-200">
                                <th>Annual</th>
                                <td>Cy Ganderton</td>
                                <td>Quality </td>
                                <td>Blue</td>
                            </tr>
                            <tr>
                                <th>Emergency</th>
                                <td>Hart Hagerty</td>
                                <td>Desktop </td>
                                <td>Purple</td>
                            </tr>
                            <tr>
                                <th>rest days</th>
                                <td>Brice Swyre</td>
                                <td>Tax Accountant</td>
                                <td>Red</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Credit