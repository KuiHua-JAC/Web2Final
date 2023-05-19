//Aymeric code
import { useEffect, useContext } from 'react';
import { LoggedInContext } from '../App';
import { useNavigate } from 'react-router-dom';

function LogOut() {
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        const requestOptions = {
          method: 'GET',
          credentials: 'include'
        };

        const response = await fetch('http://localhost:1339/session/logout', requestOptions);

        if (response.status === 401) {
          alert('Already logged out on the server. Will log out on the front-end as well');
          setIsLoggedIn(false);
          navigate('/');
          return;
        } else if (response.status === 200) {
          alert('Hope you enjoyed your visit. See you soon!');
          setIsLoggedIn(false);
          navigate('/');
          return;
        } else {
          alert('Unexpected issue on the server while logging out. Will log out of the front-end anyways');
          setIsLoggedIn(false);
          navigate('/');
          return;
        }
      } catch (error) {
        alert('An error occurred. Logging out on the front-end anyways');
        setIsLoggedIn(false);
        navigate('/');
        return;
      }
    };

    performLogout();
  }, []);

  return null; // Since this is a page component, it doesn't render anything
}

export default LogOut;