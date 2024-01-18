import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { useParams } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5555/users/`, { withCredentials: true });
          console.log(response);
          setUsers(response.data.data);
          console.log(users);
        } catch (error) {
          console.error("Error fetching users:", error);
          setError("Error fetching users. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div className='p-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8'> Users </h1>
        </div>
        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className='w-full border-separate border-spacing-2'>
            <thead>
              <tr>
                <th className='border border-slate-600 rounded ms'>Name</th>
                <th className='border border-slate-600 rounded ms'>Email</th>
                <th className='border border-slate-600 rounded ms'>Bookings</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className='h-8'>
                  <td className='border border-slate-700 rounded md text-center'>{user.name}</td>
                  <td className='border border-slate-700 rounded md text-center'>{user.email}</td>
                  <td className='border border-slate-700 rounded md text-center'>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/bookings/user/${user._id}`}>
                        <BsInfoCircle className='text-2xl text-green-800' />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };
  
  export default Users;

// const Users = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const navigate = useNavigate();
  
//     useEffect(() => {
//       setLoading(true);
//       axios
//         .get(`http://localhost:5555/users/`, { withCredentials: true })
//         .then((response) => {
//           setUsers(response.data);
//           console.log(response.data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.log(error);
//           setLoading(false);
//         });
        
//     }, []);
    
//     return (
//       <div className='p-4'>
//         <div className='flex justify-between items-center'>
//           <h1 className='text-3xl my-8'> Users </h1>
//         </div>
//         {loading ? (
//           <Spinner />
//         ) : (
//           <table className='w-full border-separate border-spacing-2'>
//             <thead>
//               <tr>
//                 <th className='border border-slate-600 rounded ms'>Name</th>
//                 <th className='border border-slate-600 rounded ms'>Email</th>
//                 <th className='border border-slate-600 rounded ms'>Bookings</th>
//               </tr>
//             </thead>
//             <tbody>
//             {users.map((user) => (
//               <tr key={user._id} className='h-8'>
//                 <td className='border border-slate-700 rounded md text-center'>{user.name}</td>
//                 <td className='border border-slate-700 rounded md text-center'>{user.email}</td>                
//                 <td className='border border-slate-700 rounded md text-center'>
//                     <div className='flex justify-center gap-x-4'>
//                       <Link to={`/bookings/user/${user._id}`}>
//                         <BsInfoCircle className='text-2xl text-green-800' />
//                       </Link>
//                     </div>
//                 </td>
                
//               </tr>
//             ))}
//           </tbody>
//           </table>
//         )}
//       </div>
//     );
//   };
  
//   export default Users;