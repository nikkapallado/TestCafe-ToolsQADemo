import {Selector, t, ClientFunction} from 'testcafe';
import xlsx from 'node-xlsx';

const excelFile = xlsx.parse('./data/testData.xlsx');
const excelSheet = excelFile.find(sheets => sheets.name == 'data');
const excelSheetData = excelSheet.data;

const headers = excelSheetData.shift();
const dataSet = excelSheetData.map((row) => {

    const user = {};

    row.forEach((data, idx) => user[headers[idx]] = data);

    return user;

});

fixture('Excel - Data Driven Demo')

dataSet.forEach(data => {

    test
    .page('http://the-internet.herokuapp.com/login')
    ('Login Page Validation', async t => {

        await t
        .typeText(Selector('input#username'), data.username)
        .typeText(Selector('input#password'), data.password)
        .click('button');

        await t.expect(Selector('div#flash').innerText).contains(data.expectedMessage);

    });

});


