function getEmail(text: string) {
  if (text) {
    return text.split("<")[1].slice(0, -1).toLowerCase() || "";
  }
}

export default getEmail;
