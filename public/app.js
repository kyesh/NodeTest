
    var locations = [
      ['Bondi Beach', -33.890542, 151.274856, 0, 115],
      ['Coogee Beach', -33.923036, 151.259052, 1, 80],
      ['Cronulla Beach', -34.028249, 151.157507, 2, 120],
      ['Manly Beach', -33.80010128657071, 151.28747820854187, 3, 60],
      ['Maroubra Beach', -33.950198, 151.259302, 4, 150]
    ];
	var lat = locations[0][1];
	var long = locations[0][2];
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: new google.maps.LatLng(lat, long),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
	var infowindow = new google.maps.InfoWindow();
	var infowindowhover = new google.maps.InfoWindow();
    for (i = 0; i < locations.length; i++) {  
	  var contentString = '';
	  infowindow = new google.maps.InfoWindow({
		  content: contentString
	  });
	  marker  = new google.maps.Marker({
		  position: new google.maps.LatLng(locations[i][1], locations[i][2]),
		  map: map,
		  title: locations[i][0]
	  });
	  var j = -1;
	  $.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+locations[i][1]+','+locations[i][2]+'&sensor=true', function(data) {
		  j = j + 1;
		  locations[j][0] = data.results[1].formatted_address;
		  console.log(locations[j][0]);
	  });
	  
	console.log(locations[i][0]);
      google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
        return function() {
			$.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+locations[i][1]+","+locations[i][2]+"&sensor=true",function(data){
				contentString = '<div class="loc">'+(data.results[1].formatted_address)+'</div>'
				+'<div id="line"></div>' + '<div id="click">Click for my Picture!</div>'
				infowindow.setContent(contentString);
				infowindow.open(map, marker);
			});
        }
      })(marker, i));
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
			$.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+locations[i][1]+","+locations[i][2]+"&sensor=true",function(data){
				contentString = 
				'<h1>'+(data.results[2].formatted_address)+'</h1>'+'<div id="line2"></div>'+
				'<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Uluru_%28Helicopter_view%29-crop.jpg/1920px-Uluru_%28Helicopter_view%29-crop.jpg" class="img-responsive image"/>'
				infowindow.setContent(contentString);
				infowindow.open(map, marker);
			});
        }
      })(marker, i));
	  // console.log(obj);
    }
	poly = new google.maps.Polyline({
		strokeColor: '#000000',
		strokeOpacity: 1.0,
		strokeWeight: 3
	});
  	poly.setMap(map);
	map.addListener('click', addLatLng);
		// Handles click events on a map, and adds a new point to the Polyline.
	function addLatLng(event) {
		var path = poly.getPath();
		path.push(event.latLng);
	}
	
			function objectify(x,y,cols, name) {
				var obj = [];
				var thing = {};
				for(var i = 0; i < x.length; i++){
					thing = {};
			        for(var j = 0; j < cols.length; j++){
			            if (j == 0) {
			                thing[cols[j]] = x[i];
			            } else if (j == 1){
			            	thing[cols[j]] = y[i];
			            } else {
							thing[cols[j]] = name[i]
						};
			        }
	              	obj[i] = thing;
	       		}		
	       		return obj;		
			}
				var x1 = [];
				var y2 = [];
				var names = [];
				for(var i = 0; i < locations.length; i++) {
					x1.push(locations[i][3]);
					y2.push(locations[i][4]);
					names.push(locations[i][0]);
				}
				console.log(x1);
				console.log(y2);
				// var x1 = [0,3,5,6,10];
				// var y2 = [115,90,120,60,150];
				var cols = ["x","y","name"];
				var object = objectify(x1,y2,cols,names);
				plot(object);

			function plot(obj) {
				var data = obj,
				w = 500,
				h = 424,
				margin = 30,
				//domain is the actual values for x and y whereas the range is how those values are plotted
				y = d3.scale.linear().domain([0, d3.max(data, function(d) {return d.y;})]).range([h - margin, 0 + margin]),
				x = d3.scale.linear().domain([0, d3.max(data, function(d) {return d.x;})]).range([0 + margin, w - margin])
				var vis = d3.select("#visualisation"),
					WIDTH = w,
					HEIGHT = h,
					MARGINS = {
						top: margin,
						right: margin,
						bottom: margin,
						left: margin
					}
				xAxis = d3.svg.axis().scale(x);
				yAxis = d3.svg.axis().scale(y).orient("left");
				vis.append("svg:g").attr("transform","translate(0," + (h - margin) + ")").attr("stroke","black").attr("fill","none").attr("stroke-width",1.2).call(xAxis);
				vis.append("svg:g").attr("transform", "translate(" + (margin) + ",0)").attr("stroke","black").attr("fill","none").attr("stroke-width",1.2).call(yAxis);
				var lineGen = d3.svg.line()
				  .x(function(d) {
				    return x(d.x);
				  })
				  .y(function(d) {
				    return y(d.y);
				  });
				vis.append('svg:path')
				  .attr('d', lineGen(data))
				  .attr('stroke', 'steelblue')
				  .attr('stroke-width', 2)
				  .attr("shape-rendering","crispEdges")
				  .attr('fill', 'none');
			    var point = vis.append("g")
			        .attr("class", "line-point");

			        point.selectAll('circle')
			        .data(data)
			        .enter().append('circle')
			        .attr("cx", function(d) {
			        	console.log(x(d.x));
			            return x(d.x)
			          })
			         .attr("cy", function(d) { 
			         	return y(d.y) 
			         })
			         .attr("r", 2)

			    vis.append("line")
			    	.attr("class","x")
			    	.style("stroke","black")
			    	.style("stroke-dasharray","3,3")
			        .style("opacity", 0.5)
			        .attr("y1", 0)
			        .attr("y2", 0);

			    vis.append("line")
			    	.attr("class","y")
			    	.style("stroke","black")
			    	.style("stroke-dasharray","3,3")
			        .style("opacity", 0.5)
			        .style("",margin)
			        .attr("x1", 0)
			        .attr("x2", 0);	

			    vis.append("circle")
			    	.attr("class","y")
			    	.style("fill","none")
			    	.style("stroke", "black")
			    	.attr("cx",-10)
			    	.attr("cy",0)
			    	.attr("r",4);	

			    vis.append("text")
			        .attr("class", "y1")
			        .style("stroke", "white")
			        .style("stroke-width", "3.5px")
			        .style("opacity", 0.8)
			        .attr("dx", 8)
			        .attr("dy", "-.3em");
			    vis.append("text")
			        .attr("class", "y2")
			        .attr("dx", 8)
			        .attr("dy", "-.3em");

			    vis.append("rect")
			        .attr("width", w - margin)
			        .attr("height", h - margin)
			        .style("fill", "none")
			        .style("pointer-events", "all")
			        .on("start",function() {
			        	vis.select(".x").style("display","none");
			        })
			        .on("mouseover", function() { 
						vis.select(".x").style("display",null);
						vis.select(".y").style("display",null);
			        	vis.style("display", null); 
			        })
			        .on("mouseout",function(){
			        	vis.select(".x").style("display","none");
			        	vis.select(".y").style("display","none");
			        })
			        .on("mousemove", mousemove);

			    function mousemove() {
						vis.select(".x").style("display",null);
						vis.select(".y").style("display",null);
			      var bisectDate = d3.bisector(function(d) { return d.x; }).left;
					var x0 = x.invert(d3.mouse(this)[0]),
					    i = bisectDate(data, x0),
					    d0 = data[i - 1],
					    d1 = data[i],
					    d = x0 - d0.x > d1.x - x0 ? d1 : d0;
					    console.log(d);

					vis.select("circle.y")
					    .attr("transform",
					          "translate(" + (10 + x(d.x)) + "," +
					                         y(d.y) + ")");

					vis.select("text.y2")
					    .attr("transform",
					          "translate(" + x(d.x) + "," +
					                         y(d.y) + ")")
					    .text(data[i].name);

					vis.select(".x")
					    .attr("transform",
					          "translate(" + x(d.x) + "," +
					                         y(d.y) + ")")
					    .attr("y2", h - margin - y(d.y));

					vis.select(".y")
					    .attr("transform",
					          "translate(" + (w - margin) * -1 + "," +
					                         (y(d.y)) + ")")
					   	.attr("x1",margin)
					    .attr("x2", w + w - 2*margin);
				}

			}
			$("#home").click(function() {
				url = './search.html';
                document.location.href=url;
			});