import api from './api';

class UserService {
    getOne(user_id) {
        return api.get(`/users/${user_id}`);
    }
    toggleNotification(user_id, action) {
        return api.put(`/users/${user_id}/notification/${action}`)
    }
    regenerateExternal(user_id) {
        return api.put(`/users/${user_id}/external/regenerate`)
    }
    updatePassword(user_id, password, new_password, new_password_confirm) {
        return api.put(`/users/${user_id}/update-password`, {
            current_password: password,
            new_password: new_password,
            new_password_confirm: new_password_confirm,
        })
    }
    updatePlan(user_id, plan_id) {
        return api.put(`/users/${user_id}/plan/update`, {
            plan_id: plan_id,
        })
    }
}

export default new UserService();