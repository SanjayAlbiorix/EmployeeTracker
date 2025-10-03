import { APIManager, RequestType } from "./ServiceManager";
import { UsersType } from "./types";

export const callAPI = (): Promise<UsersType> => {
  let data = {
    url: "https://reqres.in/api/users",
    body: undefined,
  };

  return APIManager(data, RequestType.get, false, false)
    .then((response) => {
      console.log("response api:", response.status, response.data);
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.log("error api:", error);
      return Promise.reject(error);
    });
};
