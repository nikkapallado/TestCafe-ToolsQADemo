import { Selector, t, ClientFunction} from 'testcafe';

fixture('Assertion API')
.page('https://demoqa.com/elements');

const getWindowLocation = ClientFunction(() => window.location);

test.skip('Deep Equal ', async t => {

    await t.expect(Selector('.header-wrapper').count).eql(6, "Accordion Items Count", { timeout: 2000 });

});

test.skip('NOT Deep Equal ', async t => {

    await t.expect(Selector('.header-wrapper').count).notEql(5, "Accordion Items Count", { timeout: 2000 });

});

test.skip('Ok ', async t => {

    await t.click('#item-0');
    await t.expect(Selector('#submit').exists).ok('This test will validate if the "submit" button exist');

});

test.skip('Not Ok ', async t => {

    //await t.click('#item-0');
    await t.expect(Selector('#submit').exists).notOk('This test will validate if the "submit" button exist');

});

test('Contains ', async t => {

    const getLocation = ClientFunction(() => document.location.href);

    //await t.click('#item-0');
    await t.expect(getLocation()).contains('https://demoqa.com/elements');

});