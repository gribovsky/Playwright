interface IUserData {
  title: string;
  credentials: ICredentials;
  resultMessage: string;
}

interface ICredentials {
  username: string;
  password: string;
}
const invalidTestData: IUserData[] = [
  {
    credentials: { username: "", password: "" },
    resultMessage: "Please, provide valid data",
    title: "Register without credentials",
  },
  {
    credentials: { username: "Andrei12345678 !@#S", password: "" },
    resultMessage: "Password is required",
    title: "Register without password",
  },
  {
    credentials: { username: "", password: "Andrei12345678 !@#S" },
    resultMessage: "Username is required",
    title: "Register without username",
  },

  {
    credentials: { username: "A        ", password: "123456Aa" },
    resultMessage: "Prefix and postfix spaces are not allowed is username",
    title: "Register with prefix spaces in username",
  },
  {
    credentials: { username: "An", password: "123456Aa" },
    resultMessage: "Username should contain at least 3 characters",
    title: "Register with too short username",
  },
  {
    credentials: { username: "Andrei12345678 !@#S", password: "12345" },
    resultMessage: "Password should contain at least 8 characters",
    title: "Register with too short password",
  },
  {
    credentials: { username: "Andrei12345678 !@#S", password: "12345AAA" },
    resultMessage:
      "Password should contain at least one character in lower case",
    title: "Register without lower case in password",
  },
];

export default invalidTestData;
