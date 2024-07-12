import { useEffect, useState } from 'react'
import {UserSignupSignin} from '../components/firstPage.jsx'
import { NotesHandler } from '../components/secondPage.jsx'



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    setIsLoggedIn(token !== null && token !== undefined);
  }, []);

  return (
    <div >
      {isLoggedIn ? <NotesHandler   /> : <UserSignupSignin  />}
      
    </div>
  );
}

export default App
