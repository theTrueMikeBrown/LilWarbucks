import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { useFirebaseConnect, useFirebase } from 'react-redux-firebase'
import { GridList, GridListTile, Button, TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import AddBoxIcon from '@material-ui/icons/AddBox';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonRemoveIcon from '@material-ui/icons/DeleteForever';
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
  modifyChildren: {
    background: '#fff5',
    padding: '0',
    textTransform: 'none',
    fontSize: '90%',
    margin: '.5em',
    paddingTop: '.5em',
    paddingBottom: '1em',
    width: 'auto',
    [theme.breakpoints.up(700)]: {
      fontSize: '110%',
    },
    [theme.breakpoints.up(1000)]: {
      fontSize: '150%'
    },
    [theme.breakpoints.up(1500)]: {
      fontSize: '175%',
      margin: '1em',
    },
  },
  grayTitle: {
    margin: '0',
    padding: '0',
    textAlign: 'center',
    [theme.breakpoints.up(700)]: {
      padding: '.25em',
    },
  },
  ButtonInKid: {
    transform: 'scale(0.7)',
    [theme.breakpoints.up(700)]: {
      transform: 'scale(0.8)',
    },
    [theme.breakpoints.up(1000)]: {
      transform: 'scale(0.9)',
    },
    [theme.breakpoints.up(1500)]: {
      transform: 'scale(1)',
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
    width: '85%',
    margin: 'auto',
    [theme.breakpoints.up(700)]: {
      width: '73%',
    },
    [theme.breakpoints.up(1000)]: {
      width: '61%',
    },
    [theme.breakpoints.up(1500)]: {
      width: '50%',
    },
  }
}));

