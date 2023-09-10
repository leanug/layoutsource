import Link from 'next/link';
import Account from './account';
import Menu from './menu';

const Header = (props) => {  
  return (
    <header>
      <div className='flex flex-row justify-between px-10 py-6'>
        <div className="text-lg font-bold flex items-center">
          LOGO
        </div>
        <div>
          <Menu isOpenSearch={ false} />
        </div>
        <div>
          <Account />
        </div>
      </div>
    </header>
  );
};

export default Header;
