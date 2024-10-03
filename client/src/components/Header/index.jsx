import { Link } from 'react-router-dom';
import AuthLinks from './AuthLinks';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 fixed w-full top-0 z-10">
    <nav className="container mx-auto flex justify-between items-center">
    <Link to="/" className="hover:text-gray-400">Home</Link>
      <Link to="/me" className="hover:text-gray-400">Profile</Link>
        <AuthLinks />
      </nav>
    </header>
  );
};

export default Header;
