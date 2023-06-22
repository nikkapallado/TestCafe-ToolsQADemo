import { Selector, ClientFunction} from "testcafe";

const getPageURL = ClientFunction(() => {
    return window.location.href;
});

//Parameter function syntax
const getWebElementById = Selector(id =>{
    return document.getElementById(id);
});

const getWebElementByClass = Selector(className => {
    return document.getElementsByClassName(className);
});

//options dependency syntax use this if you do not need to pass different values everytime you call it
const persistentId = "item-3";
const element = Selector(() =>{
    return document.getElementById(persistentId);
}, {
    dependencies:{persistentId}
});

fixture("Web Table Fixture")
    .page("https://demoqa.com/elements")
    .skipJsErrors();

test.skip("Navigate to Web Table Test - Using Selector object", async t =>{
    const webTableLink = Selector("#item-3");
    const webTableHeaderText = Selector(".main-header").innerText;
    await t
        .maximizeWindow()
        .click(webTableLink)
        .expect(getPageURL()).contains("webtables")
        .expect(webTableHeaderText).eql("Web Tables");
});

test.skip("Navigate to Web Table Test - Using Document method", async t =>{
    const webTableLink = getWebElementById("item-3");
    const webTableHeaderText = getWebElementByClass("main-header").innerText;
    await t
        .maximizeWindow()
        .click(webTableLink)
        .expect(getPageURL()).contains("/webtables")
        .expect(webTableHeaderText).eql("Web Tables");
});

test.skip("Navigate to Web Table Test - Using Options dependency", async t =>{
    const webTableHeaderText = getWebElementByClass("main-header").innerText;
    await t
        .maximizeWindow()
        .click(element)
        .expect(getPageURL()).contains("/webtables")
        .expect(webTableHeaderText).eql("Web Tables");
});

test.skip("Navigate to Web Table Test - Using Selector Child", async t =>{
    const webTableLink = Selector("ul.menu-list").child(3);
    const webTableHeaderText = getWebElementByClass("main-header").innerText;
    await t
        .maximizeWindow()
        .click(webTableLink)
        .expect(getPageURL()).contains("/webtables")
        .expect(webTableHeaderText).eql("Web Tables");
});

test.skip("Navigate to Web Table Test - Using Selector withAttr", async t =>{
    const webTableLink = Selector("#item-3");
    const webTableHeaderText = Selector(".main-header").innerText;
    const addButton = Selector("button").withAttribute("id", "addNewRecordButton");
    const registrationFormModalTitle = Selector("#registration-form-modal");
    await t
        .maximizeWindow()
        .click(webTableLink)
        .expect(getPageURL()).contains("webtables")
        .expect(webTableHeaderText).eql("Web Tables")
        .click(addButton)
        .expect(registrationFormModalTitle.innerText).eql("Registration Form");
});

test("Navigate to Web Table Test - Using Selector withExactText", async t =>{
    const webTableLink = Selector("#item-3");
    const webTableHeaderText = Selector(".main-header").innerText;
    const addButton = Selector("button").withExactText("Add");
    const registrationFormModalTitle = Selector("#registration-form-modal");
    await t
        .maximizeWindow()
        .click(webTableLink)
        .expect(getPageURL()).contains("webtables")
        .expect(webTableHeaderText).eql("Web Tables")
        .click(addButton)
        .expect(registrationFormModalTitle.innerText).eql("Registration Form");
});