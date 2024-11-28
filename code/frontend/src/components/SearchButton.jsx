import { Link } from 'react-router-dom';
import { FaRegThumbsUp } from 'react-icons/fa';

const SearchButton = ({ destination = '/positiveSearch' }) => {
  return (
    <div className='flex'>
      <Link
        to={destination}
        className='bg-sky-800 hover:bg-green-500 text-white px-4 py-1 rounded-lg w-fit'
      >
        <FaRegThumbsUp className='text-2xl' />
      </Link>
    </div>
  );
};

export default SearchButton;
