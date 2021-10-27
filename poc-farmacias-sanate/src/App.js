import { useEffect,useState } from 'react';

//Functions
import getFirebase from './firebase/configFirebase';
import utilsFunctions from './functions/FirebaseFunctions';

//Components
import SiteIndex from './pages/SiteIndex';
import CircularLoading from './components/CircularLoading';

function App(props) {

  const { firebase, currentUser, getCurrentUser } = utilsFunctions(props);
  const [user, setUser] = useState({
    displayName: '',
    uid: '',
    admin: false,
  });

  // Conseguir usuario
  useEffect(async () => {
    if (firebase) {
      await firebase.auth().onAuthStateChanged(async (authUser) => {
        if (authUser) {
          getCurrentUser(authUser.email);
          console.log('Session is live');
          await setUser({
            displayName: authUser.displayName,
            uid: authUser.uid,
            admin: authUser.uid === 'wuqxWFjxfZU0Qapp1rsYSW9YPj92'
          });
        } else {
          getCurrentUser(null);
          console.log('No live sessions');
        }
      });
    }
  }, [])

  const socialLogin = async (props) => {
    await firebase
      .auth()
      .signInWithPopUp(props)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return currentUser === 'loading' ? (
    <CircularLoading />
  ) : (
    <div className='App'>
      <SiteIndex
        socialLogin={socialLogin}
        currentUser={currentUser}
        getFirebase={props.getFirebase}
        history={props.history}
        userData={user}
      />
    </div>
  )
}

export default App;
