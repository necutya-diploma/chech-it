import axiosInstance from "./api";
import TokenService from "./token"
import EventBus from "../eventBus";;

const setup = (store) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },

        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },

        async (err) => {
            const originalConfig = err.config;
            if (originalConfig && originalConfig.url !== "/sign-in" && originalConfig.url !== "/sign-up" && err.response) {

                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    try {
                        const user_id = TokenService.getUser().id
                        const rs = await axiosInstance.post(`users/${user_id}/refresh`, {
                            refresh_token: TokenService.getLocalRefreshToken(),
                        });

                        const access_token = rs.data.access_token;
                        store.dispatch('auth/refreshToken', access_token);
                        TokenService.updateLocalAccessToken(access_token);
                        TokenService.updateResfreshToken(rs.data.refresh_token);

                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
                if (err.response.status === 406 && !originalConfig._stop) {
                    EventBus.dispatch("logout");
                    originalConfig._stop = true;
                }
            }
            return Promise.reject(err);
        }
    );
};
export default setup;