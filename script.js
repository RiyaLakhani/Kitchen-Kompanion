function openTab(evt, tabName) { // adapted from https://www.w3schools.com/howto/howto_js_tabs.asp
  // evt = click event

  var i, tabcontent, tablinks; // classes and counter

  // grab all of the tabs
  tabcontent = document.getElementsByClassName("tabcontent");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none"; // they're all getting hidden
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function displayForm() {
  const radioButton = document.querySelector('input[name="selection1"]:checked');
  const dropdown = document.getElementById("selection2");

  if (!radioButton || !dropdown.value) {
    document.getElementById("selections").textContent = "Please select a camera mode and camera quality.";
  } else {
    const text = `Camera mode: ${radioButton.value}` + "<br>" + `Camera quality: ${dropdown.value}`;
    document.getElementById("selections").innerHTML = text
  }

}



function addFridgeItem() {

  var form = document.getElementById("fridge-input");
  var item = form.elements["itemName"].value;
  var date = form.elements["exp-date"].value;
  const fridgeList = document.getElementById("my-fridge-list");
  const expList = document.getElementById("my-fridge-expiring-list");
  // var obj = { 'item': item, 'exp-date': date };

  // localStorage.setItem(item, JSON.stringify(obj)); // is this prone to bugs?
  // var retrievedObject = localStorage.getItem(item);

  const li = document.createElement("li");
  li.textContent = `${item} -- Expires ${date}`;


  li.addEventListener("click", () => {
    li.remove();
  });

  // If it is under three days until expiration, we move it to exp lsit
  const daysLeft = (new Date(date) - new Date()) / (1000 * 60 * 60 * 24);

  if (daysLeft < 3) {
    expList.appendChild(li);
  } else {
    fridgeList.appendChild(li)
  }


  form.reset()
}

function Inventory() { // w help from https://www.w3schools.com/howto/howto_css_modals.asp 
  const list = document.getElementById("inventoryList");

  // manual add stuff
  const addBtn = document.getElementById("addInventoryBtn");
  const input = document.getElementById("invenName");
  const qtyInput = document.getElementById("inventQty");
  const cat = document.getElementById("invenCat");
  const exp = document.getElementById("invenExp");

  addBtn.addEventListener("click", () => addItem(input.value, qtyInput.value, cat.value, String(exp.value)));

  // modal stuff
  var modal = document.getElementById("myModal");
  var btn = document.getElementById("myBtn");
  var span = document.getElementsByClassName("close")[0];


  // When the user clicks on the button, open the modal
  btn.onclick = function () {
    modal.style.display = "flex";
  }
  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  const seedItems = [
    { name: "Sriracha", qty: "1 bottle", cat: "Pantry", expiration: "2026-08-09" },
    { name: "Broccoli", qty: "1 head", cat: "Produce", expiration: "2026-04-07" },
    { name: "Chicken breast", qty: "2 lbs", cat: "Protein", expiration: "2026-04-07" },
    { name: "Ground turkey", qty: "1 lb", cat: "Protein", expiration: "2026-07-07" },
    { name: "Spinach", qty: "1 bag", cat: "Produce", expiration: "2026-04-07" },
    { name: "Apples", qty: "6", cat: "Produce", expiration: "2026-04-07" },
    { name: "Broccoli", qty: "1 head", cat: "Produce", expiration: "2026-08-07" },
    { name: "Bananas", qty: "1 bunch", cat: "Produce", expiration: "2026-05-07" },
    { name: "Rice", qty: "2 lbs", cat: "Pantry", expiration: "2026-04-07" },
    { name: "Pasta", qty: "1 box", cat: "Pantry", expiration: "2026-06-07" },
    { name: "Olive oil", qty: "1 btl", cat: "Pantry", expiration: "2026-04-07" },
  ];

  function expiringSoon(expiration) {
    let diff = (new Date(expiration) - new Date()) / (1000 * 24 * 60 * 60)
    return diff <= 3 && diff >= 0
  }

  function addItem(name, qty, cat, expiration) {
    if (!name.trim()) return;
    const li = document.createElement("li");
    li.className = "shop-item"; // do i need to change this?
    li.dataset.cat = cat;
    li.dataset.expiration = expiration
    let expirationTag = expiringSoon(expiration) ? `<span class="exp-tag">Expiring Soon</span>` : ""


    li.innerHTML = `<span ></span>
      <span class="shop-item-name">${name.trim()}</span>
      <span class="shop-item-qty">${qty.trim()}</span>
      <span class="shop-item-cat">${cat}</span>
      ${expirationTag} `;

    list.appendChild(li);
  }

  seedItems.forEach(i => addItem(i.name, i.qty, i.cat, i.expiration));

  document.querySelectorAll(".shop-filter").forEach(btn => { // set up selection even listeners
    btn.addEventListener("click", () => {
      document.querySelectorAll(".shop-filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.cat;
      list.querySelectorAll(".shop-item").forEach(item => {
        if (cat === "all") {
          item.style.display = "";
        } else if (cat === "expiring") {
          item.style.display = expiringSoon(item.dataset.expiration) ? "" : "none";
        } else {
          item.style.display = item.dataset.cat === cat ? "" : "none";
        }
      });
    });
  });
}


function ShoppingList() {
  const input = document.getElementById("shopInput");
  const qtyInput = document.getElementById("shopQty");
  const catSel = document.getElementById("shopCat");
  const addBtn = document.getElementById("addShopBtn");
  const list = document.getElementById("shopList");
  const clearBtn = document.getElementById("clearShop");
  const countEl = document.getElementById("shopCount");

  const seedItems = [
    { name: "Milk", qty: "1 gal", cat: "Dairy" },
    { name: "Eggs", qty: "1 doz", cat: "Dairy" },
    { name: "Yogurt", qty: "2", cat: "Dairy" },
    { name: "Chicken breast", qty: "2 lbs", cat: "Protein" },
    { name: "Ground turkey", qty: "1 lb", cat: "Protein" },
    { name: "Spinach", qty: "1 bag", cat: "Produce" },
    { name: "Apples", qty: "6", cat: "Produce" },
    { name: "Broccoli", qty: "1 head", cat: "Produce" },
    { name: "Bananas", qty: "1 bunch", cat: "Produce" },
    { name: "Rice", qty: "2 lbs", cat: "Pantry" },
    { name: "Pasta", qty: "1 box", cat: "Pantry" },
    { name: "Olive oil", qty: "1 btl", cat: "Pantry" },
  ];

  function updateCount() {
    const all = list.querySelectorAll(".shop-item");
    const checked = list.querySelectorAll(".shop-item.checked");
    countEl.textContent = `${all.length - checked.length} of ${all.length} remaining`;
  }

  function addItem(name, qty, cat) {
    if (!name.trim()) return;
    const li = document.createElement("li");
    li.className = "shop-item";
    li.dataset.cat = cat;
    li.innerHTML = `<span class="shop-checkbox"></span>
      <span class="shop-item-name">${name.trim()}</span>
      <span class="shop-item-qty">${qty.trim()}</span>
      <span class="shop-item-cat">${cat}</span>`;
    li.addEventListener("click", () => {
      li.classList.toggle("checked");
      li.querySelector(".shop-checkbox").textContent = li.classList.contains("checked") ? "✓" : "";
      updateCount();
    });
    list.appendChild(li);
    input.value = "";
    qtyInput.value = "";
    input.focus();
    updateCount();
  }

  seedItems.forEach(i => addItem(i.name, i.qty, i.cat));

  addBtn.addEventListener("click", () => addItem(input.value, qtyInput.value, catSel.value));
  input.addEventListener("keydown", e => { if (e.key === "Enter") addItem(input.value, qtyInput.value, catSel.value); });
  clearBtn.addEventListener("click", () => {
    list.querySelectorAll(".shop-item.checked").forEach(li => li.remove());
    updateCount();
  });

  document.querySelectorAll(".shop-filter").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".shop-filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.cat;
      list.querySelectorAll(".shop-item").forEach(item => {
        item.style.display = (cat === "all" || item.dataset.cat === cat) ? "" : "none";
      });
      updateCount();
    });
  });
}

document.addEventListener("DOMContentLoaded", ShoppingList);
document.addEventListener("DOMContentLoaded", Inventory);