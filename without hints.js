const tictactoeGame=new TicTacToeGame();
tictactoeGame.start();
function TicTacToeGame(){
  document.querySelector('.endgame').style.display = 'none';
  document.querySelector('.message').style.display = 'none';
  document.querySelector('.oval3').style.top = '';
  document.querySelector('.oval4').style.top = '';
  document.querySelector('.oval1').style.top = '';
  document.querySelector('.oval2').style.top = '';
  document.querySelector('.circle1').style.animation='react1';
  document.querySelector('.rectangle1').style.animation='react1';
  document.querySelector('.oval3').style.animation='react1';
  document.querySelector('.oval4').style.animation='react1';
  document.querySelector('.leg3').style.animation='react1';
  document.querySelector('.leg4').style.animation='react1';
  document.querySelector('.circle').style.animation='react1';
  document.querySelector('.rectangle').style.animation='react1';
  document.querySelector('.oval1').style.animation='react1';
  document.querySelector('.oval2').style.animation='react1';
  document.querySelector('.leg1').style.animation='react1';
  document.querySelector('.leg2').style.animation='react1';
  const arr=Array.from(document.querySelectorAll('.col-xs-4'));
  for(var i = 0; i < arr.length; i++) {
    arr[i].innerText = '';
    arr[i].style.removeProperty('background-color');}
  const board=new Board();
  const humanPlayer1=new HumanPlayer1(board);
  const humanPlayer2=new HumanPlayer2(board);
  let turn=0;
  this.start=function(){
    const config={childList:true};
    const observer=new MutationObserver(()=>takeTurn());
    board.positions.forEach((el)=>observer.observe(el,config));
    takeTurn();
    }
  function takeTurn(){
    if (board.checkForWinner()==5){
      document.querySelector('.message').style.display = 'none';
      document.querySelector('.endgame').style.display = 'block';
      document.querySelector('.oval3').style.top = "150px";
      document.querySelector('.oval4').style.top = "150px";
      document.querySelector('.circle1').style.animation='react2 4s linear infinite';
      document.querySelector('.rectangle1').style.animation='react2 4s linear infinite';
      document.querySelector('.oval3').style.animation='react2 4s linear infinite';
      document.querySelector('.oval4').style.animation='react2 4s linear infinite';
      document.querySelector('.leg3').style.animation='react2 4s linear infinite';
      document.querySelector('.leg4').style.animation='react2 4s linear infinite';
      document.querySelector('.endgame .text').innerText = 'TAC Won!';
      turn=0;
      return true ;
    }
    if (board.checkForWinner()==10){
      document.querySelector('.message').style.display = 'none';
      document.querySelector('.endgame').style.display = 'block';
      document.querySelector('.oval1').style.top = "-35px";
      document.querySelector('.oval2').style.top = "-35px";
      document.querySelector('.circle').style.animation='react2 4s linear infinite';
      document.querySelector('.rectangle').style.animation='react2 4s linear infinite';
      document.querySelector('.oval1').style.animation='react2 4s linear infinite';
      document.querySelector('.oval2').style.animation='react2 4s linear infinite';
      document.querySelector('.leg1').style.animation='react2 4s linear infinite';
      document.querySelector('.leg2').style.animation='react2 4s linear infinite';
      document.querySelector('.endgame .text').innerText = 'TIC Won!';
      turn=0;
      return true ;
    }
    else if (board.checkForTie(board)){
      document.querySelector('.message').style.display = 'none';
      document.querySelector('.endgame').style.display = 'block';
      document.querySelector('.endgame .text').innerText = 'Tie';
      turn=0;
      return true;
    }
    if (turn<9){
    if (turn%2===0){
      humanPlayer1.takeTurn();
    }else if(turn%2!==0){
      humanPlayer2.takeTurn();
    }
  }
  turn++;
}
}

