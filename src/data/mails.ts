export interface Mail {
  id: string;
  name: string;
  email: string;
  subject: string;
  text: string;
  date: string;
}

export const mails: Mail[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    subject: "Meeting Tomorrow",
    text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, John",
    date: "2023-06-12T10:00:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Project Update",
    text: "Hello team,\n\nI wanted to give you a quick update on the project status. We've made significant progress this week and are on track to meet our deadline. Here are the key points:\n\n1. Frontend development is 80% complete\n2. Backend API is fully implemented and tested\n3. Database optimization is in progress\n\nLet me know if you have any questions or concerns.\n\nBest, Jane",
    date: "2023-06-11T14:30:00Z",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    subject: "Vacation Request",
    text: "Dear HR,\n\nI would like to request vacation time from July 1st to July 10th. I've already discussed this with my team lead, and they've approved it.\n\nPlease let me know if you need any additional information from me.\n\nThank you, Bob",
    date: "2023-06-10T09:15:00Z",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@example.com",
    subject: "New Feature Proposal",
    text: "Hi team,\n\nI've been thinking about a new feature that could greatly improve our product. Here's a brief overview:\n\n- AI-powered content recommendations\n- Personalized user dashboard\n- Integration with popular third-party tools\n\nI believe these additions would significantly enhance user experience and set us apart from competitors. Let's discuss this in our next meeting.\n\nBest regards, Alice",
    date: "2023-06-09T16:45:00Z",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    subject: "Bug Report: Login Issues",
    text: "Hello dev team,\n\nSeveral users have reported issues with the login process on our mobile app. The specific problems include:\n\n1. Infinite loading screen after entering credentials\n2. Incorrect error messages for invalid passwords\n3. Unable to reset password through the 'Forgot Password' link\n\nPlease investigate these issues and provide an update on the fix timeline.\n\nThanks, Charlie",
    date: "2023-06-08T11:20:00Z",
  },
];

