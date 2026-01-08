const totalIncome = document.getElementById('totalIncome');
const totalExpense = document.getElementById('totalExpense');
const netBalance = document.getElementById('netBalance');
const inputDescription = document.getElementById('description');
const inputAmount = document.getElementById('amount');
const cardContainer = document.getElementById('cards');
const types = document.getElementById('type');
const radiaBtnsFliters  = document.querySelectorAll('input[name = "filter"]');

let incomeTotal = 0;
let expenseTotal = 0;

radiaBtnsFliters.forEach(radio => {
    radio.addEventListener('change', function () {
        filterCards(this.value);
    })
})


inputAmount.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const des = (inputDescription.value.trim());
        const amt = Number(inputAmount.value.trim());
        const typ = types.value.trim();

        if (des === '' || amt === '' || typ === '') return;
        if (isNaN(amt) || amt <= 0) {
            alert("Please enter a valid number");
            return;
        }

        createCard(des, amt, typ);


        if (typ === 'Income') {
            incomeTotal += amt;
            totalIncome.innerText = incomeTotal;
        } else if (typ === 'Expense') {
            expenseTotal += amt;
            totalExpense.innerText = expenseTotal;
        }

        netBalance.innerText = incomeTotal - expenseTotal;

        inputDescription.value = '';
        inputAmount.value = '';
        types.value = '';

    }
})



function createCard(descritionTxt, amountTxt, typetxt) {
    const card = document.createElement('div');
    card.setAttribute('class', "w-[300px] h-[30px] bg-black flex justify-between items-center p-3 box-border rounded");

    card.dataset.amount = amountTxt;
    card.dataset.type = typetxt;

    const description = document.createElement('p');
    description.setAttribute('class', "text-white");
    description.innerText = descritionTxt;

    const amount = document.createElement('p');
    amount.setAttribute('class', "text-white");
    amount.innerText = amountTxt;

    const type = document.createElement('p');
    type.setAttribute('class', "text-white");
    type.innerText = typetxt;

    const delBtn = document.createElement('button');
    delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    delBtn.className = "text-red-500 font-bold";

    delBtn.addEventListener('click', function (e) {
        const amt = Number(card.dataset.amount);
        const typ = card.dataset.type;

        if(typ === 'Income') {
            incomeTotal -= amt;
            totalIncome.innerText = incomeTotal;
        } else if(typ === 'Expense') {
            expenseTotal -= amt;
            totalExpense.innerText = expenseTotal;
        }

        netBalance.innerText = incomeTotal - expenseTotal;
        card.remove();
    });


    card.appendChild(description);
    card.appendChild(amount);
    card.appendChild(type);
    card.appendChild(delBtn);

    cardContainer.appendChild(card);


}

function filterCards(filterType) {
    const cards = cardContainer.children;

    Array.from(cards).forEach(card => {
        const cardType = card.dataset.type;

        if(filterType === "all") {
            card.style.display = 'flex';
        } else if (filterType === cardType) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }


    })
}