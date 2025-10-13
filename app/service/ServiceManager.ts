import axios, { AxiosRequestConfig, Method } from "axios";
import { store } from "../store";

export const BaseHeader = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "",
};

const MultiPartHeader = {
  ...BaseHeader,
  "Content-Type": "multipart/form-data",
  Authorization: "",
};

export const getHeaders = async (
  isAuth: boolean,
  isFormData: boolean
): Promise<Record<string, string>> => {
  const headers = isFormData ? { ...MultiPartHeader } : { ...BaseHeader };

  if (isAuth) {
    const token = getAuthToken();
    (headers as Record<string, string>)["Authorization"] = token ?? "";
  }

  return headers;
};

export const getAuthToken = () => {
  const token: string = store.getState().default.AuthToken;

  return token;
};

/**
 * Request Types
 * These types are used to specify the HTTP method for API requests.
 */
export enum RequestType {
  get = "get",
  post = "post",
  put = "put",
  delete = "delete",
  patch = "patch",
}

export const APIManager = async (
  data: any,
  type: RequestType,
  authenticated = false,
  formData = false
): Promise<any> => {
  const { url, body } = data;

  const config: AxiosRequestConfig = {
    url,
    method: type as Method,
    data: body,
    timeout: formData ? 120000 : 15000,
    maxBodyLength: Infinity,
    headers: BaseHeader,
  };

  console.log("config api:", config);
  try {
    config.headers = await getHeaders(authenticated, formData);
    const response = await axios.request(config);
    return Promise.resolve(response);
  } catch (error: any) {
    console.log("API Error:", error?.message);
    console.log("API Error1:", error);

    return Promise.reject(error?.message || "Unknown error");
  }
};

export const objectToFormData = (obj: Record<string, any>): FormData => {
  const formData = new FormData();

  const buildFormData = (data: any, parentKey?: string) => {
    if (
      data &&
      typeof data === "object" &&
      !(data instanceof File) &&
      !(data instanceof Blob)
    ) {
      if (Array.isArray(data)) {
        data.forEach((value, index) => {
          buildFormData(value, `${parentKey}[${index}]`);
        });
      } else {
        Object.keys(data).forEach((key) => {
          buildFormData(data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
      }
    } else {
      if (data !== undefined && data !== null) {
        formData.append(parentKey as string, String(data));
      }
    }
  };

  buildFormData(obj);

  return formData;
};

export const appendImageToFormData = (
  formData: FormData,
  key: string,
  imagePath: string,
  fileName: string = "upload.jpg",
  mimeType: string = "image/jpeg"
): FormData => {
  formData.append(key, {
    uri: imagePath,
    name: fileName,
    type: mimeType,
  } as any);

  return formData;
};
