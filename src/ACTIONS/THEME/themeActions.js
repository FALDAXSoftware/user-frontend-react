/*  
    Action :  This action is called to change theme of whole wesite (Day/Night Mode).
*/
export const darkTheme = (value) => dispatch => {
    dispatch({
        type: 'FALDAXTHEME',
        payload: value
    })
}