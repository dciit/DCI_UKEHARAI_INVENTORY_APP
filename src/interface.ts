export interface MRedux {
    login?: boolean;
    empcode?: string;
    name?: string;
    sure?: string;
    fullname?: string;
}

export interface MParam {
    ym?: string;
}

export interface MDetail {
    wcno: number;
    ym: string;
    d: string;
    model: string;
    qty: number;
}
export interface MActPlans {
    ym: string;
    model: string;
    modelCode: string;
    line: string;
    wcno: string;
    sebango: string;
    type: string;
    customer: string;
    pltype: string;
    pltypeText: string;
    menuAuto: string;
    detail: string;
    begin: string;
    listActPln: MActPlan[];
    listCurpln: ListCurpln[];
    listSaleForecast: ListSaleForecast[];
    listInbound: ListInbound[];
    listPltype: string[];
    listInventory: MInventory[];
    listActMain: MActMain[];
    listLastInventory: LastInventory[];
    listHoldInventory: HoldInventory[];
    d01: number;
    d02: number;
    d03: number;
    d04: number;
    d05: number;
    d06: number;
    d07: number;
    d08: number;
    d09: number;
    d10: number;
    d11: number;
    d12: number;
    d13: number;
    d14: number;
    d15: number;
    d16: number;
    d17: number;
    d18: number;
    d19: number;
    d20: number;
    d21: number;
    d22: number;
    d23: number;
    d24: number;
    d25: number;
    d26: number;
    d27: number;
    d28: number;
    d29: number;
    d30: number;
    d31: number;
    total: string;
}
export interface MTest {
    d01: number;
}
export interface MActMain {
    lineName: string;
    model_No: string;
    modelName: string;
    cnt: number;
    shiftDate: string;
}
export interface LastInventory {
    ym: string;
    wc: string;
    model: string;
    lbalstk: string;
    balstk: string;
}
export interface HoldInventory {
    ym: string;
    wc: string;
    model: string;
    lbalstk: string;
    balstk: string;
}
export interface MInventory {
    model: string;
    pltype: string;
    cnt: string;
    date: string;
}
export interface ListInbound {
    astDate: Date;
    astType: null;
    model: string;
    pltype: string;
    astQty: number;
}

export interface ListSaleForecast {
    id: number;
    ym: string;
    modelCode: string;
    modelName: null;
    sebango: string;
    pltype: string;
    customer: string;
    d01: number;
    d02: number;
    d03: number;
    d04: number;
    d05: number;
    d06: number;
    d07: number;
    d08: number;
    d09: number;
    d10: number;
    d11: number;
    d12: number;
    d13: number;
    d14: number;
    d15: number;
    d16: number;
    d17: number;
    d18: number;
    d19: number;
    d20: number;
    d21: number;
    d22: number;
    d23: number;
    d24: number;
    d25: number;
    d26: number;
    d27: number;
    d28: number;
    d29: number;
    d30: number;
    d31: number;
    rev: string;
    lrev: string;
    createBy: string;
    createDate: Date;
    updateDate: null;
    row: null;
}
export interface MActPlan {
    wcno: number;
    prdymd: string;
    model: string;
    dataType: null;
    qty: number;
    userid: null;
    cdate: null;
    udate: null;
    dataDate: null;
}

export interface MRouteParams {
    month?: string;
}

export interface ListCurpln {
    wcno: number;
    prdym: string;
    model: string;
    sebango: number;
    salmodel: string;
    day01: number;
    day02: number;
    day03: number;
    day04: number;
    day05: number;
    day06: number;
    day07: number;
    day08: number;
    day09: number;
    day10: number;
    day11: number;
    day12: number;
    day13: number;
    day14: number;
    day15: number;
    day16: number;
    day17: number;
    day18: number;
    day19: number;
    day20: number;
    day21: number;
    day22: number;
    day23: number;
    day24: number;
    day25: number;
    day26: number;
    day27: number;
    day28: number;
    day29: number;
    day30: number;
    day31: number;
    ymQty: number;
    cdate: Date;
    udate: Date;
    dataDate: Date;
}

// export interface MMaster {
//     type: string;
//     customer: string;
//     pltype: string;
//     pltypeText: string;
//     menu: string;
//     detail: string;
//     begin: string;
// }