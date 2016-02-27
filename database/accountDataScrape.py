# This rips the purchases from a user's account
# It then cross references them with the category that it is in

import requests
import json
from dataScraping.createdictionary import getStoreMapDatabase

customerId = '56c66be5a73e4927415073f1'
apiKey = 'f2074f6de40823eda9cf1a33f0d23279'

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
    getAllDataAndSort()
    print SORTED_DATA