import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

function LilWarbucksIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 512 512">      
      <path d="M255 58.6L49.2 164.9c-5 4-3.3 11-1 16.1 5.8 12.3 7.2 18 21.8 18h383c3.3 0 7 .2 10-1.3 6.3-3.1 13.3-17 13.9-23.7.7-8.8-4.3-10.2-10.9-13.9 0 0-192-100.4-197-101.5-4-1-10-.8-14 0zm9 36c6 .9 5.2 4.3 10 7.2l9 4.3c10 6.8 7.9 18.7-3 17.7-7-.7-10.6-8-15-8.8-2.7-.6-5.9 1.5-6.8 4-2 5.1 6.3 7.9 9.8 9 11.1 3.5 23.3 5.5 24 20 .3 7.8-2.1 14.7-9 19l-9.9 5c-3.4 2.4-4.4 5.5-7.2 6.3-4.1 1.3-6.5-3.2-10-5.6-5-3.5-14.7-3.6-18.7-13.7-.9-2.4-1-4.6.6-6.9 7.3-10.6 19.6 4 22.2 5.4 4 2 9 .7 11-3.5 1.6-4-1.9-6.7-5-8.2-7-3.3-15.5-3.8-22-8.6-8.7-6.5-9.3-20.3-1.8-28 4.3-4.4 9.5-5.2 12.7-7.3 4.4-2.8 3.6-5.4 9.1-7.2zM355 398l-61.5.2-8.7-149.4c-.4-5.6.6-9.8 5.2-13.2 4-2.9 8.1-2.6 8.8-7.6 1.3-8.3-5.5-9-11.8-9h-48c-5.4 0-16.3 0-15.6 8 .7 7.2 11 7.4 13.8 11.5 2.7 4-7.2 159.5-7.2 159.5h-62l-8-149c0-5.3-.3-8.8 4.1-12.7 4.1-3.7 9.3-3.2 10.4-8.3 1.7-7.5-6.1-9-11.5-9h-49c-5 0-13.9-.5-14.9 6-1 7.9 4.3 7 8.9 10.5 3.2 2.5 5.5 6.3 5.7 10.5l-8.1 139c-.4 3-.5 7.5-2.2 9.8-3.2 4.3-8 2.8-12.4 3.4-6.1.8-10.1 4.6-10.8 10.8-1.2 11.3 6.4 14 15.8 14h331c8 0 14.4-1.4 14.9-11v-5c-2.5-12.8-16.7-6.8-21.5-10.7-3.3-2.8-3.4-9.3-3.4-13.3l-7.8-138a14 14 0 016.8-10.2c3.2-2.1 8-3 7.8-8.8-.2-7.4-8.5-7-13.8-7h-47c-5 0-13.1-.4-14.5 6-1.5 6.8 5.6 7.5 9.5 10.5 4.3 3.4 5 6.3 5 11.5l-8 151zM69 435c-7.6 0-13.4.8-14 10-.5 9.9 3.2 13.9 13 14h385c3.5 0 7 .3 10-1.7 6-4 7-14.9 1.7-19.9-3.7-3.5-9-3.4-13.7-3.3L69 435z" fill="#FFF" stroke="#e8f5e9" stroke-width="10"/>
    </SvgIcon>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(6, 0, 3),
  },
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

export default function TopBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>        
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <LilWarbucksIcon className={classes.logo} />          
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Lil' Warbucks
        </Typography>
        {auth && (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
