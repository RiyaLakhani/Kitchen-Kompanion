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
    { name: "Sriracha", qty: "1 bottle", cat: "Pantry", expiration: "2026-04-09" },
    { name: "Broccoli", qty: "1 head", cat: "Produce", expiration: "2026-04-11" },
    { name: "Chicken breast", qty: "2 lbs", cat: "Protein", expiration: "2026-04-4" },
    { name: "Ground turkey", qty: "1 lb", cat: "Protein", expiration: "2026-04-010" },
    { name: "Spinach", qty: "1 bag", cat: "Produce", expiration: "2026-04-07" },
    { name: "Apples", qty: "6", cat: "Produce", expiration: "2026-04-07" },
    { name: "Broccoli", qty: "1 head", cat: "Produce", expiration: "2026-08-07" },
    { name: "Bananas", qty: "1 bunch", cat: "Produce", expiration: "2026-05-07" },
    { name: "Rice", qty: "2 lbs", cat: "Pantry", expiration: "2026-04-07" },
    { name: "Pasta", qty: "1 box", cat: "Pantry", expiration: "2026-06-07" },
    { name: "Olive oil", qty: "1 btl", cat: "Pantry", expiration: "2026-04-07" },
    { name: "Sesame oil", qty: "1 btl", cat: "Pantry", expiration: "2026-04-08" },
  ];

  function expiringSoon(expiration) {
    return (new Date(expiration) - new Date()) / (1000 * 24 * 60 * 60)
  }

  function addItem(name, qty, cat, expiration) {
    const li = document.createElement("li");
    li.className = "shop-item"; // do i need to change this?
    li.dataset.cat = cat;
    li.dataset.expiration = expiration
    let expirationTag = ""
    if (expiringSoon(expiration) <= 0) {
      expirationTag = `<span class="expired-tag">Expired</span>`
    } else if (expiringSoon(expiration) <= 3) {
      expirationTag = `<span class="exp-tag">Expiring Soon</span>`
    }
    qty = qty.toString()
    let index = qty.indexOf(' ');
    let num = parseInt(qty.slice(0, index), 10);

    li.innerHTML = `<span ></span>
      <span class="shop-item-name">${name.trim()}</span>
      ${expirationTag} 
      <span class="shop-item-cat">${cat}</span>
      <button class="increase-quant">+</button>
      <span class="shop-item-qty">${qty.trim()}</span>
      <button class="decrease-quant">-</button>
      `;

    li.querySelector(".increase-quant").addEventListener("click", () => {
      num += 1
      li.querySelector(".shop-item-qty").textContent = `${num}${String(qty).substring(index)}`
    })

    li.querySelector(".decrease-quant").addEventListener("click", () => {
      if (num == 1) {
        li.remove();
      }
      else {
        num -= 1
        li.querySelector(".shop-item-qty").textContent = `${num}${String(qty).substring(1)}`
      }

    })
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
          item.style.display = expiringSoon(item.dataset.expiration) <= 3 && expiringSoon(item.dataset.expiration) >= 0 ? "" : "none";
        } else {
          item.style.display = item.dataset.cat === cat ? "" : "none";
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", Inventory);


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

const profileUpload = document.getElementById("profileUpload");
const profilePreview = document.getElementById("profilePreview");

if (profileUpload) {
  profileUpload.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profilePreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
}

function saveProfile() {
  const age = document.getElementById("profileAge").value;
  const goals = document.getElementById("profileGoals").value;
  const skill = document.getElementById("profileSkill").value;
  const time = document.getElementById("profileTime").value;
  const restriction = document.getElementById("profileRestriction").value;
  const roommateMode = document.getElementById("roommateMode").checked;
  const message = document.getElementById("profileMessage");

  localStorage.setItem("profileAge", age);
  localStorage.setItem("profileGoals", goals);
  localStorage.setItem("profileSkill", skill);
  localStorage.setItem("profileTime", time);
  localStorage.setItem("profileRestriction", restriction);
  localStorage.setItem("roommateMode", roommateMode);

  message.textContent = "Profile saved!";
}

window.addEventListener("DOMContentLoaded", function () {
  const savedAge = localStorage.getItem("profileAge");
  const savedGoals = localStorage.getItem("profileGoals");
  const savedSkill = localStorage.getItem("profileSkill");
  const savedTime = localStorage.getItem("profileTime");
  const savedRestriction = localStorage.getItem("profileRestriction");
  const savedRoommateMode = localStorage.getItem("roommateMode");

  if (savedAge) document.getElementById("profileAge").value = savedAge;
  if (savedGoals) document.getElementById("profileGoals").value = savedGoals;
  if (savedSkill) document.getElementById("profileSkill").value = savedSkill;
  if (savedTime) document.getElementById("profileTime").value = savedTime;
  if (savedRestriction) document.getElementById("profileRestriction").value = savedRestriction;
  if (savedRoommateMode === "true") document.getElementById("roommateMode").checked = true;
});
document.addEventListener("DOMContentLoaded", Inventory);

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".filter").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      document.querySelectorAll(".recipe-card").forEach(card => {
        if (!filter || filter === "all") {
          card.style.display = "flex";
        } else {
          card.style.display = card.dataset.tags.includes(filter) ? "flex" : "none";
        }
      });
    });
  });
});

function showAllRecipes() {
  document.querySelectorAll(".toggle").forEach(btn => btn.classList.remove("active"));
  document.querySelector(".recipe-toggle .toggle:first-child").classList.add("active");

  document.querySelectorAll(".recipe-card").forEach(card => {
    card.style.display = "flex";
  });
}

function filterInventoryRecipes() {
  document.querySelectorAll(".toggle").forEach(btn => btn.classList.remove("active"));
  document.querySelector(".recipe-toggle .toggle:last-child").classList.add("active");

  document.querySelectorAll(".recipe-card").forEach(card => {
    const ratio = card.dataset.ingredients.split("/");
    card.style.display = (ratio[0] === ratio[1]) ? "flex" : "none";
  });
}

function openRecipe(name) {
  alert("Opening " + name);
}

function addToShopping() {
  alert("Missing ingredients added to shopping list");
}

function saveRecipe() {
  alert("Recipe saved and favorite ingredients added to shopping");
}

function openCalendar() {
  document.getElementById("calendarModal").style.display = "flex";
}

function closeCalendar() {
  document.getElementById("calendarModal").style.display = "none";
}

function addToDay(day) {
  alert("Added to " + day);
  closeCalendar();
}