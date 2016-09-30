var dataUrl = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json';
d3.json(dataUrl,function(data){
	console.log(data);
	var width = 1300;
	var height = 600;
	var header = d3.select('body').append('h1').text('Forece Directed Graph');
	var msgBox = d3.select('body').append('div').attr('id','msgBox');
	var container = d3.select('body').append('div').attr('id','graph');
	var canvas = container.append('svg')
					.attr('width',width)
					.attr('height',height);
	var simulation = d3.forceSimulation()
						.force('link',d3.forceLink().id((d,i)=>i))
						.force('charge',d3.forceManyBody().distanceMax(100).distanceMin(40))
						.force('center',d3.forceCenter(width/2,height/2))
						.force('collide',d3.forceCollide().radius(10));
	var nodes = container.append('div')					
					.attr('class','Fbox')
					.selectAll('img')
					.data(data.nodes)
					.enter()
					.append('img')
					.attr('class',(d)=>'flag flag-'+d.code)
					.call(d3.drag()
							.on('start',dragstarted)	
							.on('drag',dragged)
							.on('end',dragended)
						);
	nodes.on('mouseover',function(d){
		msgBox.style('display','block')
				.style('left',d3.event.pageX-50+'px')
				.style('top',d3.event.pageY-50+'px')
				.text(d.country);
	});
	nodes.on('mouseout',function(d){
		msgBox.style('display','none');

	});
	var link = canvas.selectAll('line')
					.data(data.links)
					.enter()
					.append('line')
					.attr('stroke-width',2)
					.attr('stroke','#F0F0F0')
	simulation.nodes(data.nodes)
				.on('tick',ticked);
	simulation.force('link')
				.links(data.links)
				.distance(20);

	function ticked(){
		link.attr('x1',(d)=>d.source.x)
			.attr('y1',(d)=>d.source.y)
			.attr('x2',(d)=>d.target.x)
			.attr('y2',(d)=>d.target.y);
		nodes.style('left',(d)=>d.x-10+'px')
			 .style('top',(d)=>d.y-5+'px');
	}
	function dragstarted(d){
		if(!d3.event.active) simulation.alphaTarget(0.3).restart();
		d.fx = d.x ;
		d.fy = d.y ;
	}
	function dragged(d){
		d.fx = d3.event.x;
		d.fy = d3.event.y;
	}
	function dragended(d) {
		if(!d3.event.active) simulation.alphaTarget(0);
		d.fx = null;
		d.fy = null;
	}
});