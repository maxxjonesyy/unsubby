export default function logoutUser() {
  sessionStorage.clear();
  window.location.reload();
}
