function loadScript(url, callback)
{
    // adding the script tag to the head as suggested before
   var head = document.getElementsByTagName('head')[0];
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;

   // then bind the event to the callback function 
   // there are several events for cross browser compatibility
   script.onreadystatechange = callback;
   script.onload = callback;

   // fire the loading
   head.appendChild(script);
}



function addMls(model) {
	model['_mls'] = function() { 
		return function(val) { 
			if (this[val]) {
				if (this[val].pt) {
					return this[val].pt;
				}
				if (this[val]["pt-PT"]) {
					return this[val]["pt-PT"];
				}
			}
			return "";
		};
	};
}
(function() {
	loadScript("http://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.js", function() {
		$.getScript("http://cdnjs.cloudflare.com/ajax/libs/mustache.js/0.7.2/mustache.min.js", function() {
			$.ajax( {type : "GET",
				 url : "../api/bennu-portal/hostmenu/" + window.location.hostname,
				 dataType: "json",
				 success : function(hostJson, status, response) {
					 	   	var theme_url = "/themes/" + hostJson.theme + "/layout.html";
					 	   	$.ajax( { type: "GET",
					 		   		 url: theme_url,
					 		   		 dataType: "text",
					 		   		 success: function(layoutTemplate, status,response) {
					 		   			addMls(hostJson);
					 		   			var html = Mustache.to_html(layoutTemplate,hostJson);
					 		   			body_html = $('body')[0].innerHTML;
					 		   			div = document.createElement('div');
					 		   			div.innerHTML = html;
					 		   			$(div).find("#content")[0].innerHTML = body_html;
					 		   			$('body')[0].innerHTML = div.innerHTML;
					 		   		 }	
					 	   	});
				 }
			});
		});
	});
})();