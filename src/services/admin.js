import api from './api';

class AdminService {
    getUsersReport() {
        return api.get('/admin/users-report');
    }
    getUserFeedbacks(user_id) {
        return api.get(`/admin/users/${user_id}/feedbacks`);
    }
    resolveUserFeedback(user_id, feedback_id) {
        return api.put(`/admin/users/${user_id}/feedbacks/${feedback_id}/resolve`);
    }
}

export default new AdminService();