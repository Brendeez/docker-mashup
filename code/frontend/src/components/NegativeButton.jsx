import { Link } from 'react-router-dom';
import { FaRegThumbsDown } from 'react-icons/fa';

const NegativeButton = ({ destination = '/negativeSearch' }) => {
  return (
    <div className='flex'>
      <Link
        to={destination}
        className='bg-sky-800 hover:bg-red-500 text-white px-4 py-1 rounded-lg w-fit'
      >
        <FaRegThumbsDown className='text-2xl' />
      </Link>
    </div>
  );
};

export default NegativeButton;