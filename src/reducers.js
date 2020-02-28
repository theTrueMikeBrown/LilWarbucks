const initialState = {
  firebase: {},
  user: null,
  viewingAbout: false,
  connected: false,
  linkedAccount: null,
  children: null,
}

function rootReducer(state = initialState, action) {  
  switch (action.type) { 
    case 'UPDATE_FOO': {
      return Object.assign({}, state, {foo: action.value})
    }   
    default:
      return state
  }
}

export default rootReducer;