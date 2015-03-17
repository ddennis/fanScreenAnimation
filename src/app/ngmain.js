angular.module("screenModule", [])
	.controller("screenController", ["$scope", "$http", "$interval", "$timeout", function($scope, $http, $interval, $timeout){

		var vm = this
		// init banner
        vm.main = new Main ();
        vm.main.init();
        vm.main.setupTestBtns()

        var host = document.location.hostname; 
        var datastringUrl =  host === 'localhost' ? 'http://localhost:3000/onair/get_datastring' : 'fan.tv2.dk/onair/get_datastring';

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
						//TODO: If no winner, only show correct answer
						vm.main.hideQuestion();
						$timeout(function(){
							vm.main.showWinner("winner.jpg", "kenneth");
						}, 5000);
						break;

					case "RATINGEND":
						console.log("RATINGEND");
						break;

					case "GAMEEND":
						console.log("GAMEEND");
						break;
				}

			}

			if (!action && lastAction){
				console.log("NO ACTION");
			}

			lastAction = action;

		}

}]);