//@ts-nocheck
import moment from "moment";
import { InventoryBalance, InventoryBalancePltype, ListCurpln, ListSaleForecast, MActPlans, MInventory } from "./interface";

export const initRowCurPln = (data: MActPlans, oCurpln: ListCurpln) => {
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
        inventory: [],
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
        d31: 0,
        listLastInventory: [],
        listHoldInventory: [],
        lastInventoryMain: undefined,
        lastInventory: 0
    };
    Row.sbu = data.sbu;
    Row.model = data.modelGroup;
    Row.wcno = oCurpln.wcno.toString();
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Current Plan';
    Row.customer = '';
    Row.pltype = '';
    Row.pltypeText = '';
    Row.detail = '';
    let total = 0;
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var DayLoop: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        let CurrentVal: number = oCurpln[`day${DayLoop}`] != '' ? parseInt(oCurpln[`day${DayLoop}`]) : 0;
        Row[`d${DayLoop}`] = CurrentVal;
        total += CurrentVal;
    });
    Row.total = total.toLocaleString('en');
    return Row
}
export const initRowTotalCurPlnAllLine = (data: MActPlans) => {
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
        inventory: [],
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
        d31: 0,
        listLastInventory: [],
        listHoldInventory: [],
        lastInventoryMain: undefined,
        lastInventory: 0
    };
    Row.sbu = data.sbu;
    Row.model = data.modelGroup;
    Row.wcno = '';
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Total Current Plan';
    Row.customer = '';
    Row.pltype = '';
    Row.pltypeText = '';
    Row.detail = '';
    let total = 0;
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var DayLoop: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        let nCurrentPlanOfDayAllLine = 0;
        data.listCurpln.map((oCurpln: ListCurpln) => {
            nCurrentPlanOfDayAllLine += oCurpln[`day${DayLoop}`];
            total += oCurpln[`day${DayLoop}`];
        })
        Row[`d${DayLoop}`] = nCurrentPlanOfDayAllLine;
        total += 0;
    });
    Row.total = total.toLocaleString('en');
    return Row
}


export const initRowMainAssy = (data: MActPlans, wcno: number) => {
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
        inventory: [],
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
        d31: 0,
        listLastInventory: [],
        listHoldInventory: [],
        lastInventoryMain: undefined,
        lastInventory: 0
    };
    Row.sbu = data.sbu;
    Row.model = data.modelGroup;
    Row.wcno = wcno.toString();
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Result_Main Assembly';
    Row.customer = '';
    Row.pltype = '';
    Row.pltypeText = '';
    Row.detail = '';
    let total = 0;
    // if (data.model == '1Y056BCBX1T#A') {
    //     console.log(data.listActMain)
    // }
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var vDay: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });

        var index = data.listActMain.findIndex(o => o.shiftDate.substring(8, 11) == vDay && (o.model_No == data.modelCode || o.modelName == data.model.trim()) && o.lineName == wcno.toString());
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

