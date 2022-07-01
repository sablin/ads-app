import React, { useEffect, useState } from 'react'
import './App.css'
import MainPage from './components/MainPage/MainPage';
import Navigation from './components/UI/navigetion/Navigation';
import { AuthContext } from './context';

function App() {
  const [isAuth, setIsAuth] = useState({});
  const [loginUser, setLoginUser] = useState({})
  const [token, setToken] = useState({})
  useEffect(()=>{
    const user = localStorage.getItem('loginUser');
     if( localStorage.getItem('auth')){
      setIsAuth({'auth': true, 'user': user});
      setToken(localStorage.getItem('token'))
     }else{
      setIsAuth({'auth': false, 'user': ''})
      setToken('');
     }
  
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      loginUser,
      setLoginUser,
      token,
      setToken
    }}>
    <div className="App">
     <Navigation/>
    </div>
    </AuthContext.Provider>
  );
}

export default App;
