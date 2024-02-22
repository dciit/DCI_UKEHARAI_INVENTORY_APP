import { faker } from '@faker-js/faker';
import { ListSaleForecast, MActPlans } from './interface';
import { initRowCurPln, initRowFinal, initRowInventory, initRowMainAssy, initRowSale, initRowTitleTotalInventory, initRowTotalSale, initTotalInbound, initTotalTitleInbound } from './makeRow';

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


export const initData = (data: MActPlans[]) => {
    const dummyData: MActPlans[] = [];
    data.map((oData: MActPlans) => {
        // item.listCurpln.map((oCurrentPlan: ListCurpln) => {
        //     console.log(oCurrentPlan)
        // });
        dummyData.push(initRowCurPln(oData));
        dummyData.push(initRowMainAssy(oData));
        dummyData.push(initRowFinal(oData));
        dummyData.push(initTotalTitleInbound(oData));
        oData.listPltype.map((pltype: string) => {
            dummyData.push(initTotalInbound(oData, pltype));
        });
        dummyData.push(initRowTotalSale(oData));
        oData.listPltype.map((pltype: string) => {
            let oSales: ListSaleForecast[] = oData.listSaleForecast.filter(o => o.pltype == pltype && o.modelName == oData.model);
            oSales.map((oSale: ListSaleForecast) => {
                // console.log(`${oSale.modelCode} modelName : ${oSale.modelName} customer : ${oSale.customer} pltype : ${oSale.pltype}`);
                dummyData.push(initRowSale(oData, oSale, pltype, oSale.customer));
            })

        });
        dummyData.push(initRowTitleTotalInventory(oData));
        oData.listPltype.map((pltype: string) => {
            dummyData.push(initRowInventory(oData, pltype));
        });
        // item.customer = "LINE 2";
        // [...Array(31)].map((oDay: ListCurpln, iDay: number) => {
        //     var vDay: string = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        //     let indexMainOfDate = oData.listActMain.findIndex((o => o.shiftDate.substring(o.shiftDate.length - 2) == vDay));
        //     if(indexMainOfDate != -1){
        //         item[`d${vDay}`] = oData.listActMain[indexMainOfDate].cnt;
        //     }else{
        //         item[`d${vDay}`] = 0;
        //     }
        // });
        // console.log(item)
        // dummyData.push(item);
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