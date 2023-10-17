const cells=document.querySelectorAll(".cell");
const reset=document.querySelector("#reset");
const statusText=document.querySelector("#statusText");
const winkey=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,2],
    [6,7,8],
    [0,4,8],
    [2,4,6]
];
let inits=false;
let options=["","","","","","","","",""];
let currentPlayer="X";

initialize();

function initialize()
{
   cells.forEach(cell=>cell.addEventListener("click",cellClick))
   reset.addEventListener("click",restart);
   statusText.textContent=`${currentPlayer}'s turn`;
   inits=true;
}

function cellClick()
{
  const cellIndex=this.getAttribute("cellIndex");
  if(options[cellIndex]!="" || !inits)
  {
  return;
  }
  updateCell(this,cellIndex);
  checkWinner();

}

function updateCell(cell,index)
{
       options[index]=currentPlayer;
       cell.textContent=currentPlayer;
}
function changePlayer()
{
      currentPlayer=(currentPlayer=="X")?"O":"X";
      statusText.textContent=`${currentPlayer}'s turn`;
      

}
function checkWinner()
{
  let roundWon=false;
  for(let i=0;i<winkey.length;i++)
  {
    const condtion=winkey[i];
    const cella=options[condtion[0]];
    const cellb=options[condtion[1]];
    const cellc=options[condtion[2]];
    if(cella==""||cellb==""||cellc=="")
    {
        continue;
    }
    if(cella==cellb&&cellb==cellc)
    {
        roundWon=true;
        break;
    }
  }
  if(roundWon)
  {
    statusText.textContent=`${currentPlayer}  Wins!`;
    inits=false;
  }
  else if(!options.includes(""))
  {
    statusText.textContent="Draw!";
    inits=false;
  }
  else{
       changePlayer();
  }
}
function restart()
{
  currentPlayer="X";
  options=["","","","","","","","",""];
  statusText.textContent=`${currentPlayer}'s turn`;
  cells.forEach(cell=>cell.textContent="");
  inits=true;

}
