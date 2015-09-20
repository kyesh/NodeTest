console.log(angular);
var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function ($scope) {
  $scope.phones = [
    {'name': 'Australia - 2015 Sydney/Melbourne/Alice Springs',
     'snippet': 'Loved this trip. The wildlife was awesome. Highly recommend.',
	     "id": "motorola-defy-with-motoblur",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Uluru_%28Helicopter_view%29-crop.jpg/1920px-Uluru_%28Helicopter_view%29-crop.jpg"},
    {'name': 'India - 2014 New Delhi/Agra',
     'snippet': 'Such an exotic and beautiful land. Corrupt and dirty, though.',
	     "id": "motorola-defy-with-motoblur",
    "imageUrl": "http://i.livescience.com/images/i/000/073/728/i02/taj-mahal-india-150202.jpg?1422864484"},
    {'name': 'China',
     'snippet': 'I loved the food!',
	     "id": "motorola-defy-with-motoblur",
    "imageUrl": "http://img.timeinc.net/time/photoessays/2008/beijing_travel/great_wall_beijing.jpg"},
	     {'name': 'Turkey - 2014 Istanbul',
     'snippet': 'The grand bazaar was incredible. I had a great hike through the city. Check out my data.',
	     "id": "motorola-defy-with-motoblur",
    "imageUrl": "http://www.teslasociety.com/pictures/Roman%20Empire%20Images/RomanEmpire3.jpg"},
	     {'name': 'Russia - 2015 Moscow/St. Petersburg',
     'snippet': 'Hard to enter the country but worth the wait. Saint Petersburg is full of rich history.',
	     "id": "motorola-defy-with-motoblur",
    "imageUrl": "http://www.8thingstodo.com/wp-content/uploads/2013/02/Kremlin-Moscow.jpg"},
	     {'name': 'Yellow Stone National Park - 2013',
     'snippet': 'Classic.',
	     "id": "Scenery was gorgeous. My hike was amazing.",
    "imageUrl": "http://i2.cdn.turner.com/cnnnext/dam/assets/130813102420-yellowstone-story-glacier-national-park-horizontal-large-gallery.jpg"},
	     {'name': 'Glacier National Park',
     'snippet': 'The scenery was out of this world.',
	     "id": "motorola-defy-with-motoblur",
    "imageUrl": "http://www.westernwaters.com/wp-content/uploads/2014/02/Glacier-National-Park-Coeur-dAlene-rafting.jpg"},
	     {'name': 'Mount Fuji - 2014',
     'snippet': 'Mt. Fuji was tiring! Check out my fitbit data.',
	     "id": "motorola-defy-with-motoblur",
    "imageUrl": "http://www.flightcentre.co.nz/cms_images/web_images/flights/international/large/japan/tokyo-mt-fuji.jpg"},
	     {'name': 'Niagara Falls State Park',
     'snippet': 'The run along the falls was great.',
	     "id": "motorola-defy-with-motoblur",
    "imageUrl": "http://www.niagarafallsstatepark.com/img/TheGrandNiagara.jpg"},
	     {'name': 'Barcelona',
     'snippet': 'The most beautiful experience in the world.',
	     "id": "motorola-defy-with-motoblur",
    "imageUrl": "https://www.ellerinternational.com/wp-content/uploads/2015/05/3b4bdbedef.jpg"},
	     {'name': 'Great Smokey Mountains National Park',
     'snippet': 'Breathtaking-hike and run.',
	     "id": "motorola-defy-with-motoblur",
    "imageUrl": "http://davidduke.com/wp-content/uploads/2014/11/smokey-mountain.jpg"}
  ];
});
$(document).ready(function() {
		$("#google").click(function() {
			alert("Not quite done OAuth yet!");
	              $("#google").attr("data-target", "#myModal");
                  $("#google").attr("data-toggle", "modal");		
		});
		$("#visit").click(function() {
                url = './map.html';
                document.location.href=url;
		});
});