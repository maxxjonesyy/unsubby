const faq = [
  {
    question: "How does Unsubby work?",
    answer:
      "Simply login with with your Google account (an authentication service provided by Google themselves) and you are able to fetch your current subscriptions. The unsubscribe links which are usually hidden, or a pain to find are now listed, you can click on these and swiftly unsubscribe from whichever ones you wish.",
  },
  {
    question: "Do we store your data?",
    answer:
      "We don't store any personal data in our database. We only store your list of subscriptions, everything else you can find within your localStorage (browser)",
  },
  {
    question: "Why am I getting an error?",
    answer:
      "Access tokens used to fetch your emails are very short lived. If you are getting an error there is high change it has expired and you will just need to log in again.",
  },
  {
    question: "Can I use another email provider?",
    answer:
      "At the current moment in time we only support Gmail, this may change further in the future.",
  },
];

export default faq;
