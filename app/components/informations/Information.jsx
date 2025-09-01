// 'use client'
// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// function Information() {
//     const token = localStorage.getItem('token');
//     const [users, setUsers] = useState([]);
    

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const res = await axios.get('http://localhost:1337/api/users/me', {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setUsers([res.data]);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         if (token) fetchUserData();
//     }, [token]);

//     return (
//         <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-300 rounded">
//                 <thead>
//                     <tr className="bg-gray-200">
//                         <th className="px-4 py-2 border">Employee ID</th>
//                         <th className="px-4 py-2 border">Name</th>
//                         <th className="px-4 py-2 border">Department</th>
//                         <th className="px-4 py-2 border">Sub Department</th>
//                         <th className="px-4 py-2 border">Location</th>
//                         <th className="px-4 py-2 border">Job Title</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users?.map((user, idx) => (
//                         <tr key={idx}>
//                             <td>{user.id}</td>
//                             <td>{user.name}</td>
//                             <td>{user.department}</td>
//                             <td>{user.subDepartment}</td>
//                             <td>{user.location}</td>
//                             <td>{user.jobTitle}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default Information