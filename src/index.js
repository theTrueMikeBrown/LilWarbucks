import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { App } from './App';
import { theme } from './theme';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { rootReducer } from './reducers'
import { combineReducers } from 'redux'
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import  'firebase/database'
import { actionTypes } from 'react-redux-firebase'

const fbConfig = {
  apiKey: "AIzaSyA2VRCYxdlM8uI3dNdEXvYIJ0E7OaGa1w8",
  authDomain: "project-72319081053372977.firebaseapp.com",
  databaseURL: "https://project-72319081053372977.firebaseio.com",
  projectId: "project-72319081053372977",
  storageBucket: "project-72319081053372977.appspot.com",
  messagingSenderId: "79545338073",
  appId: "1:79545338073:web:233de1946eea360a3a56c8"
}

const rrfConfig = {
  userProfile: 'users',
}

firebase.initializeApp(fbConfig)

const store = configureStore({
  reducer: combineReducers({root: rootReducer, firebase: firebaseReducer}),
  middleware: getDefaultMiddleware({
    serializableCheck: {
        ignoredActions: [actionTypes.LOGIN]
    }
  }),
})

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
}

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ReactReduxFirebaseProvider {...rrfProps}>
      <CssBaseline />
      <App />
      </ReactReduxFirebaseProvider>
    </ThemeProvider>
  </Provider>,
  document.querySelector('#root'),
);
