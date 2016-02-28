## To call this stuff. First call the getAllPurchases which makes a request and sorts it. Then call the get*Food*() to get the food purchases
import requests
import json
import time, sys


customerId = '56c66be5a73e4927415073da'
apiKey = '52da742eb132c5000831254a4002207a'

# define global vars
foodPurchases = []
retailPurchases = []
onlinePurchases = []

# This is called by getAllPurchase(). No need to call this
def sortAllPurchases(allPurchases):
    # First get all the categories we have
    possibleCategories = []
    for purchase in allPurchases:
        possibleCategories.append(purchase['description'])
    possibleCategories = list(set(possibleCategories))
    # Create mapping to categories "food", "online", or "retail"
    subcategoryMappingToCategory = {"fastFood":"food", \
                                    "fineDining":"food", \
                                    "apparelOnline":"online", \
                                    "electronicsOnline":"online", \
                                    "generalMerchandiseOnline":"online", \
                                    "homeGoodsOnline":"online", \
                                    "sportingGoodsOnline":"online", \
                                    "hardware":"retail", \
                                    "apparel":"retail"}

    # Go through all purchases and sort them into the purchases global array variables
    for purchase in allPurchases:
        if purchase['description'] not in subcategoryMappingToCategory.keys():
            # print "ERROR cannot sort %s into a category. may need to add the subcategory mapping" % purchase['description']
            # print purchase
            continue
        if (subcategoryMappingToCategory[purchase['description']] is "food"):
            global foodPurchases
            foodPurchases.append(purchase)
        elif (subcategoryMappingToCategory[purchase['description']] is "online"):
            global onlinePurchases
            onlinePurchases.append(purchase)
        elif (subcategoryMappingToCategory[purchase['description']] is "retail"):
            global retailPurchases
            retailPurchases.append(purchase)

def getAllPurchase():
    # first clear all global vars
    global foodPurchases, retailPurchases, onlinePurchases
    foodPurchases = []
    retailPurchases = []
    onlinePurchases = []

    accountsUrl = 'http://api.reimaginebanking.com/customers/{}/accounts?key={}'.format(customerId, apiKey)
    response = requests.get(accountsUrl)
    accounts = response.json()
    id = ""
    for account in accounts:
        if(account['type'] == 'Credit Card'):
            id = account['_id']
            break

    urlToScrape = 'http://api.reimaginebanking.com/accounts/{}/purchases?key={}'.format(id,apiKey)

    response = requests.get(urlToScrape)
    retList = []
    if response.status_code == 200:
        conv = response.json()
    for ii, con in enumerate(conv):
        url = 'http://api.reimaginebanking.com/merchants/{}?key={}'.format(con['merchant_id'],apiKey)
        response = requests.get(url)
        name = response.json()['name'].replace("\x00", "")
        retList.append({"id" : con['merchant_id'], "description" : con['description'],
                          "name": name, "date":con['purchase_date'],
                          "price":con['amount'] })

    sortAllPurchases(retList)
    return json.dumps(retList)


# getters for json data
def getFood():
    getAllPurchase()
    return json.dumps(foodPurchases)
def getRetail():
    getAllPurchase()
    return json.dumps(retailPurchases)
def getOnline():
    getAllPurchase()
    return json.dumps(onlinePurchases)


# TEST The stuff from the stats.json file
# with open('cache/stats.json') as data_file:
#     allData = json.load(data_file)
#     sortAllPurchases(allData)
# print getFood()
