import BnbApiClient from '@binance-chain/javascript-sdk';

//FIXME to bnb mainnet
/*
const network = 'testnet';  //mainnet / testnet
const server = 'https://testnet-dex.binance.org/'; /// https://dex.binance.org/  /  https://testnet-dex.binance.org/
const assetID = "GOREA-812" //AERGO-46B  /  GOREA-812
*/

const network = 'mainnet';  //mainnet / testnet
const server = 'https://dex.binance.org/'; /// https://dex.binance.org/  /  https://testnet-dex.binance.org/
const assetID = "AERGO-46B" //AERGO-46B  /  GOREA-812


const bnbClient = new BnbApiClient(server)

bnbClient.chooseNetwork(network); // or this can be "mainnet"
bnbClient.initChain();

var isOk = false;
var isLogin = false;
var account = {};
var refinedAddrAmountPairs = [];

document.getElementById('targetText').addEventListener('input', function () {
    const addrAmountPairs = this.value.split('\n');
    refinedAddrAmountPairs = [];

    let totalAmount = 0;
    for (var i = 0; i < addrAmountPairs.length; i++) {

        const pair = addrAmountPairs[i].replace(/\s/g, '').split(','); //[0]address [1]amount

        if (!pair) continue; //skip empty line

        if (!bnbClient.checkAddress(pair[0])) {
            isOk = false;
            document.getElementById('errorDiv').innerHTML = "Invalid toAddress '" + pair[0] + "' at line " + (i + 1);
            return;
        } else if (!parseFloat(pair[1])) {
            isOk = false;
            document.getElementById('errorDiv').innerHTML = "Invalid Amount '" + pair[1] + "' at line " + (i + 1);
            return;
        }

        refinedAddrAmountPairs.push({
            "to": pair[0], "coins": [{
                "denom": assetID,
                "amount": parseFloat(pair[1]) // 8 Decimals
            }]
        });

        totalAmount += parseFloat(pair[1]);
    }

    isOk = true;
    document.getElementById('errorDiv').innerHTML = "";

    // update Total # of Receivers & Total Amount
    document.getElementById('receiversDiv').innerHTML = refinedAddrAmountPairs.length;
    document.getElementById('totalAmountDiv').innerHTML = totalAmount;
    document.getElementById('feeDiv').innerHTML = (refinedAddrAmountPairs.length * 0.0003);


});

document.getElementById('loginKeystoreButton').addEventListener('click', function () {

    const keystoreText = document.getElementById('keystoreText').value;
    const password = document.getElementById('passwordText').value;

    try {
        account = bnbClient.recoverAccountFromKeystore(keystoreText, password);
        document.getElementById('addressDiv').innerHTML = account.address;
        isLogin = true;
    } catch (e) {
        document.getElementById('addressDiv').innerHTML = e;
        isLogin = false;
    }
});


document.getElementById('sendButton').addEventListener('click', async function () {
    if (!isOk) {
        alert("input address list is not normal. cannot send tx")
    } else if (!isLogin) {
        alert("login first")
    }

    const memo = document.getElementById('memoText').value;

    await bnbClient.setPrivateKey(account.privateKey);

    try {
        console.log('send log', account.address, refinedAddrAmountPairs, memo);
        
        let result = await bnbClient.multiSend(account.address, refinedAddrAmountPairs, memo);
        alert(JSON.stringify(result));
        
        console.log(result);
        
    } catch (e) {
        alert(e);
        console.log("send tx error", e);
    }
});
