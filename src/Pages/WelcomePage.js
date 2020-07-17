import React, { useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { LilWarbucksIcon } from '../Components/LilWarbucksIcon';
import { IconButton, TextField } from '@material-ui/core';
import { useFirebaseConnect, useFirebase } from 'react-redux-firebase'
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles = makeStyles(theme => ({
  content: {    
    width: '75%',
    lineHeight: '1.75em',
    fontSize: '125%',
  },
  p: {
    marginBottom: '.75em'
  },
  icon: {
    verticalAlign: 'sub',
  },
  fab: {
    color: '#e8f5e9',
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}));

export function WelcomePage() {
  const classes = useStyles();
  const auth = useSelector(state => state.firebase.auth)
  const firebase = useFirebase()
  const [newChildName, setNewChildName] = useState('');

  var uid = auth.uid;
  const users = useSelector(state => state.firebase.ordered.users);
  if(users) {

  }
  var me;
  var sameAs = (users && (me = users.find(u => u.key === uid)) && me.value && me.value.sameAs) || uid;
  
  useFirebaseConnect([`children/${sameAs}`]);
  const allChildren = useSelector(state => state.firebase.ordered.children);
  const children = (allChildren && allChildren[sameAs]) || [];
  const kids = children.map(c => c.value);

  const childAddClick = () => {    
    if (!kids.some((k) => k.name === newChildName)) {
      firebase.uniqueSet(`children/${sameAs}/${newChildName}`, { name: newChildName })
    }
  };

  return (<Fragment>
    <div className={classes.content}>
      <h2>Welcome to Lil' Warbucks, {auth.displayName}!</h2>
      <div className={classes.p}>Lil' Warbucks was created to help parents keep track of their children's finances.
        With this app, you can make each child as many accounts as they need and update them at any time from your phone
        or computer.</div>
      <div className={classes.p}>Press the add button <PersonAddIcon className={classes.icon} /> below to add your first child. Edit
        accounts by tapping the account info box and pressing the edit button <EditIcon className={classes.icon} />.</div>
      <div className={classes.p}>Once you have created accounts, click the about button <LilWarbucksIcon className={classes.icon} /> above to return to your accounts.      
      </div>
      <pre style={{display: "none"}}>{JSON.stringify(auth, null, 2)}</pre>
      
      <TextField
                id="newChildName-Text"
                label="Child to add"
                type="string"
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter') {
                    childAddClick(newChildName);
                    ev.preventDefault();
                  }
                }}
                onChange={e => setNewChildName(e.target.value)}
                value={newChildName} />                
      <IconButton
        aria-label="Add Child"
        aria-controls="newChildButton"
        variant="contained"
        onClick={(e) => {e.stopPropagation(); childAddClick(newChildName)}}
        color="inherit"
        disabled={newChildName === ""}
        className={classes.ButtonInKid}>
        <PersonAddIcon />
      </IconButton>

    </div>
  </Fragment>);
}
