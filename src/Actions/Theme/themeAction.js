console.log("ABCD" )
export const darkTheme = (value) => dispatch => {
    dispatch({
        type: 'FALDAXTHEME',
        payload: value
    })
}