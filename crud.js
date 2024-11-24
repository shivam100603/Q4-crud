// Get DOM elements
const groceryInput = document.getElementById('groceryInput');
const addBtn = document.getElementById('addBtn');
const groceryList = document.getElementById('groceryList');

// Grocery items array
let groceryItems = [];

// Add grocery item
addBtn.addEventListener('click', () => {
  const itemName = groceryInput.value.trim();
  if (itemName) {
    addGroceryItem(itemName);
    groceryInput.value = ''; // Clear input after adding
  }
});

// Function to add grocery item
function addGroceryItem(itemName) {
  const newItem = {
    id: Date.now(),
    name: itemName,
  };
  groceryItems.push(newItem);
  renderGroceryList();
}

// Render grocery items
function renderGroceryList() {
  groceryList.innerHTML = ''; // Clear the list
  groceryItems.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.name}</span>
      <div class="actions">
        <button onclick="editItem(${item.id})">Edit</button>
        <button onclick="deleteItem(${item.id})">Delete</button>
      </div>
    `;
    groceryList.appendChild(li);
  });
}

// Delete grocery item
function deleteItem(itemId) {
  groceryItems = groceryItems.filter(item => item.id !== itemId);
  renderGroceryList();
}

// Edit grocery item
function editItem(itemId) {
  const itemIndex = groceryItems.findIndex(item => item.id === itemId);
  const item = groceryItems[itemIndex];

  const li = groceryList.children[itemIndex];
  const span = li.querySelector('span');
  span.innerHTML = `<input type="text" value="${item.name}">`;
  li.classList.add('editing');

  const input = li.querySelector('input');
  input.focus();

  // Save the updated item on pressing Enter
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      groceryItems[itemIndex].name = input.value.trim();
      li.classList.remove('editing');
      renderGroceryList();
    }
  });
}
