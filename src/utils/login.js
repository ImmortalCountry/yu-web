export default {
  getUserInfo() {
    let user = window.sessionStorage.getItem('user');
    return user
  },
  setUserInfo(user) {
    window.sessionStorage.setItem('user', user);
  }
}
