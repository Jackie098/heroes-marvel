// @ts-nocheck
import axios from "../../../../../../../node_modules/axios/index";
import CryptoJS from "crypto-js";

const BASE_URL = import.meta.env.VITE_MARVEL_BASE_URL;

export class BaseServiceMarvel {
  _api;

  constructor() {
    this._api = this.createInstance(BASE_URL);
  }

  createInstance(baseURL) {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    axios.defaults.baseURL = baseURL;

    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(
      ts + import.meta.env.VITE_MARVEL_PUBLIC_KEY
    ).toString();

    const instance = axios.create({
      baseURL,
      headers,
      params: {
        apikey: import.meta.env.VITE_MARVEL_API_KEY,
        hash,
      },
    });

    return instance;
  }
}
