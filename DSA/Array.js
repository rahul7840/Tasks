/*******************************************************************************
                            AARAY IN DATASTRUCTURE
*********************************************************************************/


//2)
 //Sum whole array
    var a=[11,22,33,44,55,66]

    function avrage (aa){
        var sum = aa.reduce((pre,curr)=>
        pre+curr
        )
        var avr =sum/aa.length
        return avr
    }

    console.log(avrage(a)+ '->' +a.length)

//3)
  //list all array elemet without map
   let data= [11,22,33,44,55,66,87,88,99]
   
   const map =data.map((o)=>o-100)
   console.log(map)

   function print(aa){
    const a=[]
    for(i=0;i<=5;i++){
        var dd=aa[i]
        a.push(dd)
    }
    console.log("new array-->",a)
   }
   console.log(print(data))

//4)
  //insertion in totel empty array
    let arrayy =[]
    let getData =prompt("give me numbet that u want to insert")
    if(getData!==null){
        arrayy.push(Number(getData))
        console.log(arrayy)
    }else{
        alert("cant add this to array")
    }

//5)
  //insert at specific index or possition
    let array5=[88,55,65,44,12,5,44,74]
    let element = 100;
    let posit=4;

    for(i=array5.length;i>=0;i--){

        console.log(array5[i])

        if(i>=posit){

            array5[i+1]=array5[i]  // till this point your array contain one element multiple time

            if(i==posit){

                array5[i]=element  // now which multiple time aapear element replace with newElement
            }
        }
    }
    console.log(array5)

// 6)
// remove element from ARRAY also we can use splice()
let data = [11,22,33,44,55,66]
let position=2;
for(i=position;i<data.length-1;i++){
    data[i]=data[i+1]
}
data.length=data.length-1
console.log(data)




