import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopBar from './TopBar';
import LoginPage from './LoginPage';
import AccountPage from './AccountPage';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export default function App() {
  const classes = useStyles();
  const auth = useSelector(state => state.firebase.auth)

  return (
    <div className={classes.root}>
      <TopBar />      
      {!auth && (
      <LoginPage />
      )}
      {auth && (
      <AccountPage />
      )}      
    </div>
  );
}
