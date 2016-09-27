var dataUrl = 'http://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json';
d3.json(dataUrl,function(data){
	var header = d3.select('body')
					.append('h1')
					.text('Heat Map');
	var messageBox = d3.select('body')
						.append('div')
						.attr('id','msgBox');
	// console.log(data);
	var width = 1300;
	var height = 600;
	var space = 90;
	var chartHeight = height - space*2;
	var chartWidth = width - space*2;
	var colorList = ['#5E4FA2','#3288BD','#3288BD','#ABDDA4','#E6F598','#FFFFBF','#FEE08B','#FDAE61','#F46D43','#D53E4F','#9E0142'];
	var colorScale = d3.scaleQuantile()
					    .domain([0,12.7])
						.range(colorList);
	var xScale = d3.scaleLinear()
						.domain([1753,2015])
						.range([0,chartWidth]);
	var yScale = d3.scaleLinear()
					.domain([0,12])
					.range([chartHeight,0]);
	// canvas 
	var canvas = d3.select('body')
					.append('svg')
					.attr('width',width)
					.attr('height',height);
	var chart = canvas.append('g')
					.attr('transform','translate('+space+','+space/3+')')
					.selectAll('rect')
					.data(data.monthlyVariance)
					.enter()
					.append('rect')
					.attr('width',(chartWidth/data.monthlyVariance.length)*12)
					.attr('height',chartHeight/12)
					.attr('x',(d)=>xScale(d.year))
					.attr('y',(d)=>yScale(d.month))
					.attr('fill',(d)=>colorScale(data.baseTemperature+d.variance));
	chart.on('mouseover',function(d){
		var temp = Math.floor((data.baseTemperature+d.variance)*100)/100;
		// console.log(d.year);
		d3.select(this)
			.style('cursor','pointer');
		messageBox.html('<p>'+d.year+'-'+monthList[d.month-1]+'</p>'+'<p>'+temp+' C'+'</p>'+'<p>'+d.variance+'</p>')
				.style('left',d3.event.pageX-170+'px')
				.style('top',d3.event.pageY-120+'px')
				.style('display','block');
	});
	chart.on('mouseout',function(d){
		messageBox.style('display','none');
	});
	var xAxis = canvas.append('g')
					.attr('transform','translate('+(space-10)+','+space/3+')')
					.append('line')
					.attr('x1',0)
					.attr('y1',0)
					.attr('x2',0)
					.attr('y2',chartHeight)
					.style('stroke','black')
					.style('stroke-width',4);
	var monthList = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var month = canvas.append('g')
					.attr('transform','translate('+0+','+space/3+')')
					.selectAll('text')
					.data(monthList)
					.enter()
					.append('text')
					.attr('y',(d,i)=>yScale(i)-chartHeight/24)
					.attr('x',0)
					.attr('fill','black')
					.text((d)=>d);
	var yAxis = canvas.append('g')
					.attr('transform','translate('+space+','+(height-140)+')')
					.call(d3.axisBottom(xScale));
	var tempBlock = canvas.append('g')
					.attr('transform','translate('+space*6+','+(height-100)+')')
					.selectAll('rect')
					.data(colorList)
					.enter()
					.append('rect')
					.attr('x',(d,i)=>21*i)
					.attr('y',0)
					.attr('fill',(d)=>d)
					.attr('width','20')
					.attr('height','20');
	canvas.append('g')
			.attr('transform','translate('+space*6.5+','+(height-60)+')')
			.append('text')
			.text('Lower to Higher')
	// canvas.append('g').append('rect').attr('fill','red').attr('width',100).attr('height',100);
});