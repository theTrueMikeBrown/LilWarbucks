import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useFirebaseConnect } from 'react-redux-firebase'

const useStyles = makeStyles(theme => ({  
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1b5e20'
  },
  content: {    
    width: '75%',
    lineHeight: '1.75em',
    fontSize: '125%',
  },
  p: {
    marginBottom: '.75em'
  },
}));

export function LinkPage() {
  const classes = useStyles();
  const auth = useSelector(state => state.firebase.auth);  
  const dispatch = useDispatch();

  var uid = auth.uid;
  useFirebaseConnect(['users']);
  const users = useSelector(state => state.firebase.ordered.users);
  var sameAs = (users && users.find(u => u.key === uid).value.profile.sameAs) || '';
  var sameAsEmail = (sameAs && users.find(u => u.key === sameAs).value.profile.email) || '';
  function short(s) { return s && s.substring(0,8); }

  const [linkEmail, setLinkEmail] = useState(sameAsEmail);
  const [linkKey, setLinkKey] = useState(short(sameAs));
  if (!linkEmail && sameAsEmail) setLinkEmail(sameAsEmail);
  if (!linkKey && sameAs) setLinkKey(short(sameAs));

  const handleSubmit = () => {
    dispatch({ type: 'change-link', uid: uid, key: linkKey, email: linkEmail });
  };

  return (    
  <div className={classes.paper}><div className={classes.content}>    
    <h3>To let someone link to your account:</h3>
    <div className={classes.p}>Share the following information with them.
       This will allow them to view and modify all of the information for all of the children on your account</div>
    <div className={classes.p}>Email Address: {auth.email}</div>
    <div className={classes.p}>Key: {short(auth.uid)}</div>
    <h3>To link to someone's account:</h3>
    <div className={classes.p}>Fill out this form with information obtained from their "Link to account" page.</div>
    <div className={classes.p}>
      <TextField autoFocus 
                 id="linkEmailAddress" 
                 label="Email Address" 
                 type="email"
                 value={linkEmail} 
                 onChange={e => setLinkEmail(e.target.value)} />
    </div>
    <div className={classes.p}>
      <TextField autoFocus 
                 id="linkKey" 
                 label="Key" 
                 type="text" 
                 value={linkKey} 
                 onChange={e => setLinkKey(e.target.value)} />
    </div>
    <div className={classes.p}><Button onClick={handleSubmit} color="primary">Submit</Button></div>
  </div></div>
  );
}