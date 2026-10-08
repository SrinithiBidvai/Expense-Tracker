let meals=0,snacks=0,necc=0,misc=0,life=0;
let expenses=[];
let amount=[];
let category=[];

// Load the transactions saved in this browser.
let savedExpenses=localStorage.getItem("budgetExpenses");
if(savedExpenses!=null){
    let saved=JSON.parse(savedExpenses);
    expenses=saved.expenses;
    amount=saved.amount;
    category=saved.category;
}
showTotals();

function addExpense(){
    let selectedCategory=document.getElementById("expenseCategory").value;
    const expenseName=document.getElementById("Expense-name").value.trim();
    const amountSpent=document.getElementById("Amount-spent").value.trim();
    if(expenseName=="" || amountSpent==""){
        alert("Please fill all the fields");
        return;
    }
    if(!isFinite(Number(amountSpent)) || Number(amountSpent)<=0){
        alert("Please enter an amount greater than zero");
        return;
    }
    if (selectedCategory === "") {
        selectedCategory = "Miscallaneous";
    }
    if(selectedCategory=="Meals"){
        category.push("meals");
    }
    else if(selectedCategory=="Snacks"){
        category.push("snacks");    
    }
    else if(selectedCategory=="Necessities"){
        category.push("necc");
    }
    else if(selectedCategory=="Miscallaneous"){
        category.push("misc");
    }
    else if(selectedCategory=="Lifestyle"){
        category.push("life");
    }
    expenses.push(expenseName);
    amount.push(Number(amountSpent));
    localStorage.setItem("budgetExpenses",JSON.stringify({expenses:expenses,amount:amount,category:category}));
    showTotals();
    document.getElementById("expenseCategory").value="";
    document.getElementById("Expense-name").value="";
    document.getElementById("Amount-spent").value="";
}
function createElement(expenseName,amountSpent,category){
    const expense=document.createElement("div");
    expense.className="expense";
    const name=document.createElement("p");
    name.textContent=expenseName;
    expense.appendChild(name);
    const categoryElement=document.createElement("p");
    if(category=="meals"){
        categoryElement.textContent="Meals";
    }
    else if(category=="snacks"){
        categoryElement.textContent="Snacks";
    }
    else if(category=="necc"){
        categoryElement.textContent="Necessities";
    }
    else if(category=="misc"){
        categoryElement.textContent="Miscallaneous";
    }
    else if(category=="life"){
        categoryElement.textContent="Lifestyle";
    }
    //expense.appendChild(categoryElement);
    const amountElement=document.createElement("p");
    amountElement.textContent=amountSpent.toFixed(2);
    expense.appendChild(amountElement);
    document.querySelector("#historyExpense").appendChild(expense);
}
function showTotals(){
    meals=0;
    snacks=0;
    necc=0;
    misc=0;
    life=0;
    for(let i=0;i<expenses.length;i++){
        if(category[i]=="meals"){
            meals+=amount[i];
        }
        else if(category[i]=="snacks"){
            snacks+=amount[i];
        }
        else if(category[i]=="necc"){
            necc+=amount[i];
        }
        else if(category[i]=="misc"){
            misc+=amount[i];
        }
        else if(category[i]=="life"){
            life+=amount[i];
        }
    }
    document.getElementById("mealsTotal").textContent=meals.toFixed(2);
    document.getElementById("snacksTotal").textContent=snacks.toFixed(2);
    document.getElementById("neccTotal").textContent=necc.toFixed(2);
    document.getElementById("miscTotal").textContent=misc.toFixed(2);
    document.getElementById("lifeTotal").textContent=life.toFixed(2);
}
function showExpenses(){
    let search=document.getElementById("searchExpense").value.trim().toLowerCase();
    let filter=document.getElementById("filterCategory").value;
    let sortBy=document.getElementById("sort-by").value;
    let sortedExpense=[];
    // Clear old rows before displaying the matching transactions.
    document.getElementById("historyExpense").textContent="";
    let count=0;
    for(let i=0;i<expenses.length;i++){
            let max=-1;
            for(let j=0;j<expenses.length;j++){
                if((max==-1 || amount[j]>amount[max]) && sortedExpense.includes(j)==false){
                    max=j;
                }
                
            }
            sortedExpense.push(max);
    }
    if(sortBy=="desc"){
        for(let i=0;i<expenses.length;i++){
            if((filter=="" || category[sortedExpense[i]]==filter) && expenses[sortedExpense[i]].toLowerCase().includes(search)){
                createElement(expenses[sortedExpense[i]],amount[sortedExpense[i]],category[sortedExpense[i]]);
                count++;
            }
        }
    }
    else if(sortBy=="asc"){
        for(let i=expenses.length-1;i>=0;i--){
            if((filter=="" || category[sortedExpense[i]]==filter) && expenses[sortedExpense[i]].toLowerCase().includes(search)){
                createElement(expenses[sortedExpense[i]],amount[sortedExpense[i]],category[sortedExpense[i]]);
                count++;
            }
        }
    }
    else{
        for(let i=0;i<expenses.length;i++){
            if((filter=="" || category[i]==filter) && expenses[i].toLowerCase().includes(search)){
                createElement(expenses[i],amount[i],category[i]);
                count++;
            }
        }
    }
    
    if(count==0){
        document.getElementById("historyExpense").textContent="No transactions found.";
    }
}
function goBack(){
    document.getElementById("enterDetails").style.display="block";
    document.getElementById("goBack").style.display="none";
    document.getElementById("historySection").style.display="none";
}
function viewHistory(){
    document.getElementById("enterDetails").style.display="none";
    document.getElementById("goBack").style.display="block";
    document.getElementById("historySection").style.display="block";
    document.getElementById("searchExpense").value="";
    document.getElementById("filterCategory").value="";
    showExpenses();
}
function toggleColorMode(){
    document.body.classList.toggle("darkMode");

    if(document.body.classList.contains("darkMode")){
        document.getElementById("colorMode").innerHTML=
            '<i class="fa-solid fa-toggle-on"></i>';
    }
    else{
        document.getElementById("colorMode").innerHTML=
            '<i class="fa-solid fa-toggle-off"></i>';
    }
}