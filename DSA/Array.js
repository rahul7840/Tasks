/*******************************************************************************
                         BASIC AARAY IN DATASTRUCTURE
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


//7) murging two array  without using 

        // methode 1
            const aa1= [1,2,3,4,5,6,7,8,9,0]
            const aa2= [11,22,33,44,55,66,77,88,99,00]

            function murge(a){
            for(i=0;i<a.length;i++){
                a.push(...aa1)
                return a
            }
            }
            console.log(murge(aa2))

        // methode 2
            let a1= [1,2,3,4,5,6,7,8,9,0]
            let a2= [11,22,33,44,55,66,77,88,99,00]
            let array3= []

            for(i=0;i<a1.length;i++){
                array3[i]=a1[i]
            }
            for(i=0;i<a2.length;i++){
                array3[a1.length+i]=a2[i]
            }
            console.log(array3)

           //----------> sorting the array

            let numbers = [10, 5, 8, 2, 4];
            function sorting (arr){
                let nArr=arr.slice()  // here slice is ensuring that we dont Modifying original array 
                for(i=0;i<arr.length;i++){
                    for(j=i+1;j<arr.length;j++){
                        if(nArr[i]>nArr[j]){
                            // Swap elements
                            let temp = nArr[i]
                            nArr[i] = nArr[j]
                            nArr[j]= temp
                        }
                    }       
                }
               return nArr
            }
            console.log(sorting(numbers))

          //----------->murging two array using while loop

            let data1 = [5, 6, 11, 14, 20, 25, 29, 32, 36, 38, 45, 47]
            let data2 =  [4, 17, 24, 26, 34, 35, 39, 40, 43, 46, 49]
            let data3 =[]
            let d1=0;
            let d2=0;
            let d3=0
            while(d1 < data1.length && d2<data2.length){
                if(data1[d1] < data2[d2]){

                    data3[d3]=data1[d1]
                    d1++
                }else{
                    data3[d3]=data2[d2]
                    d2++
                }
                d3++
            }
          
            while(d1<data1.length){
                data3[d3]=data1[d1]
                d3++
                d1++
            }
            while(d2<data2.length){
                data3[d3]=data2[d2]
                d3++
                d2++
            }
            console.log(data3)
        


