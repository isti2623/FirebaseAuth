import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuth from './Firebase/firebase.initialize'

initializeAuth();

const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();


function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(loggedInUser);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);

      });
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubAuthProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(loggedInUser);

      }).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);

      });
  }
  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser({});
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <div className="App">
      {
        !user.name ?
          <div>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
            <button onClick={handleGithubSignIn}>Github Sign In</button>
          </div> :
          <button onClick={handleSignOut}>SignOut</button>
      }
      <br />
      {
        user.name && <div>
          <h2>{user.name}</h2>
          <p>Your Email Address : {user.email}</p>
          <img width="100px" src={user.photo} alt="" srcset="" />
        </div>
      }
    </div>
  );
}

export default App;
