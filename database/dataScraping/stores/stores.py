# Copied http://www.apparelsearch.com/retail_mens.htm

from BeautifulSoup import BeautifulSoup

from bs4 import BeautifulSoup

from selenium import webdriver
# f = open("/home/f15/vthacks/stores/mensapparel.txt")
# foods = f.readlines()
# foodsoneline = ""
# for food in foods:
# 	foodsoneline = foodsoneline + food
# html = foodsoneline
# print html

# soup = BeautifulSoup(html)
# print soup.prettyify()


def getRequestObjectFromPayscale():
	url = "http://www.apparelsearch.com/retail_mens.htm"
	driver = webdriver.Firefox()
	driver.get(url)
	page = driver.page_source
	driver.close()
	time.sleep(0.5) # Sleep 
	return page

page = getRequestObjectFromPayscale()
soup = BeautifulSoup(page)


# f = open("/home/f15/vthacks/stores/mensapparel.txt")
# foods = f.readlines()

# newfood = []
# for food in foods:
# 	if '" style="background-color:transparent;color:rgb(0, 0, 255);">' in food and '<span lang=en-us style="background-color:transparent;"' in food:
# 		temp = food.split(';">')
# 		if len(temp) > 1:
# 			# print temp[1].split('</a>')[0]
# 			print temp[1]

	# temp = food.split("com/")
	# if (len(temp) > 1):
		# food = temp[1].split("-prices")[0].replace('-', ' ') + "\n"

	# newfood.append(food)



# fout = open('/home/f15/foodOut.txt', 'w+')
# fout.writelines(newfood)