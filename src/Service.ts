
import Axios from "axios";
import { MActPlans } from "./interface";
const http = Axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;json/html; charset=UTF-8',
        // 'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    }
});

export function API_INIT_ACT_PLAN(ymd: string) {
    return new Promise<MActPlans[]>(resolve => {
        http.post(`/plan/get`, {
            ym: ymd
        }).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_INIT_MODELS(ym: string) {
    return new Promise<string[]>(resolve => {
        http.get(`/model/get/${ym}`).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_GET_MASTER(objCode = '') {
    return new Promise(resolve => {
        http.post(`/mpck/getMasterList`, { objCode: objCode }).then((res) => {
            resolve(res.data);
        })
    })
}