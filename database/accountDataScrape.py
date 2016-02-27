# This rips the purchases from a user's account
# It then cross references them with the category that it is in

import requests
import json
from dataScraping.createdictionary import getStoreMapDatabase
import csv
import random


customerId = '56c66be5a73e4927415073da'
apiKey = '52da742eb132c5000831254a4002207a'

# Sorted data. This is a list of lists of maps (mapping a store name to a tuple (amount, category)) where the list is all the categories and the maps are the {place:charge} for the category
# It is a pain but it will be dynamic if we add more categores
# ex. [[{1:(walmart,$$,onlinestore}, {2:(walmart,$$,onlinestore}], [{3:(Starbucks,$$,food)}, {4:(Wendys,$$,food)}]. [{5:(idkstore,$$,category}]]
SORTED_DATA = []
# To get data out of here. Go through list. If len of the sublist is greater than one then check the 3rd element of the tuple in the value


def getAllPurchases():
    # this will be the actual request that we will format into the map below
    purchases = {'walmart.com': 50, "sheetz": 69, "amazon.com":3, "amazon.com":5} # temp since the server is down
    return purchases


#################################################################################################
#################################################################################################
#################################################################################################

def getAllDataAndSort():
    accountsurl = 'http://api.reimaginebanking.com/customers/' + customerId + '/accounts?key=' + apiKey

    #response = requests.get(accountsurl)
    #card_list = response.json()
    #print card_list # print all the accounts
    #accountNum = card_list[0]['_id'] # Get the id number for the first account

    ###############################
    # Get all the purchases and check if we have them
    storeMapPurchasedFrom = getAllPurchases()
    storeMapDatabase = getStoreMapDatabase()
    possibleCategories = list(set(storeMapDatabase.values()))


    # Double check that all the stores we are claiming someone purchased from are in our database
    for storePurchasedFrom in storeMapPurchasedFrom:
        if not storePurchasedFrom.lower() in (key.lower() for key in storeMapDatabase.keys()):
            print "ERROR: could not find %s in the database" % storePurchasedFrom
            exit(2)

    arbitraryCounter = 0; # We just need to have different numbers for all our keys. so just pick a random one
    for category in possibleCategories:
        storesInCurrentCategory = []
        for key, value in storeMapDatabase.iteritems():
            if value is category: #search only this category for now
                for storePurchasedFrom, amount in storeMapPurchasedFrom.iteritems():
                    if (storePurchasedFrom.lower() in key.lower()):
                        print "found " + storePurchasedFrom + " in category " + category
                        storesInCurrentCategory.append({arbitraryCounter:(storePurchasedFrom, amount, category)})
                        arbitraryCounter = arbitraryCounter+1
        SORTED_DATA.append(storesInCurrentCategory)

if __name__=="__main__":
    # getAllDataAndSort()
    # print json.dumps(SORTED_DATA, ensure_ascii=False)
    #
    lst = getStoreMapDatabase()
    merchantMatrix = []
    for store in lst:


        if store[0] != chr(0xff):
            url = 'http://api.reimaginebanking.com/merchants?key={}'.format(apiKey)
            payload = {
            "name": store,
            "category": lst[store]
            }
            # add a merchant
            response = requests.post(
            url,
            data=json.dumps(payload),
            headers={'content-type':'application/json'},
                )

            if(response.status_code == 201):
                merchantMatrix.append({"store": store, "id": response.json()['objectCreated']['_id'], "category":lst[store]})

    # keys = merchantMatrix[0].keys()
    # with open('dict.csv', 'wb') as output_file:
    #     dict_writer = csv.DictWriter(output_file, keys)
    #     dict_writer.writeheader()
    #     dict_writer.writerows(merchantMatrix)


    accountsUrl = 'http://api.reimaginebanking.com/customers/{}/accounts?key={}'.format(customerId, apiKey)

    response = requests.get(accountsUrl)

    accounts = response.json()
    id = ""
    for account in accounts:
        if(account['type'] == 'Credit Card'):
            id = account['_id']
            break



    for i in range(0, 100):
        merch = merchantMatrix[random.randint(0, len(merchantMatrix))]
        price = random.uniform(1, 500)


        purchase = {
            "merchant_id": merch['id'],
            "medium": "balance",
            "purchase_date": "2016-02-27",
            "amount": price,
            "status": "pending",
            "description": merch['category']
        }

        url = 'http://api.reimaginebanking.com/accounts/{}/purchases?key={}'.format(id,apiKey)
        # Creates a purchase
        response = requests.post(
            url,
            data=json.dumps(purchase),
            headers={'content-type':'application/json'},
            )

        if response.status_code == 201:
            print "success"
            print response.json()






