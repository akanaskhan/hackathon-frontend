const DEV_URL = "http://localhost:4003/";
const PROD_URL = "https://hackathon-backend-olive.vercel.app/";

export const BASE_URL = PROD_URL;

export const ApiRoutes = {
  user: {
    login: BASE_URL + "api/user/login-user",
    register: BASE_URL + "api/user/register-user",
    updateProfile: BASE_URL + "api/user/update-profile",
    forgotPassword: BASE_URL + "api/user/forgot-password",
    resetPassword: BASE_URL + "api/user/reset-password",
    updatePassword: BASE_URL + "api/user/update-password",
    getAllUsers: BASE_URL + "api/user/get-users",
    getUser: BASE_URL + "api/user/get-user",
  },
};
export default ApiRoutes;
