import { Link } from 'react-router-dom';
import AuthLinks from './AuthLinks';

const Header = ({ title }) => {
  return (
    <header className="bg-gray-800 text-white p-4 fixed w-full top-0 z-10">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/me" className="hover:text-gray-400">Profile</Link>
        </div>
        <div className="text-3xl font-bold">{title}</div>
        <AuthLinks />
      </nav>
    </header>
  );
};

export default Header;
