import * as api from "../api/index.js";
import swal from "sweetalert";

export const resetPasswordClient =
  (newPassword, id, token, navigate) => async (dispatch) => {
    try {
      const { data } = await api.resetPasswordClient(newPassword, id, token);
      if (data.error) {
        swal(data.message, { icon: "warning" });
      } else {
        navigate("/");
        swal(data.message, { icon: "success" });
      }
    } catch (error) {
      console.log(error);
    }
};
