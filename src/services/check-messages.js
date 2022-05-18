import api from './api';

class CheckMessageService {
    checkMessage(message, save_to_db) {
        return api.post(`/check-message`, {
            message: message,
            save_to_db: save_to_db,
        })
    }
}

export default new CheckMessageService();