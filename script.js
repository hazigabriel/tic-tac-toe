 const changePageModal = (function(){ 
 	const toHome = function(){
 		document.querySelector(".home-screen").style.display = "block";
 		document.querySelector(".game-screen").style.display = "none";
 	};
 	const toGameScreen = function(){
 		document.querySelector(".home-screen").style.display = "none";
 		document.querySelector(".game-screen").style.display = "block";
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

			}

		});
		//change the page to "Home screen"
		homeScreenButton.addEventListener("click", function(){
			let goBack = confirm("Are you sure that you want to go back to the homepage, and reset the score?");
			if(goBack == true){
				changePageModal.toHome()
				gameFlow.resetUserInput()
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
}
const gameFlow = {
	updatePlayerChoice: function(){
		let squares = document.querySelectorAll(".box");

		squares.forEach(function(e){
			e.addEventListener("click", function(){
				if(gameBoard.player1Moves.length == gameBoard.player2Moves.length || gameBoard.player1Moves.length == gameBoard.player2Moves.length){
					e.innerHTML = "x";
					gameBoard.player1Moves.push(1);

				} else{
					e.innerHTML = "o"
					gameBoard.player2Moves.push(1)
				}
			})

		})

	},
	resetUserInput: function(){
		document.querySelector(".PlayerOneName").value = "";
		document.querySelector(".PlayerTwoName").value = "";
		document.querySelector(".playAgainstAiCheckbox").checked = false;
	},
	// resetGame: function(){
	// 	let resetButton = document.querySelector(".resetGame");

	// 	resetButton.addEventListener("click", function(){
	// 		gameBoard.player1Moves = [];
	// 		gameBoard.player1Moves = [];
	// 		for(let i = 0; i < document.querySelectorAll(".box").length; i++ ){
	// 			document.querySelectorAll(".box")[i].innerHTML = ""
	// 		}

	// 	})
 
	// }
}