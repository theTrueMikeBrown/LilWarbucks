import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import EmailIcon from '@material-ui/icons/Email';
import { Button } from '@material-ui/core';
import { LilWarbucksIcon } from '../Components/LilWarbucksIcon';
import { useDispatch } from 'react-redux'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1b5e20',
    flexDirection: 'column',
  },
  button: {
    margin: theme.spacing(1),
  },
  twitterButton: {    
    backgroundColor: '#55acee',
    margin: theme.spacing(1),
  },
  facebookButton: {    
    backgroundColor: '#3B5998',
    margin: theme.spacing(1),
  },
  linkedInButton: {    
    backgroundColor: '#4875B4',
    margin: theme.spacing(1),
  },
  anchorButton: {
    textDecoration: 'none',
  },
  shareDiv: {
    display: 'flex',
  }
}));

export function SharePage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const returnToMainPage = event => {
    dispatch({ type: 'show-account' });
  };

  return (
  <div className={classes.paper}>
    <div className={classes.shareDiv}>
      <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Flilwarbucks.firebaseapp.com%2F&amp;text=Check%20out%20Lil'%20Warbucks!%0D%0ALil'%20Warbucks%20was%20created%20to%20help%20parents%20keep%20track%20of%20their%20children's%20finances."
         target="_blank"
         rel="noopener noreferrer"
         className={classes.anchorButton}>
        <Button variant="contained"
                aria-label="share-via-twitter"
                color="primary"
                className={classes.twitterButton}
                startIcon={<TwitterIcon />}
                >
          Twitter
        </Button>      
      </a>
    </div>
    <div>
      <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Flilwarbucks.firebaseapp.com"
         target="_blank"
         rel="noopener noreferrer"
         className={classes.anchorButton}>
        <Button variant="contained"
                aria-label="share-via-facebook"
                color="primary"
                className={classes.facebookButton}
                startIcon={<FacebookIcon />}
                >
          Facebook
        </Button>      
      </a>     
    </div>
    <div>
      <a href="mailto:theTrueMikeBrown@gmail.com?subject=Lil'%20Warbucks&amp;body=Check%20out%20Lil'%20Warbucks!%0D%0ALil'%20Warbucks%20was%20created%20to%20help%20parents%20keep%20track%20of%20their%20children's%20finances.%0D%0Ahttps%3A%2F%2Flilwarbucks.firebaseapp.com%2F"
         className={classes.anchorButton}>
        <Button variant="contained"
                aria-label="share-via-email"
                color="primary"
                className={classes.button}
                startIcon={<EmailIcon />}
                >
          Email
        </Button>      
      </a>
    </div>
    <hr />
    <div>
      <a className={classes.anchorButton}
         onClick={returnToMainPage} 
         href="#foo" >
        <Button variant="contained"
                aria-label="return-to-main-page"
                color="primary"
                className={classes.button}
                startIcon={<LilWarbucksIcon />}
                >
          Return to Main page
        </Button>      
      </a>
    </div>
  </div>
  );
}