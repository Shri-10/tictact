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
    }if (turn<25){
    if (turn%2===0){
      humanPlayer.takeTurn();
    }else if(turn%2!==0){
      computerPlayer.takeTurn();
    }
  }
  turn++;
}
}


function Board(){
  this.positions=Array.from(document.querySelectorAll('.col-xs-4'));
  this.checkForWinner=function(){
    let winner=false;
    const WinningCombinations=[
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
     ];
    const positions=this.positions
    WinningCombinations.forEach((winningCombo)=>{
      const pos0InnerText=positions[winningCombo[0]].innerText;
      const pos1InnerText=positions[winningCombo[1]].innerText;
      const pos2InnerText=positions[winningCombo[2]].innerText;
      const pos3InnerText=positions[winningCombo[3]].innerText;
      const pos4InnerText=positions[winningCombo[4]].innerText;
      const iswinningCombo=pos0InnerText !==''&&
        pos0InnerText===pos1InnerText&& pos1InnerText===pos2InnerText &&
        pos2InnerText===pos3InnerText && pos3InnerText===pos4InnerText;
      if (iswinningCombo){
        winner=true;
        for (i=0;i<winningCombo.length;i++){
          if (pos0InnerText==='O'){
          winner=5
          positions[winningCombo[i]].style.backgroundColor = 'red';}
          else if (pos0InnerText==='X'){
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
          var k=0;
          if (availablePositions.length>10){
            const occupiedposj=board.positions.filter((p)=>p.innerText==='J');
            if (occupiedposj.length>0){
            for (i=0;i<occupiedposj.length;i++){
              occupiedposj[i].style.fontSize='70px';
              occupiedposj[i].innerText='';}}
          while (k<=(availablePositions.length)/2){
          const move=Math.floor(Math.random()*availablePositions.length);
          availablePositions[move].style.fontSize='24px'
          availablePositions[move].innerText='Joker';
          k=k+1;}}
          else if(availablePositions.length<2){
            const occupiedposj=board.positions.filter((p)=>p.innerText==='Joker');
            if (occupiedposj.length>0){
            for (i=0;i<occupiedposj.length;i++){
              occupiedposj[i].style.fontSize='70px';
              occupiedposj[i].innerText='';
            }
            }
            }
          }
        }
      }
    }


function ComputerPlayer(board){
  this.takeTurn = function(){
    const availablePositions = board.positions.filter((p)=>p.innerText==='');
    const move=Math.floor(Math.random()*availablePositions.length);
    availablePositions[move].innerText='O';
  }
}
function ComputerPlayer1(board){
  this.takeTurn = function(){
    var array=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    var array1=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
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
  console.log("yess")
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
          console.log(score)
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
 function checkIfWon(arr,g){
   var posi=[];
   var posj=[];
   var p=0;
   var q=0;
   var h=0;
   var k=0;var l=0;var r=0;var s=0;var t=0;
   var newarray = [];
   for(var i=0;i < arr.length;i =i+5){
     newarray.push(arr.slice(i,i+5));}
   for(i=0;i<3;i++){
     for(j=0;j<3;j++){
       if (newarray[i][j]==g){
         posi.push(i);
         posj.push(j);
         if (i==j){
           p=p+1;
         }if ((i==j && i==2)||i-j==4||j-i==4||(i-j==3&&i==3)||(j-i==3&&j==3)){
           q=q+1;
         }
       }
     }
   }
   if (p==5){
     h=1;
   }else if (q==5){
     h=1;
   }
   if (posi.length>=5){
     for(i=0;i<posi.length;i++){
       if (posi[i]==posi[i]){
         if (posi[i]==0){
           k=k+1;
         }
         else if(posi[i]==1){
           l=l+1;
         }else if (posi[i]==2){
           r=r+1;
         }else if (posi[i]==3){
           s=s+1;
       }else if (posi[i]==4){
         t=t+1;
     }
   }}}
   if (k==5||l==5||r==5||(s==5)||(t==5)){
     h=1;
   }
   k=0;l=0;r=0;s=0;t=0;
   if (posj.length>=5){
     for(i=0;i<posj.length;i++){
       if (posj[i]==posj[i]){
         if (posj[i]==0){
           k=k+1;
         }
         else if(posj[i]==1){
           l=l+1;
         }else if (posj[i]==2){
           r=r+1;
         }else if (posj[i]==3){
           s=s+1;
         }else if (posj[i]==4){
           t=t+1;
         }
       }
     }
   }
   if (k==5||l==5||r==5||s==5||t==5){
     h=1;
   }
   if (h==1){
     return 1;
   }else{
     return false;
   }
 }
