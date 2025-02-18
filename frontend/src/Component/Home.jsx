import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    if (localStorage.getItem('access_token') === null) {
      navigate('/login');
    } else {
      const fetchData = async () => {
        try {
          const { data } = await axios.get('http://localhost:8000/home/', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'application/json'
            }
          });
          setMessage(data.message); 
        } catch (e) {
          console.log('Not authenticated');
        }
      };

      fetchData(); 
    }
  }, [navigate]); 

  return (
    <div className="homecont">
      <div className="form-signin">
        <h3>Welcome!</h3>
      </div>
    </div>
  );
};
