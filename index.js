 const cards = Array.from(document.querySelectorAll('.card'));
 const gameTriesContainer = document.querySelector(".main__game-tries");
 const retryBtns = document.querySelectorAll(".restart-btn");
 const randomWordsContainer = Array.from(document.querySelectorAll(".card__side--back"));
 const gameTime = document.querySelector(".main__game-time");
  
//  game tries
 let tries = 0;

 //  timer for game
let timer = 0;

// words
 const words = {
    "A": 2,
    "B": 2,
    "C": 2,
    "D": 2,
    "E": 2,
    "F": 2,
    "G": 2,
    "H": 2,
    "I": 2,
    "J": 2
 };

  
 function removeActiveClass(nodeOne, nodeTwo){
    nodeOne.classList.remove("active");
    nodeTwo.classList.remove("active");
 }

 function getMatches(){
     return cards.filter(card => card.classList.contains("active"));
 }
 function disableRest(){
     cards.forEach(card =>{
         if(!card.classList.contains("active")){
            card.querySelector(".card__side--front").disabled = true;
         }
     })
 }
 function enableRest(){
    cards.forEach(card =>{
        if(!card.classList.contains("active")){
           card.querySelector(".card__side--front").disabled = false;
        } 
    })
 }
 function delayPressingCard(nodeOne, nodeTwo){
    setTimeout(()=>{
        removeActiveClass(nodeOne, nodeTwo);
        enableRest();   
          
    }, 2000);
 }
 function updateTries(){
    tries++;
    gameTriesContainer.textContent = tries;
 }
 function getTrimmedWord(node){
    return node.querySelector('.card__side--back').textContent.trim()
 }
 function addMatchClass(node){
     node.classList.add("match");
 }
 function hideNode(node){
    node.style.display = "none";
 }
 function displayNode(node){
     node.style.display = "block";
 }
 function getResultNodes(){
    const result = document.querySelector(".result");
    const wonInMinutes = document.querySelector(".result__winning-time-minutes");
    const wonInSeconds = document.querySelector(".result__winning-time-seconds");
    const wonInTries = document.querySelector(".result__winning-in-moves");
    const gameControls = document.querySelector(".main__game-controls");
    const header = document.querySelector(".main__header");
    const mainGameContainer = document.querySelector(".main__container");
    return {
        result,
        wonInMinutes,
        wonInSeconds,
        wonInTries,
        gameControls,
        header,
        mainGameContainer
    }
 }
 function declareTheWinner(){
    const resultNodes = getResultresultNodes();
    hideNode(resultNodes.mainGameContainer);
    hideNode(resultNodes.gameControls);
    hideNode(resultNodes.header);
    displayNode(resultNodes.result);
    // mainGameContainer.style.display = "none";
    // gameControls.style.display = "none";
    // header.style.display = "none";
    // result.style.display = "block";

    resultNodes.wonInMinutes.textContent = gameTime.textContent.trim().slice(0,2);
    resultNodes.wonInSeconds.textContent = gameTime.textContent.trim().slice(3);
    resultNodes.wonInTries.textContent = tries;
 }

 function checkGameResult(){
    const cards = Array.from(document.querySelectorAll(".card"));
    const isAllCardsMatched = cards.every(card => card.classList.contains("match"));
    isAllCardsMatched ? declareTheWinner() : '';    
 }
 function checkResult(matches){
    const nodeOne = matches[0];
    const nodeTwo = matches[1];
    const nodeOneIcon = getTrimmedWord(nodeOne);
    const nodeTwoIcon = getTrimmedWord(nodeTwo);
    if(nodeOneIcon !== nodeTwoIcon){
       delayPressingCard(nodeOne, nodeTwo);
       updateTries();  
    } else {
        addMatchClass(nodeOne);
        addMatchClass(nodeTwo);
        delayPressingCard(nodeOne, nodeTwo);
        updateTries();
        checkGameResult();
    }
}
 function checkMatch(){
    if(!this.classList.contains("match")){
        this.classList.add("active");
    } 
    const matches = getMatches();
    console.log(matches);
    if(matches.length === 2){
        disableRest();
        checkResult(matches);
    }
 }
 function padZero(time){
    return time.toString().padStart(2,"0");
 }
 function startTimer(){
    setInterval(() => {
        let minutes = Math.floor(timer / 60);
        let seconds = Math.floor(timer % 60);
        gameTime.textContent = `${padZero(minutes)}:${padZero(seconds)}`;
        
        timer++;
    }, 1000);
 }
 function removeRandomWords(){
     randomWordsContainer.forEach(word =>{
         word.innerHTML = "";
     });
 }
 function getRandomNode(){
     return randomWordsContainer[Math.floor(Math.random() * randomWordsContainer.length)];
 }
 function checkCardsFullness(){    
    return randomWordsContainer.every(node => node.textContent.trim().length === 1);
 }
 function getRandomKey(){
     const keys = Object.keys(words);
     return keys[Math.floor(Math.random() * keys.length)];
 }
 function regenerateRandomWords(){
    while(true){
        const randomNode =  getRandomNode();
        const randomKey = getRandomKey();
        const isCardsFull = checkCardsFullness();
        if(!randomNode.textContent.trim() && words[randomKey] > 0){
            words[randomKey]--;
            randomNode.textContent = randomKey;
        } else if(isCardsFull){
            return;
        }
    }

}
 function removeMatches(){
    const cards = document.querySelectorAll(".cards");
    cards.forEach(card => card.classList.remove("match"));
 }
 function loadTheGame(){
    startTimer();
    removeRandomWords();
    regenerateRandomWords();
 }
 function replay(){
    window.location.reload();
 }

 cards.forEach(card => card.addEventListener("click", checkMatch));
 window.addEventListener("DOMContentLoaded", loadTheGame);
 retryBtns.forEach(btn => btn.addEventListener("click", replay));