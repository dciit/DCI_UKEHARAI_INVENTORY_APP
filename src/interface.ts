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

export interface MGetActPlan {
    content: MActPlans[];
    groupModels: string[];
}

export interface MActPlans {
    modelGroup: string;
    sbu: string;
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
    listActFinal: MActPlan[];
    listCurpln: ListCurpln[];
    listSaleForecast: ListSaleForecast[];
    listInbound: ListInbound[];
    listPltype: string[];
    inventory: MInventory[];
    listActMain: MActMain[];
    listLastInventory: LastInventory[];
    listHoldInventory: HoldInventory[];
    listPDTInventory: HoldInventory[];
    lastInventoryMain: MLastInventoryMain;
    lastInventory: number;
    inventoryBalance: InventoryBalance[];
    inventoryBalancePltype: InventoryBalancePltype[];
    listInventoryPlanning: MData[];
    totalInventoryPlanning: number;
    listSaleForeCaseAllCustomer: MData[];
    listDelivery: ListDelivery[];
    listInventoryPlanningMain: ListInventoryPlanningMain[];
    listInventoryPlanningMainOrFinal?: MInventory[];
    inventoryPlanningMainOrFinalEnd?: number[];
    warning: boolean; // สำหรับหน้า Warning 1 = Inventory balance ติดลบ 
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
    totalInventoryPlanningMain: number;
}

export interface ListDelivery {
    pltype: string;
    data: MData[];
}
export interface ListInventoryPlanningMain {
    pltype: string;
    data: MData[];
}

export interface MData {
    value: number;
    date: string;
}
export interface InventoryBalancePltype {
    modelName: string;
    pltype: string;
    data: InventoryBalance[];
}


export interface InventoryBalance {
    value: number;
    date: string;
}

export interface MLastInventoryMain {
    bal: number;
    partno: string;
    ym: string;
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

export interface MTitle {
    key: string;
    bg: string;
    class: string;
    icon: boolean;
    iconColor: string;
}
export interface EkbWipPartStock {
    ym: string;
    wcno: string;
    partno: string;
    cm: string;
    partDesc: string;
    bal: number;
    ptype: string;
}
export interface UkeCurPln {
    lrev?: number;
    rev?: number;
    prdym?: string;
    model?: string;
    line?: string;
    wcno?: string;
    day01?: number;
    day02?: number;
    day03?: number;
    day04?: number;
    day05?: number;
    day06?: number;
    day07?: number;
    day08?: number;
    day09?: number;
    day10?: number;
    day11?: number;
    day12?: number;
    day13?: number;
    day14?: number;
    day15?: number;
    day16?: number;
    day17?: number;
    day18?: number;
    day19?: number;
    day20?: number;
    day21?: number;
    day22?: number;
    day23?: number;
    day24?: number;
    day25?: number;
    day26?: number;
    day27?: number;
    day28?: number;
    day29?: number;
    day30?: number;
    day31?: number;
}

export interface MModels {
    modelCode: string;
    model: string;
    modelType: string;
    open: boolean;
}

export interface MGetUkeCurPln {
    modelCode: string;
    month: string;
    year?: string;
    model: string;
}

export interface MInitialState {
    login: boolean;
    emp: string;
    rev: number;
    privilege: MDCIPrivilege[];
    menuActive: string;
}
export interface MDCIPrivilege {
    privId: number;
    privModule: string;
    privComponent: string;
    privAction: string;
    privRef: string;
    privVal: string;
    privStatus: string;
    privCreateDate: Date;
    privUpdateDate: Date;
}
export interface MNavMenu {
    txt: string;
    key: string;
    type: string;
    icon?: any;
    path?: string;
}

export interface MContext {
    navMenu: MNavMenu[];
    months: string[];
}
export interface MChartData {
    label: string[];
    dataset: any[];
}

export interface MChart {
    name: string;
    chart: Chart;
}

export interface Chart {
    label: string[];
    dataset: Dataset[];
}

export interface Dataset {
    data: number[];
    backgroundColor: string;
    borderSkipped: boolean;
    borderWidth: number;
    label: string;
}

export interface MLastInventoryMain {
    model: string;
    value: number;
}

export interface MUpdateInventoryMain {
    ym: string;
    empcode: string;
    data: MLastInventoryMain[];
}