export const initRowFinal = (data: MActPlans, wcno: number) => {
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
        inventory: [],
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
        d31: 0,
        listLastInventory: [],
        listHoldInventory: [],
        lastInventoryMain: undefined,
        lastInventory: 0
    };
    Row.sbu = data.sbu;
    Row.model = data.modelGroup;
    Row.wcno = wcno;
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
        var index = data.listActFinal.findIndex(o => o.prdymd == vDay && o.model == data.model && o.wcno == wcno);
        if (index != -1) {
            Row[`d${vDay}`] = data.listActFinal[index].qty;
            total += data.listActFinal[index].qty;
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
        inventory: [],
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
        d31: 0,
        listLastInventory: [],
        listHoldInventory: [],
        lastInventoryMain: undefined,
        lastInventory: 0
    };
    Row.sbu = data.sbu;
    Row.model = data.modelGroup;
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Total Inbound Finishgoods';
    Row.customer = '';
    Row.pltype = '';
    Row.pltypeText = '';
    Row.detail = '';
    let total = 0;
    let sum = 0;
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var vDay: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        let filterInbound = data.listInbound.filter(o => o.astDate.toString().substring(8, 10) == vDay);

        let sumInboundOfDay = 0;
        filterInbound.map((o, i) => {
            sumInboundOfDay += o.astQty;
            if (o.astType == 'IN') {
                sum += sumInboundOfDay;
                Row[`d${vDay}`] = sumInboundOfDay;
            } else {
                // if (data.model == '2YC71DXD#A') {
                //     console.log(sum, ((sumInboundOfDay * -1)))
                // }
                sum += (sumInboundOfDay * -1);
                Row[`d${vDay}`] = (sumInboundOfDay * -1);
            }
        })

    });
    Row.total = sum.toString();
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
        d31: 0,
        listLastInventory: [],
        listHoldInventory: [],
        lastInventoryMain: undefined
    };
    Row.model = data.modelGroup;
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
        d31: 0,
        listLastInventory: [],
        listHoldInventory: [],
        lastInventoryMain: undefined
    };
    Row.sbu = data.sbu;
    Row.model = data.modelGroup;
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
        let SumSaleOfDay = 0;
        if (filterSaleOfDay.length) {
            SumSaleOfDay = filterSaleOfDay.reduce((a, b) => a + b);
            total += SumSaleOfDay;
        }
        Row[`d${vDay}`] = SumSaleOfDay;
    });
    Row.total = total.toLocaleString('en');
    return Row
}
export const initRowSale = (data: MActPlans, oSale: ListSaleForecast) => {
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
        d31: 0,
        listLastInventory: [],
        listHoldInventory: [],
        lastInventoryMain: undefined
    };
    Row.sbu = data.sbu;
    Row.model = data.modelGroup;
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Sales Plan&Forecast';
    Row.customer = oSale.customer;
    Row.pltype = oSale.pltype;
    Row.pltypeText = '';
    Row.detail = 'Sales Plan&Forecast';
    let total = 0;
    // let oSale: ListSaleForecast[] = data.listSaleForecast.filter(o => o.pltype == pltype && o.modelName == data.model);
    // if (oSale.length) {
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var vDay: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        Row[`d${vDay}`] = oSale[`d${vDay}`];
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
        d31: 0,
        listLastInventory: [],
        listHoldInventory: [],
        lastInventoryMain: undefined
    };
    Row.sbu = data.sbu;
    Row.model = data.modelGroup;
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
    let total = 0;
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var vDay: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        let filterInventory = data.inventory.filter((o: MInventory) => o.date.substring(8, 11) == vDay).map(o => o.cnt);
        let sumInventoryOfDay = 0;
        filterInventory.map(o => {
            sumInventoryOfDay += parseFloat(o);
        });
        total += sumInventoryOfDay;
        Row[`d${vDay}`] = sumInventoryOfDay;
    });
    // }
    Row.total = total.toLocaleString('en');
    return Row
}

export const initRowInventory = (data: MActPlans, oInventory: MInventory, year: string) => {
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
        d31: 0,
        listLastInventory: [],
        listHoldInventory: [],
        lastInventoryMain: undefined
    };
    let total = 0;
    Row.sbu = data.sbu;
    // let oInventory: MInventory[] = data.listInventory.filter(o => o.pltype == pltype && o.model == data.model);
    Row.model = data.modelGroup;
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Inventory';
    Row.customer = '';
    Row.pltype = oInventory.pltype;
    Row.pltypeText = '';
    Row.detail = '';
    Row.menuAuto = 'IVW01 Product Detail';
    // if (oInventory.length) {
    let DD: string = moment().format('DD');
    let YYYY: string = moment().format('YYYY');
    let DDINV: string = oInventory.date.substring(8, 11);
    let YYYYINV: string = oInventory.date.substring(0, 4);
    // console.log(oInventory.date, ' ', DDINV, ' ', YYYYINV);
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var dayLoop: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });

        if (dayLoop == DD && YYYYINV == YYYY) {
            Row[`d${dayLoop}`] = oInventory.cnt;
        }
        // let InventoryOfDay = oInventory.
        // let dayNow: string = oInventory[0].date.substring(oInventory[0].date.length - 2);
        // if (dayNow == dayLoop) {
        //     Row[`d${dayLoop}`] = oInventory[0].cnt;
        //     total += parseInt(oInventory[0].cnt);
        // }
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
        d31: 0,
        listLastInventory: [],
        listHoldInventory: [],
        lastInventoryMain: undefined
    };
    Row.sbu = data.sbu;
    let total = 0;
    Row.model = data.modelGroup;
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
        d31: 0,
        listLastInventory: [],
        listHoldInventory: [],
        lastInventoryMain: undefined
    };
    Row.sbu = data.sbu;
    let total = 0;
    Row.model = data.modelGroup;
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
            Row[`d${dayLoop}`] = data.listPDTInventory.length ? parseInt(data.listPDTInventory[0].balstk) : '';
        }
    });
    Row.total = total.toLocaleString('en');
    return Row
}


