import { Selector, ClientFunction} from "testcafe";

const getPageURL = ClientFunction(() => {
    return window.location.href;
});

fixture("Web Table Fixture")
    .page("https://demoqa.com/elements")
    .skipJsErrors();

test("Click on all first level child checkboxes Test - Using Selector count and nth", async t =>{
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