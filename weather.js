
function myFunction()
{
alert("Hello World!");
}
var weekday=new Array(7);
weekday[0]="Sunday";
weekday[1]="Monday";
weekday[2]="Tuesday";
weekday[3]="Wednesday";
weekday[4]="Thursday";
weekday[5]="Friday";
weekday[6]="Saturday";

var saturday;
var convertToMPH = 2.2369362920544;
function workOutDay(){
	var today = new Date();
	console.log("Today is " + weekday[today.getDay()]);
	//find saturday
	var diff = 6 - today.getDay()
	saturday = new Date();
	saturday.setDate(today.getDate() + diff);
}

SimpleSample = {};

SimpleSample.Person = Backbone.Model.extend({});

SimpleSample.WeatherData = Backbone.Model.extend({
	url: function() {
            return 'http://api.openweathermap.org/data/2.5/forecast?q=London,uk';
        }
});


    
SimpleSample.FormView = Backbone.View.extend({
    el: "#edit-form",
    
    initialize: function(){
        Backbone.ModelBinding.call(this);
    }
});

SimpleSample.DisplayView = Backbone.View.extend({
    el: "#display",
    
    events: {
        "click #reset-button": "reset"
    },
    
    initialize: function(){
        Backbone.ModelBinding.call(this);
    },
        
    reset: function(){
        this.model.set({first_name: "joe", last_name: "bob"});
    }
});

window.Wine = Backbone.Model.extend();
 
window.WineCollection = Backbone.Collection.extend({
    model:Wine,
    url:"../api/wines"
});


SimpleSample.App = function(){
    this.start = function(){
        //var person = new SimpleSample.Person();
        //var formView = new SimpleSample.FormView({model: person});
        //var displayView = new SimpleSample.DisplayView({model: person});
        //person.set({first_name: "joe", last_name: "bob"});
        /*$.get("http://api.openweathermap.org/data/2.5/forecast?q=London,uk&callback=?", function(data){
			success: function(data) {
				alert("Success: ");
			},
			error: function(data) {
				alert("Fail: ");
			},
			alert("Data: " + data);
		});*/
		
		/*$.getJSON('http://openweathermap.org/data/2.1/find/city?lat=13.3428&lon=-6.2661&cnt=10&callback=?', function(data) { 
			console.log(data); 
		});*/
		
		$.getJSON('http://api.openweathermap.org/data/2.5/forecast?q=tonbridge,uk&callback=?', function(data) { 
			workOutDay();
			var weather = "";
			for(var i = 0 ; i < data.list.length ; i++){
				var date = new Date(data.list[i].dt*1000);
				if(saturday.getDate() == date.getDate()){
					weather += date.toString() + "<br/>";
					weather += "Wind " + data.list[i].wind.deg + " degrees " + (data.list[i].wind.speed*convertToMPH).toFixed(2) + "mph" + "<br/>";
					for(var j = 0 ; j < data.list[i].weather.length ; j++){
						weather += "Weather " + data.list[i].weather[j].description + "<br/>";
					}
					if(data.list[i].rain){
						weather += "Rain " + data.list[i].rain['3h'] + "<br/>";
					}
					weather += "<hr/>";
				}
				
			}
			$('#weather').html(weather);
			//$('#weather').html(JSON.stringify(data,null , 2));
		});
		workOutDay();
        
        /*var weather = new SimpleSample.WeatherData();
        weather.fetch({
			success: function(){
				console.log(weather.models); // => 2 (collection have been populated)
			},
			error:function(model,response)
			{
				console.log(model.toJSON());
				console.log(response);
				console.log("Not in here");
			}
		});*/
    }
}
    
$(function(){
    var app = new SimpleSample.App();
    app.start();
});

