import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import { makeStyles } from '@material-ui/core/styles';
import WelcomePage from './WelcomePage';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1b5e20'
  },
}));

function Children() {
  const classes = useStyles();
  const children = useSelector(state => state.children)

  return (
  <div className={classes.paper}>Children</div>
  )
}

export default Children