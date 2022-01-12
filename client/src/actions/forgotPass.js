import * as api from '../api/index.js';

export const resetPasswordClient = (newPassword, id, token, navigate) => async (dispatch) => {
    try {
        const {data} = await api.resetPasswordClient(newPassword, id, token);
        console.log(data);
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}