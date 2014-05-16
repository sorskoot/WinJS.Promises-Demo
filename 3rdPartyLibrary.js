(function(window){	
	window.someRandomLibrary = {

		magic : function(options){
			//options = {
			//	callback: function
			//	value   : []
			//}
			options.callback("some magic on "+options.value.length+" playlists");
		}
	}
})(window)