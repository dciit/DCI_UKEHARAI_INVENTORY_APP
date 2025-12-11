import Axios from "axios";
import { EkbWipPartStock, MGetActPlan, ParamIotResult, PropUkeRedis } from "./interface";
import { api_base } from "./constant";

const http = Axios.create({
  baseURL: api_base,
  headers: {
    "Content-Type": "application/json;charset=UTF-8;json/html; charset=UTF-8",
  },
});

// const httpHR = Axios.create({
//   baseURL: api_base,
//   headers: {
//     "Content-Type": "application/json;charset=UTF-8;json/html; charset=UTF-8",
//   },
// });

export function API_GET_WARNING(calDelivery: string) {
  return new Promise<any>((resolve) => {
    http.get(`/warning/get/${calDelivery}`).then((res) => {
      resolve(res.data);
    });
  });
}

export function API_INIT_ACT_PLAN(ymd: string, sku: string) {
  return new Promise<MGetActPlan>((resolve) => {
    http
      .post(`/plan/get`, {
        ym: ymd,
        sku: sku,
      })
      .then((res) => {
        resolve(res.data);
      });
  });
}
// export function API_GET_CURPLNS(year: string) {
//   return new Promise<any>((resolve) => {
//     http.get(`/getCurplns/${year}`).then((res) => {
//       resolve(res.data);
//     });
//   });
// }
// export function API_GET_MODELS() {
//   return new Promise<any>((resolve) => {
//     http.get(`/getmodel`).then((res) => {
//       resolve(res.data);
//     });
//   });
// }

export function API_DISTRIBUTION(param: any) {
  return new Promise<any>((resolve) => {
    http.post(`/distribution`, param).then((res) => {
      resolve(res.data);
    });
  });
}

export function API_CHANGE_CURPLN(param: any) {
  return new Promise<any>((resolve) => {
    http.post(`/changePlan`, param).then((res) => {
      resolve(res.data);
    });
  });
}

// export function API_GET_UKE_CUR_PLN(param: MGetUkeCurPln) {
//   return new Promise<any>((resolve) => {
//     http.post(`/getUkeCurPln`, param).then((res) => {
//       resolve(res.data);
//     });
//   });
// }

export function API_GET_CURPLN_BY_YM(ym: string) {
  return new Promise<any>((resolve) => {
    http.get(`/getCurPlnByYM/${ym}`).then((res) => {
      resolve(res.data);
    });
  });
}

// export function API_INIT_MODELS(ym: string) {
//   return new Promise<string[]>((resolve) => {
//     http.get(`/model/get/${ym}`).then((res) => {
//       resolve(res.data);
//     });
//   });
// }

// export function API_GET_MASTER(objCode = "") {
//   return new Promise((resolve) => {
//     http.post(`/mpck/getMasterList`, { objCode: objCode }).then((res) => {
//       resolve(res.data);
//     });
//   });
// }

export function API_ADJUST_INVENTORY_MAIN(param: any) {
  return new Promise((resolve) => {
    http.post(`/ukeharai/adjustInventoryMain`, param).then((res) => {
      resolve(res.data);
    });
  });
}
export function API_GET_ADJUST_INVENTORY_MAIN(param: any) {
  return new Promise<EkbWipPartStock>((resolve) => {
    http.post(`/ukeharai/getAdjustInventoryMain`, param).then((res) => {
      resolve(res.data);
    });
  });
}

// export function API_CHANGE_UKE_CURPLN(param: any) {
//   return new Promise<any>((resolve) => {
//     http.post(`/change_uke_curpln`, param).then((res) => {
//       resolve(res.data);
//     });
//   });
// }

export default function emptyCache() {
  if ("caches" in window) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
  }
}
// export function API_PRIVILEGE(module = "", component = "") {
//   return new Promise((resolve) => {
//     httpHR
//       .get(`/privilege/${module}/${component}`)
//       .then((res) => {
//         resolve(res.data);
//       })
//       .catch(() => {
//         resolve([]);
//       });
//   });
// }

export function API_CHART_DATA(param: any) {
  return new Promise<any>((resolve) => {
    http.post(`/chart`, param).then((res) => {
      resolve(res.data);
    });
  });
}

// export function API_WARNING_EXCEL(ym: string) {
//   return new Promise<any>((resolve) => {
//     http.get(`/warning/excel/${ym}`).then((res) => {
//       resolve(res.data);
//     });
//   });
// }

export function ApiGetIotResult(param: ParamIotResult) {
  return new Promise<any>((resolve) => {
    http.post(`/GetIotResult`, param).then((res) => {
      resolve(res.data);
    });
  });
}

export function APIGetUkeInfoRedis(ym: string) {
  return new Promise<PropUkeRedis>((resolve) => {
    http.get(`/ukeharai/info/get/${ym}`).then((res) => {
      resolve(res.data);
    });
  });
}

export function APIPullFGInv() {
  return new Promise<any>((resolve) => {
    http
      .post(`/ukeharai/pullFGInv`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        resolve(err);
      });
  });
}

export function APIDashboardGetListModel() {
  return new Promise<any>((resolve) => {
    http
      .post(`/dashboard/list/model`)
      .then((res) => {
        resolve({
          data: res.data,
          error: res.status !== 200 ? res.statusText : "",
        });
      })
      .catch((err) => {
        resolve({ data: [], error: err.message });
      });
  });
}

export function APIGetModelCompressor() {
  return new Promise<any>((resolve) => {
    http
      .post(`/dashboard/model/compressor`, {})
      .then((res) => {
        resolve({
          data: res.data,
          error: res.status !== 200 ? res.statusText : "",
        });
      })
      .catch((err) => {
        resolve({ data: [], error: err.message });
      });
  });
}
export function APIGetDashboardByModelCompressor(param: any) {
  return new Promise<any>((resolve) => {
    http
      .post(`/dashboard/data/modelcompressor`, param)
      .then((res) => {
        resolve({
          data: res.data,
          error: res.status !== 200 ? res.statusText : "",
        });
      })
      .catch((err) => {
        resolve({ data: [], error: err.message });
      });
  });
}

export function APIUkeharaiData(modelgroup: string, method: string) {
  return new Promise<any>((resolve) => {
    http.get(`/ukeharai/data/${modelgroup}/${method}`).then((res) => {
      resolve(res.data);
    });
  });
}
