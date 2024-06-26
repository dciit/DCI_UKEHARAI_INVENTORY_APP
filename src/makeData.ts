//@ts-nocheck
import { faker } from '@faker-js/faker';
import { InventoryBalancePltype, ListCurpln, MActPlans, MInventory } from './interface';
import { initRowCurPln, initRowDelivery, initRowEmpty, initRowFinal, initRowHoldInventory, initRowInventory, initRowInventoryBalance, initRowInventoryBalancePltype, initRowInventoryPlanning, initRowInventoryPlanningFinal, initRowInventoryPlanningMain, initRowMainAssy, initRowPDTInventory, initRowSale, initRowTitleTotalInventory, initRowTotalCurPlnAllLine, initRowTotalSale, initTotalInbound, initTotalTitleInbound } from './makeRow';

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


export const initData = (data: MActPlans[], year: string, ym: string) => {
    const dummyData: MActPlans[] = [];
    data.map((oData: MActPlans) => {
        dummyData.push(initRowTotalSale(oData));
        oData.listSaleForecast.map((oSale) => {
            let haveSale: number | string = Object.values(oSale).filter((o, i) => o == 0).length;
            if (haveSale != 31) {
                dummyData.push(initRowSale(oData, oSale));
            }
        });
        oData.listDelivery.map((oDelivery) => {
            // let haveSale: number | string = Object.values(oDelivery).filter((o, i) => o == 0).length;
            // if (haveSale != 31) {
            dummyData.push(initRowDelivery(oData, oDelivery));
            // }
        });
        dummyData.push(initRowTitleTotalInventory(oData));
        oData.inventory.map((oInventory: MInventory) => {
            dummyData.push(initRowInventory(oData, oInventory, year));
        });
        dummyData.push(initRowInventoryBalance(oData)); // คำนวนผ่าน API
        oData.inventoryBalancePltype.map((oInventoryBalancePltype: InventoryBalancePltype) => {
            dummyData.push(initRowInventoryBalancePltype(oData, oInventoryBalancePltype)); // คำนวนผ่าน API
        })
        dummyData.push(initTotalTitleInbound(oData, ym));
        oData.listCurpln.map((oCurpln: ListCurpln) => {
            dummyData.push(initRowCurPln(oData, oCurpln));
            dummyData.push(initRowMainAssy(oData, oCurpln.wcno, ym));
            dummyData.push(initRowFinal(oData, oCurpln.wcno));
        });
        dummyData.push(initRowTotalCurPlnAllLine(oData));
        dummyData.push(initRowHoldInventory(oData))
        dummyData.push(initRowPDTInventory(oData))
        dummyData.push(initRowInventoryPlanning(oData, ym)); // คำนวนผ่าน API
        if (oData.modelGroup == 'ODM') {
            dummyData.push(initRowInventoryPlanningFinal(oData));
        } else {
            dummyData.push(initRowInventoryPlanningMain(oData)); // คำนวนผ่าน API
        }
        dummyData.push(initRowEmpty());
    })
    return dummyData;
}

export const makeData = (numberOfRows: number) =>
    [...Array(numberOfRows).fill(null)].map(() => ({
        firstName: faker.person.firstName(),
        middleName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        address: faker.location.streetAddress(),
        zipCode: faker.location.zipCode(),
        city: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.country(),
        petName: faker.animal.cat(),
        age: faker.number.float({ min: 0, max: 100 }),
        salary: faker.number
            .float({ min: 0, max: 1000000 })
            .toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            }),
        dateOfBirth: faker.date.past({ years: 50 }).toDateString(),
        dateOfJoining: faker.date.past({ years: 20 }).toDateString(),
        isActive: faker.datatype.boolean() ? 'Active' : 'Inactive',
    }));