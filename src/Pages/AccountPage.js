import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import { makeStyles } from '@material-ui/core/styles';
import { WelcomePage } from './WelcomePage';
import { useFirebaseConnect } from 'react-redux-firebase'
import { Children } from '../Components/Children'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1b5e20'
  }
}));

export function AccountPage() {  
  const classes = useStyles();
  const auth = useSelector(state => state.firebase.auth);  

  var uid = auth.uid;
  useFirebaseConnect(['users']);
  const users = useSelector(state => state.firebase.ordered.users);
  var sameAs = (users && users.find(u => u.key === uid).value.sameAs) || uid;

  useFirebaseConnect([`children/${sameAs}`]);
  const allChildren = useSelector(state => state.firebase.ordered.children);
  
  const children = (allChildren && allChildren[sameAs]) || [];
  const kids = children.map(c => c.value);

  return (
  <Fragment>{
    !isLoaded(auth) ?
      <div className={classes.paper}><span>Loading...</span></div> :
      (kids && kids.length) ? 
        <Children /> :
        <div className={classes.paper}><WelcomePage /></div>
  }</Fragment>
  );
}
