interface IUserData {
  title: string;
  credentials: ICredentials;
  successMessage: string;
}

const message =
  "Successfully registered! Please, click Back to return on login page";
interface ICredentials {
  username: string;
  password: string;
}
const validTestData: IUserData[] = [
  {
    credentials: {
      username: "Andrei12345678 !@#S",
      password: "Andrei12345678 !@#S",
    },
    successMessage: message,
    title: "Register with  smoke creentials",
  },
  {
    credentials: { username: "Emy", password: "123456Aa" },
    successMessage: message,
    title: "Register with min valid creentials",
  },
  {
    credentials: {
      username: "Andrei12345678 !@#S aaaaaaaaaaaaaaaaaaaaa",
      password: "123456Aaaaaaaaaaaaaa",
    },
    successMessage: message,
    title: "Register with max valid creentials",
  },
];

export default validTestData;
