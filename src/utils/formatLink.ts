export default function formatLink(input: string) {
  const linkRegex = /<\s*(https:[^>]+|mailto:[^>]+)\s*>/g;
  const matches = input.match(linkRegex);

  if (!matches) {
    return null;
  }

  type linksObject =
    | {
        https: string[];
      }
    | never;

  const linksObject: linksObject = {
    https: [],
  };

  matches.forEach((match) => {
    const isHttps = match.includes("https");
    const linkValue = match.slice(1, -1);

    if (isHttps) {
      linksObject.https.push(linkValue);
    }
  });

  return linksObject;
}