export const initRowInventoryPlanning = (data: MActPlans) => {
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
        inventory: [],
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
        d31: 0,
        listLastInventory: [],
        listHoldInventory: [],
        lastInventoryMain: undefined,
        lastInventory: 0
    };
    Row.sbu = data.sbu;
    Row.model = data.modelGroup;
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Inventory Planning';
    Row.customer = '';
    Row.pltype = data.lastInventory.toString();
    Row.pltypeText = '';
    Row.detail = '';
    Row.menuAuto = '';
    let numLastInventory: number = data.lastInventory;
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var dayLoop: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        let filterSaleOfDay = data.listSaleForecast.map(o => { return o[`d${dayLoop}`] });
        let TotalSaleOfDay = 0;
        if (filterSaleOfDay.length) {
            TotalSaleOfDay = filterSaleOfDay.reduce((a, b) => a + b);
        }
        if (dayLoop == '01') {
            numLastInventory -= TotalSaleOfDay;
            Row[`d${dayLoop}`] = numLastInventory;
        } else {
            let PrevDay = (parseInt(dayLoop) - 1).toLocaleString('en', { minimumIntegerDigits: 2 });
            let PrevCurrentPlan = 0;
            data.listCurpln.map((oCurPln: ListCurpln) => {
                PrevCurrentPlan += oCurPln[`day${PrevDay}`];
            });
            let InventoryHold = 0;
            if (dayLoop == moment().format('DD') && data.listHoldInventory.length) {
                InventoryHold = parseInt(data.listHoldInventory[0].balstk);
            }
            // console.log(`${numLastInventory} + ${PrevCurrentPlan} + ${InventoryHold}    -  ${TotalSaleOfDay}`)
            numLastInventory = (numLastInventory + PrevCurrentPlan + InventoryHold) - TotalSaleOfDay;
            let InventoryPlanning = numLastInventory;
            Row[`d${dayLoop}`] = InventoryPlanning;
            PrevCurrentPlan = 0;
        }

    });
    Row.total = numLastInventory.toLocaleString('en');
    return Row
}

export const initRowEmpty = () => {
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
        d31: 0,
        listLastInventory: [],
        listHoldInventory: [],
        lastInventoryMain: undefined
    };
    Row.model = '';
    Row.wcno = '';
    Row.modelCode = '';
    Row.sebango = '';
    Row.type = 'empty';
    Row.customer = '';
    Row.pltype = '';
    Row.pltypeText = '';
    Row.detail = '';
    Row.menuAuto = '';
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var dayLoop: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        Row[`d${dayLoop}`] = '';
    });
    Row.total = '';
    return Row
}

