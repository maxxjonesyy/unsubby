const faq = [
  {
    question: "How do I use this?",
    answer:
      "Log in, click the provided links to unsubscribe. Afterward, select and delete the ones you've unsubscribed from, and we'll take care of removing those from your inbox.",
  },
  {
    question: "How does Unsubby work?",
    answer:
      "Simply log in with your Google account, utilizing the authentication service provided by Google. Once logged in, you can fetch your current subscriptions. The usually hidden or hard-to-find unsubscribe links are now conveniently listed, allowing you to swiftly unsubscribe from the ones you choose.",
  },
  {
    question: "Do we store your data?",
    answer:
      "No personal data is stored in our database. We only retain your list of subscriptions. Everything else, including your information, is kept within your browser's sessionStorage and is deleted each time you close your tab.",
  },
  {
    question: "Why am I getting an error?",
    answer:
      "Access tokens used to fetch your emails have a short lifespan. If you encounter an error, there's a high chance it has expired, and you'll need to log in again.",
  },
  {
    question: "Can I use another email provider?",
    answer:
      "Currently, we exclusively support Gmail. However, this may change in the future as we continue to improve and expand our service.",
  },
];

export default faq;
