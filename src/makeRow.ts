//@ts-nocheck
import moment from "moment";
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
    Row.model = (data.model.substring(0, 1) == '1' || data.model.substring(0, 1) == '2') ? (data.model.substring(0, 1) + 'YC') : (data.model.substring(0, 1) == 'J' ? 'SCR' : 'ODM');
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Current Plan';
    Row.customer = '';
    Row.pltype = '';
    Row.pltypeText = '';
    Row.detail = '';
    let total = 0;
    console.log(data.listCurpln);
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
    Row.model = (data.model.substring(0, 1) == '1' || data.model.substring(0, 1) == '2') ? (data.model.substring(0, 1) + 'YC') : (data.model.substring(0, 1) == 'J' ? 'SCR' : 'ODM');
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
    Row.model = (data.model.substring(0, 1) == '1' || data.model.substring(0, 1) == '2') ? (data.model.substring(0, 1) + 'YC') : (data.model.substring(0, 1) == 'J' ? 'SCR' : 'ODM');
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
    Row.model = (data.model.substring(0, 1) == '1' || data.model.substring(0, 1) == '2') ? (data.model.substring(0, 1) + 'YC') : (data.model.substring(0, 1) == 'J' ? 'SCR' : 'ODM');
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
        let filterInbound = data.listInbound.filter(o => o.astDate.toString().substring(8, 10) == vDay);
        let sumInboundOfDay = 0;
        filterInbound.map((o, i) => {
            sumInboundOfDay += o.astQty;
        })
        // var index = data.listActPln.findIndex(o => o.prdymd == vDay);
        // if (index != -1) {
        Row[`d${vDay}`] = sumInboundOfDay;
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
    Row.model = (data.model.substring(0, 1) == '1' || data.model.substring(0, 1) == '2') ? (data.model.substring(0, 1) + 'YC') : (data.model.substring(0, 1) == 'J' ? 'SCR' : 'ODM');
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
        var index = data.listInbound.findIndex(o => o.astDate.toString().substring(8, 10) == vDay && o.pltype == pltype);
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
    Row.model = (data.model.substring(0, 1) == '1' || data.model.substring(0, 1) == '2') ? (data.model.substring(0, 1) + 'YC') : (data.model.substring(0, 1) == 'J' ? 'SCR' : 'ODM');
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
        let filterSaleOfDay = data.listSaleForecast.map(o => { return o[`d${vDay}`] });
        let SumSaleOfDay = filterSaleOfDay.reduce((a, b) => a + b);
        Row[`d${vDay}`] = SumSaleOfDay;
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
    Row.model = (data.model.substring(0, 1) == '1' || data.model.substring(0, 1) == '2') ? (data.model.substring(0, 1) + 'YC') : (data.model.substring(0, 1) == 'J' ? 'SCR' : 'ODM');
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
    Row.model = (data.model.substring(0, 1) == '1' || data.model.substring(0, 1) == '2') ? (data.model.substring(0, 1) + 'YC') : (data.model.substring(0, 1) == 'J' ? 'SCR' : 'ODM');
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
        let filterInventory = data.listInventory.filter((o: MInventory) => o.date.substring(o.date.length - 2) == vDay).map(o => o.cnt);
        let sumInventoryOfDay = 0;
        filterInventory.map(o => {
            sumInventoryOfDay += parseFloat(o);
        })
        Row[`d${vDay}`] = sumInventoryOfDay;
    });
    // }
    Row.total = '';
    return Row
}

