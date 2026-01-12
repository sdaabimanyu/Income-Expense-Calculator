# Income Expense Calculator

A simple and responsive **Income Expense Calculator** built using **HTML, Tailwind CSS, and JavaScript**.  
This application allows users to track their income and expenses, edit or delete transactions, filter records, and persist data using **localStorage**.

---

## 🚀 Features

- ➕ Add income and expense transactions  
- ✏️ Edit existing transactions  
- 🗑️ Delete transactions  
- 🔍 Filter by **All / Income / Expense**  
- 💾 Data persistence using **localStorage**  
- 📊 Automatic calculation of:
  - Total Income
  - Total Expense
  - Net Balance  
- ⌨️ Keyboard support (Enter key to add)
- 📱 Fully responsive UI
- 🎨 Modern UI built with Tailwind CSS

---

## 🛠️ Technologies Used

- **HTML5**
- **Tailwind CSS**
- **JavaScript (Vanilla JS)**
- **Font Awesome** (icons)
- **localStorage API**

---

## 📂 Project Structure

├── index.html
├── script.js
└── README.md


---

## ▶️ How to Run the Project

1. Clone or download the repository  
2. Open `index.html` in your browser  
3. Start adding income and expense entries  

No additional setup required.

---

## 💡 How It Works

- Transactions are stored as objects in an array
- The array is saved to `localStorage` after every add, edit, or delete
- On page load, data is restored from `localStorage`
- Totals are recalculated dynamically

---

## 📸 Preview

A clean dashboard-style UI with summary cards, filters, and editable transaction list.

---

## 📌 Future Improvements

- 📊 Add charts (Income vs Expense)
- 🌙 Dark mode
- 🔍 Search transactions
- 🧾 Export data (CSV)
- ⚛️ Convert to React

---

## 🧑‍💻 Author

Built as a learning project to practice:
- DOM manipulation
- CRUD operations
- UI/UX design
- Data persistence.