export const initRowInventoryPlanningFinal = (data: MActPlans) => {
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
        d31: 0,
        listLastInventory: [],
        listHoldInventory: [],
        lastInventoryMain: undefined
    };
    Row.sbu = data.sbu;
    Row.model = data.modelGroup;
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Inventory Planning (Final)';
    Row.customer = '';
    Row.pltype = '';
    Row.pltypeText = '';
    Row.detail = '';
    Row.lastInventoryMain = data.lastInventoryMain;
    Row.menuAuto = '';
    let total = 0;
    let adjEkbPartStock = typeof data.lastInventoryMain?.bal != 'undefined' ? data.lastInventoryMain.bal : 0;
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var dayLoop: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        let filterInventoryMain = data.listActFinal.filter(o => o.prdymd == dayLoop);
        let InventoryMain = 0;
        if (filterInventoryMain.length) {
            InventoryMain = filterInventoryMain[0].qty;
        }
        if (dayLoop == '01') {
            let numSaleOfDay = 0;
            numSaleOfDay = data.listSaleForecast.map(o => { return o[`d01`] }).reduce(function (a, b) { return a + b; }, 0);
            adjEkbPartStock -= numSaleOfDay;
            Row[`d${dayLoop}`] = adjEkbPartStock;
        } else {
            let PrevDay = (dayLoop - 1).toLocaleString('en', { minimumIntegerDigits: 2 });
            let numSaleOfDay = data.listSaleForecast.map(o => { return o[`d${dayLoop}`] }).reduce(function (a, b) { return a + b; }, 0); // Get Value Sale
            let rInventoryMainPrevOneDay = data.listActFinal.filter(o => o.prdymd == PrevDay); // Array Inventory Main -1 Day 

            let valInventory = 0;
            if (rInventoryMainPrevOneDay.length) {
                valInventory = rInventoryMainPrevOneDay[0].qty;
            }
            let InventoryHold = 0;
            if (dayLoop == moment().format('DD') && data.listHoldInventory.length) {
                InventoryHold = data.listHoldInventory[0].balstk;
            }
            adjEkbPartStock = (parseInt(adjEkbPartStock) + parseInt(valInventory) + parseInt(InventoryHold)) - parseInt(numSaleOfDay);
            let InventoryPlanning = adjEkbPartStock;
            Row[`d${dayLoop}`] = InventoryPlanning;
        }

    });
    Row.total = adjEkbPartStock.toLocaleString('en');
    return Row
}
export const initRowInventoryPlanningMain = (data: MActPlans) => {
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
        d31: 0,
        listLastInventory: [],
        listHoldInventory: [],
        lastInventoryMain: undefined
    };
    Row.sbu = data.sbu;
    let total = 0;
    Row.model = data.modelGroup;
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Inventory Planning (Main)';
    Row.customer = '';
    Row.pltype = '';
    Row.pltypeText = '';
    Row.detail = '';
    Row.lastInventoryMain = data.lastInventoryMain;
    Row.menuAuto = '';
    let adjInventoryMain = typeof data.lastInventoryMain?.bal != 'undefined' ? data.lastInventoryMain.bal : 0;
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var dayLoop: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        let filterInventoryMain = data.listActMain.filter(o => o.shiftDate.substring(8, 11) == dayLoop);
        let InventoryMain = 0;
        if (filterInventoryMain.length) {
            InventoryMain = filterInventoryMain[0].cnt;
        }
        if (dayLoop == '01') {
            let numSaleOfDay = 0;
            numSaleOfDay = data.listSaleForecast.map(o => { return o[`d01`] }).reduce(function (a, b) { return a + b; }, 0);
            adjInventoryMain -= InventoryMain;
            adjInventoryMain -= numSaleOfDay;
            Row[`d${dayLoop}`] = adjInventoryMain;
        } else {
            let PrevDay = (dayLoop - 1).toLocaleString('en', { minimumIntegerDigits: 2 });
            let numSaleOfDay = data.listSaleForecast.map(o => { return o[`d${dayLoop}`] }).reduce(function (a, b) { return a + b; }, 0); // Get Value Sale
            let rInventoryMainPrevOneDay = data.listActMain.filter(o => o.shiftDate.substring(8, 11) == PrevDay); // Array Inventory Main -1 Day 
            let valInventory = 0;
            if (rInventoryMainPrevOneDay.length) {
                valInventory = rInventoryMainPrevOneDay[0].cnt;
            }
            let InventoryHold = 0;
            if (dayLoop == moment().format('DD') && data.listHoldInventory.length) {
                InventoryHold = data.listHoldInventory[0].balstk;
            }
            adjInventoryMain = (parseInt(adjInventoryMain) + parseInt(valInventory) + parseInt(InventoryHold)) - parseInt(numSaleOfDay);
            let InventoryPlanning = adjInventoryMain;
            Row[`d${dayLoop}`] = InventoryPlanning;
        }

    });
    Row.total = adjInventoryMain.toLocaleString('en');
    return Row
}


