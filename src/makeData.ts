//@ts-check
import { InventoryBalancePltype, ListCurpln, MActPlans, MInventory } from './interface';
import { initNewTotalTitleInbound, initRowCurPln, initRowDelivery, initRowEmpty, initRowFinal, initRowHoldInventory, initRowInventory, initRowInventoryBalance, initRowInventoryBalancePltype, initRowInventoryPlanning, initRowMainAssy, initRowPDTInventory, initRowSale, initRowTitleTotalInventory, initRowTotalCurPlnAllLine, initRowTotalSale} from './makeRow';

export type Person = {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    zipCode: string;
    city: string;
    state: string;
    country: string;
    petName: string;
    age: number;
    salary: string;
    dateOfBirth: string;
    dateOfJoining: string;
    isActive: string;
};


export const initData = (data: MActPlans[], ym: string) => {
    const dummyData: MActPlans[] = [];
    console.log(data);
    data.map((oData: MActPlans) => {
        dummyData.push(initRowTotalSale(oData));
        oData.listSaleForecast.map((oSale) => {
            let haveSale: number | string = Object.values(oSale).filter((o) => o == 0).length;
            if (haveSale != 31) {
                dummyData.push(initRowSale(oData, oSale));
            }
        });
        if (oData.listDelivery.length == 0) {
            dummyData.push(initRowDelivery(oData, null));
        } else {
            oData.listDelivery.map((oDelivery) => {
                dummyData.push(initRowDelivery(oData, oDelivery));
            });
        }
        dummyData.push(initRowTitleTotalInventory(oData));
        oData.inventory.map((oInventory: MInventory) => {
            dummyData.push(initRowInventory(oData, oInventory));
        });
        dummyData.push(initRowInventoryBalance(oData)); // คำนวนผ่าน API
        oData.inventoryBalancePltype.map((oInventoryBalancePltype: InventoryBalancePltype) => {
            dummyData.push(initRowInventoryBalancePltype(oData, oInventoryBalancePltype)); // คำนวนผ่าน API
        })
        // dummyData.push(initTotalTitleInbound(oData, ym));
        if(oData.model == "JT1GUVDYR@TF"){
            console.log(oData.newInbound)
        }
        dummyData.push(initNewTotalTitleInbound(oData.newInbound));
        oData.listCurpln.map((oCurpln: ListCurpln) => {
            dummyData.push(initRowCurPln(oData, oCurpln));
            dummyData.push(initRowMainAssy(oData, oCurpln.wcno, ym));
            dummyData.push(initRowFinal(oData, oCurpln.wcno));
        });
        dummyData.push(initRowTotalCurPlnAllLine(oData));
        dummyData.push(initRowHoldInventory(oData))
        dummyData.push(initRowPDTInventory(oData))
        dummyData.push(initRowInventoryPlanning(oData)); // คำนวนผ่าน API
        // if (oData.modelGroup == 'ODM') {
        //     dummyData.push(initRowInventoryPlanningFinal(oData));
        // } else {
        //     dummyData.push(initRowInventoryPlanningMain(oData)); // คำนวนผ่าน API
        // }
        dummyData.push(initRowEmpty());
    })
    return dummyData;
}