function checkIfWon(arr,g){
  var posi=[];
  var posj=[];
  var p=0;
  var q=0;
  var h=0;
  var k=0;var l=0;var r=0;
  var newarray = [];
  for(var i=0;i < arr.length;i =i+3){
    newarray.push(arr.slice(i,i+3));}
  for(i=0;i<3;i++){
    for(j=0;j<3;j++){
      if (newarray[i][j]==g){
        posi.push(i);
        posj.push(j);
        if (i==j){
          p=p+1;
        }if ((i==j && i==1)||i-j==2||j-i==2){
          q=q+1;
        }
      }
    }
  }
  if (p==3){
    h=1;
  }else if (q==3){
    h=1;
  }
  if (posi.length>=3){
    for(i=0;i<posi.length;i++){
      if (posi[i]==posi[i]){
        if (posi[i]==0){
          k=k+1;
        }
        else if(posi[i]==1){
          l=l+1;
        }else if (posi[i]==2){
          r=r+1;
        }
      }
    }
  }
  if (k==3||l==3||r==3){
    h=1;
  }
  k=0;l=0;r=0;
  if (posj.length>=3){
    for(i=0;i<posj.length;i++){
      if (posj[i]==posj[i]){
        if (posj[i]==0){
          k=k+1;
        }
        else if(posj[i]==1){
          l=l+1;
        }else if (posj[i]==2){
          r=r+1;
        }
      }
    }
  }
  if (k==3||l==3||r==3){
    h=1;
  }
  if (h==1){
    return 1;
  }else{
    return false;
  }
}

function Board(){
  this.positions=Array.from(document.querySelectorAll('.col-xs-4'));
  this.checkForWinner=function(){
    let winner=false;
    const WinningCombinations=[
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
     ];
    const positions=this.positions;
    WinningCombinations.forEach((winningCombo)=>{
      const pos0InnerText=positions[winningCombo[0]].innerText;
      const pos1InnerText=positions[winningCombo[1]].innerText;
      const pos2InnerText=positions[winningCombo[2]].innerText;
      const iswinningCombo=pos0InnerText !==''&&
        pos0InnerText===pos1InnerText&& pos1InnerText===pos2InnerText;
      if (iswinningCombo){
        winner=true;
        for (i=0;i<winningCombo.length;i++){
          if (pos0InnerText==='O'){
            winner=5;
          positions[winningCombo[i]].style.backgroundColor = 'green';}
      else{
        winner=10;
        positions[winningCombo[i]].style.backgroundColor = 'green';
      }}
      }

    });
    return winner;
  }
  this.checkForTie=function(board){
    const arr=Array.from(document.querySelectorAll('.col-xs-4'));
    const availablePositions = board.positions.filter((p)=>p.innerText==='');
    if (availablePositions.length==0){
      for (i=0;i<arr.length;i++){
        arr[i].style.backgroundColor = 'DarkSlateBlue';
      }
      return true;
    }else{
      return false;
    }
  }
}

function HumanPlayer1(board){
  this.takeTurn = function(){
    document.querySelector('.message').style.display = 'block';
    document.querySelector('.message .text').innerText = 'TICs turn';
    board.positions
    .forEach(el=>el.addEventListener('click', handleTurnTaken));
    }

    function handleTurnTaken(event){
      const availablePositions = board.positions.filter((p)=>p.innerText==='');
      for (i=0;i<availablePositions.length;i++){
        if (availablePositions[i]===event.target){
          event.target.innerText='X';
          board.positions.forEach(el=>el.removeEventListener('click',handleTurnTaken));
        }
      }
    }
  }

function HumanPlayer2(board){
  this.takeTurn = function(){
    document.querySelector('.message').style.display = 'block';
    document.querySelector('.message .text').innerText = 'TACs turn';
    board.positions
    .forEach(el=>el.addEventListener('click', handleTurnTaken));}

  function handleTurnTaken(event){
    const availablePositions = board.positions.filter((p)=>p.innerText==='');
    for (i=0;i<availablePositions.length;i++){
      if (availablePositions[i]===event.target){
        event.target.innerText='O';
        board.positions.forEach(el=>el.removeEventListener('click',handleTurnTaken));
      }
    }
  }
}
