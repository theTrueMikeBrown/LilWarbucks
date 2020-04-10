import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { LilWarbucksIcon } from './LilWarbucksIcon'
import { useSelector } from 'react-redux';
import { Menus } from './Menus';

const useStyles = makeStyles(theme => ({
  logo: {
    verticalAlign: 'middle',
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

export function TopBar() {
  const classes = useStyles();
  const auth = useSelector(state => state.firebase.auth)

  return (
    <AppBar position="static">
      <Toolbar>        
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <LilWarbucksIcon className={classes.logo} />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Lil' Warbucks
        </Typography>
        {(auth && !auth.isEmpty) && (
          <div>
            <Menus />
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
