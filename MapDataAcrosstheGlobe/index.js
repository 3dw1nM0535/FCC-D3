var dataUrl = 'http://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json';
var mapData = 'http://raw.githubusercontent.com/mbostock/topojson/master/examples/world-50m.json';

var header = d3.select('body')
				.append('h1')
				.text('Map Data Across the Globe');

var msgBox = d3.select('body')
				.append('div')
				.attr('id','msgBox');

var canvas = d3.select('body')
				.append('svg')
				.attr('width',1300)
				.attr('height',600);

var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

var sizeScale = d3.scaleThreshold()
					.domain([10000,100000,1000000,10000000])
					.range([2,6,12,25]);

var projection = d3.geoMercator()
					.translate([1300/2,600/2]);

var path = d3.geoPath().projection(projection);

d3.json(mapData,function(data){
	// console.log(data);
	var worldMap = canvas.append('g')
					.selectAll('path')
					.data(topojson.feature(data,data.objects.countries).features)
					.enter()
					.append('path')
					.attr('fill','#eee')
					.attr('stroke','black')
					.attr('d',path);

	d3.json(dataUrl,function(data){
		var metoriteData = canvas.append('g')
								.selectAll('circle')
								.data(data.features)
								.enter()
								.append('circle')
								.attr('cx',(d)=>projection([d.properties.reclong,d.properties.reclat])[0])
								.attr('cy',(d)=>projection([d.properties.reclong,d.properties.reclat])[1])
								.attr('fill',(d)=>colorScale(d.properties.mass))
								.style('opacity','0.3')
								.attr('r',(d)=>sizeScale(d.properties.mass));
		metoriteData.on('mouseover',function(d){
			msgBox.style('display','block')
					.html('<p>'+'fall'+':'+d.properties.fall+'</p>'+
						  '<p>'+'mass'+':'+d.properties.mass+'</p>'+
						  '<p>'+'name'+':'+d.properties.name+'</p>'+
						  '<p>'+'nametype'+':'+d.properties.nametype+'</p>'+
						  '<p>'+'recclass'+':'+d.properties.recclass+'</p>'+
						  '<p>'+'reclat'+':'+d.properties.reclat+'</p>'+
						  '<p>'+'year'+':'+d.properties.year+'</p>'
						)
					.style('left',d3.event.pageX+50+'px')
					.style('top',d3.event.pageY-50+'px');
		});
		metoriteData.on('mouseout',function(d){
			msgBox.style('display','none');
		});				
	});
});	
// console.log(sizeScale(100));