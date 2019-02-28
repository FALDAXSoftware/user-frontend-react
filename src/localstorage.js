// import localstorage from 'localstorage';


export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState) {
      var temp = JSON.parse(serializedState);
      return temp

      // return JSON.parse(serializedState);
    } else {
      return undefined;
    }

  } catch (err) {
    return err;
  }

}

export const saveState = (state) => {
  try {
    let stateCopy = { ...state }
    // delete stateCopy.walletReducer.cryptoPair;
    console.log("---------------", state);

    const serializedState = JSON.stringify(stateCopy);
    /* console.log(serializedState); */
    localStorage.setItem('state', serializedState);
  } catch (err) { }

}