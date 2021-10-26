import { useEffect } from 'react';

//Functions
import getFirebase from './firebase/configFirebase';
import utilsFunctions from './functions/FirebaseFunctions';

//Components
import SiteIndex from './pages/SiteIndex';
import CircularLoading from './components/CircularLoading';

function App(props) {

  const { firebase, currentUser, getCurrentUser } = utilsFunctions(props);

  useEffect((e) => {
    if (firebase) {
      firebase.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
          getCurrentUser(authUser.email);
          console.log('Session is live');
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
      />
    </div>
  )
}

export default App;
