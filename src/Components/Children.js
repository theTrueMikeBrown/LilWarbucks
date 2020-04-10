import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { useFirebaseConnect } from 'react-redux-firebase'
import { GridList, GridListTile, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  array: {    
    padding: '.75em',    
    [theme.breakpoints.up(700)]: {
      width: '75%',
      maxWidth: '80em',
      margin: 'auto !important',
      paddingTop: '1.5em'
    },
  },
  kid: {
    border: '1px #1b5e20 solid',
    background: '#f8fff9',
    margin: '.5em',
    padding: '0',
    textTransform: 'none',
    width: '100%',
    fontSize: '90%',
    [theme.breakpoints.up(700)]: {
      fontSize: '110%',
    },
    [theme.breakpoints.up(1000)]: {
      fontSize: '150%',
    },    
    [theme.breakpoints.up(1500)]: {
      fontSize: '175%',
    },
  },  
  kidName: {
    margin: '0',
    padding: '0',
    borderBottom: '1px #1b5e20 solid',
    [theme.breakpoints.up(700)]: {
      padding: '.25em',
    },
  },
  accounts: {
    marginLeft: '.5em',
    marginTop: '.5em',
    textAlign: 'left',
  },
  account: {
    amarginBottom: '.5em',
    [theme.breakpoints.up(700)]: {
      margin: '.5em',
      fontSize: '110%',
    },
  },
  noShow: {
    padding: '0',
    [theme.breakpoints.up(700)]: {
      padding: '1em',
    },
  }
}));

export function Children() {
  const classes = useStyles();
  const auth = useSelector(state => state.firebase.auth);
  
  var uid = auth.uid;
  useFirebaseConnect([`children/${uid}`]);
  const allChildren = useSelector(state => state.firebase.ordered.children);
  const children = (allChildren && allChildren[uid]) || [];
  const kids = children.map(c => c.value);

  const childClick = () => {
    
  };

  return (<GridList className={classes.array}
                    cellHeight='auto'>{kids.map(kid =>
    <GridListTile key={kid.name}>
      <Button onClick={childClick} className={classes.noShow} fullWidth={true}>
        <div className={classes.kid}>
          <h1 className={classes.kidName}>{kid.name}</h1>
          <div className={classes.accounts}>{kid.accounts.map(account =>
            <div key={account.title} className={classes.account}><strong>{account.title}</strong> : <span>{account.val}</span></div>
          )}</div>
        </div>      
      </Button>
    </GridListTile>
  )}</GridList>);
}