import Link from 'next/link';
import Account from './account';
import Menu from './menu';

const Header = (props) => {
  const { isOpenSearch } = props
  
  return (
    <header>
      <div className='flex flex-row justify-between'>
        <div>
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
