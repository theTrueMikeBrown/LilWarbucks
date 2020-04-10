import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {LogoutIcon} from './LilWarbucksIcon';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LinkIcon from '@material-ui/icons/Link';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ShareIcon from '@material-ui/icons/Share';
import { useFirebase } from 'react-redux-firebase'
import { useDispatch } from 'react-redux'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #4caf50',
    background: '#f3faf4',
    color: '#1b5e20',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
      color: '#1b5e20',
    },
  },
}))(MenuItem);

export function Menus() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const firebase = useFirebase();
  const dispatch = useDispatch();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const logOutClick = event => {
    firebase.logout()
    setAnchorEl(null);
  };

  const linkToAccountClick = event => {
    dispatch({ type: 'show-link-to-account' });
    setAnchorEl(null);
  };

  const shareClick = event => {
    dispatch({ type: 'show-share' });  
    setAnchorEl(null);  
  };

  const addChildClick = event => {
    dispatch({ type: 'add-child' });  
    setAnchorEl(null);  
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
              aria-label="menu"
              aria-controls="customized-menu"
              aria-haspopup="true"
              variant="contained"
              onClick={handleClick}
              color="inherit"
              >
              <MenuIcon />
      </IconButton>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={addChildClick}>
          <ListItemIcon>
            <PersonAddIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Add Child" />
        </StyledMenuItem>
        <StyledMenuItem onClick={linkToAccountClick}>
          <ListItemIcon>
            <LinkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Link to account" />
        </StyledMenuItem>
        <StyledMenuItem onClick={shareClick}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Share" />
        </StyledMenuItem>
        <StyledMenuItem onClick={logOutClick}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
