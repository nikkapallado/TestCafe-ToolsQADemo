import { Selector, ClientFunction} from "testcafe";

const getPageURL = ClientFunction(() => {
    return window.location.href;
});

fixture("Web Table Fixture")
    .page("https://demoqa.com/elements")
    .skipJsErrors();

test.skip("Click on all first level child checkboxes Test - Using Selector count and nth", async t =>{
    const checkboxLink = Selector("#item-1");
    const checkboxHeaderText = Selector(".main-header").innerText;
    const parentToggleButton = Selector("button.rct-collapse.rct-collapse-btn");

    await t
        .maximizeWindow()
        .click(checkboxLink)
        .expect(getPageURL()).contains("checkbox")
        .expect(checkboxHeaderText).eql("Check Box")
        .click(parentToggleButton);

        
    const firstLevelChildCheckboxes = Selector("ol > li.rct-node-collapsed > span > label > span.rct-checkbox");
    const firstLevelChildCheckboxesCount = await firstLevelChildCheckboxes.count;

    console.log("... First level checkboxes found: " + firstLevelChildCheckboxesCount);

    for(let i=0; i<firstLevelChildCheckboxesCount; i++){
        await t
            .click(firstLevelChildCheckboxes.nth(i));
    }

    const selectedListText = Selector("#result").innerText;
    await t
        .expect(selectedListText).eql("You have selected :\nhome\ndesktop\nnotes\ncommands\ndocuments\nworkspace\nreact\nangular\nveu\noffice\npublic\nprivate\nclassified\ngeneral\ndownloads\nwordFile\nexcelFile")

});

test.skip("Verify if checkbox is checked", async t =>{
    const checkboxLink = Selector("#item-1");
    const checkboxHeaderText = Selector(".main-header").innerText;
    const parentCheckbox = Selector("#tree-node-home");
    const parentfolder = Selector("label[for='tree-node-home']");

    await t
        .maximizeWindow()
        .click(checkboxLink)
        .expect(getPageURL()).contains("checkbox")
        .expect(checkboxHeaderText).eql("Check Box")
        .expect(parentCheckbox.checked).notOk()
        .click(parentfolder)
        .expect(parentCheckbox.checked).ok();
});

test.skip("Verify if element has class test", async t =>{
    const checkboxLink = Selector("#item-1");
    const checkboxHeaderText = Selector(".main-header").innerText;
    const parentDropdown = Selector("button[title='Toggle']").nth(0);
    const parentfolder = Selector("label[for='tree-node-home']");

    await t
        .maximizeWindow()
        .click(checkboxLink)
        .expect(getPageURL()).contains("checkbox")
        .expect(checkboxHeaderText).eql("Check Box")
        .expect(parentDropdown.classNames).eql(["rct-collapse", "rct-collapse-btn"]);
});

test.skip("Verify the element text test", async t =>{
    const checkboxLink = Selector("#item-1");
    const checkboxHeaderText = Selector(".main-header").innerText;
    const parentTitle = Selector(".rct-title").nth(0);

    await t
        .maximizeWindow()
        .click(checkboxLink)
        .expect(getPageURL()).contains("checkbox")
        .expect(checkboxHeaderText).eql("Check Box")
        .expect(parentTitle.innerText).eql("Home");
});

test("Verify the element's style property", async t =>{
    const checkboxLink = Selector("#item-1");
    const checkboxHeaderText = Selector(".main-header").innerText;
    const parentFolderIcon = Selector(".rct-icon.rct-icon-parent-close").nth(0);
    const parentfolder = Selector("label[for='tree-node-home']");

    await t
        .maximizeWindow()
        .click(checkboxLink)
        .expect(getPageURL()).contains("checkbox")
        .expect(checkboxHeaderText).eql("Check Box")
        .expect(parentFolderIcon.getStyleProperty("color")).eql("rgb(51, 51, 204)")

});