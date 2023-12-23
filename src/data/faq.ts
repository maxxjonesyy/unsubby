const faq = [
  {
    question: "How does Unsubby work?",
    answer:
      "Simply login with with your Google account (an authentication service provided by Google themselves) and you are able to fetch your current subscriptions. The unsubscribe links which are usually hidden, or a pain to find are now listed, you can click on these and swiftly unsubscribe from whichever ones you wish.",
  },
  {
    question: "How do we store your data?",
    answer:
      "WE DO NOT! This website functions via sessionStorage which is completely local to your current tab within your browser, the second you close the tab your information is cleared.",
  },
  {
    question: "Why am I getting an error?",
    answer:
      "In the nature of how we store your access token, they can expire. If you are getting an error, trying closing the tab and re-opening it.",
  },
  {
    question: "Can I use another email provider?",
    answer:
      "At the current moment in time we only support Gmail, this may change further in the future.",
  },
];

export default faq;
