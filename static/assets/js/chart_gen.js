				function getRandomIntInclusive(min, max) {
				    return Math.floor(Math.random() * (max - min + 1)) + min;
				}


				$.getJSON('/purchases', function(data) {

				    //remove table rows and add them as needed  
				    $('#mytable tr').remove();

				    var total = 0;

				    $.each(data, function(i, item) {
				        total += parseInt(item.price);

				        $row = $('<tr></tr>');
				        $row.append('<td>' + item.name.charAt(0).toUpperCase() + item.name.slice(1) + '</td>');
				        $row.append('<td>' + "$" + parseInt(item.price).toFixed(2) + '</td>');
				        $row.append('<td>' + new Date(item.date) + '</td>');

				        // repeat the above line for each data item

				        $('#mytable').append($row);
				    });

				    $('#total').append(total);

				    //gets populated data 
				    var populatedData = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
				    var fastFood = {};
				    var fineDining = {};
				    var apparelOnline = {};
				    var electronicsOnline = {};
				    var merchandiseOnline = {};
				    var homeGoodsOnline = {};
				    var sportingGoodsOnline = {};
				    var hardware = {};
				    var apparel = {};
				    for (i = 0; i < data.length; i++) {
				        switch (data[i]['description']) {
				            case "fastFood":
				                if (fastFood.hasOwnProperty(data[i]['name'])) {
				                    var cost = fastFood['name'];
				                    fastFood[data[i]['name']] = cost + data[i]['price'];
				                } else {
				                    fastFood[data[i]['name']] = data[i]['price'];
				                }
				                populatedData[0] += Number(data[i]['price']);
				                break;
				            case "fineDining":
				                if (fineDining.hasOwnProperty(data[i]['name'])) {
				                    var cost = fineDining['name'];
				                    fineDining[data[i]['name']] = cost + data[i]['price'];
				                } else {
				                    fineDining[data[i]['name']] = data[i]['price'];
				                }
				                populatedData[1] += Number(data[i]['price']);
				                break;
				            case "apparelOnline":
				                if (apparelOnline.hasOwnProperty(data[i]['name'])) {
				                    var cost = fastFood['name'];
				                    apparelOnline[data[i]['name']] = cost + data[i]['price'];
				                } else {
				                    apparelOnline[data[i]['name']] = data[i]['price'];
				                }
				                populatedData[2] += Number(data[i]['price']);
				                break;
				            case "electronicsOnline":
				                if (electronicsOnline.hasOwnProperty(data[i]['name'])) {
				                    var cost = electronicsOnline['name'];
				                    electronicsOnline[data[i]['name']] = cost + data[i]['price'];
				                } else {
				                    electronicsOnline[data[i]['name']] = data[i]['price'];
				                }
				                populatedData[3] += Number(data[i]['price']);
				                break;
				            case "generalMerchandiseOnline":
				                if (merchandiseOnline.hasOwnProperty(data[i]['name'])) {
				                    var cost = merchandiseOnline['name'];
				                    merchandiseOnline[data[i]['name']] = cost + data[i]['price'];
				                } else {
				                    merchandiseOnline[data[i]['name']] = data[i]['price'];
				                }
				                populatedData[4] += Number(data[i]['price']);
				                break;
				            case "homeGoodsOnline":
				                if (homeGoodsOnline.hasOwnProperty(data[i]['name'])) {
				                    var cost = homeGoodsOnline['name'];
				                    homeGoodsOnline[data[i]['name']] = cost + data[i]['price'];
				                } else {
				                    homeGoodsOnline[data[i]['name']] = data[i]['price'];
				                }
				                populatedData[5] += Number(data[i]['price']);
				                break;
				            case "sportingGoodsOnline":
				                if (sportingGoodsOnline.hasOwnProperty(data[i]['name'])) {
				                    var cost = sportingGoodsOnline['name'];
				                    sportingGoodsOnline[data[i]['name']] = cost + data[i]['price'];
				                } else {
				                    sportingGoodsOnline[data[i]['name']] = data[i]['price'];
				                }
				                populatedData[6] += Number(data[i]['price']);
				                break;
				            case "hardware":
				                if (hardware.hasOwnProperty(data[i]['name'])) {
				                    var cost = hardware['name'];
				                    hardware[data[i]['name']] = cost + data[i]['price'];
				                } else {
				                    hardware[data[i]['name']] = data[i]['price'];
				                }
				                populatedData[7] += Number(data[i]['price']);
				                break;
				            case "apparel":
				                if (apparel.hasOwnProperty(data[i]['name'])) {
				                    var cost = apparel['name'];
				                    apparel[data[i]['name']] = cost + data[i]['price'];
				                } else {
				                    apparel[data[i]['name']] = data[i]['price'];
				                }
				                populatedData[8] += Number(data[i]['price']);
				                break;
				        }
				    }

				    var sum = 0.0;
				    for (i = 0; i < populatedData.length; i++) {
				        sum += Number(populatedData[i]);
				    }
				    for (i = 0; i < populatedData.length; i++) {
				        populatedData[i] = Number(populatedData[i]) / sum;
				        populatedData[i] = populatedData[i].toFixed(2) * 10;
				    }

				    var keysToGet = Object.keys(apparel);
				    var keys = []
				    var values = []
				    for (i = 0; i < 10; i++) {
				        var index = getRandomIntInclusive(0, keysToGet.length);
				        if (apparel[keysToGet[index]] == 'undefined') {
				            console.log(apparel[keysToGet[index]]);
				        } else if (isNaN(apparel[keysToGet[index]])) {
				        	while(isNaN(apparel[keysToGet[index]])) {
				        		index = getRandomIntInclusive(0, keysToGet.length);
				        	}
				        }
				        // if(!isNaN(apparel[keys[index]]) && ) {
				        // 	console.log("Tjis is running"); 
				        // 	index = getRandomIntInclusive(0, keysToGet.length);
				        // }

				        console.log("Key: " + keysToGet[index] + " Value: " + 
				        	apparel[keysToGet[index]]); 
				        keys.push(keysToGet[index]);
				        // console.log("This is the value" + apparel[keys[index]]); 
				        values.push(apparel[keysToGet[index]].toFixed(2));
				    }

				    var data = {
				        labels: ["Fast 	Food", "Fine Dining", "Online Apparel", "Online Electronics", "Online Merchandise", "Online Home Goods", "Online Sporting Goods", "Computer Hardware", "Apparel"],
				        datasets: [{
				            label: "My Expenditures",
				            fillColor: "rgba(220,220,220,0.2)",
				            strokeColor: "#fff",
				            pointColor: "#fff",
				            pointStrokeColor: "#fff",
				            pointHighlightFill: "#fff",
				            pointHighlightStroke: "#fff",
				            data: populatedData
				        }]
				    };

				    var options = {
				        //Boolean - Whether to show lines for each scale point
				        scaleShowLine: true,

				        //Boolean - Whether we show the angle lines out of the radar
				        angleShowLineOut: false,

				        //Boolean - Whether to show labels on the scale
				        scaleShowLabels: false,

				        // Boolean - Whether the scale should begin at zero
				        scaleBeginAtZero: true,
				        scaleFontColor: "#fff",

				        //String - Colour of the angle line
				        angleLineColor: "rgba(220,220,220,0.2)",

				        //Number - Pixel width of the angle line
				        angleLineWidth: 1,

				        //String - Point label font declaration
				        pointLabelFontFamily: "'Arial'",

				        //String - Point label font weight
				        pointLabelFontStyle: "normal",

				        //Number - Point label font size in pixels
				        pointLabelFontSize: 10,

				        //String - Point label font colour
				        pointLabelFontColor: "#fff",

				        //Boolean - Whether to show a dot for each point
				        pointDot: true,

				        //Number - Radius of each point dot in pixels
				        pointDotRadius: 3,

				        //Number - Pixel width of point dot stroke
				        pointDotStrokeWidth: 1,

				        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
				        pointHitDetectionRadius: 20,

				        //Boolean - Whether to show a stroke for datasets
				        datasetStroke: true,

				        //Number - Pixel width of dataset stroke
				        datasetStrokeWidth: 2,

				        //Boolean - Whether to fill the dataset with a colour
				        datasetFill: true,

				        //String - A legend template
				        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
				    };


				    var data1 = {
				        labels: keys,
				        datasets: [{
				            label: "Purchases",
				            fillColor: "rgba(220,220,220,0.5)",
				            strokeColor: "#fff",
				            highlightFill: "#fff",
				            highlightStroke: "#fff",
				            data: values
				        }]
				    };

				    var options1 = {
				        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
				        scaleBeginAtZero: true,

				        //Boolean - Whether grid lines are shown across the chart
				        scaleShowGridLines: true,

				        //String - Colour of the grid lines
				        scaleGridLineColor: "rgba(0,0,0,.05)",

				        //Number - Width of the grid lines
				        scaleGridLineWidth: 1,
				        scaleFontColor: "#fff",

				        //Boolean - Whether to show horizontal lines (except X axis)
				        scaleShowHorizontalLines: true,

				        //Boolean - Whether to show vertical lines (except Y axis)
				        scaleShowVerticalLines: true,

				        //Boolean - If there is a stroke on each bar
				        barShowStroke: true,

				        //Number - Pixel width of the bar stroke
				        barStrokeWidth: 2,

				        //Number - Spacing between each of the X value sets
				        barValueSpacing: 5,

				        //Number - Spacing between data sets within X values
				        barDatasetSpacing: 1,

				        //String - A legend template
				        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
				    };

				    // Get context with jQuery - using jQuery's .get() method.
				    var ctx = $("#myChart").get(0).getContext("2d");
				    var ctx1 = $("#myChart1").get(0).getContext("2d");
				    var myNewChart = new Chart(ctx).Radar(data, options);
				    var myBarChart = new Chart(ctx1).Bar(data1, options1);

				});




				function category(cat) {
				    $.getJSON('/purchases', function(data) {


				        $('#mytable tr').remove();
				        $.each(data, function(i, item) {
				            if (item.description == cat) {
				                $row = $('<tr></tr>');
				                $row.append('<td>' + item.name.charAt(0).toUpperCase() + item.name.slice(1) + '</td>');
				                $row.append('<td>' + "$" + parseInt(item.price).toFixed(2) + '</td>');
				                $row.append('<td>' + new Date(item.date) + '</td>');
				                // repeat the above line for each data item
				                $('#mytable').append($row);
				            }
				        });


				        var populatedData = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
				        var fastFood = {};
				        var fineDining = {};
				        var apparelOnline = {};
				        var electronicsOnline = {};
				        var merchandiseOnline = {};
				        var homeGoodsOnline = {};
				        var sportingGoodsOnline = {};
				        var hardware = {};
				        var apparel = {};
				        for (i = 0; i < data.length; i++) {
				            switch (data[i]['description']) {
				                case "fastFood":
				                    if (fastFood.hasOwnProperty(data[i]['name'])) {
				                        var cost = fastFood['name'];
				                        fastFood[data[i]['name']] = cost + data[i]['price'];
				                    } else {
				                        fastFood[data[i]['name']] = data[i]['price'];
				                    }
				                    populatedData[0] += Number(data[i]['price']);
				                    break;
				                case "fineDining":
				                    if (fineDining.hasOwnProperty(data[i]['name'])) {
				                        var cost = fineDining['name'];
				                        fineDining[data[i]['name']] = cost + data[i]['price'];
				                    } else {
				                        fineDining[data[i]['name']] = data[i]['price'];
				                    }
				                    populatedData[1] += Number(data[i]['price']);
				                    break;
				                case "apparelOnline":
				                    if (apparelOnline.hasOwnProperty(data[i]['name'])) {
				                        var cost = apparelOnline['name'];
				                        apparelOnline[data[i]['name']] = cost + data[i]['price'];
				                    } else {
				                        apparelOnline[data[i]['name']] = data[i]['price'];
				                    }
				                    populatedData[2] += Number(data[i]['price']);
				                    break;
				                case "electronicsOnline":
				                    if (electronicsOnline.hasOwnProperty(data[i]['name'])) {
				                        var cost = electronicsOnline['name'];
				                        electronicsOnline[data[i]['name']] = cost + data[i]['price'];
				                    } else {
				                        electronicsOnline[data[i]['name']] = data[i]['price'];
				                    }
				                    populatedData[3] += Number(data[i]['price']);
				                    break;
				                case "generalMerchandiseOnline":
				                    if (merchandiseOnline.hasOwnProperty(data[i]['name'])) {
				                        var cost = merchandiseOnline['name'];
				                        merchandiseOnline[data[i]['name']] = cost + data[i]['price'];
				                    } else {
				                        merchandiseOnline[data[i]['name']] = data[i]['price'];
				                    }
				                    populatedData[4] += Number(data[i]['price']);
				                    break;
				                case "homeGoodsOnline":
				                    if (homeGoodsOnline.hasOwnProperty(data[i]['name'])) {
				                        var cost = homeGoodsOnline['name'];
				                        homeGoodsOnline[data[i]['name']] = cost + data[i]['price'];
				                    } else {
				                        homeGoodsOnline[data[i]['name']] = data[i]['price'];
				                    }
				                    populatedData[5] += Number(data[i]['price']);
				                    break;
				                case "sportingGoodsOnline":
				                    if (sportingGoodsOnline.hasOwnProperty(data[i]['name'])) {
				                        var cost = sportingGoodsOnline['name'];
				                        sportingGoodsOnline[data[i]['name']] = cost + data[i]['price'];
				                    } else {
				                        sportingGoodsOnline[data[i]['name']] = data[i]['price'];
				                    }
				                    populatedData[6] += Number(data[i]['price']);
				                    break;
				                case "hardware":
				                    if (hardware.hasOwnProperty(data[i]['name'])) {
				                        var cost = hardware['name'];
				                        hardware[data[i]['name']] = cost + data[i]['price'];
				                    } else {
				                        hardware[data[i]['name']] = data[i]['price'];
				                    }
				                    populatedData[7] += Number(data[i]['price']);
				                    break;
				                case "apparel":
				                    if (apparel.hasOwnProperty(data[i]['name'])) {
				                        var cost = apparel['name'];
				                        apparel[data[i]['name']] = cost + data[i]['price'];
				                    } else {
				                        apparel[data[i]['name']] = data[i]['price'];
				                    }
				                    populatedData[8] += Number(data[i]['price']);
				                    break;
				            }
				        }

				        var sum = 0.0;
				        for (i = 0; i < populatedData.length; i++) {
				            sum += Number(populatedData[i]);
				        }
				        for (i = 0; i < populatedData.length; i++) {
				            populatedData[i] = Number(populatedData[i]) / sum;
				            populatedData[i] = populatedData[i].toFixed(2) * 10;
				        }




				        var data = {
				            labels: ["Fast 	Food", "Fine Dining", "Online Apparel", "Online Electronics", "Online Merchandise", "Online Home Goods", "Online Sporting Goods", "Computer Hardware", "Apparel"],
				            datasets: [{
				                label: "My Expenditures",
				                fillColor: "rgba(220,220,220,0.2)",
				                strokeColor: "#fff",
				                pointColor: "#fff",
				                pointStrokeColor: "#fff",
				                pointHighlightFill: "#fff",
				                pointHighlightStroke: "#fff",
				                data: populatedData
				            }]
				        };

				        var options = {
				            //Boolean - Whether to show lines for each scale point
				            scaleShowLine: true,

				            //Boolean - Whether we show the angle lines out of the radar
				            angleShowLineOut: false,

				            //Boolean - Whether to show labels on the scale
				            scaleShowLabels: false,

				            // Boolean - Whether the scale should begin at zero
				            scaleBeginAtZero: true,
				            scaleFontColor: "#fff",

				            //String - Colour of the angle line
				            angleLineColor: "rgba(220,220,220,0.2)",

				            //Number - Pixel width of the angle line
				            angleLineWidth: 1,

				            //String - Point label font declaration
				            pointLabelFontFamily: "'Arial'",

				            //String - Point label font weight
				            pointLabelFontStyle: "normal",

				            //Number - Point label font size in pixels
				            pointLabelFontSize: 10,

				            //String - Point label font colour
				            pointLabelFontColor: "#fff",

				            //Boolean - Whether to show a dot for each point
				            pointDot: true,

				            //Number - Radius of each point dot in pixels
				            pointDotRadius: 3,

				            //Number - Pixel width of point dot stroke
				            pointDotStrokeWidth: 1,

				            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
				            pointHitDetectionRadius: 20,

				            //Boolean - Whether to show a stroke for datasets
				            datasetStroke: true,

				            //Number - Pixel width of dataset stroke
				            datasetStrokeWidth: 2,

				            //Boolean - Whether to fill the dataset with a colour
				            datasetFill: true,

				            //String - A legend template
				            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
				        };


				        var keys1 = [];
				        var values1 = [];
				        var keysToGet = [];
				        switch (cat) {
				            case "fastFood":
				                var keysToGet = Object.keys(fastFood);
				                for (i = 0; i < 10; i++) {
				                    var index = getRandomIntInclusive(0, keysToGet.length);
				                    if (fastFood[keysToGet[index]] == 'undefined') {
				                        console.log(fastFood[keysToGet[index]]);
				                    } else if (isNaN(fastFood[keysToGet[index]])) {
				                    	while(isNaN(fastFood[keysToGet[index]]))
				                    	{
				                    		index = getRandomIntInclusive(0, keysToGet.length);
				                    	}
				                    }
				                    // if(!isNaN(apparel[keys[index]]) && ) {
				                    // 	console.log("Tjis is running"); 
				                    // 	index = getRandomIntInclusive(0, keysToGet.length);
				                    // }
				                    keys1.push(keysToGet[index]);
				                    // console.log("This is the value" + apparel[keys[index]]); 
				                    values1.push(fastFood[keysToGet[index]].toFixed(2));
				                }
				                break;
				            case "fineDining":
				                keysToGet = Object.keys(fineDining);
				                for (i = 0; i < 10; i++) {
				                    var index = getRandomIntInclusive(0, keysToGet.length);
				                    if (fineDining[keysToGet[index]] == 'undefined') {
				                        console.log(fineDining[keysToGet[index]]);
				                    } else if (isNaN(fineDining[keysToGet[index]])) {
				                    	while(isNaN(fineDining[keysToGet[index]])) {
				                    		index = getRandomIntInclusive(0, keysToGet.length);	
				                    	}
				                    }
				                    // if(!isNaN(apparel[keys[index]]) && ) {
				                    // 	console.log("Tjis is running"); 
				                    // 	index = getRandomIntInclusive(0, keysToGet.length);
				                    // }
				                    keys1.push(keysToGet[index]);
				                    // console.log("This is the value" + apparel[keys[index]]); 
				                    values1.push(fineDining[keysToGet[index]].toFixed(2));
				                }
				                break;
				            case "apparelOnline":
				                keysToGet = Object.keys(apparelOnline);
				                for (i = 0; i < 10; i++) {
				                    var index = getRandomIntInclusive(0, keysToGet.length);
				                    if (apparelOnline[keysToGet[index]] == 'undefined') {
				                        console.log(apparelOnline[keysToGet[index]]);
				                    } else if (isNaN(apparelOnline[keysToGet[index]])) {
				                    	while(isNaN(apparelOnline[keysToGet[index]])) {
				                    		index = getRandomIntInclusive(0, keysToGet.length);
				                    	}
				                    }
				                    // if(!isNaN(apparel[keys[index]]) && ) {
				                    // 	console.log("Tjis is running"); 
				                    // 	index = getRandomIntInclusive(0, keysToGet.length);
				                    // }
				                    keys1.push(keysToGet[index]);
				                    // console.log("This is the value" + apparel[keys[index]]); 
				                    values1.push(apparelOnline[keysToGet[index]].toFixed(2));
				                }
				                break;
				            case "electronicsOnline":
				                keysToGet = Object.keys(electronicsOnline);
				                for (i = 0; i < 10; i++) {
				                    var index = getRandomIntInclusive(0, keysToGet.length);
				                    if (electronicsOnline[keysToGet[index]] == 'undefined') {
				                        console.log(electronicsOnline[keysToGet[index]]);
				                    } else if (isNaN(electronicsOnline[keysToGet[index]])) {
				                    	while(isNaN(electronicsOnline[keysToGet[index]])) {
				                    		index = getRandomIntInclusive(0, keysToGet.length);
				                    	}
				                    }
				                    // if(!isNaN(apparel[keys[index]]) && ) {
				                    // 	console.log("Tjis is running"); 
				                    // 	index = getRandomIntInclusive(0, keysToGet.length);
				                    // }
				                    keys1.push(keysToGet[index]);
				                    // console.log("This is the value" + apparel[keys[index]]); 
				                    values1.push(electronicsOnline[keysToGet[index]].toFixed(2));
				                }
				                break;
				            case "generalMerchandiseOnline":
				                console.log("Called");
				                keysToGet = Object.keys(merchandiseOnline);
				                for (i = 0; i < 10; i++) {
				                    var index = getRandomIntInclusive(0, keysToGet.length);
				                    if (merchandiseOnline[keysToGet[index]] == 'undefined') {
				                        console.log(merchandiseOnline[keysToGet[index]]);
				                    } else if (isNaN(merchandiseOnline[keysToGet[index]])) {
				                    	while(isNaN(merchandiseOnline[keysToGet[index]])) {
				                    		index = getRandomIntInclusive(0, keysToGet.length);
				                    	}
				                    }
				                    keys1.push(keysToGet[index]);
				                    // console.log("This is the value" + apparel[keys[index]]); 
				                    values1.push(merchandiseOnline[keysToGet[index]].toFixed(2));
				                }
				                console.log(keys1.length);
				                break;
				            case "homeGoodsOnline":
				                keysToGet = Object.keys(homeGoodsOnline);
				                for (i = 0; i < 10; i++) {
				                    var index = getRandomIntInclusive(0, keysToGet.length);
				                    if (homeGoodsOnline[keysToGet[index]] == 'undefined') {
				                        console.log(homeGoodsOnline[keysToGet[index]]);
				                    } else if (isNaN(homeGoodsOnline[keysToGet[index]])) {
				                    	while(isNaN(homeGoodsOnline[keysToGet[index]]))
				                    	{
				                    		index = getRandomIntInclusive(0, keysToGet.length);
				                    	}
				                    }
				                    // if(!isNaN(apparel[keys[index]]) && ) {
				                    // 	console.log("Tjis is running"); 
				                    // 	index = getRandomIntInclusive(0, keysToGet.length);
				                    // }
				                    keys1.push(keysToGet[index]);
				                    // console.log("This is the value" + apparel[keys[index]]); 
				                    values1.push(homeGoodsOnline[keysToGet[index]].toFixed(2));
				                }
				                break;
				            case "sportingGoodsOnline":
				                keysToGet = Object.keys(sportingGoodsOnline);
				                for (i = 0; i < 10; i++) {
				                    var index = getRandomIntInclusive(0, keysToGet.length);
				                    if (sportingGoodsOnline[keysToGet[index]] == 'undefined') {
				                        console.log(sportingGoodsOnline[keysToGet[index]]);
				                    } else if (isNaN(sportingGoodsOnline[keysToGet[index]])) {
				                    	while(isNaN(sportingGoodsOnline[keysToGet[index]]))
				                    	{
				                    		index = getRandomIntInclusive(0, keysToGet.length);
				                    	}
				                    }
				                    // if(!isNaN(apparel[keys[index]]) && ) {
				                    // 	console.log("Tjis is running"); 
				                    // 	index = getRandomIntInclusive(0, keysToGet.length);
				                    // }
				                    keys1.push(keysToGet[index]);
				                    // console.log("This is the value" + apparel[keys[index]]); 
				                    values1.push(sportingGoodsOnline[keysToGet[index]].toFixed(2));
				                }
				                break;
				            case "hardware":
				                keysToGet = Object.keys(hardware);
				                for (i = 0; i < 10; i++) {
				                    var index = getRandomIntInclusive(0, keysToGet.length);
				                    if (hardware[keysToGet[index]] == 'undefined') {
				                        console.log(hardware[keysToGet[index]]);
				                    } else if (isNaN(hardware[keysToGet[index]])) {
				                    	while(isNaN(hardware[keysToGet[index]]))
				                    	{
				                    		index = getRandomIntInclusive(0, keysToGet.length);
				                    	}
				                    }
				                    // if(!isNaN(apparel[keys[index]]) && ) {
				                    // 	console.log("Tjis is running"); 
				                    // 	index = getRandomIntInclusive(0, keysToGet.length);
				                    // }
				                    keys1.push(keysToGet[index]);
				                    // console.log("This is the value" + apparel[keys[index]]); 
				                    values1.push(hardware[keysToGet[index]].toFixed(2));
				                }
				                break;
				            case "apparel":
				                keysToGet = Object.keys(apparel);
				                for (i = 0; i < 10; i++) {
				                    var index = getRandomIntInclusive(0, keysToGet.length);
				                    if (apparel[keysToGet[index]] == 'undefined') {
				                        console.log(apparel[keysToGet[index]]);
				                    } else if (isNaN(apparel[keysToGet[index]])) {
				                    	while(isNaN(apparel[keysToGet[index]]))
				                    	{
				                    		index = getRandomIntInclusive(0, keysToGet.length);
				                    	}
				                    }
				                    // if(!isNaN(apparel[keys[index]]) && ) {
				                    // 	console.log("Tjis is running"); 
				                    // 	index = getRandomIntInclusive(0, keysToGet.length);
				                    // }
				                    keys1.push(keysToGet[index]);
				                    // console.log("This is the value" + apparel[keys[index]]); 
				                    values1.push(apparel[keysToGet[index]].toFixed(2));
				                }
				                break;
				        }


				        $('#myChart1').remove();
				        $('#myChart').remove();

				        $("#canvas1").html('<canvas id="myChart" width="400" height="400" style="float: left;"></canvas>');
				        $("#canvas2").html('<canvas id="myChart1" width="400" height="400" style="float: left;"></canvas>');


				        // for(i = 0; i < 10; i++) {
				        // 	myBarChart.removeData(); 
				        // }
				        console.log(keys1.length);
				        var data1 = {
				            labels: keys1,
				            datasets: [{
				                label: "Purchases",
				                fillColor: "rgba(220,220,220,0.5)",
				                strokeColor: "#fff",
				                highlightFill: "#fff",
				                highlightStroke: "#fff",
				                data: values1
				            }]
				        };

				        var options1 = {
				            //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
				            scaleBeginAtZero: true,

				            //Boolean - Whether grid lines are shown across the chart
				            scaleShowGridLines: true,

				            //String - Colour of the grid lines
				            scaleGridLineColor: "rgba(0,0,0,.05)",

				            //Number - Width of the grid lines
				            scaleGridLineWidth: 1,
				            scaleFontColor: "#fff",

				            //Boolean - Whether to show horizontal lines (except X axis)
				            scaleShowHorizontalLines: true,

				            //Boolean - Whether to show vertical lines (except Y axis)
				            scaleShowVerticalLines: true,

				            //Boolean - If there is a stroke on each bar
				            barShowStroke: true,

				            //Number - Pixel width of the bar stroke
				            barStrokeWidth: 2,

				            //Number - Spacing between each of the X value sets
				            barValueSpacing: 5,

				            //Number - Spacing between data sets within X values
				            barDatasetSpacing: 1,

				            //String - A legend template
				            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
				        };

				        // Get context with jQuery - using jQuery's .get() method.
				        var ctx = $("#myChart").get(0).getContext("2d");
				        var ctx1 = $("#myChart1").get(0).getContext("2d");
				        var myNewChart = new Chart(ctx).Radar(data, options);
				        var myBarChart = new Chart(ctx1).Bar(data1, options1);
				    });
				}