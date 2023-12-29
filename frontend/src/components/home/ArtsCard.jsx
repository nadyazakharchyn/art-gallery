import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import ArtSingleCard from './ArtSingleCard';

const ArtsCard = ({ art }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {art.map((item) => (
        <ArtSingleCard key={item._id} art={item} />
      ))}
    </div>
  );
};

export default ArtsCard;