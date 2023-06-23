import { Selector, t, ClientFunction } from 'testcafe';

const dataSet = require('../data/data.json');

const getUrl = ClientFunction(() => window.location);

fixture('JSON - Data Driven Demo');

dataSet.forEach(data => {
    test
        .page("https://the-internet.herokuapp.com/login")
        (`Login Page Validation - ${data.expectedMessage}`, async t => {

            await t
                .maximizeWindow()
                .typeText(Selector('input#username'), data.userName)
                .typeText(Selector('input#password'), data.password)
                .click('button')
                .takeScreenshot({
                    path: `Test_Screenshots/${data.expectedMessage}.png`,
                    fullPage: true
                });

            await t.expect(Selector('div#flash').innerText).contains(data.expectedMessage);

        });
});
