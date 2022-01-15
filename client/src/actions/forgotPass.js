import * as api from "../api/index.js";

export const resetPasswordClient =
  (newPassword, id, token, navigate) => async (dispatch) => {
    try {
      const { data } = await api.resetPasswordClient(newPassword, id, token);
      if (data.error) {
        alert(data.message);
      } else {
        navigate("/");
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
