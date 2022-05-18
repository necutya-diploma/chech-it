class TokenService {
    getLocalRefreshToken() {
        const tokens = JSON.parse(localStorage.getItem("tokens"));
        if (tokens) {
            return tokens.refresh_token;
        }
        return '';
    }
    getLocalAccessToken() {
        const tokens = JSON.parse(localStorage.getItem("tokens"));
        if (tokens) {
            return tokens.access_token;
        }
        return '';
    }
    updateLocalAccessToken(token) {
        let tokens = JSON.parse(localStorage.getItem("tokens"));
        tokens.access_token = token;
        localStorage.setItem("tokens", JSON.stringify(tokens));
    }
    updateResfreshToken(token) {
        let tokens = JSON.parse(localStorage.getItem("tokens"));
        tokens.refresh_token = token;
        localStorage.setItem("tokens", JSON.stringify(tokens));
    }
    setTokens(tokens) {
        localStorage.setItem("tokens", JSON.stringify(tokens));
    }
    removeTokens() {
        localStorage.removeItem("tokens");
    }
    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
    setUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }
    removeUser() {
        localStorage.removeItem("user");
    }
}

export default new TokenService();