 const changePageModal = (function(){ 
 	const toHome = function(){
 		document.querySelector(".home-screen").style.display = "block";
 		document.querySelector(".game-screen").style.display = "none";
 	};
 	const toGameScreen = function(){
 		document.querySelector(".home-screen").style.display = "none";
 		document.querySelector(".game-screen").style.display = "block";
 	};
 	return {
 		toHome,
 		toGameScreen
 	}
})();

const changePage = (function(){
	let submitButton = document.querySelector(".submitPlayerName");
	let homeScreenButton = document.querySelector(".homeScreenButton");

	submitButton.addEventListener("click", function(){

		if(getUserInput().player1 == "" || getUserInput().player2 == ""){
			alert("Please chose the player names");
		 
		} else {
			changePageModal.toGameScreen();

		}

	});
	homeScreenButton.addEventListener("click", function(){
		let goBack = confirm("Are you sure that you want to go back to the homepage, and reset the score?");
		if(goBack == true){
			changePageModal.toHome()
			resetField.userInput()
		}
	})



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
		AiCheckbox
	}

};
const resetField = (function(){
	let userInput = function(){
		document.querySelector(".PlayerOneName").value = "";
		document.querySelector(".PlayerTwoName").value = "";
		document.querySelector(".playAgainstAiCheckbox").checked = false;
	}
	return {
		userInput,
	}
})()