import os

# Get the current path and add al files
cwd = os.getcwd() 
# 0=fastfood, 1=
categoryPaths = [os.path.join(cwd,"fastFood/fastFood.csv"), \
									os.path.join(cwd,"onlineRetailers/apparel.csv"), \
									os.path.join(cwd,"onlineRetailers/electronics.csv"), \
									os.path.join(cwd,"onlineRetailers/GeneralMerchandise.csv"), \
									os.path.join(cwd,"onlineRetailers/homeGoods.csv"), \
									os.path.join(cwd,"onlineRetailers/sportingGoods.csv"), \
									os.path.join(cwd,"stores/apparel.csv"), \
									os.path.join(cwd,"stores/hardware.csv") \
									]

theDictionary = {}

for ii, categoryPaths in enumerate(categoryPaths):
	fileIn = open(categoryPaths, "r+")
	stores = fileIn.readlines()

	for store in stores:	
		categoryString = ""
		if ii is 0:
			categoryString = "fastFood"
		elif ii is 1:
			categoryString = "apparelOnline"
		elif ii is 2:
			categoryString = "electronicsOnline"
		elif ii is 3:
			categoryString = "generalMerchandiseOnline"
		elif ii is 4:
			categoryString = "homeGoodsOnline"
		elif ii is 5:
			categoryString = "sportingGoodsOnline"
		elif ii is 6:
			categoryString = "apparel"
		elif ii is 7:
			categoryString = "hardware"

		theDictionary[store.strip()] = categoryString


print theDictionary