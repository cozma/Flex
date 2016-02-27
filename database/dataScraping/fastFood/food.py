# Copied food.txt off of http://www.fastfoodmenuprices.com/all-restaurants/
f = open("/home/f15/food.txt")
foods = f.readlines()

newfood = []
for food in foods:
	temp = food.split("com/")
	if (len(temp) > 1):
		food = temp[1].split("-prices")[0].replace('-', ' ') + "\n"

	newfood.append(food)



fout = open('/home/f15/foodOut.txt', 'w+')
fout.writelines(newfood)