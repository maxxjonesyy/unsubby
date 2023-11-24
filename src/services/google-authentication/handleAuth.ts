export default async function handleAuth() {
  const oauth2Endpoint: string = "https://accounts.google.com/o/oauth2/v2/auth";

  const form = document.createElement("form");
  form.setAttribute("method", "GET");
  form.setAttribute("action", oauth2Endpoint);

  const params: Record<string, string> = {
    client_id: import.meta.env.VITE_G_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_REDIRECT_URI,
    response_type: "token",
    scope: import.meta.env.VITE_G_SCOPES,
  };

  // Add form parameters hidden input values.
  for (const p in params) {
    const input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", p);
    input.setAttribute("value", params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);

  try {
    sessionStorage.setItem('authHasRun', 'true');
    form.submit();
  } catch (error) {
    console.error(error);
  }
}
