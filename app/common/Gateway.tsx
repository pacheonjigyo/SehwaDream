import { API } from "../types.js";
import { sleep } from "./Functions.js";

const API_ENDPOINT = `https://api.aibici.co.kr/`;
const ENGINE_ENDPOINT = `https://core.aibici.co.kr/`;

let REQUEST_STATUS = "IDLE";

export const APIGateway = async (api: API, redirect: boolean) => {
  const appInfo = JSON.parse(
    localStorage.getItem("web_aibici_storage") ?? "{}",
  );

  const dataResp = await fetch(`${API_ENDPOINT}${api.query}`, {
    headers: {
      Authorization: api.auth ? `Bearer ${appInfo.accessToken}` : ``,
      "Content-Type": "application/json",
    },
    method: api.method,
    body:
      api.method === "GET" || api.method === "DELETE"
        ? undefined
        : JSON.stringify(api.data),
  });

  let dataJson = {
    message: "",
  };

  try {
    dataJson = await dataResp.json();
  } catch (e) {
    const dataText = await dataResp.text();

    return {
      error: dataText,
    };
  }

  if (dataResp.status === 200) {
    return dataJson;
  } else {
    switch (REQUEST_STATUS) {
      case "IDLE": {
        if (dataJson.message === "TokenExpiredError") {
          REQUEST_STATUS = "ABORTED";

          const refreshData = await APIGateway(
            {
              query: appInfo.isAdmin ? "sysop/refreshToken" : "refreshToken",
              method: "POST",
              data: {
                refreshToken: appInfo.refreshToken,
              },
              auth: true,
            },
            redirect,
          );

          if (refreshData.error) {
            return {
              error: refreshData.error,
            };
          }

          appInfo.accessToken = refreshData.access;

          localStorage.setItem("web_aibici_storage", JSON.stringify(appInfo));

          REQUEST_STATUS = "IDLE";

          await sleep(500 * 1);

          return await APIGateway(api, redirect);
        }

        break;
      }

      case "ABORTED": {
        if (dataJson.message === "jwt expired") {
          appInfo.accessToken = "";

          localStorage.setItem("web_aibici_storage", JSON.stringify(appInfo));

          REQUEST_STATUS = "IDLE";

          await sleep(500 * 1);
        }

        if (dataJson.message === "TokenExpiredError") {
          await sleep(500 * 1);

          return await APIGateway(api, redirect);
        }

        break;
      }

      default:
        break;
    }

    return {
      error: dataJson,
    };
  }
};

export const EngineGateway = async (api: API) => {
  const dataResp = await fetch(`${ENGINE_ENDPOINT}${api.query}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    method: api.method,
    body:
      api.method === "GET" || api.method === "DELETE"
        ? undefined
        : JSON.stringify(api.data),
  });

  return await dataResp.json();
};
