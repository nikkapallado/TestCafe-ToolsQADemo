import {ClientFunction} from 'testcafe'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'

const url = 'https://the-internet.herokuapp.com/login'
const getUrl = ClientFunction(() => window.location.href);

fixture('Login Page')
.page(url)

test('Loading Login Page', async t => {

    await t
    .expect(getUrl()).contains(url)
    .expect(LoginPage.loginBtn.exists).ok();

});

test('FORM - Successfully Login', async t => {

    LoginPage.setUserName('tomsmith');
    LoginPage.setPassword('SuperSecretPassword!');
    LoginPage.clickOnLoginButton();

    await t.expect(HomePage.responseCard.innerText).contains('You logged into a secure area');
    

});

test('FORM - Invalid Username', async t => {

    LoginPage.setUserName('joanMedia');
    LoginPage.setPassword('SuperSecretPassword!');
    LoginPage.clickOnLoginButton();

    await t.expect(LoginPage.responseCard.innerText).contains('Your username is invalid');
    

});

test('FORM - Invalid Password', async t => {

    LoginPage.setUserName('tomsmith');
    LoginPage.setPassword('SuperSecretPasswo');
    LoginPage.clickOnLoginButton();

    await t.expect(LoginPage.responseCard.innerText).contains('Your password is invalid');
    

});
