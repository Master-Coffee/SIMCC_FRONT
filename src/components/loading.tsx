// LoadingWrapper.tsx
import React, { useState, useEffect, useContext } from 'react';
import { LogoConectee } from './svg/LogoConectee';
import { UserContext } from '../context/context';
import { useTheme } from 'next-themes';
import { LogoConecteeWhite } from './svg/LogoConecteeWhite';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import { LogoIapos } from './svg/LogoIapos';
import { LogoIaposWhite } from './svg/LogoIaposWhite';

interface LoadingWrapperProps {
  children: React.ReactNode;
}





const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const { setLoggedIn, setUser, urlGeralAdm, setPermission, permission,  setRole, version } = useContext(UserContext)

    ///// LOGIN SHIBBOLETH
    

    useEffect(() => {
      setLoading(true);

      const storedPermission = localStorage.getItem('permission');
      if (storedPermission) {
        setPermission(JSON.parse(storedPermission));
      }


    
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        
        if (firebaseUser) {
          console.log(firebaseUser.uid);
          if (firebaseUser.uid !== '') {
          
    
            // Recupera as informações adicionais do seu banco de dados aqui
            const urlUser = `${urlGeralAdm}s/user?uid=${firebaseUser.uid}`;
            console.log(urlUser);
    
            const fetchData = async () => {
              try {
                const response = await fetch(urlUser, {
                  mode: 'cors',
                  headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Max-Age': '3600',
                    'Content-Type': 'text/plain',
                  },
                });
                const data = await response.json();
                if (data && Array.isArray(data) && data.length > 0) {
                  setLoggedIn(true)
                  data[0].roles = data[0].roles || [];
                  setUser(data[0]);
                 


                  const storedUser = localStorage.getItem('permission');
                  const storedRole = localStorage.getItem('role');
                
                    if (storedUser) {
                      // Se as informações do usuário forem encontradas no armazenamento local, defina o usuário e marque como autenticado
                      setPermission(JSON.parse(storedUser));
                
                    }

                    if (storedRole) {
                      // Se as informações do usuário forem encontradas no armazenamento local, defina o usuário e marque como autenticado
                      setRole(JSON.parse(storedRole));
                
                    }

                    setTimeout(() => {
                      setLoading(false);
                    }, 2000); // 2000 ms = 2 segundos
                }
              } catch (err) {
                console.log(err);
              } finally {
                setTimeout(() => {
                  setLoading(false);
                }, 2000); // 2000 ms = 2 segundos
              }
            };
    
            fetchData();
          } else {
            setLoggedIn(false);
            setTimeout(() => {
              setLoading(false);
            }, 2000); // 2000 ms = 2 segundos
          }
        } else {
          setLoggedIn(false);
          setTimeout(() => {
            setLoading(false);
          }, 2000); // 2000 ms = 2 segundos
        }

        setTimeout(() => {
          setLoading(false);
        }, 2000); // 2000 ms = 2 segundos
      });
    
      return () => {
        unsubscribe();
       
      };

     
    }, []);
    
  
  console.log(permission)

    const { theme } = useTheme()

  return <>{loading ? <main className='h-screen w-full flex items-center justify-center'>
        <div className='h-16 animate-pulse'>
        {version ? (
              <div  className="h-16  "  >{(theme ==  'dark' ) ? (<LogoConecteeWhite />):(<LogoConectee />)}</div>
          ):(
            <div  className="h-16  " >{(theme ==  'dark' ) ? (<LogoIaposWhite />):(<LogoIapos />)}</div>
          )}
        </div>
  </main> : children}</>;
};

export default LoadingWrapper;
