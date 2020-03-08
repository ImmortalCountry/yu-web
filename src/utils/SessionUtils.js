export default {
  getUserInfo() {
    let user = JSON.parse(window.sessionStorage.getItem('user'));
    if (JSON.stringify(user) === "{}") {
      return null;
    }
    return user
  },
  setUserInfo(user) {
    window.sessionStorage.setItem('user', user);
  }
}
