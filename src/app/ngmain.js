angular.module("screenModule", [])
	.controller("screenController", ["$scope", "$http", "$interval", "$timeout", function($scope, $http, $interval, $timeout){

		var vm = this
		// init banner
        vm.main = new Main ();
        vm.main.init();
        vm.main.setupTestBtns()

        var host = document.location.hostname; 
        var datastringUrl;
        if(host === 'localhost'){
        	datastringUrl = 'http://localhost:3000/onair/get_datastring';
        }
        else{
        	datastringUrl = 'http://fan.tv2.dk/onair/get_datastring';
        }

		$interval(function(){
			$http.get(datastringUrl).success(function(data){
				var datastring = data.Root.item[0];
				// console.log("datastring: " + JSON.stringify(datastring, null, 2));
				parseDatastring(datastring);
			});

		}, 3000);

		var lastAction = null;

		var parseDatastring = function(data){
			var question = data.question[0];
			var winnername = data.winnername[0];
			var avatar = data.avatar[0];
			var action = data.action[0];
			var result = data.result[0];
			
			$scope.action = action;						

			if(action && action !== lastAction){
				lastAction = action;
				switch(action){

					case "QUIZSTART":
						console.log("QUIZSTART");
						vm.main.showQuestion(question)
						break;

					case "QUIZEND":
						console.log("QUIZEND ::: " + winnername + " ::: " + avatar);
						vm.main.hideQuestion();
						//TODO: If no winner, only show correct answer

						if(winnername && avatar){
							vm.main.showWinner("images/" + avatar, winnername);
						}
						break;

					case "RATINGEND":
						console.log("RATINGEND");
						if(avatar){
							console.log("rate player");
							//rate player
							//TODO: Change to showRating when available
							vm.main.showWinner(".." + avatar, result);
						}
						else{
							console.log("rate moment");
							//rate moment
							//TODO: Call showRating when available
						}
						break;

					case "GAMEEND":
						console.log("GAMEEND");
						//TODO: Call gameEnd when available
						break;
				}

			}

			if (!action && lastAction){ 
				console.log("NO ACTION");

				switch(lastAction){

					case "QUIZSTART":
						vm.main.hideQuestion();
						break;

					case "QUIZEND":
						vm.main.hideWinner();
						break;

					case "RATINGEND":
						//TODO: Hide rating
						break;

					case "GAMEEND":
						//TODO: Hide gameend
						break;
				}
			}

			lastAction = action;

		}

}]);