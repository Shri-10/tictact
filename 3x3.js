alert("In this challenge round, the word JOKER appears and disappears randomly after each move. When it disappears other players are free to use JOKER positions to play the regular game.");
const tictactoeGame=new TicTacToeGame();
tictactoeGame.start();
function TicTacToeGame(){
  document.querySelector('.endgame').style.display = 'none';
  const arr=Array.from(document.querySelectorAll('.col-xs-4'));
  for(var i = 0; i < arr.length; i++) {
    arr[i].innerText = '';
    arr[i].style.removeProperty('background-color');}
  const board=new Board();
  const humanPlayer=new HumanPlayer(board);
  const computerPlayer=new ComputerPlayer(board);
  let turn=0;
  this.start=function(){
    const config={childList:true};
    const observer=new MutationObserver(()=>takeTurn());
    board.positions.forEach((el)=>observer.observe(el,config));
    takeTurn();
    }
  function takeTurn(){
    if (board.checkForWinner()==5){
      document.querySelector('.endgame').style.display = 'block';
      document.querySelector('.endgame .text').innerText = 'You Lost!';
      turn=0;
      return true ;
    }
    if (board.checkForWinner()==10){
      document.querySelector('.endgame').style.display = 'block';
      document.querySelector('.endgame .text').innerText = 'You Won!';
      turn=0;
      return true ;
    }
    else if (board.checkForTie(board)){
      document.querySelector('.endgame').style.display = 'block';
      document.querySelector('.endgame .text').innerText = 'Tie';
      turn=0;
      return true;
    }if (turn<9){
    if (turn%2===0){
      humanPlayer.takeTurn();
    }else if(turn%2!==0){
      computerPlayer.takeTurn();
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
    const positions=this.positions
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
          winner=5
          positions[winningCombo[i]].style.backgroundColor = 'red';}
          else{
            winner=10;
            positions[winningCombo[i]].style.backgroundColor = 'green';
          }
        }
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

function HumanPlayer(board){
  this.takeTurn = function(){
    board.positions
    .forEach(el=>el.addEventListener('click', handleTurnTaken));
    }
    function handleTurnTaken(event){
      const availablePositions = board.positions.filter((p)=>p.innerText==='');
      for (i=0;i<availablePositions.length;i++){
        if (availablePositions[i]===event.target){
          event.target.innerText='X';
          board.positions.forEach(el=>el.removeEventListener('click',handleTurnTaken));
          const availablePositions = board.positions.filter((p)=>p.innerText==='');
          if (availablePositions.length>3){
          const move=Math.floor(Math.random()*availablePositions.length);
          availablePositions[move].style.fontSize='32px';
          availablePositions[move].innerText='Joker';}
          else if(availablePositions.length<=3){
            const occupiedposj=board.positions.filter((p)=>p.innerText==='Joker');
            if (occupiedposj.length>0){
            for (i=0;i<occupiedposj.length;i++){
              occupiedposj[i].style.fontSize='100px'
              occupiedposj[i].innerText='';}}
            }
          }
        }
      }
    }
    function ComputerPlayer(board){
      this.takeTurn = function(){
        var array=[0,1,2,3,4,5,6,7,8];
        var array1=[0,1,2,3,4,5,6,7,8];
        const arr=Array.from(document.querySelectorAll('.col-xs-4'));
        const availablePositions = board.positions.filter((p)=>p.innerText==='');
        const occupiedPositionsX = board.positions.filter((p)=>p.innerText==='X');
        const occupiedPositionsO = board.positions.filter((p)=>p.innerText==='O');
        const occupiedPositionsJ = board.positions.filter((p)=>p.innerText==='Joker');
        for(i=0;i<arr.length;i++){
          for(j=0;j<occupiedPositionsX.length;j++){
            if (arr[i]==occupiedPositionsX[j]){
              var x="X";
              array.splice(i,1,x);
              array1.splice(i,1,x);
            }
          }
        }
        for(i=0;i<arr.length;i++){
          for(j=0;j<occupiedPositionsO.length;j++){
            if (arr[i]==occupiedPositionsO[j]){
              var y="O";
              array.splice(i,1,y);
              array1.splice(i,1,y);

            }
          }
        }
        for(i=0;i<arr.length;i++){
          for(j=0;j<occupiedPositionsJ.length;j++){
            if (arr[i]==occupiedPositionsJ[j]){
              var v="Joker";
              array.splice(i,1,v);
              array1.splice(i,1,v);

            }
          }
        }
        for(i=0;i<arr.length;i++){
          for(j=0;j<availablePositions.length;j++){
            if (arr[i]==availablePositions[j]){
              var z=availablePositions[j];
              array1.splice(i,1,z);
            }
          }
        }
        var move=minimax(array,"O")[0];
        array1[move].innerText='O';
      }
    }

function ComputerPlayer1(board){
  this.takeTurn = function(){
    const availablePositions = board.positions.filter((p)=>p.innerText==='');
    const move=Math.floor(Math.random()*availablePositions.length);
    availablePositions[move].innerText='O';
  }
}
function pos(arr){
  var pos=[];
  for(v=0;v<arr.length;v++){
    if ((arr[v]!="X") && (arr[v]!="O") && (arr[v]!="Joker")){
      pos.push(arr[v]);
    }
  }
  return pos;
}

function minimax(array,turn){
  var score;
  if (turn=="X"){
    var opponent="O";
  }else{
    opponent="X";
  }
  var best_pos;
  var max_score=-10;
  var p=pos(array);
  var i; var j;
  for(i=0;i<array.length;i++){
    for(j=0;j<p.length;j++){
      if (array[i]==p[j]){
        array.splice(i,1,turn);
        const ii=i;
        const jj=j;
        const k=p[j];
        if (checkIfWon(array,turn)==1){
          score=1;
        }
        else if (pos(array).length===0){
          score=0;
        }
        else{
          score=-minimax(array,opponent)[1];
        }
        i=ii;
        j=jj;
        array.splice(i,1,p[j]);
        if (score>max_score){
          best_pos=p[j];
          max_score=score;
        }
      }
    }
  }
  const result=[];
  result.splice(0,1,best_pos);
  result.splice(1,1,max_score);
  return result;
 }
