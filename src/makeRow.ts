import moment from "moment";
import { InventoryBalance, InventoryBalancePltype, ListCurpln, ListDelivery, ListInventoryPlanningMain, ListSaleForecast, MActMain, MActPlan, MActPlans, MData, MInventory } from "./interface";
const initRow = (): MActPlans | any => {
    return {
        warning: false,
        listDelivery: [],
        listInventoryPlanning: [],
        listInventoryPlanningMain: [],
        listSaleForeCaseAllCustomer: [],
        totalInventoryPlanning: 0,
        totalInventoryPlanningFinal: 0,
        totalInventoryPlanningMain: 0,
        inventoryPlanningMainOrFinalEnd: 0,
        listInventoryPlanningMainOrFinal: [],
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
        lastInventory: 0,
        modelGroup: "",
        sbu: "",
        listActFinal: [],
        listPDTInventory: [],
        inventoryBalance: [],
        inventoryBalancePltype: []
    }
}
export const fmDay = (numDay: number) => { // แปลงวันที่ D-1 => (D+1).format('DD')
    return (numDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
}
export const initRowCurPln = (data: MActPlans, oCurpln: ListCurpln | any) => {
    var row = initRow();
    row.sbu = data.sbu;
    row.model = data.modelGroup;
    row.wcno = oCurpln.wcno.toString();
    row.modelCode = data.model.toString();
    row.sebango = data.sebango;
    row.type = 'Current Plan';
    let total = 0;
    [...Array(31)].map((_, iDay: number) => {
        var DayLoop: string = fmDay(iDay);
        let CurrentVal: number = oCurpln[`day${DayLoop}`] != '' ? Number(oCurpln[`day${DayLoop}`]) : 0;
        row[`d${DayLoop}`] = CurrentVal;
        total += CurrentVal;
    });
    row.total = total.toLocaleString('en');
    return row
}
export const initRowTotalCurPlnAllLine = (data: MActPlans) => {
    var row = initRow();
    row.sbu = data.sbu;
    row.model = data.modelGroup;
    row.modelCode = data.model.toString();
    row.sebango = data.sebango;
    row.type = 'Total Current Plan';
    let total = 0;
    [...Array(31)].map((_, iDay: number) => {
        var DayLoop: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        let nCurrentPlanOfDayAllLine = 0;
        data.listCurpln.map((oCurpln: ListCurpln | any) => {
            nCurrentPlanOfDayAllLine += oCurpln[`day${DayLoop}`];
            total += oCurpln[`day${DayLoop}`];
        })
        row[`d${DayLoop}`] = nCurrentPlanOfDayAllLine;
        total += 0;
    });
    row.total = total.toLocaleString('en');
    return row
}
export const initRowMainAssy = (data: MActPlans, wcno: number, ym: string) => {
    let mm: string = ym.substring(4, 6);
    var row = initRow();
    row.sbu = data.sbu;
    row.model = data.modelGroup;
    row.wcno = wcno.toString();
    row.modelCode = data.model.toString();
    row.sebango = data.sebango;
    row.type = 'Result_Main Assembly';
    let total = 0;
    [...Array(31)].map((_, iDay: number) => {
        var vDay: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        var index = data.listActMain.findIndex((o: MActMain) => o.shiftDate.substring(8, 11) == vDay && o.shiftDate.substring(5, 7) == mm && o.lineName == wcno.toString());
        if (index != -1) {
            row[`d${vDay}`] = data.listActMain[index].cnt;
            total += data.listActMain[index].cnt;
        }
    });
    row.total = total.toLocaleString('en');
    return row
}
export const initRowFinal = (data: MActPlans, wcno: number) => {
    var Row = initRow();
    Row.sbu = data.sbu;
    Row.model = data.modelGroup;
    Row.wcno = wcno.toString();
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Result_Final Line';
    let total = 0;
    [...Array(31)].map((_, iDay: number) => {
        var vDay: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        var index = data.listActFinal.findIndex((o: MActPlan) => o.Prdymd == vDay && o.Model == data.model && o.Wcno == wcno);
        if (index != -1) {
            Row[`d${vDay}`] = data.listActFinal[index].Qty;
            total += data.listActFinal[index].Qty;
        }
    });
    Row.total = total.toLocaleString('en');
    return Row
}
// export const initTotalTitleInbound = (data: MActPlans, ym: string) => { // ym = YYYYMM
//     var Row = initRow();
//     Row.sbu = data.sbu;
//     Row.model = data.modelGroup;
//     Row.wcno = data.wcno;
//     Row.modelCode = data.model.toString();
//     Row.sebango = data.sebango;
//     Row.type = 'Total Inbound Finishgoods';
//     [...Array(31)].map((_, iDay: number) => {
//         var vDay: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
//         let ymd: string = `${ym}${vDay}`;
//         let nInbound = 0;
//         let rInbound = data.listInbound.filter(o => o.astDate.toString() == ymd);
//         if (Object.keys(rInbound).length > 0) {
//             nInbound = rInbound[0].astQty;
//         }
//         Row[`d${vDay}`] = nInbound;
//     });
//     Row.total = data.listInbound.map(o => o.astQty).reduce((a, b) => a + b, 0).toString();
//     return Row
// }
export const initNewTotalTitleInbound = (data: any) => { // ym = YYYYMM
    var Row = initRow();
    if (data.length > 0) {
        Row.sbu = data[0].SBU;
        Row.model = data[0].SEBANGO;
        Row.modelCode = data[0].MODEL;
        Row.sebango = data[0].SEBANGO;
        Row.type = 'Total Inbound Finishgoods';
        let total: number = 0;
        [...Array(31)].map((_, iDay: number) => {
            var vDay: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
            // let ymd: string = `${ym}${vDay}`;
            // let nInbound = 0;
            // let rInbound = data.listInbound.filter(o => o.astDate.toString() == ymd);
            // if (Object.keys(rInbound).length > 0) {
            //     nInbound = rInbound[0].astQty;
            // }
            let nInbound: number = 0;
            try {
                nInbound = Number(data[0][`D${vDay}`]);
            } catch (e: Error | any) {
                nInbound = 0;
            }
            Row[`d${vDay}`] = nInbound;
            total += nInbound;
        });
        Row.total = total.toLocaleString('en');
    }

    return Row
}
export const initTotalInbound = (data: MActPlans, pltype: string) => {
    var Row = initRow();
    Row.model = data.modelGroup;
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Inbound Finishgoods';
    Row.pltype = pltype;
    Row.detail = 'Result-In/Out WH(Balance)';
    let total = 0;
    [...Array(31)].map((_, iDay: number) => {
        var vDay: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        var index = data.listInbound.findIndex(o => o.astDate.toString().substring(8, 10) == vDay && o.pltype == pltype);
        if (index != -1) {
            Row[`d${vDay}`] = data.listInbound[index].astQty;
            total += data.listInbound[index].astQty;
        } else {
            Row[`d${vDay}`] = '';
        }
    });
    Row.total = total.toLocaleString('en');
    return Row
}
export const initRowTotalSale = (data: MActPlans) => {
    var Row = initRow();
    Row.sbu = data.sbu;
    Row.model = data.modelGroup;
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Total Sales Plan&Forecast';
    let total = 0;
    [...Array(31)].map((_, iDay: number) => {
        var vDay: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        let SaleOfDay = data.listSaleForecast.map((o: ListSaleForecast | any) => { return o[`d${vDay}`] });
        let SumSaleOfDay = 0;
        if (SaleOfDay.length) {
            SumSaleOfDay = SaleOfDay.reduce((a, b) => a + b);
            total += SumSaleOfDay;
        }
        Row[`d${vDay}`] = SumSaleOfDay;
    });
    Row.total = total.toLocaleString('en');
    return Row
}
export const initRowDelivery = (data: MActPlans, oDelivery: ListDelivery) => {
    var Row = initRow();
    Row.sbu = data.sbu;
    Row.model = data.modelGroup;
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Delivered';
    Row.customer = oDelivery != null ? oDelivery.customer : "";
    Row.pltype = oDelivery != null ? oDelivery.pltype : "";
    Row.detail = 'Delivery';
    let total = 0;
    if (oDelivery != null) {
        [...Array(31)].map((_, iDay: number) => {
            var vDay: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
            var item: MData[] = oDelivery.data.filter((o => moment(o.date).format('DD') == vDay));
            if (item.length) {
                Row[`d${vDay}`] = item[0].value;
                total += item[0].value;
            } else {
                Row[`d${vDay}`] = 0;
            }
        });
    }
    Row.total = total.toLocaleString('en');
    return Row
}
export const initRowSale = (data: MActPlans, oSale: ListSaleForecast | any) => {
    var Row = initRow();
    Row.sbu = data.sbu;
    Row.model = data.modelGroup;
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Sales Plan&Forecast';
    Row.customer = oSale.customer;
    Row.pltype = oSale.pltype;
    Row.detail = 'Sales Plan&Forecast';
    let total = 0;
    [...Array(31)].map((_, iDay: number) => {
        var vDay: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        Row[`d${vDay}`] = oSale[`d${vDay}`];
        total += Number(oSale[`d${vDay}`]);
    });
    Row.total = total.toLocaleString('en');
    return Row
}
export const initRowTitleTotalInventory = (data: MActPlans) => {
    var Row = initRow();
    Row.sbu = data.sbu;
    Row.model = data.modelGroup;
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Total Inventory';
    Row.menuAuto = 'Total IVW01 Product Detail';
    let total = 0;
    [...Array(31)].map((_, iDay: number) => {
        var vDay: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        let filterInventory = data.inventory.filter((o: MInventory) => o.date.substring(8, 11) == vDay).map(o => o.cnt);
        let sumInventoryOfDay = 0;
        filterInventory.map(o => {
            sumInventoryOfDay += parseFloat(o);
        });
        total += sumInventoryOfDay;
        Row[`d${vDay}`] = sumInventoryOfDay;
    });
    Row.total = total.toLocaleString('en');
    return Row
}

export const initRowInventory = (data: MActPlans, oInventory: MInventory) => {
    var Row = initRow();
    let total = 0;
    Row.sbu = data.sbu;
    Row.model = data.modelGroup;
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Inventory';
    Row.pltype = oInventory.pltype;
    Row.menuAuto = 'IVW01 Product Detail';
    let DD: string = moment().format('DD');
    let YYYY: string = moment().format('YYYY');
    let YYYYINV: string = oInventory.date.substring(0, 4);
    [...Array(31)].map((_, iDay: number) => {
        var dayLoop: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        if (dayLoop == DD && YYYYINV == YYYY) {
            Row[`d${dayLoop}`] = oInventory.cnt;
        }
    });
    Row.total = total.toLocaleString('en');
    return Row
}
export const initRowHoldInventory = (data: MActPlans) => {
    var Row = initRow();
    Row.sbu = data.sbu;
    let total = 0;
    Row.model = data.modelGroup;
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Inventory (Hold)';
    [...Array(31)].map((_, iDay: number) => {
        var dayLoop: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        if (dayLoop == moment().format('DD')) {
            Row[`d${dayLoop}`] = data.listHoldInventory.length ? parseInt(data.listHoldInventory[0].balstk) : '';
        }
    });
    Row.total = total.toLocaleString('en');
    return Row
}
export const initRowPDTInventory = (data: MActPlans) => {
    var Row = initRow();
    Row.sbu = data.sbu;
    let total = 0;
    Row.model = data.modelGroup;
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Inventory (PDT)';
    [...Array(31)].map((_, iDay: number) => {
        var dayLoop: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        if (dayLoop == moment().format('DD')) {
            Row[`d${dayLoop}`] = data.listPDTInventory.length ? parseInt(data.listPDTInventory[0].balstk) : '';
        }
    });
    Row.total = total.toLocaleString('en');
    return Row
}
export const initRowInventoryPlanning = (data: MActPlans) => {
    var Row = initRow();
    Row.sbu = data.sbu;
    Row.model = data.modelGroup;
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Inventory Planning';
    Row.customer = data.lastInventory.toString();
    Row.pltype = data.lastInventory.toString();
    [...Array(31)].map((_, iDay: number) => {
        let dayLoop: string = fmDay(iDay);
        let num: number = 0;
        if (typeof data.listInventoryPlanning[iDay] != 'undefined') {
            num = data.listInventoryPlanning[iDay].value;
        }
        Row[`d${dayLoop}`] = num;
    });
    try {
        Row.total = data.totalInventoryPlanning.toLocaleString('en');
    } catch {
        Row.total = "0";
    }
    Row.totalInventoryPlanning = Number(Row.total);
    return Row
}

export const initRowEmpty = () => {
    var Row = initRow();
    Row.type = 'empty';
    return Row
}

export const initRowInventoryPlanningFinal = (data: MActPlans) => {
    var Row = initRow();
    Row.sbu = data.sbu;
    Row.model = data.modelGroup;
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Inventory Planning (Final)';
    Row.lastInventoryMain = data.lastInventoryMain;
    let rInventoryMainOrFinal: MInventory[] = [];
    if (typeof data.listInventoryPlanningMainOrFinal != 'undefined') {
        rInventoryMainOrFinal = data.listInventoryPlanningMainOrFinal;
    }
    rInventoryMainOrFinal.map((o: MInventory, i: number) => {
        let day: string = (i + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        Row[`d${day}`] = o.cnt != '' ? o.cnt : '';
    })
    Row.total = data.inventoryPlanningMainOrFinalEnd.toString();
    Row.totalInventoryPlanningMain = Number(Row.total);
    return Row
}
export const initRowInventoryPlanningMain = (data: MActPlans) => {
    var Row = initRow();
    Row.sbu = data.sbu;
    Row.model = data.modelGroup;
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Inventory Planning (Main)';
    Row.lastInventoryMain = data.lastInventoryMain;
    data.listInventoryPlanningMain.map((o: ListInventoryPlanningMain) => {
        Row[`D${moment(o.date).format('DD')}`] = o.value;
    });
    if (typeof data.totalInventoryPlanningMain != 'undefined') {
        Row.total = data.totalInventoryPlanningMain.toLocaleString('en');
    }
    Row.totalInventoryPlanningMain = Number(Row.total.toString().replace(',', ''));
    return Row
}

export const initRowInventoryBalance = (data: MActPlans) => {
    var Row = initRow();
    let total: number = 0;
    Row.sbu = data.sbu;
    Row.model = data.modelGroup;
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Inventory (Balance)';
    [...Array(31)].map((_, iDay: number) => {
        var dayLoop: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        let oInventory: InventoryBalance[] = data.inventoryBalance.filter((o: InventoryBalance) => o.date.substring(6, 8) == dayLoop);
        if (oInventory.length) {
            Row[`d${dayLoop}`] = oInventory[0].value;
            total = oInventory[0].value;
        } else {
            Row[`d${dayLoop}`] = '';
        }
    });
    Row.total = total.toLocaleString('en');
    return Row
}
export const initRowInventoryBalancePltype = (data: MActPlans, oInventoryBalancePltype: InventoryBalancePltype) => {
    var Row = initRow();
    Row.sbu = data.sbu;
    let pltype = oInventoryBalancePltype.pltype;
    Row.model = data.modelGroup;
    Row.wcno = data.wcno;
    Row.modelCode = data.model.toString();
    Row.sebango = data.sebango;
    Row.type = 'Inventory Balance (Pltype)';
    Row.pltype = pltype;
    let total: number = 0;
    [...Array(31)].map((_, iDay: number) => {
        var dayLoop: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        let oBalanceOfPltype: InventoryBalance[] = oInventoryBalancePltype.data.filter(o => o.date.slice(-2) == dayLoop);
        if (oBalanceOfPltype.length) {
            Row[`d${dayLoop}`] = oBalanceOfPltype[0].value;
            total = oBalanceOfPltype[0].value;
        } else {
            Row[`d${dayLoop}`] = '';
        }
    });
    Row.total = total.toLocaleString('en')
    return Row
}