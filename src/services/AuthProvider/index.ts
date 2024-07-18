import jwtDecode from "jwt-decode";
import { AuthProvider } from "react-admin";
import { getData, storeData } from "../../utils/storage";
import api from "../Axios";

export interface LoginData {
  username: string;
  password: string;
}

const getUser = async () => {
  const token = localStorage.getItem("AccessToken") || "";
  let decoded = {
    sub: "",
  };

  if (token) {
    decoded = jwtDecode(token);
  }

  const config = {
    method: "get",
    url: `users/${decoded.sub}`,
  };

  return api(config);
};

const identifier = async () => {
  const response = await getUser();
  const user = response.data.data;

  if (user) {
    return Promise.resolve({
      id: user.id,
      user_id: user.PhoneNumber,
      fullName: user.FullName,
      avatar: ""
    });
  } else {
    return Promise.resolve({
      id: "",
      user_id: "",
      fullName: "",
      avatar: "",
    });
  }
};

const authProvider: AuthProvider = {
  login: ({ PhoneNumber, Password, status }) => {
    const config = {
      method: "post",
      url: "auth/login",
      data: {
        PhoneNumber: PhoneNumber,
        Password: Password
      },
    };

    return api(config).then(
      (res: any) => {
        storeData("AccessToken", res.data.tokens.access.token)
        return Promise.resolve(res.data);
      },
      (err: any) => {
        return Promise.reject(err.response.data.message);
      }
    );
  },
  logout: () => {
    localStorage.removeItem("AccessToken");
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () =>
    getData("AccessToken")
      ? Promise.resolve()
      : Promise.reject(),

  getPermissions: () => {
    const token = getData("AccessToken")

    let decoded = {
      "sub": "",
      "role": [],
      "privilege": [],
      "iat": 0,
      "exp": 0,
      "type": ""
    };

    if (token) {
      decoded = jwtDecode(token);
      // let permission: string[] = []
      // permission[0] = decoded.role
      return Promise.resolve(decoded.privilege);
    }

    return Promise.reject();
  },
  getIdentity: () => identifier(),
};

export default authProvider;
