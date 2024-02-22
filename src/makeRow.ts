//@ts-nocheck
import { ListCurpln, ListSaleForecast, MActPlans, MInventory } from "./interface";

export const initRowCurPln = (data: MActPlans) => {
    const Row: MActPlans = {
        ym: '',
        model: '',
        modelCode: '',
        line: '',
        wcno: '',
        sebango: '',
        listActPln: [],
        listCurpln: [],
        listSaleForecast: [],
        listInbound: [],
        listPltype: [],
        listInventory: [],
        listActMain: [],
        type: '',
        customer: '',
        pltype: '',
        pltypeText: '',
        menuAuto: '',
        detail: '',
        begin: '',
        d01: 0,
        d02: 0,
        d03: 0,
        total: '0',
        d04: 0,
        d05: 0,
        d06: 0,
        d07: 0,
        d08: 0,
        d09: 0,
        d10: 0,
        d11: 0,
        d12: 0,
        d13: 0,
        d14: 0,
        d15: 0,
        d16: 0,
        d17: 0,
        d18: 0,
        d19: 0,
        d20: 0,
        d21: 0,
        d22: 0,
        d23: 0,
        d24: 0,
        d25: 0,
        d26: 0,
        d27: 0,
        d28: 0,
        d29: 0,
        d30: 0,
        d31: 0
    };
    Row.model = (data.model.substring(0, 1) == '1' || data.model.substring(0, 1) == '2') ? (data.model.substring(0,1) + 'YC') : (data.model.substring(0,1) == 'J' ? 'SCR' : 'ODM');
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Current Plan';
    Row.customer = '';
    Row.pltype = '';
    Row.pltypeText = '';
    Row.detail = '';
    let total = 0;
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var vDay: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        let t: any = data.listCurpln;
        let CurrentVal: number = t[`day${vDay}`] != '' ? parseInt(t[`day${vDay}`]) : 0;
        Row[`d${vDay}`] = CurrentVal;
        total += CurrentVal;
    });
    Row.total = total.toLocaleString('en');
    return Row
}

export const initRowMainAssy = (data: MActPlans) => {
    const Row: MActPlans = {
        ym: '',
        model: '',
        modelCode: '',
        line: '',
        wcno: '',
        sebango: '',
        listActPln: [],
        listCurpln: [],
        listSaleForecast: [],
        listInbound: [],
        listPltype: [],
        listInventory: [],
        listActMain: [],
        type: '',
        customer: '',
        pltype: '',
        pltypeText: '',
        menuAuto: '',
        detail: '',
        begin: '',
        d01: 0,
        d02: 0,
        d03: 0,
        total: '0',
        d04: 0,
        d05: 0,
        d06: 0,
        d07: 0,
        d08: 0,
        d09: 0,
        d10: 0,
        d11: 0,
        d12: 0,
        d13: 0,
        d14: 0,
        d15: 0,
        d16: 0,
        d17: 0,
        d18: 0,
        d19: 0,
        d20: 0,
        d21: 0,
        d22: 0,
        d23: 0,
        d24: 0,
        d25: 0,
        d26: 0,
        d27: 0,
        d28: 0,
        d29: 0,
        d30: 0,
        d31: 0
    };
    Row.model = (data.model.substring(0, 1) == '1' || data.model.substring(0, 1) == '2') ? (data.model.substring(0,1) + 'YC') : (data.model.substring(0,1) == 'J' ? 'SCR' : 'ODM');
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Result_Main Assembly';
    Row.customer = '';
    Row.pltype = '';
    Row.pltypeText = '';
    Row.detail = '';
    let total = 0;
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var vDay: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        var index = data.listActMain.findIndex(o => o.shiftDate.substring(o.shiftDate.length - 2) == vDay);
        if (index != -1) {
            Row[`d${vDay}`] = data.listActMain[index].cnt;
            total += data.listActMain[index].cnt;
        }
        // let t: any = data.listActMain;
        // let CurrentVal: number = t[`day${vDay}`] != '' ? parseInt(t[`day${vDay}`]) : 0;
        // Row[`d${vDay}`] = CurrentVal;
    });
    Row.total = total.toLocaleString('en');
    return Row
}

