# This creates charges and deposits on someone's account
# NOTE: that it takes time for the balances to update!!

import requests
import json

customerId = '56c66be5a73e4927415073f1'
apiKey = 'f2074f6de40823eda9cf1a33f0d23279'


def depositMoney(accountID, amountToPutIn):
    depositurl = 'http://api.reimaginebanking.com/accounts/' + accountID + '/deposits?key=' + apiKey
    deposit = {"medium": "balance","transaction_date": "2016-02-27","status": "pending","amount": amountToPutIn,"description": "string"}
    response = requests.post(
	    depositurl,
	    data=json.dumps(deposit),
	    headers={'content-type':'application/json', 'Accept': 'application/json'},
	)
    print(response)
    print response.json()


def chargeToAccount(accountID, amountToCharge):
    purchaseurl = 'http://api.reimaginebanking.com/accounts/' + accountID + '/purchases?key=' + apiKey
    purchase = {"merchant_id": "56c66be6a73e492741507627","medium": "balance","purchase_date": "2016-02-27","amount": amountToCharge,"status": "pending","description": "string"}
    response = requests.post(
	    purchaseurl,
	    data=json.dumps(purchase),
	    headers={'content-type':'application/json', 'Accept': 'application/json'},
	)
    print(response)
    print response.json()

#################################################################################################
#################################################################################################
#################################################################################################

accountsurl = 'http://api.reimaginebanking.com/customers/' + customerId + '/accounts?key=' + apiKey

response = requests.get(accountsurl)

card_list = response.json()
print card_list # print all the accounts

accountNum = card_list[0]['_id'] # Get the id number for the first account


###############################
##### Main deposits and charges
chargeToAccount(accountNum, 200)
depositMoney(accountNum, 5000)
   


print
print
for account in card_list:
    getPurchases = 'http://api.reimaginebanking.com/accounts/' + account['_id'] + '/purchases?key=' + apiKey

    response = requests.get(accountsurl)
    print response.json()[0]['nickname'] + " currently has " + str(response.json()[0]['balance']) + " dollars"






