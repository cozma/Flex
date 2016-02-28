# Create a merchant

import requests, json, random
from dataScraping.createdictionary import getStoreMapDatabase


customerId = '56c66be5a73e4927415073da'
apiKey = '52da742eb132c5000831254a4002207a'

def getAccountID():
  accountsUrl = 'http://api.reimaginebanking.com/customers/{}/accounts?key={}'.format(customerId, apiKey)

  response = requests.get(accountsUrl)

  accounts = response.json()
  id = ""
  for account in accounts:
      if(account['type'] == 'Credit Card'):
          id = account['_id']
          return id

def getIdForMerchant(name):
  merchantsUrl = 'http://api.reimaginebanking.com/merchants?key={}'.format(apiKey)
  response = requests.get(merchantsUrl)
  merchants = response.json()
  for m in merchants:
    if (name in m['name']):
      return m['_id']
  return None


def chargeToAccount(accountID, amountToCharge, payeeID, description):
  purchaseurl = 'http://api.reimaginebanking.com/accounts/' + accountID + '/purchases?key=' + apiKey
  purchase = {"merchant_id": payeeID,"medium": "balance","purchase_date": "2016-02-27","amount": amountToCharge,"status": "pending","description": description}
  response = requests.post(
    purchaseurl,
    data=json.dumps(purchase),
    headers={'content-type':'application/json', 'Accept': 'application/json'},
  )
  print(response)
  print response.json()



def createMerchant(name, category, lat, lng):
  coordinates = {"lat" : lat ,"lng" : lng }
  if name[0] != chr(0xff):
    url = 'http://api.reimaginebanking.com/merchants?key={}'.format(apiKey)
    payload = {
    "name": name,
    "category": category,
    "geocode":coordinates}
    print payload
    response = requests.post(url,data=json.dumps(payload),headers={'content-type':'application/json'})
    if (response.status_code == 201):
      print "created " + name
    else:
      print "could not create " + name
      print response.status_code

# Updating is denied in response from api ??!?!
def updateCharge(chargeID, description):
  purchaseurl = 'http://api.reimaginebanking.com/purchases/' + chargeID + '?key=' + apiKey
  # purchase = {"merchant_id": payeeID,"medium": "balance","purchase_date": "2016-02-27","amount": amountToCharge,"status": "pending","description": "string"}
  purchase = {"description": description}
  response = requests.put(
    purchaseurl,
    data=json.dumps(purchase),
    headers={'content-type':'application/json', 'Accept': 'application/json'},
  )
  print(response)
  print response.json()

# updateCharge("56d23ddb480cf02f0f889e76", "apparel")

## Temp add merchants
# createMerchant("Souvlaki's", "fineDining", "37.229814", "-80.416221")
# createMerchant("The Cellar Restaurant", "fineDining", "37.230918", "-80.414981")
# createMerchant("Mellow Mushroom", "fineDining", "37.228198", "-80.412458")

# createMerchant("Heavener True Value", "hardware", "37.236061", "-80.421704")
# createMerchant("Clothes Rack", "apparel", "37.229383", "-80.414092")
# createMerchant("Alligator Alley", "apparel", "37.227199", "-80.411496")

# chargeToAccount(getAccountID(), random.random() * 500, getIdForMerchant("Alligator Alley"), "apparel")
# chargeToAccount(getAccountID(), random.random() * 500, getIdForMerchant("Sharkey's"), "fineDining")
# chargeToAccount(getAccountID(), random.random() * 500, getIdForMerchant("Souvlaki's"), "fineDining")
# chargeToAccount(getAccountID(), random.random() * 500, getIdForMerchant("The Cellar Restaurant"), "fineDining")
# chargeToAccount(getAccountID(), random.random() * 500, getIdForMerchant("Mellow Mushroom"), "fineDining")
# chargeToAccount(getAccountID(), random.random() * 500, getIdForMerchant("622 North Restaurant"), "fineDining")
# chargeToAccount(getAccountID(), random.random() * 500, getIdForMerchant("Marco & Luca"), "fineDining")
# chargeToAccount(getAccountID(), random.random() * 500, getIdForMerchant("Cabo Fish Taco"), "fineDining")
# chargeToAccount(getAccountID(), random.random() * 500, getIdForMerchant("Himilayan Curry Cafe"), "fineDining")
# chargeToAccount(getAccountID(), random.random() * 500, getIdForMerchant("Heavener True Value"), "hardware")
# chargeToAccount(getAccountID(), random.random() * 500, getIdForMerchant("Clothes Rack"), "apparel")



