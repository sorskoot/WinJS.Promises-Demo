(function(){

WinJS.Application.onready = function(){

	// create request object 
	var request = 
	{
		url:"https://gdata.youtube.com/feeds/api/users/paulsoaresjr/playlists?v=2&alt=json",
		responseType:"json"
	};
	

	//call to xhr
	WinJS.xhr(request)
		
		.then(function(r){
			var response = JSON.parse(r.response),
				promises = [];			
			//console.log(response.feed.entry[0].title.$t);										
			for (var i = 0; i < response.feed.entry.length; i++) {				
				promises.push(WinJS.xhr({
					url:response.feed.entry[i].link[2].href+"&alt=json",
					responseType:"json"
				}));				
			};
			return WinJS.Promise.join(promises);
		})

		.then(function(x){
			var playlistResult = [];
			for (var i = 0; i < x.length; i++) {
				var response = JSON.parse(x[i].response);
				//console.log(response.entry.summary.$t);
				playlistResult.push({
					title: response.entry.title.$t,
					summary: response.entry.summary.$t,
					url: response.entry.link[1].href
				})
			};			
			return playlistResult;
		}, function(err){
			console.log(err);
		})

		.then(function(playlists){

			return new WinJS.Promise(function(complete, error){
				someRandomLibrary.magic({
					value:playlists,
					callback:function(x){
						complete(x);
					},
					error:function(err){
						error(err);
					}
				});

			})
		})

		.then(function(result){
			console.log(result);		
		})
}

WinJS.Application.start();

})();