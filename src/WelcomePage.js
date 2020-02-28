import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import LilWarbucksIcon from './LilWarbucksIcon';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


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

function WelcomePage() {
  const classes = useStyles();
  const auth = useSelector(state => state.firebase.auth)

  return (<Fragment>
    <div className={classes.content}>
      <h2>Welcome to Lil' Warbucks, {auth.displayName}!</h2>
      <div className={classes.p}>Lil' Warbucks was created to help parents keep track of their children's finances.
        With this app, you can make each child as many accounts as they need and update them at any time from your phone
        or computer.</div>
      <div className={classes.p}>Press the add button <AddIcon className={classes.icon} /> below to add children. Edit
        accounts by tapping the account info box and pressing the edit button <EditIcon className={classes.icon} />.</div>
      <div className={classes.p}>Click the about button <LilWarbucksIcon className={classes.icon} /> above for more info.
      </div>
      <pre style={{display: "none"}}>{JSON.stringify(auth, null, 2)}</pre>
    </div>
    <Fab className={classes.fab} color="secondary" aria-label="add child">
      <AddIcon />
    </Fab>
  </Fragment>);
}

export default WelcomePage