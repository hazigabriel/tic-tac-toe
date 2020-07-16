 const changePage = function(){ 
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
 }
const getUserInput = function(){
 




}