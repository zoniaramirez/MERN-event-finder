import { Link } from 'react-router-dom';
import AuthLinks from './AuthLinks';

const Header = ({ title }) => {
  return (
    <div className="flex justify-start space-x-4">
    <header className="bg-gray-800 text-white p-4 fixed w-full top-0 z-10">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300">Home</Link>
          <Link to="/me" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors duration-300">Profile</Link>
        </div>
        <div className="text-center text-3xl font-bold">{title}</div>
        <AuthLinks />
      </nav>
    </header>
    </div>
  );
};

export default Header;
