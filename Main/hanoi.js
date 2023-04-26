const rods ={
    A : document.getElementById("A"),
    B : document.getElementById("B"),
    C : document.getElementById("C"),
    D : document.getElementById("D"),
};

const start=document.getElementById("start");
const stop =document.getElementById("stop");
const reset=document.getElementById("reset");
const finish  =document.getElementById("finish");
const with_click =document.getElementById("with click");

const moves =[];

function extendedHanoi(n,A,B,C,D){
    if(n==1){
        moves.push([A ,B]);
        moves.push([C ,A]);
        moves.push([B ,C]);
        return;
        
    }else{
        hanoi(n,A,D,B);
        hanoi(n,C,D,A);
        hanoi(n,B,D,C);
    }

}
const hanoi=(n,A,B,C)=>{
    if(n===1){
        moves.push([A,C]);
    }else{
        hanoi(n-1,A,C,B);
        moves.push([A,C]);
        hanoi(n-1,B,A,C);
    }
}; 
function init(){
    const n= window.prompt("Please enter the number of disks to start!");
    if ( n<9 ){
        const disksA=[];
        const disksC=[];

        for(let i=0;i<n;i++){
            const diskA=document.createElement("div");
            diskA.classList.add("disk");
            diskA.style.width= `calc(3.66rem + ${n -i*1.5}rem)`;
            disksA.push(diskA);

            const diskC=document.createElement("div");
            diskC.classList.add("disk1");
            diskC.style.width= `calc(3.66rem + ${n -i*1.5}rem)`;
            disksC.push(diskC);
        }
    
        for(let i=n-1; i>=0;i--){
            rods["A"].appendChild(disksA[i]);
         rods["C"].appendChild(disksC[i]);
        }
    
        extendedHanoi(n ,"A" ,"B" ,"C","D");
    }else{
        window.alert("The numbers of disks should be lower!!!")
        init();
    }    
}
init();

function moveDisk(A ,C){
    const fromEl =rods[A];
    const toEl =rods[C];
    const disk =fromEl.firstChild;
    toEl.insertBefore(disk ,toEl.firstChild);
}

let t=1000;
with_click.addEventListener("click",()=>{
    
    finish.addEventListener("click", () => {
        t=1;
        start.click();
    })
    if(moves.length==0){
        window.alert("It's done!");
        return;
    }
    const [from,to] =moves.shift();
    moveDisk(from,to);
})
reset.addEventListener("click",() => {
    window.location.reload();
})
start.addEventListener("click" ,() =>{

    start.disabled =true;
    stop.addEventListener("click", () => {
        start.disabled = false;
        clearInterval(set);
    })
    finish.addEventListener("click", () => {
        start.disabled =false;
        clearInterval(set);
        t=1;
        start.click();
    })
    
    const set =setInterval(() =>{
        if(moves.length ===0){
            return;
        }
        const [from ,to] = moves.shift();
        moveDisk(from ,to); 
    } , t);
});