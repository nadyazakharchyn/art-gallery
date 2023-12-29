import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import ArtsTable from '../components/home/ArtsTable';
import ArtsCard from '../components/home/ArtsCard';

const Home = () => {
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/arts')
      .then((response) => {
        setArts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    // <div className='p-4'>
    //   <div className='flex justify-center items-center gap-x-4'>
    //     <button
    //       className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
    //       onClick={() => setShowType('table')}
    //     >
    //       Table
    //     </button>
    //     <button
    //       className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
    //       onClick={() => setShowType('card')}
    //     >
    //       Card
    //     </button>
    //   </div>
    //   <div className='flex justify-between items-center'>
    //     <h1 className='text-3xl my-8'>Books List</h1>
    //     <Link to='/arts/create'>
    //       <MdOutlineAddBox className='text-sky-800 text-4xl' />
    //     </Link>
    //   </div>
    //   {loading ? (
    //     <Spinner />
    //   ) : showType === 'table' ? (
    //     <ArtsTable arts={arts} />
    //   ) : (
    //     <ArtsCard arts={arts} />
    //   )}
    // </div>

    
    <div className='p-4'>
      <div className='flex justify-between items-center'>
      <h1 className='text-3xl my-8'>Artworks List</h1>
         <Link to='/arts/create'>
           <MdOutlineAddBox className='text-sky-800 text-4xl' />
         </Link>
      </div>
      {loading ? (
        <Spinner />
      ):(
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded ms'>No</th>
              <th className='border border-slate-600 rounded ms'>Title</th>
              <th className='border border-slate-600 rounded ms'>Artist</th>
              <th className='border border-slate-600 rounded ms'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {arts.map((art, index) => (
              <tr key={art._id} className='h-8'>
                <td className='border border-slate-700 rounded md text-center'>
                  {index + 1}  
                </td> 
                <td className='border border-slate-700 rounded md text-center'>
                  {art.title}
                </td>
                <td className='border border-slate-700 rounded md text-center'>
                  {art.artist}
                </td>
                <td className='border border-slate-700 rounded md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/arts/details/${art._id}`}>
                      <BsInfoCircle className='text-2xl text-green-800'/>
                    </Link>
                    <Link to={`/arts/edit/${art._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-600'/>
                    </Link>
                    <Link to={`/arts/delete/${art._id}`}>
                      <MdOutlineDelete className='text-2xl text-red-600'/>
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

export default Home;