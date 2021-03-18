/* eslint-disable prefer-const */

// API LIST
export enum API {
  GET_DIARY,
  CREATE_DIARY,
  UPDATE_DIARY,
  DELETE_DIARY,
  GET_RANDOM_DIARY,
}

// METHOD LIST
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

const API_URL_BASE = '/api';

function getURLAndRequestInit(api: API, body: any = {}): { url: RequestInfo, requestInit: RequestInit } {
  let path: string;
  let method = 'GET'; // *GET, POST, PUT, DELETE, etc.
  let mode: RequestMode = 'cors'; // no-cors, *cors, same-origin
  let cache: RequestCache = 'no-cache'; // *default, no-cache, reload, force-cache, only-if-cached
  let credentials: RequestCredentials = 'same-origin'; // include, *same-origin, omit
  let headers: HeadersInit = {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded'
  };
  let redirect: RequestRedirect = 'follow'; // manual, *follow, error
  let referrerPolicy: ReferrerPolicy = 'no-referrer'; // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

  switch (api) {
    case API.GET_DIARY:
      path = '/diary';
      method = GET;
      break;

    default:
      throw new Error('Unexpected API');
  }

  return {
    url: `${API_URL_BASE}${path}`,
    requestInit: {
      method,
      mode,
      cache,
      credentials,
      headers,
      redirect,
      referrerPolicy,
      body: JSON.stringify(body), // body data type must match "Content-Type" header
    },
  };
}

export async function requestAPI(api: API, body: any) {
  const { url, requestInit } = getURLAndRequestInit(api, body);

  try {
    const response = await fetch(url, requestInit);
    const parsedResponse = await response.json();

    // TODO: return data from response

    return parsedResponse;
  } catch (e) {
    console.log(e);
    return null;
  }
}
