import { useDispatch } from "react-redux";
import { refreshLogin } from "../redux/UserSlice";

const useRefresh = () => {
  const dispatch = useDispatch();
  const refresh = async () => {
    try {
      // Dispatch refreshLogin and await its completion
      const resultAction = await dispatch(refreshLogin()).unwrap(); // Unwrap helps with error handling in thunks
      console.log("Token refreshed", resultAction);
      return resultAction.accessToken; // Ensure you return the access token if needed
    } catch (error) {
      console.error("Failed to refresh token", error);
      throw error; // Optionally re-throw to let the caller handle it
    }
  };

  return refresh;
};

export default useRefresh;
