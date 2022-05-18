import api from './api';

class FeedbackService {
    create(email, username, text, user_id) {
        return api.post(`/feedbacks`, {
            email: email,
            username: username,
            text: text,
            user_id: user_id,
        })
    }
}

export default new FeedbackService();