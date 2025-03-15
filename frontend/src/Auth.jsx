// // src/Auth.jsx
// import { useState } from 'react';
// import { auth } from './firebase';
// import { 
//   signInWithEmailAndPassword, 
//   createUserWithEmailAndPassword 
// } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import { signOut } from 'firebase/auth';
// import './Auth.css';

// function Auth() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isSignUp, setIsSignUp] = useState(false);
//   const navigate = useNavigate();

//   const handleAuth = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       if (isSignUp) {
//         // Sign up
//         await createUserWithEmailAndPassword(auth, email, password);
//       } else {
//         // Sign in
//         await signInWithEmailAndPassword(auth, email, password);
//       }
//       navigate('/editor');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-form">
//         <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
//         <form onSubmit={handleAuth}>
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           {error && <p className="error">{error}</p>}
//           <button type="submit">
//             {isSignUp ? 'Sign Up' : 'Sign In'}
//           </button>
//         </form>
//         <p className="toggle-auth">
//           {isSignUp 
//             ? 'Already have an account? ' 
//             : "Don't have an account? "}
//           <span 
//             onClick={() => setIsSignUp(!isSignUp)}
//             className="toggle-link"
//           >
//             {isSignUp ? 'Sign In' : 'Sign Up'}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Auth;



// src/Auth.jsx
// src/Auth.jsx



// import { useState, useEffect } from 'react';
// import { auth } from './firebase';
// import { 
//   signInWithEmailAndPassword, 
//   createUserWithEmailAndPassword,
//   signOut
// } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import './Auth.css';

// function Auth() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleAuth = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       if (isSignUp) {
//         await createUserWithEmailAndPassword(auth, email, password);
//       } else {
//         await signInWithEmailAndPassword(auth, email, password);
//       }
//       navigate('/editor');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       setUser(null);
//       navigate('/auth');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-form">
//         {user ? (
//           <div>
//             <p>Logged in as: {user.email}</p>
//             <button onClick={handleLogout} className="logout-button">Log Out</button>
//           </div>
//         ) : (
//           <>
//             <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
//             <form onSubmit={handleAuth}>
//               <div className="form-group">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Password</label>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               {error && <p className="error">{error}</p>}
//               <button type="submit">
//                 {isSignUp ? 'Sign Up' : 'Sign In'}
//               </button>
//             </form>
//             <p className="toggle-auth">
//               {isSignUp 
//                 ? 'Already have an account? ' 
//                 : "Don't have an account? "}
//               <span 
//                 onClick={() => setIsSignUp(!isSignUp)}
//                 className="toggle-link"
//               >
//                 {isSignUp ? 'Sign In' : 'Sign Up'}
//               </span>
//             </p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Auth;




import { useState, useEffect } from 'react'; 
import { auth } from './firebase'; 
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut 
} from 'firebase/auth'; 
import { useNavigate } from 'react-router-dom'; 
import './Auth.css';  

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  
  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/editor');
    } catch (error) {
      setError(error.message);
    }
  };
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/auth');
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1 className="app-title">CodeGuardian</h1>
        <p className="app-subtitle">Protect and enhance your code.</p>
        {user ? (
          <div>
            <p>Logged in as: {user.email}</p>
            <button onClick={handleLogout} className="logout-button">Log Out</button>
          </div>
        ) : (
          <>
            <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
            <form onSubmit={handleAuth}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error">{error}</p>}
              <button type="submit">
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>
            <p className="toggle-auth">
              {isSignUp
                ? 'Already have an account? '
                : "Don't have an account? "}
              <span
                onClick={() => setIsSignUp(!isSignUp)}
                className="toggle-link"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  ); 
}

export default Auth;