export const initRowFinal = (data: MActPlans) => {
    const Row: MActPlans = {
        ym: '',
        model: '',
        modelCode: '',
        line: '',
        wcno: '',
        sebango: '',
        listActPln: [],
        listCurpln: [],
        listSaleForecast: [],
        listInbound: [],
        listPltype: [],
        listInventory: [],
        listActMain: [],
        type: '',
        customer: '',
        pltype: '',
        pltypeText: '',
        menuAuto: '',
        detail: '',
        begin: '',
        d01: 0,
        d02: 0,
        d03: 0,
        total: '0',
        d04: 0,
        d05: 0,
        d06: 0,
        d07: 0,
        d08: 0,
        d09: 0,
        d10: 0,
        d11: 0,
        d12: 0,
        d13: 0,
        d14: 0,
        d15: 0,
        d16: 0,
        d17: 0,
        d18: 0,
        d19: 0,
        d20: 0,
        d21: 0,
        d22: 0,
        d23: 0,
        d24: 0,
        d25: 0,
        d26: 0,
        d27: 0,
        d28: 0,
        d29: 0,
        d30: 0,
        d31: 0
    };
    Row.model = (data.model.substring(0, 1) == '1' || data.model.substring(0, 1) == '2') ? (data.model.substring(0,1) + 'YC') : (data.model.substring(0,1) == 'J' ? 'SCR' : 'ODM');
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Result_Final Line';
    Row.customer = '';
    Row.pltype = '';
    Row.pltypeText = '';
    Row.detail = '';
    let total = 0;
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var vDay: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        var index = data.listActPln.findIndex(o => o.prdymd == vDay);
        if (index != -1) {
            Row[`d${vDay}`] = data.listActPln[index].qty;
            total += data.listActPln[index].qty;
        }
        // let t: any = data.listActMain;
        // let CurrentVal: number = t[`day${vDay}`] != '' ? parseInt(t[`day${vDay}`]) : 0;
        // Row[`d${vDay}`] = CurrentVal;
    });
    Row.total = total.toLocaleString('en');
    return Row
}

