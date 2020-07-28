 const changePageModal = (function(){ 
 	const toHome = function(){
 		document.querySelector(".home-screen").style.display = "block";
 		document.querySelector(".game-screen").style.display = "none";
 	};
 	const toGameScreen = function(){
 		document.querySelector(".home-screen").style.display = "none";
 		document.querySelector(".game-screen").style.display = "block";

 		gameBoard.renderPlayersDefault();	
 		gameFlow.renderPlayerChoice() //start game
 		gameFlow.resetGame()
 	};
 	const changePage = (function(){
 		let submitButton = document.querySelector(".submitPlayerName");
		let homeScreenButton = document.querySelector(".homeScreenButton");

		//change the page to "Game screen"
		submitButton.addEventListener("click", function(){

			if(getUserInput().player1 == "" || getUserInput().player2 == ""){
				alert("Please chose the player names");
			 
			} else {
				changePageModal.toGameScreen();
				gameBoard.playerTurn(getUserInput().player1, "x")

			}

		});
		//change the page to "Home screen"
		homeScreenButton.addEventListener("click", function(){
			let goBack = confirm("Are you sure that you want to go back to the homepage, and reset the game score?");
			if(goBack == true){
				changePageModal.toHome();
				gameFlow.resetUserInput();

			} else {
				return
			}
		})

 	})()
 	const updatePlayer2ifAi = (function(){  //this function updates the player2 name, if the AI checkbox is checked
		let AiCheckbox = document.querySelector(".playAgainstAiCheckbox");
		let player2 = document.querySelector(".PlayerTwoName");

		AiCheckbox.addEventListener("change", function(){
			if(AiCheckbox.checked) {
				player2.value = "Computer";
			} else {
				player2.value = "";
			}
		})

	})()

 	return {
 		toHome,
 		toGameScreen,
 	}

})();

const getUserInput = function(){
	let player1 = document.querySelector(".PlayerOneName");
	let player2 = document.querySelector(".PlayerTwoName");
	let AiCheckbox = document.querySelector(".playAgainstAiCheckbox");

	player1 = player1.value;
	player2 = player2.value;
	AiCheckbox = AiCheckbox.checked;
 	
  
	return {
		player1,
		player2,
		AiCheckbox,
	}

};
const gameBoard = {
	player1Moves: [],
	player2Moves: [],
	player1Score: 0,
	player2Score: 0,
	playerTurn: function(player, symbol){
		document.querySelector(".currentGameStatus").innerHTML = `${player}'s (${symbol}) turn.`
	},
	renderPlayerScore: function(roundWinner){
		let player1content = document.querySelector(".player1Score");
		let player2content = document.querySelector(".player2Score");
		if(roundWinner == "x") {
			gameBoard.player1Score+1;
			player1content.innerHTML = `${getUserInput().player1}: ${gameBoard.player1Score} points`
		} else {
			gameBoard.player2Score+1	;
			player2content.innerHTML= `${getUserInput().player2}: ${gameBoard.player2Score} points`
		}

	},
	renderPlayersDefault: function(){
		let player1content = document.querySelector(".player1Score");
		let player2content = document.querySelector(".player2Score");
		player1content.innerHTML = `${getUserInput().player1}: 0 points`;
		player2content.innerHTML = `${getUserInput().player2}: 0 points`

	}
}
const gameFlow = {
	renderPlayerChoice: function(){  
		let squares = document.querySelectorAll(".box");
		 
		squares.forEach(function(e){
			e.addEventListener("click", function(){
				if(gameBoard.player1Moves.length == gameBoard.player2Moves.length || gameBoard.player1Moves.length == gameBoard.player2Moves.length){
					if(e.innerHTML != "") {
						return
					} else {
						e.innerHTML = "x";
					 	gameBoard.playerTurn(getUserInput().player2, "o")
						gameBoard.player1Moves.push(gameFlow.getUserChoiceIndex(e));
						gameFlow.checkForWin()
					}
					 

				} else{
					if(e.innerHTML != "") {
						return
					} else {
						e.innerHTML = "o";
						gameBoard.playerTurn(getUserInput().player1, "x")
						gameBoard.player2Moves.push(gameFlow.getUserChoiceIndex(e));
						gameFlow.checkForWin()
					}
				}
			})

		})

	},
	getUserChoiceIndex: function(e){
		let squaresArray = Array.prototype.slice.call(document.querySelectorAll(".box"));
		return squaresArray.indexOf(e)
	},
	startGame: function(){
		gameFlow.renderPlayerChoice()

	},
	resetUserInput: function(){
		document.querySelector(".PlayerOneName").value = "";
		document.querySelector(".PlayerTwoName").value = "";
		document.querySelector(".playAgainstAiCheckbox").checked = false;
	},
	resetGame: function(){
		let resetButton = document.querySelector(".resetGame");
		let player1 = document.querySelector(".player1Score");
		let player2 = document.querySelector(".player2Score");
	 	


		resetButton.addEventListener("click", function(){

			let checkIfSure = confirm("Are you sure you want to reset the score and the current round?")
			if(checkIfSure) {
			 
				gameBoard.player1Moves = [];
				gameBoard.player2Moves = [];

				player1.innerHTML = `${getUserInput().player1}: 0 points`; 

				player2.innerHTML = `${getUserInput().player2}: 0 points`; 

				document.querySelector(".player2Score").innerHTML = `${getUserInput().player1}: ${gameBoard.player1Score} points`;
				gameBoard.playerTurn(getUserInput().player1, "x");

				for(let i = 0; i < document.querySelectorAll(".box").length; i++ ){
					document.querySelectorAll(".box")[i].innerHTML = ""
				};
				gameBoard.renderPlayersDefault();


			}
			 

		})
 
	},
	newRound: function(){
		setTimeout(function(){
			gameBoard.playerTurn(getUserInput().player1, "x");
			gameBoard.player1Moves = [];
			gameBoard.player2Moves = [];
			for(let i = 0; i < document.querySelectorAll(".box").length; i++ ){
				document.querySelectorAll(".box")[i].innerHTML = ""
			}
		}, 1500)
	},
	checkForWin: function(){
		//first 3 indexs are for vertical winning combinations, next 3 for horizonal, and last two for diagonal
		let winChoices = [[0,3,6], [1,4,7],[2,5,8],[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6]]

		let arr1 = gameBoard.player1Moves;
		let arr2 = gameBoard.player2Moves;
		let check = (arr, target) => target.every(v => arr.includes(v))
		for(let i = 0; i < winChoices.length; i++) {
			if(check(arr1, winChoices[i])) {
				document.querySelector(".currentGameStatus").innerHTML = `${getUserInput().player1} won!`;
				gameBoard.player1Score++;
				gameFlow.newRound();
				gameBoard.renderPlayerScore("x");
				return
				 
			} else if (check(arr2, winChoices[i])){
				document.querySelector(".currentGameStatus").innerHTML = `${getUserInput().player2} won!`;
				gameBoard.player2Score++;
				gameFlow.newRound();
				gameBoard.renderPlayerScore("o");
				return
				 
			} else {
				 
			}
				
		}

 
		 
	}
}