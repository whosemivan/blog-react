import React, { createContext, useState } from "react";
import FirstScreen from "./FirstScreen";
import Posts from "./Posts";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import PostCreator from "./PostCreator";
import NotFound from "./NotFound";
import PostPage from "./PostPage";
import EditPost from "./EditPost";
import PersonalArea from "./PersonalArea";

import { Switch, Route, Router as BrowserRouter } from 'react-router-dom';
import browserHistory from "../browser-history";
import PrivateRoute from '../private-route';
import Api from "../api";

export const Ctx = createContext({});

const App = () => {
  const [db, updDb] = useState(JSON.parse(localStorage.getItem("db") || "[]"));
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [userName, setUserName] = useState(localStorage.getItem("author") || "");
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  
  return (
    <Ctx.Provider value={{
      db: db,
      userId: userId,
      userName: userName,
      api: new Api(),
      updDb: updDb,
      updUId: setUserId,
      updUName: setUserName,
      isAuth: isAuth,
      setIsAuth: setIsAuth
    }}>
      <BrowserRouter history={browserHistory}>
        <Switch>
          <Route exact path='/blog-react/'>
            <FirstScreen />
            <Posts />
          </Route>
          <Route exact path='/blog-react/signup'>
            <SignUp />
          </Route>
          <Route exact path='/blog-react/signin'>
            <SignIn />
          </Route>
          <Route exact path='/blog-react/post/:id'>
            <PostPage />
          </Route>
          <PrivateRoute exact
            path='/blog-react/create-post'
            render={() => <PostCreator/>}
            authorizationStatus={isAuth}
          />
          <PrivateRoute exact
            path='/blog-react/edit-post/:id'
            render={() => <EditPost/>}
            authorizationStatus={isAuth}
          />
          <PrivateRoute exact
            path='/blog-react/personal/:id'
            render={() => <PersonalArea/>}
            authorizationStatus={isAuth}
          />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </Ctx.Provider>
  );
};

export default App;
