export default function getHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
  };
}
