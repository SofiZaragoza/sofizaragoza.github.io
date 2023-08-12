
const Expenselist = []; //Array para almacenar datos

const form = document.getElementById("incomeform");
const formExpense = document.getElementById("expenseForm");
const tablabody = document.getElementById("tablaexpense");
const finalbudget = document.getElementById("totalbudget");

class expense {
    constructor (naming,Expname,amount,type){
        this.Name = naming;
        this.Expname = Expname;
        this.Amount = amount;
        this.Etype = type;
    }
}

let campoIncome = 0; // Declare campoIncome at a higher scope

function submitIncome() {
    // Get the input value + pareafloat 
    campoIncome = parseFloat(document.getElementById("incomeinput").value);

    // valido los datos que sean nñumeros y mayores a cero con un if
    if(!isNaN(campoIncome) && campoIncome > 0){
        document.getElementById("incomeinput").textContent = campoIncome;// Display the income value on the page
        localStorage.setItem('income', JSON.stringify(campoIncome));// Store income in local storage
    }else{
        alert("Por favor, ingresa un número mayor a 0");
    }
}
    //agrego un addevent listener para validar el boton submit que viene del campo del form
    form.addEventListener("submit",(ev) =>{
        ev.preventDefault();
        submitIncome()
        const incomeinput = document.getElementById("incomeinput");
        incomeinput.style.color = "red";
    })
    

let sumadegastos = 0; 

function submitExpense() {
    let username = document.getElementById("userName").value;
    let expensename =  document.getElementById("expenseName").value;
    let expensetype = document.getElementById("expenseType").value;
    let expenseamount =  parseFloat(document.getElementById("expenseAmount").value);
    //valido que tena un mín de palabras, los numeros con una expresión regular  
    if(!/^[A-Za-z]{3,}$/.test(username) || isNaN(expenseamount)||expenseamount <= 0 ){//usamos una expresión regular para validar los datos
        alert("Hay campos erroneos en el formulario");
    }else{
        document.getElementById("userName").textContent = username;
        const newExpense = new expense(username,expensename,expenseamount,expensetype);
        Expenselist.push(newExpense);
        console.table(Expenselist);
        
        sumadegastos = Expenselist.reduce((total,expense) => total + expense.Amount,0)
        console.log("testing de gastos "+ sumadegastos);
        const totalExpenseElement = document.getElementById("totalexpensemonth");
        totalExpenseElement.textContent = `Total Expense:$ ${sumadegastos}`;
        localStorage.setItem('expenses', JSON.stringify(Expenselist)); // Store expenses in local storage con STRING

        
        tablaexpense.innerHTML +=`
        <tr>
            <td>${newExpense.Name}</td>
            <td>${newExpense.Expname}</td>
            <td>${newExpense.Etype}</td>
            <td>${newExpense.Amount}</td>
        </tr>
    `; 
    }
}
//fuera de la función valido el submit con un eventlistener para que funcione el boton
//Calculo el budget final tomando el total de gastos y restandolo al income

formExpense.addEventListener("submit",(ev) =>{
    ev.preventDefault();
    submitExpense() 

    const calculatebudget = (totalincome,totalbudget) => {return totalincome - totalbudget}
    const totalbudget = calculatebudget (campoIncome,sumadegastos);

    const totalbudgetelement = document.getElementById("totalbudget");
    totalbudgetelement.textContent = `Current Budget: ${totalbudget}`;

    console.log(totalbudget);
})

let finalizarBtn = document.getElementById('deleteData');

finalizarBtn.onclick = () => {
    document.getElementById("incomeinput").value = "";
    Expenselist.length = 0; // I cannot re-declare a const in the JS
    document.getElementById("tablaexpense").innerHTML = "";
    document.getElementById("totalexpensemonth").textContent = `Total Expense:$` + "";
    document.getElementById("totalbudget").textContent = `Current Budget:`+ "";
    localStorage.removeItem('income'); // Clear stored income
    localStorage.removeItem('expenses'); // Clear stored expenses
    
}

//me falta renderizar toda la tabla para cuando cerramos la pestaña y queremos recupaerar la data del storage
//me falta eliminar gastos que no quiera durante el mes > afterlass con el tacho de basura

// REVISAR LA CLASE ENTERA Y VER SI TIENE SENTIDO ESTO. TENGO QUE HACER UN GET CON JSON
function obtenerJsonPropio(){
    const URLJSON = "/months.json";
    fetch(URLJSON)
    .then( resp => resp.json())
    .then( data => console.log(data.past2023))
    
}
    obtenerJsonPropio();
    
        /*const mesesPasados = data.past2023;
        mesesPasados.forEach(mes => {
            document.getElementById("past2023").innerHTML += `
            <tr>
                <td>${past2023.month}</td>
                <td>${past2023.budget}</td>
            `;
        });
        })
        .catch((error) => console.log(error));*/
        
    /*inyeccion al dom
    console.log(data);
    const mesespasados = data.books; //esto es un array
    console.log(listaLibros);
    listaLibros.forEach(libro => {
        document.getElementById('libros').innerHTML += `
            <tr>
                <td>${libro.title}</td>
                <td>
                    <img src=${libro.image}>
                </td>
            </tr>
        `;
    }); 
/*})
.catch((error) => console.log(error));
}

obtenerJsonPropio();*/