export const initRowInventory = (data: MActPlans, oInventory: MInventory[], pltype: string) => {
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
    let total = 0;
    // let oInventory: MInventory[] = data.listInventory.filter(o => o.pltype == pltype && o.model == data.model);
    Row.model = (data.model.substring(0, 1) == '1' || data.model.substring(0, 1) == '2') ? (data.model.substring(0, 1) + 'YC') : (data.model.substring(0, 1) == 'J' ? 'SCR' : 'ODM');
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Inventory';
    Row.customer = '';
    Row.pltype = pltype;
    Row.pltypeText = '';
    Row.detail = '';
    Row.menuAuto = 'IVW01 Product Detail';
    // if (oInventory.length) {
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var dayLoop: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        let dayNow: string = oInventory[0].date.substring(oInventory[0].date.length - 2);
        if (dayNow == dayLoop) {
            Row[`d${dayLoop}`] = oInventory[0].cnt;
            total += parseInt(oInventory[0].cnt);
        }
    });
    Row.total = total.toLocaleString('en');
    // }
    return Row
}
export const initRowHoldInventory = (data: MActPlans) => {
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
    let total = 0;
    Row.model = (data.model.substring(0, 1) == '1' || data.model.substring(0, 1) == '2') ? (data.model.substring(0, 1) + 'YC') : (data.model.substring(0, 1) == 'J' ? 'SCR' : 'ODM');
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Inventory (Hold)';
    Row.customer = '';
    Row.pltype = '';
    Row.pltypeText = '';
    Row.detail = '';
    Row.menuAuto = '';
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var dayLoop: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        if (dayLoop == moment().format('DD')) {
            Row[`d${dayLoop}`] = data.listHoldInventory.length ? parseInt(data.listHoldInventory[0].balstk) : '';
        }
    });
    Row.total = total.toLocaleString('en');
    return Row
}

export const initRowPDTInventory = (data: MActPlans) => {
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
    let total = 0;
    Row.model = (data.model.substring(0, 1) == '1' || data.model.substring(0, 1) == '2') ? (data.model.substring(0, 1) + 'YC') : (data.model.substring(0, 1) == 'J' ? 'SCR' : 'ODM');
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Inventory (PDT)';
    Row.customer = '';
    Row.pltype = '';
    Row.pltypeText = '';
    Row.detail = '';
    Row.menuAuto = '';
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var dayLoop: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        if (dayLoop == moment().format('DD')) {
            Row[`d${dayLoop}`] = data.listHoldInventory.length ? parseInt(data.listHoldInventory[0].balstk) : '';
        }
    });
    Row.total = total.toLocaleString('en');
    return Row
}


export const initRowInventoryPlanning = (data: MActPlans, type: string) => {
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
    let total = 0;
    Row.model = (data.model.substring(0, 1) == '1' || data.model.substring(0, 1) == '2') ? (data.model.substring(0, 1) + 'YC') : (data.model.substring(0, 1) == 'J' ? 'SCR' : 'ODM');
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Inventory Planning';
    Row.customer = '';
    Row.pltype = '';
    Row.pltypeText = '';
    Row.detail = '';
    Row.menuAuto = '';
    let lastInventory = data.listLastInventory.filter(o => o.model == data.model);
    let numLastInventory = 0;
    if (lastInventory.length) {
        numLastInventory = lastInventory[0].balstk;
        console.log(lastInventory)
    }
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var dayLoop: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        let filterSaleOfDay = data.listSaleForecast.map(o => { return o[`d${dayLoop}`] });
        let TotalSaleOfDay = filterSaleOfDay.reduce((a, b) => a + b);
        if (dayLoop == '01') {
            numLastInventory -= TotalSaleOfDay;
            Row[`d${dayLoop}`] = numLastInventory;
        } else {
            let PrevDay = (dayLoop - 1).toLocaleString('en', { minimumIntegerDigits: 2 });
            let PrevCurrentPlan = data.listCurpln[`day${PrevDay}`]; // Current Plan -1 Day 
            let InventoryHold = 0;
            if (dayLoop == moment().format('DD') && data.listHoldInventory.length) {
                InventoryHold = data.listHoldInventory[0].balstk;
            }
            numLastInventory = (parseInt(numLastInventory) + parseInt(PrevCurrentPlan) + parseInt(InventoryHold)) - parseInt(TotalSaleOfDay);
            console.log(numLastInventory,PrevCurrentPlan,InventoryHold)
            let InventoryPlanning = numLastInventory;
            Row[`d${dayLoop}`] = InventoryPlanning;
        }

    });
    Row.total = total.toLocaleString('en');
    return Row
}