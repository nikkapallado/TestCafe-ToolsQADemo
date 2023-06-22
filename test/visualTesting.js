import { takeSnapshot } from 'testcafe-blink-diff';
import { Selector, t, ClientFunction} from 'testcafe';

fixture('Snapshots')
  .page('https://www.google.com/');


let testName = '';

test('Google Testing ', async t => {
  await takeSnapshot(t);
});

test('Google Testing after search - Var 1', async t => {
  
    //How to get the test name assigned in a variable
    testName = t.testRun.test.name;

    //Page interactions
    await t
        .typeText('textarea.gLFyf', 'John Doe')
        .click('input.gNO89b')

    //Snapshot code

    //Scenario 1/Breakpoint 1: Search in breakpoint of 1600 * 1200 - Width * Height
    //The snapshot will be taken in full page

    await t.resizeWindow(1600,1000);
    await t.wait(4000);

    await takeSnapshot(t, testName , {
        fullPage: false, 
        timeout:2000
    });


  });

  test('Google Testing after search - Var 2', async t => {
  
    //How to get the test name assigned in a variable
    testName = t.testRun.test.name;

    //Page interactions
    await t
        .typeText('textarea.gLFyf', 'John Doe')
        .click('input.gNO89b')

    //Snapshot code

    //Scenario 1/Breakpoint 1: Search in breakpoint of 1600 * 1200 - Width * Height
    //The snapshot will be taken in full page

    await t.resizeWindow(900,1000);
    await t.wait(5000);

    await takeSnapshot(t, testName, {
        fullPage: true, 
        timeout:2000
    });


  });