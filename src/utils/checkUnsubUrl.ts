export default function checkUnsubUrl(input: string) {
  const linkRegex = /<\s*(https:[^>]+|mailto:[^>]+)\s*>/g;
  const matches = input.match(linkRegex);

  if (!matches) {
    return null;
  }

  type linksObject =
    | {
        https: string[];
        mailto: string[];
      }
    | never;

  const linksObject: linksObject = {
    https: [],
    mailto: [],
  };

  matches.forEach((match) => {
    const isHttps = match.includes("https");
    const linkValue = match.slice(1, -1);

    if (isHttps) {
      linksObject.https.push(linkValue);
    } else {
      linksObject.mailto.push(linkValue);
    }
  });

  return linksObject;
}
