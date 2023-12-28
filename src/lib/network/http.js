// utils/axiosApi.js
// import axios from "axios";

import axios from "axios";

import Cookies from "js-cookie";
import instance from "./interceptors";
import { baseurl } from "@/config/setting";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL; // Replace with your Firebase URL

// axios.defaults.withCredentials=true

export const get = async (endpint, query, id) => {
  const cookiesData = Cookies.get();
  const token = cookiesData["headerPayload"] + "." + cookiesData["signature"];
  // const session = cookies["session"];
  let reqUrl = undefined;
  if (id) {
    reqUrl = baseURL + endpint + `/${id}`;
  }
  if (!id) {
    reqUrl = baseURL + endpint;
  }
  const option = {
    method: "get",
    url: reqUrl,
    headers: {
      Authorization: "Bearer " + token,
    },
    params: query,
  };
  let response;
  let error;
  try {
    response = await instance.request(option);
  } catch (e) {
    error = e.response?.data;

    //throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
};

export const getsingle = async (endpint, id, query) => {
  const cookiesData = Cookies.get();
  const token = cookiesData["headerPayload"] + "." + cookiesData["signature"];

  const option = {
    method: "get",
    url: baseURL + endpint + `/${id}`,
    headers: {
      Authorization: "Bearer " + token,
    },
    params: query,
  };
  let response;
  let error;
  try {
    response = await instance.request(option);
  } catch (e) {
    error = e.response?.data;

    throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
};

export const serverMethod = async (endpint, params) => {
  const option = {
    method: params.method,
    url: baseURL + endpint,
    headers: {
      Authorization: params?.token && "Bearer " + params.token,
    },
    params: params?.query,
    data: params?.data,
  };
  let response;
  let error;
  try {
    response = await axios.request(option);
  } catch (e) {
    error = e.response;

    //  throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
};

export const getServerSingle = async (endpint, query, id) => {
  const cookiesData = Cookies.get();
  const token = cookiesData["headerPayload"] + "." + cookiesData["signature"];

  const option = {
    method: "get",
    url: baseURL + endpint + `/${id}`,
    headers: {
      Authorization: "Bearer " + token,
    },
    params: query,
  };
  let response;
  let error;
  try {
    response = await axios.request(option);
  } catch (e) {
    error = e.response.data;

    //  throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
};

export const post = async (endpint, data) => {
  const cookiesData = Cookies.get();
  let token = undefined;
  if (cookiesData["headerPayload"]) {
    token =
      "Bearer " + cookiesData["headerPayload"] + "." + cookiesData["signature"];
  }
  const option = {
    method: "post",
    url: baseURL + endpint,
    headers: {
      Authorization: token,
    },
    params: {},
    data: data,
  };
  let response;
  let error;
  try {
    response = await instance.request(option);
  } catch (e) {
    error = e.response;

    // throw new Error(JSON.stringify(e.response));
  }

  // if success return value
  return response?.data ? response.data : error; // or set initial value
};

export const patch = async (endpint, data, id) => {
  const cookiesData = Cookies.get();
  let token = undefined;
  if (cookiesData["headerPayload"]) {
    token =
      "Bearer " + cookiesData["headerPayload"] + "." + cookiesData["signature"];
  }
  const option = {
    method: "patch",
    url: baseurl + endpint + `/${id}`,
    headers: {
      Authorization: token,
    },
    params: {},
    data: data,
  };
  let response;
  let error;
  try {
    response = await instance.request(option);
  } catch (e) {
    error = e?.response;

    // throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
};

export const put = async (endpint, data, id) => {
  const cookiesData = Cookies.get();
  const token = cookiesData["headerPayload"] + "." + cookiesData["signature"];
  const option = {
    method: "put",
    url: baseURL + endpint + `/${id}`,
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {},
    data: data,
  };
  let response;
  let error;
  try {
    response = await instance.request(option);
  } catch (e) {
    error = e.response.data;

    // throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
};

export const del = async (endpoint, id) => {
  const cookiesData = Cookies.get();
  const token = cookiesData["headerPayload"] + "." + cookiesData["signature"];

  const option = {
    method: "delete",
    url: baseURL + endpoint + `/${id}`,
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {},
    data: {},
  };
  let response;
  let error;
  try {
    response = await instance.request(option);
  } catch (e) {
    error = e.response.data;

    // throw new Error(JSON.stringify(e.response.data));
  }
  return response?.data ? response?.data : error; // or set initial value
};