export const initRowInventoryBalance = (data: MActPlans) => {
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
        d31: 0,
        listLastInventory: [],
        listHoldInventory: [],
        lastInventoryMain: undefined
    };
    let total: number = 0;
    Row.sbu = data.sbu;
    Row.model = data.modelGroup;
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Inventory (Balance)';
    Row.customer = '';
    Row.pltype = '';
    Row.pltypeText = '';
    Row.detail = '';
    Row.menuAuto = '';
    // let numInventoryBalance = 0;
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var dayNow = moment().format('DD');
        var dayLoop: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        let oInventory: InventoryBalance[] = data.inventoryBalance.filter((o: InventoryBalance) => o.date.substring(6, 8) == dayLoop);
        if (oInventory.length) {
            Row[`d${dayLoop}`] = oInventory[0].value;
        } else {
            Row[`d${dayLoop}`] = '';
        }
        total = Row[`d${dayLoop}`];
        // if (dayLoop >= dayNow) {
        //     let filterInventory: string[] = data.inventory.filter((o: MInventory) => o.date.substring(8, 11) == dayLoop).map(o => o.cnt);
        //     if (filterInventory.length) {
        //         let sumInventoryOfDay = filterInventory.length ? filterInventory.reduce((a, b) => parseInt(a) + parseInt(b)) : 0;
        //         numInventoryBalance += sumInventoryOfDay;
        //     }
        //     let rSalePrevDay: number[] = data.listSaleForecast.map(o => { return o[`d${dayLoop}`]; }).filter(item => !!item);
        //     let sumSalePrevDay = rSalePrevDay.length ? rSalePrevDay.reduce((a, b) => a + b) : 0;
        //     numInventoryBalance -= sumSalePrevDay;
        //     Row[`d${dayLoop}`] = numInventoryBalance;
        // } else {
        //     Row[`d${dayLoop}`] = '';
        // }
    });
    Row.total = total.toLocaleString('en');
    return Row
}


export const initRowInventoryBalancePltype = (data: MActPlans, oInventoryBalancePltype: InventoryBalancePltype) => {
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
        d31: 0,
        listLastInventory: [],
        listHoldInventory: [],
        lastInventoryMain: undefined
    };
    Row.sbu = data.sbu;
    let pltype = oInventoryBalancePltype.pltype;
    Row.model = data.modelGroup;
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Inventory Balance (Pltype)';
    Row.customer = '';
    Row.pltype = pltype;
    Row.pltypeText = '';
    Row.detail = '';
    Row.menuAuto = '';
    let total: number = 0;
    // let numInventoryBalance = 0;
    [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        var dayNow = moment().format('DD');
        var dayLoop: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        if (dayLoop >= dayNow) {
            let oBalanceOfPltype: InventoryBalance[] = oInventoryBalancePltype.data.filter(o => o.date.slice(-2) == dayLoop);
            if (oBalanceOfPltype.length) {
                Row[`d${dayLoop}`] = oBalanceOfPltype[0].value;
                total = oBalanceOfPltype[0].value;
            } else {
                Row[`d${dayLoop}`] = '';
            }
            // let filterInventory: string[] = data.inventory.filter((o: MInventory) => o.date.substring(8, 11) == dayLoop && o.pltype == pltype).map(o => o.cnt);
            // if (filterInventory.length) {
            //     let sumInventoryOfDay = filterInventory.length ? filterInventory.reduce((a, b) => parseInt(a) + parseInt(b)) : 0;
            //     numInventoryBalance += sumInventoryOfDay;
            // }
            // let rSalePrevDay: number[] = data.listSaleForecast.filter(item => item.pltype == pltype).map(o => { return o[`d${dayLoop}`]; });
            // let sumSalePrevDay = rSalePrevDay.length ? rSalePrevDay.reduce((a, b) => a + b) : 0;
            // numInventoryBalance -= sumSalePrevDay;
            // Row[`d${dayLoop}`] = numInventoryBalance;
        } else {
            Row[`d${dayLoop}`] = '';
        }
    });
    // Row.total = numInventoryBalance.toLocaleString('en');
    Row.total = total.toLocaleString('en')
    return Row
}