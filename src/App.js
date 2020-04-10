import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TopBar } from './Components/TopBar';
import { LoginPage } from './Pages/LoginPage';
import { AccountPage } from './Pages/AccountPage';
import { useSelector } from 'react-redux';
import { LinkPage } from './Pages/LinkPage';
import { SharePage } from './Pages/SharePage';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export function App() {
  const classes = useStyles();
  const auth = useSelector(state => state.firebase.auth);
  const showLinkPage = useSelector(state => state.root.viewingLink);
  const showAccountPage = useSelector(state => state.root.viewingAccount);
  const showSharePage = useSelector(state => state.root.viewingShare);

  return (
    <div className={classes.root}>
      <TopBar />      
      {(!auth || auth.isEmpty) && (
        <LoginPage />
      )}
      {(auth && !auth.isEmpty && showAccountPage ) && (
        <AccountPage />
      )}
      {(auth && !auth.isEmpty && showLinkPage ) && (
        <LinkPage />
      )}
      {(auth && !auth.isEmpty && showSharePage ) && (
        <SharePage />
      )}

    </div>
  );
}
