import decode from "jwt-decode";
class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token ? true : false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  login(idToken, history) {
    localStorage.setItem("id_token", idToken);
    history("/home");
    // window.location.assign("/home");
  }

  logout(history) {
    localStorage.removeItem("id_token");
    // window.location.assign("/");
    history("/");
  }
}

export default new AuthService();
