import { Link } from 'react-router-dom';
import { FaMagnifyingGlassChart } from 'react-icons/fa6';

const KeywordsButton = ({ itemdata }) => {
  console.log("item Data: ", itemdata);
  return (
    <div className='flex'>
      <Link
        to="/keyword"
        state= {{itemdata}}
        className='bg-sky-800 hover:bg-red-400 text-white px-4 py-1 rounded-lg w-fit'
      >
        <FaMagnifyingGlassChart className='text-2xl' />
      </Link>
      {/* <Link to={`/other?keyword=${keyword}`}>Go to Other Page</Link>  */}
    </div>
  );
};

export default KeywordsButton;
