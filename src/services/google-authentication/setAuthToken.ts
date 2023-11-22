export default function setAuthToken(): void {
  const fragment: string = window.location.hash.substring(1);
  const urlParams = new URLSearchParams(fragment);
  const access_token: string | null = urlParams.get("access_token");

  if (access_token) {
    sessionStorage.setItem("token", access_token);
  }
}

