import Api from "../Axios/Api";
const USER_API = "/users";
const register = async (user) => {
  return await Api.post(USER_API, user);
};
const login = async (user) => {
  return await Api.post(USER_API + "/login", user);
};
const loginClient = async (user) => {
  return await Api.post(USER_API + "/loginclient", user);
};
const logout = async () => {
  localStorage.removeItem("CC_Token");
};
export const AuthService = {
  register,
  login,
  loginClient,
  logout,
};
