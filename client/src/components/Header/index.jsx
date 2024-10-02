import { Link } from 'react-router-dom';
import AuthLinks from './AuthLinks';

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/me">Profile</Link>
        <AuthLinks />
      </nav>
    </header>
  );
};

export default Header;
