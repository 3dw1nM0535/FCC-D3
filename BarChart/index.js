var width = 1300;
var height = 550;

var data = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
d3.json(data,function(data){
	// console.log(data.data.length);
	d3.select('body').append('h1').text(data.name);
	var canvas = d3.select('body')
					.append('svg')
					.attr('width',width)
					.attr('height',height);
	d3.select('body').append('p').text(data.description);
	var tooltip = d3.select('body').append('div').attr('id','tooltip');
	var scaleHeight = d3.scaleLinear().domain([0,18064.7]).range([0,height-50]);
	var scaleColor = d3.scaleLinear().domain([0,16064.7]).range(['#95CAD2','#2D5764']);
	var yAxisScale = d3.scaleLinear().domain([0,18064.7]).range([height-50,0]);
	var xAxisScale = d3.scaleLinear().domain([1947,2015]).range([0,width-100]);
	// console.log(scaleColor(200));
	var chart = canvas.append('g')
					.attr('transform','translate(40,25)')
					.selectAll('rect')
					.data(data.data)
					.enter()
					.append('rect')
					.attr('width',(width-100)/data.data.length)
					.attr('height',(d)=>scaleHeight(d[1]))
					.attr('fill',(d)=>scaleColor(d[1]))
					.attr('y',(d)=>height-50-scaleHeight(d[1]))
					.attr('x',(d,i)=>i*(width-100)/data.data.length);
	chart.on('mouseover',function(d){
		d3.select(this).attr('fill','#DBC9C9');
		tooltip.html("<p>"+d[0]+"</p>"+"<p>"+"$"+d[1]+"Billion"+"</p>")
					.style('left',d3.event.pageX-8+'px')
					.style('top',d3.event.pageY-80+'px')
					.style('display','block');
		// console.log(d[0],d[1]);
	});
	chart.on('mouseout',function(d){
		d3.select(this).attr('fill',(d)=>scaleColor(d[1]));
		tooltip.style('display','none');
	})
	canvas.append('g')
			.attr('transform','translate(40,25)')
			.call(d3.axisLeft(yAxisScale));
	canvas.append('g')
			.attr('transform','translate(40,'+(height-20)+')')
			.call(d3.axisBottom(xAxisScale).tickFormat(d3.format('d')));
});