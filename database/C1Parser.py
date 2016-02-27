
import requests
import json


customerId = '56c66be5a73e4927415073da'
apiKey = '52da742eb132c5000831254a4002207a'


def getAllPurchase():

    accountsUrl = 'http://api.reimaginebanking.com/customers/{}/accounts?key={}'.format(customerId, apiKey)

    response = requests.get(accountsUrl)

    accounts = response.json()
    id = ""
    for account in accounts:
        if(account['type'] == 'Credit Card'):
            id = account['_id']
            print id
            break


    urlToScrape = 'http://api.reimaginebanking.com/accounts/{}/purchases?key={}'.format(id,apiKey)

    response = requests.get(urlToScrape)
    retList = []
    if response.status_code == 200:
        conv = response.json()
        for con in conv:
            url = 'http://api.reimaginebanking.com/merchants/{}?key={}'.format(con['merchant_id'],apiKey)
            response = requests.get(url)
            name = response.json()['name'].replace("\x00", "")
            retList.append({"id" : con['merchant_id'], "description" : con['description'],
                              "name": name, "date":con['purchase_date'],
                              "price":con['amount'] })
    return type(json.dumps(retList))




