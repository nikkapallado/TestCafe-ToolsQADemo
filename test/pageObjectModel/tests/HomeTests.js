import {ClientFunction} from 'testcafe'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'

const loginUrl = 'https://the-internet.herokuapp.com/login'
const homeUrl = 'https://the-internet.herokuapp.com/secure'

const getUrl = ClientFunction(() => window.location.href);

fixture('Home Page')
.page(loginUrl)
.beforeEach(async t => {

    LoginPage.setUserName('tomsmith');
    LoginPage.setPassword('SuperSecretPassword!');
    LoginPage.clickOnLoginButton();

    await t.wait(5000);

});

test('Loading Home Page', async t => {

    await t
    .expect(getUrl()).contains(homeUrl)
    .expect(HomePage.logoutBtn.exists).ok();

});

test('Successfully Logout', async t => {

    HomePage.clickOnLogoutButton();
    await t
    .wait(5000)
    .expect(LoginPage.responseCard.innerText).contains('You logged out of the secure area');


});

