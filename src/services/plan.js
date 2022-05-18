import api from './api';

class PlanService {
    getAll() {
        return api.get('/plans');
    }
    getOne(plan_id) {
        return api.get(`/plans/${plan_id}`);
    }
}

export default new PlanService();