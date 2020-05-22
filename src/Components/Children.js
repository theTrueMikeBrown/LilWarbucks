import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { useFirebaseConnect, useFirebase } from 'react-redux-firebase'
import { GridList, GridListTile, Button, TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import useOutsideClick from "../Helpers/useOutsideClick";

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
  const ref = useRef();
  const classes = useStyles();
  const auth = useSelector(state => state.firebase.auth);
  const firebase = useFirebase()
  
  var uid = auth.uid;
  useFirebaseConnect([`children/${uid}`]);
  const allChildren = useSelector(state => state.firebase.ordered.children);
  const children = (allChildren && allChildren[uid]) || [];
  const kids = children.map(c => c.value);
  const [selectedChild, setSelectedChild] = useState({});
  const [selectedAccount, setSelectedAccount] = useState({});
  const [delta, setDelta] = useState('');
  const [newAccountName, setNewAccountName] = useState('');
  const childClick = (name) => {    
    let filtered = kids.filter(k => k.name === name) || [{}];
    setSelectedChild(filtered[0]);
  };

  let clearSelectedAccount = () => setSelectedAccount({});
  let clearSelectedChild = () => setSelectedChild({});
  let clearNewAccountName = () => setNewAccountName('');
  

  useOutsideClick(ref, () => {
    clearSelectedAccount();
    clearSelectedChild();
  });

  const accountEditClick = (title) => {    
    let newAccount = selectedChild.accounts[title];
    if (newAccount !== selectedAccount) {
      setSelectedAccount(newAccount);
    }
    else {
      clearSelectedAccount();
    }
  };

  const accountEditSaveClick = (accountName, childName, delta) => {
    var modChild = Object.assign({}, selectedChild);
    if (!selectedChild.accounts) {
      modChild.accounts = [];
    }
    let current = modChild.accounts[accountName] ? parseFloat(modChild.accounts[accountName].val) : 0.0
    let newVal = (current + delta).toFixed(2);
    firebase.set(`children/${uid}/${childName}/accounts/${accountName}`, { title: accountName, val: newVal })
    modChild.accounts[accountName] = { title: accountName, val: newVal }
    setSelectedChild(modChild);
    clearSelectedAccount();
  };

  const accountDeleteClick = (accountName, childName) => {
    if (selectedChild.accounts[accountName]) {
      firebase.remove(`children/${uid}/${childName}/accounts/${accountName}`)
      var modChild = Object.assign({}, selectedChild)
      delete modChild.accounts[accountName]
      setSelectedChild(modChild)
    }
    clearSelectedAccount()
  }

  const accountAddClick = (accountName, childName) => {
    var modChild = Object.assign({}, selectedChild);
    if (!selectedChild.accounts) {
      modChild.accounts = [];
    }
    if (!modChild.accounts[accountName]) {
      firebase.uniqueSet(`children/${uid}/${childName}/accounts/${accountName}`, { title: accountName, val: '0.00' })
      modChild.accounts[accountName] = { title: accountName, val: '0.00' }
      setSelectedChild(modChild);
    }
    clearNewAccountName();
  };

  return (selectedChild.name ?      
        <div ref={ref} className={classes.rightWidth}>
          <div className={classes.kid}>
            <h1 className={classes.kidName}>{selectedChild.name}</h1>            
            <div className={classes.accounts}>
            { selectedChild.accounts ?
              Object.values(selectedChild.accounts).map(account =>
              <div key={account.title} className={classes.account}>
                <div className="hider">
                  <strong>{account.title}</strong> : <span>{account.val}</span>
                  <IconButton
                          aria-label="edit"
                          aria-controls={account.title + "-edit"}
                          variant="contained"
                          onClick={(e) => accountEditClick(account.title, selectedChild.name)}
                          color="inherit">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    aria-controls={account.title + "-delete"}
                    variant="contained"
                    onClick={(e) => accountDeleteClick(account.title, selectedChild.name)}
                    color="inherit"
                    disabled={selectedAccount.title !== account.title}>
                      <DeleteIcon />
                  </IconButton>                
                </div>

                <div>
                  <div className="hider">
                    {(selectedAccount.title === account.title) && 
                    <TextField 
                      id={account.title + "-edit-text"}
                      label="Earned/Lost"
                      type="number"                      
                      onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                          accountEditSaveClick(account.title, selectedChild.name, parseFloat(delta));
                          ev.preventDefault();
                        }                        
                      }}
                      onChange={e => setDelta(e.target.value)} />
                    }
                    <IconButton
                      aria-label="save"
                      aria-controls={account.title + "-edit"}
                      variant="contained"
                      onClick={(e) => accountEditSaveClick(account.title, selectedChild.name, parseFloat(delta))}
                      color="inherit"
                      disabled={selectedAccount.title !== account.title}>
                      <DoneIcon />
                    </IconButton>
                  </div>
                </div>                
              </div>
            ) :
            <div><i>no accounts</i></div> }
              <div className={classes.account}>
                <IconButton
                  aria-label="Add Account"
                  aria-controls="newAccountNameButton"
                  variant="contained"
                  onClick={(e) => accountAddClick(newAccountName, selectedChild.name)}
                  color="inherit"
                  disabled={newAccountName === ""}>
                  <AddBoxIcon />
                </IconButton>                
                <TextField 
                      id="newAccountName-Text"
                      label="Add an account"
                      type="string"
                      onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                          accountAddClick(newAccountName, selectedChild.name);
                          ev.preventDefault();
                        }                        
                      }}
                      onChange={e => setNewAccountName(e.target.value)}
                      value={newAccountName} />
              </div>
            </div>
          </div>
        </div> :
    <GridList ref={ref} className={classes.array}
                    cellHeight='auto'>{kids.map(kid =>
    <GridListTile key={kid.name}>
      <Button onClick={(e) => childClick(kid.name)} className={classes.noShow} fullWidth={true}>
        <div className={classes.kid}>
          <h1 className={classes.kidName}>{kid.name}</h1>
          { kid.accounts ?
            <div className={classes.accounts}>{Object.values(kid.accounts).map(account =>
              <div key={account.title} className={classes.account}><strong>{account.title}</strong> : <span>{account.val}</span></div>
            )}</div> :
            <div><i>no accounts</i></div> }
        </div>      
      </Button>
    </GridListTile>
  )}</GridList>);
}