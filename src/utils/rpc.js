/**
 * Created by tdzl2003 on 6/18/16.
 */

import URI from "urijs";

class ResponseError extends Error {
  constructor(message, code, origin) {
    super(message);
    this.code = code;
    this.origin = origin;
  }
}

//const tnurl = 'http://101.231.204.84:8091/sim/getacptn'
const KEY_TOKEN = "accessToken";
const KEY_TYPE = "userType";
const ROOT_URL = "https://davidwalsh.name/demo/arsenal.json";

//const ROOT_URL = 'http://192.168.44.137/jmWebTest/jmcus'
//const ROOT_URL = 'http://210.42.41.162/jmWebTest/jmcus'
export const META_URL = "http://jmhui.com";
const UPLOAD_TOKEN_URL = "upload";

let token = null;
let userInfo = null;
let userType = 0;

function timeoutPromise(ms, promise) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("请求超时，请重试"));
    }, ms);
    promise.then(
      res => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      err => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
}

/*
async function request(url, _options) {

  const uri = new URI(ROOT_URL + url);

  const options = _options || {};
  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  if (token) {
    options.headers['x-accesstoken'] = token.get();
  }

  if (__DEV__) {
    console.log(`${options.method} ${uri}`);
    if (options.body) {
      console.log(options.body);
    }
  }

  const resp = await fetch(uri.toString(), options);
  const text = await resp.text();
  console.log('RESP:', text);
  const json = JSON.parse(text);

  // 如果请求失败
  if (resp.status !== 200) {
    if (resp.status === 401) {
      // HTTP 401 表示授权验证失败(通常是token已过期)
      emit('invalidToken');
      token.set(null);
    }

    throw new ResponseError(json.message, resp.status, json);
  }

  return json;
}*/

async function request(
  url,
  options = { method: "GET" },
  params = { __placeholder: "" }
) {
  try {
    /*
    let body = new FormData();
    for (let i in params) {
        if (params[i] != null) {
          body.append(i, params[i]);
        }
    }*/
    let formBody = [];
    for (let property in params) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    if (options.method === "POST") {
      options.body = formBody;
    }
    //options.credentials = "include";

    options.headers = {
      //'Cookie': cookie ? cookie : null,
      "Content-Type": "application/x-www-form-urlencoded",
      ...options.headers,
      mode: "cors"
    };
    // if (token) {
    //   options.headers["token"] = token.token;
    // }
    // if (__DEV__) {
    //   console.log(`${options.method} ${url}`);
    //   if (options.body) {
    //     console.log("body", options.body);
    //   }
    //   if (options.headers) {
    //     console.log("header", options.headers);
    //   }
    // }
    let response = await timeoutPromise(30000, fetch(url, options));
    if (response.ok) {
      console.log("response", response);
      //let json = await response.text();
      let json = await response.json();
      console.log("json", json);
      let obj = await response.json();
      console.log("obj", obj);
      if (obj) {
        return obj.results;
      } else if (obj.code === 2) {
        //DeviceEventEmitter.emit('invalidToken',obj.message);
        throw new Error(obj.message);
      } else {
        throw new Error(obj.message);
      }
    } else {
      throw new Error(`请求错误，错误码：${response.status}；URL: [${url}]`);
    }
  } catch (err) {
    console.warn("Network request error:", err.message, "URL:", params);
    console.log("err", err);
    throw err;
  }
}

// file: {uri}
export async function upload(file) {
  const uploadData = await request(new URI(ROOT_URL + UPLOAD_TOKEN_URL), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });

  const body = new FormData();
  body.append("token", uploadData.formData.token);
  body.append("accept", uploadData.formData.accept);
  body.append("file", {
    uri: file.uri,
    type: file.type || "image/jpeg",
    name: uploadData.fieldName
  });

  const options = {
    method: "POST",
    headers: {},
    body
  };

  const resp = await fetch(uploadData.url, options);
  const text = await resp.text();
  console.log("RESP:", text);
  const json = JSON.parse(text);

  // 如果请求失败
  if (resp.status !== 200) {
    throw new ResponseError(json.message, resp.status, json);
  }

  return json.result;
}
/*
export function get(url, options) {
  return request(url, options);
}

export function post(url, data, options) {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    ...options,
  });
}

export function put(url, data, options) {
  return request(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    ...options,
  });
}

export function $delete(url, data, options) {
  return request(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    ...options,
  });
}
*/

export function get(urlKey, params, header) {
  let url = ROOT_URL + urlKey;
  url = new URI(url).query(params).toString();

  return request(url, {
    method: "GET",
    header
  });
}

export function post(urlKey, params, headers, updateCookie) {
  let url = ROOT_URL;
  params["method"] = urlKey;
  return request(
    url,
    {
      method: "POST",
      headers
    },
    params,
    updateCookie
  );
}