export const initTotalTitleInbound = (data: MActPlans) => {
    const Row: MActPlans = {
        ym: '',
        model: '',
        modelCode: '',
        line: '',
        wcno: '',
        sebango: '',
        listActPln: [],
        listCurpln: [],
        listSaleForecast: [],
        listInbound: [],
        listPltype: [],
        listInventory: [],
        listActMain: [],
        type: '',
        customer: '',
        pltype: '',
        pltypeText: '',
        menuAuto: '',
        detail: '',
        begin: '',
        d01: 0,
        d02: 0,
        d03: 0,
        total: '0',
        d04: 0,
        d05: 0,
        d06: 0,
        d07: 0,
        d08: 0,
        d09: 0,
        d10: 0,
        d11: 0,
        d12: 0,
        d13: 0,
        d14: 0,
        d15: 0,
        d16: 0,
        d17: 0,
        d18: 0,
        d19: 0,
        d20: 0,
        d21: 0,
        d22: 0,
        d23: 0,
        d24: 0,
        d25: 0,
        d26: 0,
        d27: 0,
        d28: 0,
        d29: 0,
        d30: 0,
        d31: 0
    };
    Row.model = (data.model.substring(0, 1) == '1' || data.model.substring(0, 1) == '2') ? (data.model.substring(0,1) + 'YC') : (data.model.substring(0,1) == 'J' ? 'SCR' : 'ODM');
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Total Inbound Finishgoods';
    Row.customer = '';
    Row.pltype = '';
    Row.pltypeText = '';
    Row.detail = '';
    let total = 0;
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var vDay: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        // var index = data.listActPln.findIndex(o => o.prdymd == vDay);
        // if (index != -1) {
        Row[`d${vDay}`] = '';
        //     total += data.listActPln[index].qty;
        // }
        // let t: any = data.listActMain;
        // let CurrentVal: number = t[`day${vDay}`] != '' ? parseInt(t[`day${vDay}`]) : 0;
        // Row[`d${vDay}`] = CurrentVal;
    });
    Row.total = '-';
    return Row
}
export const initTotalInbound = (data: MActPlans, pltype: string) => {
    const Row: MActPlans = {
        ym: '',
        model: '',
        modelCode: '',
        line: '',
        wcno: '',
        sebango: '',
        listActPln: [],
        listCurpln: [],
        listSaleForecast: [],
        listInbound: [],
        listPltype: [],
        listInventory: [],
        listActMain: [],
        type: '',
        customer: '',
        pltype: '',
        pltypeText: '',
        menuAuto: '',
        detail: '',
        begin: '',
        d01: 0,
        d02: 0,
        d03: 0,
        total: '0',
        d04: 0,
        d05: 0,
        d06: 0,
        d07: 0,
        d08: 0,
        d09: 0,
        d10: 0,
        d11: 0,
        d12: 0,
        d13: 0,
        d14: 0,
        d15: 0,
        d16: 0,
        d17: 0,
        d18: 0,
        d19: 0,
        d20: 0,
        d21: 0,
        d22: 0,
        d23: 0,
        d24: 0,
        d25: 0,
        d26: 0,
        d27: 0,
        d28: 0,
        d29: 0,
        d30: 0,
        d31: 0
    };
    Row.model = (data.model.substring(0, 1) == '1' || data.model.substring(0, 1) == '2') ? (data.model.substring(0,1) + 'YC') : (data.model.substring(0,1) == 'J' ? 'SCR' : 'ODM');
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Inbound Finishgoods';
    Row.customer = '';
    Row.pltype = pltype;
    Row.pltypeText = '';
    Row.detail = 'Result-In/Out WH(Balance)';
    let total = 0;
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var vDay: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        var index = data.listInbound.findIndex(o => o.astDate.toString().substring(8, 10) == vDay && o.astType == pltype);
        if (index != -1) {
            Row[`d${vDay}`] = data.listInbound[index].astQty;
            total += data.listInbound[index].astQty;
        } else {
            Row[`d${vDay}`] = '';
        }
        // let t: any = data.listActMain;
        // let CurrentVal: number = t[`day${vDay}`] != '' ? parseInt(t[`day${vDay}`]) : 0;
        // Row[`d${vDay}`] = CurrentVal;
    });
    Row.total = total.toLocaleString('en');
    return Row
}
export const initRowTotalSale = (data: MActPlans) => {
    const Row: MActPlans = {
        ym: '',
        model: '',
        modelCode: '',
        line: '',
        wcno: '',
        sebango: '',
        listActPln: [],
        listCurpln: [],
        listSaleForecast: [],
        listInbound: [],
        listPltype: [],
        listInventory: [],
        listActMain: [],
        type: '',
        customer: '',
        pltype: '',
        pltypeText: '',
        menuAuto: '',
        detail: '',
        begin: '',
        d01: 0,
        d02: 0,
        d03: 0,
        total: '0',
        d04: 0,
        d05: 0,
        d06: 0,
        d07: 0,
        d08: 0,
        d09: 0,
        d10: 0,
        d11: 0,
        d12: 0,
        d13: 0,
        d14: 0,
        d15: 0,
        d16: 0,
        d17: 0,
        d18: 0,
        d19: 0,
        d20: 0,
        d21: 0,
        d22: 0,
        d23: 0,
        d24: 0,
        d25: 0,
        d26: 0,
        d27: 0,
        d28: 0,
        d29: 0,
        d30: 0,
        d31: 0
    };
    Row.model = (data.model.substring(0, 1) == '1' || data.model.substring(0, 1) == '2') ? (data.model.substring(0,1) + 'YC') : (data.model.substring(0,1) == 'J' ? 'SCR' : 'ODM');
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Total Sales Plan&Forecast';
    Row.customer = '';
    Row.pltype = '';
    Row.pltypeText = '';
    Row.detail = '';
    let total = 0;
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var vDay: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        Row[`d${vDay}`] = '';
    });
    Row.total = '-';
    return Row
}
export const initRowSale = (data: MActPlans, dataSale: ListSaleForecast, pltype: string, customer: string) => {
    const Row: MActPlans = {
        ym: '',
        model: '',
        modelCode: '',
        line: '',
        wcno: '',
        sebango: '',
        listActPln: [],
        listCurpln: [],
        listSaleForecast: [],
        listInbound: [],
        listPltype: [],
        listInventory: [],
        listActMain: [],
        type: '',
        customer: '',
        pltype: '',
        pltypeText: '',
        menuAuto: '',
        detail: '',
        begin: '',
        d01: 0,
        d02: 0,
        d03: 0,
        total: '0',
        d04: 0,
        d05: 0,
        d06: 0,
        d07: 0,
        d08: 0,
        d09: 0,
        d10: 0,
        d11: 0,
        d12: 0,
        d13: 0,
        d14: 0,
        d15: 0,
        d16: 0,
        d17: 0,
        d18: 0,
        d19: 0,
        d20: 0,
        d21: 0,
        d22: 0,
        d23: 0,
        d24: 0,
        d25: 0,
        d26: 0,
        d27: 0,
        d28: 0,
        d29: 0,
        d30: 0,
        d31: 0
    };
    Row.model = (data.model.substring(0, 1) == '1' || data.model.substring(0, 1) == '2') ? (data.model.substring(0,1) + 'YC') : (data.model.substring(0,1) == 'J' ? 'SCR' : 'ODM');
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Sales Plan&Forecast';
    Row.customer = customer;
    Row.pltype = pltype;
    Row.pltypeText = '';
    Row.detail = 'Sales Plan&Forecast';
    let total = 0;
    // let oSale: ListSaleForecast[] = data.listSaleForecast.filter(o => o.pltype == pltype && o.modelName == data.model);
    // if (oSale.length) {
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var vDay: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        Row[`d${vDay}`] = dataSale[`d${vDay}`];
    });
    // }
    Row.total = total.toLocaleString('en');
    return Row
}
export const initRowTitleTotalInventory = (data: MActPlans) => {
    const Row: MActPlans = {
        ym: '',
        model: '',
        modelCode: '',
        line: '',
        wcno: '',
        sebango: '',
        listActPln: [],
        listCurpln: [],
        listSaleForecast: [],
        listInbound: [],
        listPltype: [],
        listInventory: [],
        listActMain: [],
        type: '',
        customer: '',
        pltype: '',
        pltypeText: '',
        menuAuto: '',
        detail: '',
        begin: '',
        d01: 0,
        d02: 0,
        d03: 0,
        total: '0',
        d04: 0,
        d05: 0,
        d06: 0,
        d07: 0,
        d08: 0,
        d09: 0,
        d10: 0,
        d11: 0,
        d12: 0,
        d13: 0,
        d14: 0,
        d15: 0,
        d16: 0,
        d17: 0,
        d18: 0,
        d19: 0,
        d20: 0,
        d21: 0,
        d22: 0,
        d23: 0,
        d24: 0,
        d25: 0,
        d26: 0,
        d27: 0,
        d28: 0,
        d29: 0,
        d30: 0,
        d31: 0
    };
    Row.model = (data.model.substring(0, 1) == '1' || data.model.substring(0, 1) == '2') ? (data.model.substring(0,1) + 'YC') : (data.model.substring(0,1) == 'J' ? 'SCR' : 'ODM');
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Total Inventory';
    Row.customer = '';
    Row.pltype = '';
    Row.pltypeText = '';
    Row.menuAuto = 'Total IVW01 Product Detail';
    Row.detail = '';
    // let oSale: ListSaleForecast[] = data.listSaleForecast.filter(o => o.modelName == data.model);
    // if (oSale.length) {
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var vDay: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        Row[`d${vDay}`] = '';
    });
    // }
    Row.total = '';
    return Row
}

