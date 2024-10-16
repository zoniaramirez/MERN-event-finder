import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

const AuthLinks = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div className="flex justify-end space-x-4">
      {Auth.loggedIn() ? (
        <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors duration-300">
          Logout
        </button>
      ) : (
        <>
          <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300">
            Login
          </Link>
          <Link to="/signup" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors duration-300">
            Signup
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthLinks;
