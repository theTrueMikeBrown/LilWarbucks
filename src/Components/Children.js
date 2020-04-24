import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { useFirebaseConnect } from 'react-redux-firebase'
import { GridList, GridListTile, Button, TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';

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
    textAlign: 'center',
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
  },
  rightWidth: {
    padding: '1em',
    paddingTop: '3em',
    width: '50%',
    margin: 'auto',
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
  const [selectedChild, setSelectedChild] = useState({});
  const [selectedAccount, setSelectedAccount] = useState({});
  const childClick = (name) => {    
    let filtered = kids.filter(k => k.name === name) || [{}];
    setSelectedChild(filtered[0]);
  };

  const accountEditClick = (title) => {    
    let filtered = selectedChild.accounts.filter(k => k.title === title) || [{}];
    setSelectedAccount(filtered[0]);
  };

  const accountEditSaveClick = (title) => {    
    //todo: actually save
    setSelectedAccount({});
  };

  const accountEditDeleteClick = (title) => {
    //todo: actually delete
    setSelectedAccount({});
  };

  return (selectedChild.name ?      
        <div className={classes.rightWidth}>
          <div className={classes.kid}>
            <h1 className={classes.kidName}>{selectedChild.name}</h1>
            <div className={classes.accounts}>{selectedChild.accounts.map(account =>
              <div key={account.title} className={classes.account}>
                <div>
                <strong>{account.title}</strong> : <span>{account.val}</span>
                <IconButton
                        aria-label="edit"
                        aria-controls={account.title + "-edit"}
                        variant="contained"
                        onClick={(e) => accountEditClick(account.title)}
                        color="inherit">
                  <EditIcon />
                </IconButton>
                {(selectedAccount.title === account.title) && <IconButton
                  aria-label="delete"
                  aria-controls={account.title + "-delete"}
                  variant="contained"
                  onClick={(e) => accountEditDeleteClick(account.title)}
                  color="inherit">
                    <DeleteIcon />
                  </IconButton>
                }
                </div>

                {(selectedAccount.title === account.title) && <div>
                    <div>
                      <TextField 
                        id={account.title + "-edit-text"}
                        label="Earned/Lost"
                        type="number" />
                      <IconButton
                        aria-label="save"
                        aria-controls={account.title + "-edit"}
                        variant="contained"
                        onClick={(e) => accountEditSaveClick(account.title)}
                        color="inherit">
                        <DoneIcon />
                      </IconButton>
                    </div>
                  </div>
                }
              </div>
            )}</div>
          </div>
        </div> :
    <GridList className={classes.array}
                    cellHeight='auto'>{kids.map(kid =>
    <GridListTile key={kid.name}>
      <Button onClick={(e) => childClick(kid.name)} className={classes.noShow} fullWidth={true}>
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