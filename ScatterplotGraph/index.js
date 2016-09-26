var dataUrl = 'http://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
d3.json(dataUrl,function(data){
	// console.log(data[0].Doping);
	var width = 1300;
	var height = 600;
	var space = 50;
	var radius = 5;
	var chartWidth = width-space*3;
	var chartHeight = height-space;
	var header = d3.select('body')
					.append('h1')
					.text('Doping in Professional Bicycle Racing');
	var messageBox = d3.select('body')
						.append('div')
						.attr('id','messageBox');
	var canvas = d3.select('body')
					.append('svg')
					.attr('width',width)
					.attr('height',height);
	var scaleHeight = d3.scaleLinear()
						.domain([0,35])
						.range([0,chartHeight]);
	var scaleWidth = d3.scaleLinear()
						.domain([2210,2390])
						.range([0,chartWidth]);
	var chart = canvas.append('g')
					.attr('transform','translate('+space/2+','+space/2+')')
					.selectAll('circle')
					.data(data)
					.enter()
					.append('circle')
					.attr('fill',(d)=>d.Doping==='' ? 'green' : 'red')
					.attr('cx',(d)=>scaleWidth(d.Seconds))
					.attr('cy',(d)=>scaleHeight(d.Place))
					.attr('r',radius);
	chart.on('mouseover',function(d){
		d3.select(this)
			.attr('r',radius+4)
			.attr('stroke','#f0f0f0')
			.attr('stroke-width',4)
			.style('cursor','pointer');
		d3.select('#messageBox')
			.style('display','block')
			.html('<p>'+d.Name+'</p>'+'<p>'+d.Nationality+'</p>'+'<p>'+d.Year+'</p>'+'<p>'+d.Doping+'</p>');
	});
	chart.on('mouseout',function(d){
		d3.select(this)
			.attr('r',radius)
			.attr('stroke','none');
		d3.select('#messageBox')
			.style('display','none');
	});
	var text = canvas.append('g')
					.attr('transform','translate('+space/2+','+space/2+')')
					.selectAll('text')
					.data(data)
					.enter()
					.append('text')
					.attr('x',(d)=>scaleWidth(d.Seconds)+radius*2)
					.attr('y',(d)=>scaleHeight(d.Place))
					.attr('alignment-baseline','middle')
					.text((d)=>d.Name);
	var xAxis = canvas.append('g')
					.attr('transform','translate('+(space/2-radius)+','+space/2+')')
					.call(d3.axisLeft(scaleHeight));
	var yAxis = canvas.append('g')
					.attr('transform','translate('+(space/2-radius)+','+(height-space/2)+')')
					.call(d3.axisBottom(scaleWidth));
	var doping = canvas.append('g')
					.attr('transform','translate('+width/4+','+height/2+')');
	doping.append('circle')					
		.attr('cx',radius*2)
		.attr('cy',radius*2)
		.attr('r',radius*2)
		.attr('fill','green');
	doping.append('circle')					
		.attr('cx',radius*2)
		.attr('cy',radius*8)
		.attr('r',radius*2)
		.attr('fill','red');
	doping.append('text')
		.attr('x',radius*6)
		.attr('y',radius*2)
		.attr('alignment-baseline','middle')
		.text('No doping allegations');
	doping.append('text')
		.attr('x',radius*6)
		.attr('y',radius*8)
		.attr('alignment-baseline','middle')
		.text('Riders with doping allegations');
});
