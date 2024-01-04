import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Galleries = () => {
    const [galleries, setGalleries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');
  
    useEffect(() => {
      setLoading(true);
      axios
        .get('http://localhost:5555/galleries')
        .then((response) => {
            setGalleries(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, []);
  
    return (
      
      <div className='p-4'>
        <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Our galleries</h1>
        </div>
        {loading ? (
          <Spinner />
        ):(
          <table className='w-full border-separate border-spacing-2'>
            <thead>
              <tr>
                {/* <th className='border border-slate-600 rounded ms'>No</th> */}
                <th className='border border-slate-600 rounded ms'>Title</th>
                <th className='border border-slate-600 rounded ms'>Address</th>
                <th className='border border-slate-600 rounded ms'>Artworks</th>
              </tr>
            </thead>
            <tbody>
              {galleries.map((gallery, index) => (
                <tr key={gallery._id} className='h-8'>
                  
                  <td className='border border-slate-700 rounded md text-center'>
                    {gallery.title}
                  </td>
                  <td className='border border-slate-700 rounded md text-center'>
                    {gallery.address}
                  </td>
                  <td className='border border-slate-700 rounded md text-center'>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/galleries/${gallery._id}/arts`}>
                        <BsInfoCircle className='text-2xl text-green-800'/>
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
  
  export default Galleries;