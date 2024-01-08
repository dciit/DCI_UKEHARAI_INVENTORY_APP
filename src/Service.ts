
import Axios from "axios";
import { MActPlans, MDetail, MParam } from "./interface";
const http = Axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;json/html; charset=UTF-8',
        // 'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    }
});

export function API_INIT_ACT_PLAN(param: MParam) {
    // console.log(param)
    return new Promise<MActPlans[]>(resolve => {
        http.post(`/plan/get`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_INIT_MODELS(ym: string) {
    console.log(`/model/get/${ym}`)
    return new Promise<string[]>(resolve => {
        http.get(`/model/get/${ym}`).then((res) => {
            resolve(res.data);
        })
    })
}