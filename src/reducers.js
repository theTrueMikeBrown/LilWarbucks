const initialState = {
  firebase: {},
  user: null,
  viewingAccount: true,
  viewingLink: false,
  viewingShare: false,
  connected: false,
  linkedAccount: null,
  children: null,
}

export function rootReducer(state = initialState, action) {  
  var obj;
  switch (action.type) {
    case 'show-share': {
      obj = Object.assign({}, state, { viewingShare: true, viewingLink: false, viewingAccount: false });
      return obj;
    }
    case 'show-link-to-account': {
      obj = Object.assign({}, state, { viewingShare: false, viewingLink: true, viewingAccount: false });
      return obj;
    }
    case 'show-account': {
      obj = Object.assign({}, state, { viewingShare: false, viewingLink: false, viewingAccount: true });
      return obj;
    }
    case 'change-link': {      
      obj = Object.assign({}, state, { viewingShare: false, viewingLink: false, viewingAccount: true });
      return obj;
    }
    default:
      return state;
  }
}