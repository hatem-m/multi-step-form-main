let numbers = document.querySelectorAll(".number");
let docs = document.querySelectorAll(".doc");
let input = document.querySelectorAll(".doc-1 form input");
    input[0].value = "" ;
    input[1].value = "" ;
    input[2].value = "";
let options = document.querySelectorAll(".bill-options .option");
let optionstext = document.querySelectorAll(".window .form .doc .bill-options .option p:nth-of-type(2)");
let optionstextb = document.querySelectorAll(".window .form .doc .bill-options .option p:nth-of-type(3)");
let addOptions = document.querySelectorAll(".add-one .add-option");
let totalFinish = document.querySelector(".total-finish");
let totalPriceFinish = document.querySelector(".total-finish-price");
let changePlan = document.querySelector(".change-plan");
// ...
var numindex = 0;
var docindex = 0;
console.log(document.querySelector(".doc-1 p:nth-child(2)"))
let nextStep = document.querySelector(".btn-next");
let backStep = document.querySelector(".btn-back");
backStep.style.display = "none";
let mySwitch = document.querySelector(".my-switch");
let yearly = true;
let infoArray = [];
let planArray = [" (yearly)"];
let addArray = [];
let addArrayPrice = [];
let totalPrice = 0;
// ......
mySwitch.addEventListener("click",function(event){
    if(yearly){
        yearly = false;
        mySwitch.firstElementChild.classList.add("right");
        // console.log(yearly)
        optionstext[0].textContent = "9$/mo";
        optionstext[1].textContent = "12$/mo";
        optionstext[2].textContent = "15$/mo";
        addOptions[0].children[1].textContent = "+1 $ / mo";
        addOptions[1].children[1].textContent = "+2 $ / mo";
        addOptions[2].children[1].textContent = "+2 $ / mo";
        
        optionstextb.forEach(function(e){e.textContent = ""})
        planArray[0] = " (Monthly)";
    }
    else{
        yearly = true;
        mySwitch.firstElementChild.classList.remove("right");
        optionstext[0].textContent = "90$/yr";
        optionstext[1].textContent = "120$/yr";
        optionstext[2].textContent = "150$/yr";
        addOptions[0].children[1].textContent = "+10 $ / ye";
        addOptions[1].children[1].textContent = "+20 $ / ye";
        addOptions[2].children[1].textContent = "+20 $ / ye";
        optionstextb.forEach(function(e){e.textContent = "2 month free"});
        planArray[0] = " (Yearly)";
    }
})
document.addEventListener("click",function(e){
    if(e.target.classList.contains("option") || e.target.parentElement.classList.contains("option")){
        options.forEach(function(element){element.classList.remove("active")})
        e.target.classList.add("active")
        e.target.parentElement.classList.add("active")
    }
    if(e.target.classList.contains("add-option") || e.target.parentElement.classList.contains("add-option") || e.target.parentElement.parentElement.parentElement.classList.contains("add-option")){
        // console.log("00000")
        // addOptions.forEach(function(element){element.classList.remove("active")})
        e.target.classList.contains("add-option") ? e.target.classList.toggle("active") : true;
        e.target.parentElement.classList.contains("add-option") ? e.target.parentElement.classList.toggle("active") : true;
        e.target.parentElement.parentElement.parentElement.classList.contains("add-option") ? e.target.parentElement.parentElement.parentElement.classList.toggle("active") : true;
    }
})
// ...............

nextStep.addEventListener("click",function(event){
    // console.log("next")
    if(numindex == 3){
        numindex = 3;
        docindex = 4;
        document.querySelector(".thank-you").textContent = `Thank You ${infoArray[0]}!`
    }
    else if (numindex == 0){
            if(input[0].value != "" && input[1].value != "" && input[2].value != ""){
                numindex++;
                docindex++;
                infoArray[0] = input[0].value;
                infoArray[1] = input[1].value;
                infoArray[2] = input[2].value;
                backStep.style.display = "block";
            }
            else {
                numindex = 0;
                docindex = 0;
                document.querySelector(".doc-1 p:nth-child(2)").style.color = "red";
            }
        }
    else if (numindex == 1){
            options.forEach(function(e){
                if(e.classList.contains("active")){
                    planArray[1] = e.children[1].textContent;
                    planArray[2] = e.children[2].textContent;
                    numindex++;
                    docindex++;
                }
            })
        }
    else if (numindex == 2){
            addOptions.forEach(function(e){
                if(e.classList.contains("active")){
                    addArray.push(e.children[0].children[1].children[0].textContent);
                    addArrayPrice.push(e.lastElementChild.textContent);
                    
                }
                numindex = 3;
                docindex = 3;
                nextStep.textContent = "confirm";
            })
        }
    else{
        numindex++;
        docindex++;
    }
    if(docindex == 4){
        nextStep.style.display = "none";
        backStep.style.display = "none";
    }
    numbers.forEach(function(e){
        e.classList.remove("active");
        // console.log(e)
    })
    docs.forEach(function(e){
        e.classList.remove("active");

    })
    numbers[numindex].classList.add("active");
    docs[docindex].classList.add("active");
    if(numindex == 3){
        totalPrice = 0;
        document.querySelector(".finish-plan").textContent = planArray[1] + planArray[0];
        document.querySelector(".finish-plan-price").textContent = planArray[2];
        totalPrice = totalPrice + parseInt(planArray[2]);
        for(let i = 0; i < addArray.length; i++){
            let div = document.createElement("div");
            div.classList.add("d-flex", "justify-content-between", "align-items-center" ,"bg-light" ,"p-1","doc-4-created-child")
            let pDis = document.createElement("p");
            pDis.classList.add("m-0" ,"text-dark");
            pDis.textContent = addArray[i];
            let pPri = document.createElement("p");
            pPri.classList.add("m-0");
            pPri.textContent = addArrayPrice[i];
            totalPrice = totalPrice + parseInt(addArrayPrice[i]);
            div.appendChild(pDis);
            div.appendChild(pPri);
            totalFinish.before(div);
            
        }
        totalPriceFinish.textContent = `+${totalPrice}$ / ${planArray[0].slice(2,4)}`;
    }
})

backStep.addEventListener("click",function(e){
    numbers.forEach(function(e){
        e.classList.remove("active");
    })
    docs.forEach(function(e){
        e.classList.remove("active");
    })
    document.querySelectorAll(".doc-4-created-child").forEach(function(e){
        e.remove();
})
    addArray = [];
    addArrayPrice = [];
    totalPrice = 0;
    numindex = numindex - 1;
    docindex = docindex - 1;
    numbers[numindex].classList.add("active");
    docs[docindex].classList.add("active");
    nextStep.textContent = "next step";
    if(numindex == 0){
        backStep.style.display = "none";
    }
})

// .........  

changePlan.addEventListener("click",function(e){
    numbers.forEach(function(e){
        e.classList.remove("active");
    })
    docs.forEach(function(e){
        e.classList.remove("active");
    })

    document.querySelectorAll(".doc-4-created-child").forEach(function(e){
        e.remove();
})
    yearly = true;
    planArray = [" (yearly)"];
    addArray = [];
    addArrayPrice = [];
    totalPrice = 0;
    numindex = 1;
    docindex = 1;
    numbers[numindex].classList.add("active");
    docs[docindex].classList.add("active");
    nextStep.textContent = "next step";
})
