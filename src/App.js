import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopBar from './TopBar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBar />
    </div>
  );
}
