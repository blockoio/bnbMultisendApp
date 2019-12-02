# Multisend App for AERGO BEP-2

This app is used to send bep-2 type Argo tokens to multiple users in the Binance Chain. How to use is as follows.

1. Check out this repository, go to the build folder, and open the `index.html` file in a browser.
1. Open the wallet's keystore file to which Aergo will be sent.
1. Paste the keystore's content into the `keystore file text` field of the App and enter the password.
1. Click the `login using keystore` button.
1. If login successfully, the logged in address appears in the From Address field. If it fails, an error message is displayed in the appropriate field.
1. Enter the address and quantity to receive separated by commas in the form of `address, amount`. You can enter multiple entries, each separated by a new line. (Note) You must enter at least two addresses.
1. (Optional) Enter a `memo text`.
1. Click `Send Transaction` button. After a while, a success or failure warning pops up.

Currently only AERGO-46B is supported. However, with a little expansion, other types of tokens can be supported.