import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Custom Components
import getFirebase from "../firebase/configFirebase";

//Pages or Sites
import CheckOut from "./CheckOut";
import Home from "./Home/index";
import Login from "./Login";
import Logout from "./Logout";
import SignUp from "./SignUp";
import Catalog from "./Catalog";

export default function SiteIndex(props) {
    const firebase = getFirebase();

    const socialLogin = async (props) => {
        await firebase
            .auth()
            .signInWithPopup(props)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    const signOut = async () => {
        try {
            if (firebase) {
                await firebase.auth().signOut();
                alert('Signed out succesfully!');
            }
        } catch (error) {
            alert(error.message);
        }
        props.history.push('/');
    };

    const loginSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log(props);
        try {
            if (props) {
                console.log("iniciando");
                const user = await firebase
                    .auth()
                    .signInWithEmailAndPassword(data.get("email"), data.get("password"));
                //console.log("user", user);
                props.history.push("/");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const signUpSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            if (firebase) {
                const user = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                        data.get("email"),
                        data.get("password")
                    );
                console.log("User is ", user);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Router>
            {props.currentUser ? (
                <Switch>
                    <Route exact path={'/'} >
                        <Home
                            firebase={props.firebase}
                            signUpSubmit={signUpSubmit}
                            history={props.history}
                        />
                    </Route>
                    <Route exact path={'/checkout'}>
                        <CheckOut
                            firebase={props.firebase}
                            signUpSubmit={signUpSubmit}
                            history={props.history}
                        />
                    </Route>
                    <Route exact path={'/catalog'}>
                        <Catalog
                            firebase={props.firebase}
                            signUpSubmit={signUpSubmit}
                            history={props.history}
                        />
                    </Route>
                    <Route path={'/logout'}>
                        <Logout
                            signOut={signOut}
                            firebase={props.firebase}
                            history={props.history}
                        />
                    </Route>
                </Switch>
            ) : (
                <Switch>
                    <Route exact path={"/"} >
                        <Login
                            signOut={signOut}
                            firebase={props.firebase}
                            history={props.history}
                            socialLogin={socialLogin}
                        />
                    )}>
                    </Route>
                    <Route path={"/signup"}>
                        <SignUp
                            firebase={props.firebase}
                            signUpSubmit={signUpSubmit}
                            history={props.history}
                        />
                    </Route>
                </Switch>
            )
            }
        </Router >
    )
}