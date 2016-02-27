# This is written for PYTHON 3
# Don't forget to install requests package

import requests
import json

customerId = '56c66be5a73e4927415073da'
apiKey = '52da742eb132c5000831254a4002207a'


accountsurl = 'http://api.reimaginebanking.com/customers/{}/accounts?key={}'.format(customerId, apiKey)

response = requests.get(accountsurl)

print response.status_code()

card_list = response.json()

for account in card_list:
    if(account['type'] != 'Credit Card' and account['type'] != 'Checking'):
        card_list.remove(account)



for account in card_list:
    print account['_id']
    purchaseurl = 'http://api.reimaginebanking.com/accounts/{}/purchases?key={}'.format(account['_id'], apiKey)

    response = requests.post(
	    purchaseurl,
	    data=json.dumps(purchase),
	    headers={'content-type':'application/json'},
	)
    print(response)










