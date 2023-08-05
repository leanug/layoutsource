import Link from 'next/link';
import Account from './account';
import Menu from './menu';
import { Icon } from 'semantic-ui-react';

const Header = (props) => {
  const { isOpenSearch } = props
  
  return (
    <header>
      <div className='flex flex-row justify-between px-10 py-6'>
        <div className="text-lg font-bold flex items-center">
        <Icon name="logo" className="mr-2" />
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
