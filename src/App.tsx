import { Messenger } from './components/messenger'
import { useState, useEffect } from 'react';
import { Login } from './components/login';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const idInstance = localStorage.getItem('idInstance');
    const apiTokenInstance = localStorage.getItem('apiTokenInstance');
    
    if (idInstance && apiTokenInstance) {
      setIsAuthenticated(true);
    }
  }, []);


  return (
    !isAuthenticated ? <Login onSuccess={() => setIsAuthenticated(true)} /> :
    <Messenger />
  )
}

export default App