export const initRowInventory = (data: MActPlans, pltype: string) => {
    const Row: MActPlans = {
        ym: '',
        model: '',
        modelCode: '',
        line: '',
        wcno: '',
        sebango: '',
        listActPln: [],
        listCurpln: [],
        listSaleForecast: [],
        listInbound: [],
        listPltype: [],
        listInventory: [],
        listActMain: [],
        type: '',
        customer: '',
        pltype: '',
        pltypeText: '',
        menuAuto: '',
        detail: '',
        begin: '',
        d01: 0,
        d02: 0,
        d03: 0,
        total: '0',
        d04: 0,
        d05: 0,
        d06: 0,
        d07: 0,
        d08: 0,
        d09: 0,
        d10: 0,
        d11: 0,
        d12: 0,
        d13: 0,
        d14: 0,
        d15: 0,
        d16: 0,
        d17: 0,
        d18: 0,
        d19: 0,
        d20: 0,
        d21: 0,
        d22: 0,
        d23: 0,
        d24: 0,
        d25: 0,
        d26: 0,
        d27: 0,
        d28: 0,
        d29: 0,
        d30: 0,
        d31: 0
    };
    Row.model = (data.model.substring(0, 1) == '1' || data.model.substring(0, 1) == '2') ? (data.model.substring(0,1) + 'YC') : (data.model.substring(0,1) == 'J' ? 'SCR' : 'ODM');
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Inventory';
    Row.customer = '';
    Row.pltype = pltype;
    Row.pltypeText = '';
    Row.detail = '';
    Row.menuAuto = 'IVW01 Product Detail';
    let total = 0;
    let oInventory: MInventory[] = data.listInventory.filter(o => o.pltype == pltype && o.model == data.model);
    if (oInventory.length) {
        [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
            var dayLoop: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
            let dayNow: string = oInventory[0].date.substring(oInventory[0].date.length - 2);
            if (dayNow == dayLoop) {
                Row[`d${dayLoop}`] = oInventory[0].cnt;
                total+= parseInt(oInventory[0].cnt);
            } 
        });
    }
    Row.total = total.toLocaleString('en');
    return Row
}