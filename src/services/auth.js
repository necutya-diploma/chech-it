import api from './api';
import TokenService from "./token";

class AuthService {
    login(user) {
        return api
            .post('/sign-in', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                TokenService.setUser(response.data.user);
                TokenService.setTokens(response.data.tokens);
                return response.data;
            });
    }
    confirmEmail(email, code) {
        return api
            .post(`/users/${email}` + '/confirm',  {code: code});
    }
    logout(user) {
        return api
            .delete(`/users/${user.id}` + '/sign-out')
            .then(_ => {
                TokenService.removeUser();
                TokenService.removeTokens();
            });
    }
    register(user) {
        return api.post('/sign-up', {
            first_name: user.firstName,
            last_name: user.lastName,
            phone: user.phone,
            email: user.email,
            password: user.password,
            receive_notification: user.receive_notification
        });
    }
    forgotPassword(email) {
        return api
            .get(`/users/${email}` + '/password-reset');
    }
    confirmPasswordReset(email, code) {
        return api
            .post(`/users/${email}` + '/password-reset/confirm',  {code: code});
    }
    resetPassword(email, password, passwordConfirm) {
        return api
            .post(`/users/${email}/` + 'password-reset',  {password: password, password_confirm: passwordConfirm});
    }
}

export default new AuthService();