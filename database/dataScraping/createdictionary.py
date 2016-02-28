def getStoreMapDatabase():
	import os

	# Get the current path and add al files
	cwd = os.getcwd() 
	# 0=fastfood, 1=
	categoryPaths = [os.path.join(cwd,"dataScraping/food/fastFood.csv"), \
									  os.path.join(cwd,"dataScraping/food/fineDining.csv"), \
										os.path.join(cwd,"dataScraping/onlineRetailers/apparel.csv"), \
										os.path.join(cwd,"dataScraping/onlineRetailers/electronics.csv"), \
										os.path.join(cwd,"dataScraping/onlineRetailers/GeneralMerchandise.csv"), \
										os.path.join(cwd,"dataScraping/onlineRetailers/homeGoods.csv"), \
										os.path.join(cwd,"dataScraping/onlineRetailers/sportingGoods.csv"), \
										os.path.join(cwd,"dataScraping/stores/apparel.csv"), \
										os.path.join(cwd,"dataScraping/stores/hardware.csv") \
										]

	theDictionary = {}

	for ii, categoryPaths in enumerate(categoryPaths):
		fileIn = open(categoryPaths, "r+")
		stores = fileIn.readlines()

		for store in stores:	
			store = store.strip().strip()
			store = store.strip(',')
			store = store.replace(',', '')
			categoryString = ""
			if ii is 0:
				categoryString = "fastFood"
			elif ii is 2:
				categoryString = "fineDining"
			elif ii is 3:
				categoryString = "apparelOnline"
			elif ii is 4:
				categoryString = "electronicsOnline"
			elif ii is 5:
				categoryString = "generalMerchandiseOnline"
			elif ii is 6:
				categoryString = "homeGoodsOnline"
			elif ii is 7:
				categoryString = "sportingGoodsOnline"
			elif ii is 8:
				categoryString = "apparel"
			elif ii is 9:
				categoryString = "hardware"

			theDictionary[store] = categoryString
	return theDictionary
	# print theDictionary