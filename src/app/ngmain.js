angular.module("screenModule", [])
	.controller("screenController", ["$scope", "$http", function($scope, $http ){

		var vm = this
		// init banner
        vm.main = new Main ();
        vm.main.init();
        vm.main.setupTestBtns()


		window.setInterval(function(){
			$http.get("http://localhost:3000/onair/get_datastring").success(function(data){
				var datastring = data.Root.item[0];
				// console.log("datastring: " + JSON.stringify(datastring, null, 2));
				parseDatastring(datastring);
			});

		}, 3000);

		var active = null

		var parseDatastring = function(data){
			var question = data.question[0];
			var winnername = data.winnername[0];
			var avatar = data.avatar[0];
			var action = data.action[0];
			var result = data.result[0];
						

			if(action && !active){
				active = true
				switch(action){

					case "QUIZSTART":
						console.log("QUIZSTART");


						vm.main.showQuestion(question)
						break;

					case "QUIZEND":
						console.log("QUIZEND");
						vm.main.hideQuestion()
						break;

					case "RATINGEND":
						console.log("RATINGEND");
						break;

					case "GAMEEND":
						console.log("GAMEEND");
						break;
				}

			}

			if (!action && active ){
				console.log("NO ACTION");
				active = false
			}
		}

}]);