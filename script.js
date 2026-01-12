const STORAGE_KEY = "incomeExpenseData";

function saveToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function loadFromLocalStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

const totalIncome = document.getElementById('totalIncome');
const totalExpense = document.getElementById('totalExpense');
const netBalance = document.getElementById('netBalance');

const inputDescription = document.getElementById('description');
const inputAmount = document.getElementById('amount');
const types = document.getElementById('type');

const cardContainer = document.getElementById('cards');
const radioBtnsFilters = document.querySelectorAll('input[name="filter"]');
const resetBtn = document.getElementById('resetBtn');
const addBtn = document.getElementById('addBtn');

let transactions = loadFromLocalStorage();
let incomeTotal = 0;
let expenseTotal = 0;


addBtn.addEventListener('click', addTransaction);

document.addEventListener('keydown', e => {
    if (e.key === 'Enter') addTransaction();
});

function addTransaction() {
    const desc = inputDescription.value.trim();
    const amt = Number(inputAmount.value);
    const type = types.value;

    if (!desc || !amt || !type || amt <= 0) return;

    const transaction = { description: desc, amount: amt, type };
    transactions.push(transaction);
    saveToLocalStorage();

    createCard(desc, amt, type);

    type === "Income" ? (incomeTotal += amt) : (expenseTotal += amt);
    updateTotals();
    resetInputs();
}


function resetInputs() {
    inputDescription.value = '';
    inputAmount.value = '';
    types.value = '';
    inputDescription.focus();
}


resetBtn.addEventListener('click', resetInputs);


function updateTotals() {
    totalIncome.innerText = incomeTotal;
    totalExpense.innerText = expenseTotal;
    netBalance.innerText = incomeTotal - expenseTotal;
}


function createCard(descText, amountText, typeText) {
    const card = document.createElement('div');
    card.className =
        'bg-white p-4 rounded-xl shadow flex justify-between items-center';

    card.dataset.description = descText;
    card.dataset.amount = amountText;
    card.dataset.type = typeText;

    const left = document.createElement('div');
    left.className = 'flex items-center gap-3';

    const bar = document.createElement('span');
    bar.className =
        typeText === 'Income'
            ? 'w-2 h-10 bg-green-500 rounded-full'
            : 'w-2 h-10 bg-red-500 rounded-full';

    const textWrap = document.createElement('div');

    const desc = document.createElement('p');
    desc.className = 'font-semibold';
    desc.innerText = descText;

    const type = document.createElement('p');
    type.className = 'text-sm text-gray-500';
    type.innerText = typeText;

    textWrap.append(desc, type);
    left.append(bar, textWrap);

    const right = document.createElement('div');
    right.className = 'flex items-center gap-4';

    const amount = document.createElement('p');
    amount.className =
        typeText === 'Income'
            ? 'font-bold text-green-600'
            : 'font-bold text-red-500';
    amount.innerText = `₹${amountText}`;

    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    editBtn.className = 'text-blue-500';

    const delBtn = document.createElement('button');
    delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    delBtn.className = 'text-red-500';

    editBtn.onclick = () =>
        enterEditMode(card, desc, amount, type, right);

    delBtn.onclick = () => deleteCard(card);

    right.append(amount, editBtn, delBtn);
    card.append(left, right);
    cardContainer.appendChild(card);
}

function deleteCard(card) {
    const amt = Number(card.dataset.amount);
    const type = card.dataset.type;
    const desc = card.dataset.description;

    transactions = transactions.filter(
        t => !(t.description === desc && t.amount === amt && t.type === type)
    );

    saveToLocalStorage();

    type === "Income" ? (incomeTotal -= amt) : (expenseTotal -= amt);
    updateTotals();
    card.remove();
}



radioBtnsFilters.forEach(radio => {
    radio.addEventListener('change', () => {
        [...cardContainer.children].forEach(card => {
            card.style.display =
                radio.value === 'all' || radio.value === card.dataset.type
                    ? 'flex'
                    : 'none';
        });
    });
});


function enterEditMode(card, descEl, amtEl, typeEl, right) {
    const oldDesc = card.dataset.description;
    const oldAmt = Number(card.dataset.amount);
    const oldType = card.dataset.type;

    const descInput = document.createElement('input');
    descInput.value = oldDesc;
    descInput.className = 'border rounded p-1 text-sm';

    const amtInput = document.createElement('input');
    amtInput.type = 'number';
    amtInput.value = oldAmt;
    amtInput.className = 'border rounded p-1 text-sm w-24';

    const typeSelect = document.createElement('select');
    typeSelect.innerHTML = `
    <option value="Income">Income</option>
    <option value="Expense">Expense</option>
  `;
    typeSelect.value = oldType;
    typeSelect.className = 'border rounded p-1 text-sm';

    
    descEl.replaceWith(descInput);
    typeEl.replaceWith(typeSelect);

    
    right.innerHTML = '';

    const saveBtn = document.createElement('button');
    saveBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    saveBtn.className = 'text-green-500';

    const cancelBtn = document.createElement('button');
    cancelBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    cancelBtn.className = 'text-gray-400';

    
    right.append(amtInput, saveBtn, cancelBtn);

    saveBtn.onclick = () => {
        const newDesc = descInput.value.trim();
        const newAmt = Number(amtInput.value);
        const newType = typeSelect.value;

        if (!newDesc || newAmt <= 0) return;

        oldType === 'Income'
            ? (incomeTotal -= oldAmt)
            : (expenseTotal -= oldAmt);

        newType === 'Income'
            ? (incomeTotal += newAmt)
            : (expenseTotal += newAmt);

        updateTotals();

        const index = transactions.findIndex(
            t =>
                t.description === oldDesc &&
                t.amount === oldAmt &&
                t.type === oldType
        );

        if (index !== -1) {
            transactions[index] = {
                description: newDesc,
                amount: newAmt,
                type: newType
            };
        }

        saveToLocalStorage();


        card.dataset.description = newDesc;
        card.dataset.amount = newAmt;
        card.dataset.type = newType;

        descEl.innerText = newDesc;
        amtEl.innerText = `₹${newAmt}`;
        typeEl.innerText = newType;

        descInput.replaceWith(descEl);
        typeSelect.replaceWith(typeEl);

        right.innerHTML = '';
        right.append(
            amtEl,
            createEditBtn(card, descEl, amtEl, typeEl),
            createDeleteBtn(card)
        );
    };

    cancelBtn.onclick = () => {
        descInput.replaceWith(descEl);
        typeSelect.replaceWith(typeEl);

        right.innerHTML = '';
        right.append(
            amtEl,
            createEditBtn(card, descEl, amtEl, typeEl),
            createDeleteBtn(card)
        );
    };
}


function createEditBtn(card, d, a, t) {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    btn.className = 'text-blue-500';
    btn.onclick = () => enterEditMode(card, d, a, t, card.lastChild);
    return btn;
}

function createDeleteBtn(card) {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    btn.className = 'text-red-500';
    btn.onclick = () => deleteCard(card);
    return btn;
}


window.addEventListener("DOMContentLoaded", () => {
    transactions.forEach(txn => {
        createCard(txn.description, txn.amount, txn.type);

        if (txn.type === "Income") incomeTotal += txn.amount;
        else expenseTotal += txn.amount;
    });

    updateTotals();
});