export function Children() {
  const ref = useRef();
  const classes = useStyles();
  const auth = useSelector(state => state.firebase.auth);
  const firebase = useFirebase()

  var uid = auth.uid;
  const users = useSelector(state => state.firebase.ordered.users);
  var sameAs = (users && users.find(u => u.key === uid).value.sameAs) || uid;
  
  useFirebaseConnect([`children/${sameAs}`]);
  const allChildren = useSelector(state => state.firebase.ordered.children);
  const children = (allChildren && allChildren[sameAs]) || [];
  const kids = children.map(c => c.value);
  const [selectedChild, setSelectedChild] = useState({});
  const [selectedAccount, setSelectedAccount] = useState({});
  const [delta, setDelta] = useState('');
  const [newAccountName, setNewAccountName] = useState('');
  const [newChildName, setNewChildName] = useState('');
  const [removeChildName, setRemoveChildName] = useState('');
  const [isModifyingChild, setIsModifyingChild] = useState(false);
  const childClick = (name) => {
    let filtered = kids.filter(k => k.name === name) || [{}];
    setSelectedChild(filtered[0]);
  };

  const modifyChildrenClick = () => {
    setIsModifyingChild(true);
  };
  let clearSelectedAccount = () => setSelectedAccount({});
  let clearSelectedChild = () => setSelectedChild({});
  let clearNewAccountName = () => setNewAccountName('');
  let clearNewChildName = () => setNewChildName('');
  let clearRemoveChildName = () => setRemoveChildName('');


  useOutsideClick(ref, () => {
    clearSelectedAccount();
    clearSelectedChild();
    setIsModifyingChild(false);
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
    firebase.set(`children/${sameAs}/${childName}/accounts/${accountName}`, { title: accountName, val: newVal })
    modChild.accounts[accountName] = { title: accountName, val: newVal }
    setSelectedChild(modChild);
    clearSelectedAccount();
  };

  const accountDeleteClick = (accountName, childName) => {
    if (selectedChild.accounts[accountName]) {
      firebase.remove(`children/${sameAs}/${childName}/accounts/${accountName}`)
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
      firebase.uniqueSet(`children/${sameAs}/${childName}/accounts/${accountName}`, { title: accountName, val: '0.00' })
      modChild.accounts[accountName] = { title: accountName, val: '0.00' }
      setSelectedChild(modChild);
    }
    clearNewAccountName();
  };

  const childAddClick = (childName) => {
    //var modChildren = Object.assign({}, children);
    if (!kids.some((k) => k.name === childName)) {
      firebase.uniqueSet(`children/${sameAs}/${childName}`, { name: childName })
      //modChildren[childName] = { name: childName, accounts: [] }
    }
    clearNewChildName();
    setIsModifyingChild(false);
  };

  const childRemoveClick = (childName) => {
    //var modChildren = Object.assign({}, children);
    if (kids.some((k) => k.name === childName)) {
      firebase.remove(`children/${sameAs}/${childName}`)
      //delete modChildren[childName]
    }
    clearRemoveChildName();
    setIsModifyingChild(false);
  };

  return (selectedChild.name ?
    <div ref={ref} className={classes.rightWidth}>
      <div className={classes.kid}>
        <h1 className={classes.kidName}>{selectedChild.name}</h1>
        <div className={classes.accounts}>
          {selectedChild.accounts ?
            Object.values(selectedChild.accounts).map(account =>
              <div key={account.title} className={classes.account}>
                <div className="hider">
                  <strong>{account.title}</strong> : <span>{account.val}</span>
                  <IconButton
                    aria-label="edit"
                    aria-controls={account.title + "-edit"}
                    variant="contained"
                    onClick={(e) => accountEditClick(account.title, selectedChild.name)}
                    color="inherit"
                    className={classes.ButtonInKid}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    aria-controls={account.title + "-delete"}
                    variant="contained"
                    onClick={(e) => accountDeleteClick(account.title, selectedChild.name)}
                    color="inherit"
                    disabled={selectedAccount.title !== account.title}
                    className={classes.ButtonInKid}>
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
                      disabled={selectedAccount.title !== account.title}
                      className={classes.ButtonInKid}>
                      <DoneIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
            ) :
            <div><i>no accounts</i></div>}
          <div className={classes.account}>
            <IconButton
              aria-label="Add Account"
              aria-controls="newAccountNameButton"
              variant="contained"
              onClick={(e) => accountAddClick(newAccountName, selectedChild.name)}
              color="inherit"
              disabled={newAccountName === ""}
              className={classes.ButtonInKid}>
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
    </div > :
    <GridList ref={ref} className={classes.array}
      cellHeight='auto'>{kids.map(kid =>
        <GridListTile key={kid.name}>
          <Button onClick={(e) => childClick(kid.name)} className={classes.noShow} fullWidth={true}>
            <div className={classes.kid}>
              <h1 className={classes.kidName}>{kid.name}</h1>
              {kid.accounts ?
                <div className={classes.accounts}>{Object.values(kid.accounts).map(account =>
                  <div key={account.title} className={classes.account}><strong>{account.title}</strong> : <span>{account.val}</span></div>
                )}</div> :
                <div><i>no accounts</i></div>}
            </div>
          </Button>
        </GridListTile>
      )}
      <GridListTile>
        <Button onClick={(e) => modifyChildrenClick()} className={classes.noShow} fullWidth={true}>
          {( isModifyingChild ?
                <div className={classes.kid}>
            <h2 className={classes.grayTitle}>Modify Children</h2>
            <div>
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
            </div>
            <div>
              <IconButton
                aria-label="remove"
                aria-controls={"child-remove"}
                variant="contained"
                onClick={(e) => {e.stopPropagation(); childRemoveClick(removeChildName)}}
                color="inherit"
                disabled={removeChildName === ""}
                className={classes.ButtonInKid}>
                <PersonRemoveIcon />
              </IconButton>
              <TextField
                id="removeChildName-Text"
                label="Child to remove"
                type="string"
                onChange={e => setRemoveChildName(e.target.value)}
                value={removeChildName} />
            </div>
            <div>&nbsp;</div>
          </div> :
          <div className={classes.kid}>
            <h2 className={classes.kidName}>Modify Children</h2>
            <div className={classes.accounts}>
              <div className={classes.account}>Add or remove Children.</div>
            </div>
          </div>
          )}
        </Button>
      </GridListTile>
    </GridList>);
}