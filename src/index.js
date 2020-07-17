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
import * as serviceWorker from './serviceWorker';

const fbConfig = {
  apiKey: "AIzaSyDqb1tWaEXV-LZzn0ec95qPoUfhp-chYIc",
  authDomain: "lilwarbucks.firebaseapp.com",
  databaseURL: "https://lilwarbucks.firebaseio.com",
  projectId: "lilwarbucks",
  storageBucket: "lilwarbucks.appspot.com",
  messagingSenderId: "760833605984",
  appId: "1:760833605984:web:75168282e6afbde2639e05"
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

serviceWorker.register()