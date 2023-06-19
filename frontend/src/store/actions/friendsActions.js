import { openAlertMessage } from './alertActions'
import * as api from '../../api';
// import closeDialogHandler from '../../closeDialogHandler'

export const friendsActions = {
    SET_FRIENDS: 'FRIENDS.SET_FRIENDS',
    SET_PENDING_FRIEND_INVITATIONS: 'FRIENDS.SET_PENDING_FRIEND_INVITATIONS',
    SET_ONLINE_USERS: 'FRIENDS.SET_ONLINE_USERS'
}

export const getActions = (dispatch) => {
    return {
        sendFriendInvitation: (data, closeDialogHandler) => dispatch(sendFriendInivitions(data, closeDialogHandler)),
    }
}

const sendFriendInivitions = (data, closeDialogHandler) => {
    console.log('data', data)
    return async (dispatch) => {
        const response = await api.sendFriendInvitation(data);

        if (response.error) {
            dispatch(openAlertMessage(response.exception?.response?.data))
        } else {
            dispatch(openAlertMessage('Invitation has been sent!'))
            closeDialogHandler()
        }
    }
}