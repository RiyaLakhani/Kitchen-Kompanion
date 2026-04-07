// ─────────────────────────────────────────
// TAB NAVIGATION
// ─────────────────────────────────────────
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "flex";
  evt.currentTarget.className += " active";
}

// ─────────────────────────────────────────
// INVENTORY
// ─────────────────────────────────────────
function Inventory() {
  const list    = document.getElementById("inventoryList");
  const addBtn  = document.getElementById("addInventoryBtn");
  const input   = document.getElementById("invenName");
  const qtyInput= document.getElementById("inventQty");
  const cat     = document.getElementById("invenCat");
  const exp     = document.getElementById("invenExp");

  addBtn.addEventListener("click", () =>
      addInvItem(input.value, qtyInput.value, cat.value, String(exp.value))
  );

  var modal = document.getElementById("myModal");
  var btn   = document.getElementById("myBtn");
  var span  = document.getElementsByClassName("close")[0];

  btn.onclick  = function () { modal.style.display = "flex"; };
  span.onclick = function () { modal.style.display = "none"; };

  window.onclick = function (event) {
      if (event.target == modal) modal.style.display = "none";
      ["addShopModal","doneShopModal"].forEach(function (id) {
          var m = document.getElementById(id);
          if (m && event.target === m) closeShopModal(id);
      });
  };

  const seedItems = [
      { name: "Sriracha",       qty: "1 bottle", cat: "Pantry",  expiration: "2026-04-09" },
      { name: "Broccoli",       qty: "1 head",   cat: "Produce", expiration: "2026-04-11" },
      { name: "Chicken breast", qty: "2 lbs",    cat: "Protein", expiration: "2026-04-04" },
      { name: "Ground turkey",  qty: "1 lb",     cat: "Protein", expiration: "2026-04-10" },
      { name: "Spinach",        qty: "1 bag",    cat: "Produce", expiration: "2026-04-07" },
      { name: "Apples",         qty: "6",        cat: "Produce", expiration: "2026-04-07" },
      { name: "Bananas",        qty: "1 bunch",  cat: "Produce", expiration: "2026-05-07" },
      { name: "Rice",           qty: "2 lbs",    cat: "Pantry",  expiration: "2026-06-07" },
      { name: "Pasta",          qty: "1 box",    cat: "Pantry",  expiration: "2026-06-07" },
      { name: "Olive oil",      qty: "1 btl",    cat: "Pantry",  expiration: "2026-08-07" },
      { name: "Sesame oil",     qty: "1 btl",    cat: "Pantry",  expiration: "2026-08-08" },
  ];

  function expiringSoon(expiration) {
      return (new Date(expiration) - new Date()) / (1000 * 24 * 60 * 60);
  }

  function addInvItem(name, qty, cat, expiration) {
      if (!name.trim()) return;
      const li = document.createElement("li");
      li.className = "shop-item";
      li.dataset.cat = cat;
      li.dataset.expiration = expiration;

      let expirationTag = "";
      const daysLeft = expiringSoon(expiration);
      if (daysLeft <= 0)      expirationTag = `<span class="expired-tag">Expired</span>`;
      else if (daysLeft <= 3) expirationTag = `<span class="exp-tag">Expiring Soon</span>`;

      qty = qty.toString();
      let spaceIdx = qty.indexOf(' ');
      let num = parseFloat(qty.slice(0, spaceIdx !== -1 ? spaceIdx : qty.length)) || 1;

      li.innerHTML = `
          <span class="shop-item-name">${name.trim()}</span>
          ${expirationTag}
          <span class="shop-item-cat">${cat}</span>
          <button class="increase-quant">+</button>
          <span class="shop-item-qty">${qty.trim()}</span>
          <button class="decrease-quant">−</button>
      `;

      const suffix = spaceIdx !== -1 ? qty.substring(spaceIdx) : "";
      li.querySelector(".increase-quant").addEventListener("click", () => {
          num += 0.5;
          li.querySelector(".shop-item-qty").textContent = num + suffix;
      });
      li.querySelector(".decrease-quant").addEventListener("click", () => {
          if (num <= 0.5) { li.remove(); return; }
          num -= 0.5;
          li.querySelector(".shop-item-qty").textContent = num + suffix;
      });

      list.appendChild(li);
      input.value = "";
      qtyInput.value = "";
      modal.style.display = "none";
  }

  seedItems.forEach(i => addInvItem(i.name, i.qty, i.cat, i.expiration));

  document.querySelectorAll("#inventory .shop-filter").forEach(btn => {
      btn.addEventListener("click", () => {
          document.querySelectorAll("#inventory .shop-filter").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          const c = btn.dataset.cat;
          list.querySelectorAll(".shop-item").forEach(item => {
              if (c === "all") {
                  item.style.display = "";
              } else if (c === "expiring") {
                  const d = expiringSoon(item.dataset.expiration);
                  item.style.display = (d <= 3 && d >= 0) ? "" : "none";
              } else {
                  item.style.display = item.dataset.cat === c ? "" : "none";
              }
          });
      });
  });
}

document.addEventListener("DOMContentLoaded", Inventory);

// ─────────────────────────────────────────
// PROFILE
// ─────────────────────────────────────────
function saveProfile() {
  localStorage.setItem("profileGoals",       document.getElementById("profileGoals").value);
  localStorage.setItem("profileSkill",       document.getElementById("profileSkill").value);
  localStorage.setItem("profileTime",        document.getElementById("profileTime").value);
  localStorage.setItem("profileRestriction", document.getElementById("profileRestriction").value);
  localStorage.setItem("roommateMode",       document.getElementById("roommateMode").checked);
  document.getElementById("profileMessage").textContent = "Profile saved!";
}

window.addEventListener("DOMContentLoaded", function () {
  const g = localStorage.getItem("profileGoals");
  const s = localStorage.getItem("profileSkill");
  const t = localStorage.getItem("profileTime");
  const r = localStorage.getItem("profileRestriction");
  const m = localStorage.getItem("roommateMode");
  if (g) document.getElementById("profileGoals").value       = g;
  if (s) document.getElementById("profileSkill").value       = s;
  if (t) document.getElementById("profileTime").value        = t;
  if (r) document.getElementById("profileRestriction").value = r;
  if (m === "true") document.getElementById("roommateMode").checked = true;
});

// ─────────────────────────────────────────
// RECIPES
// ─────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".filter").forEach(btn => {
      btn.addEventListener("click", () => {
          document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          const filter = btn.dataset.filter;
          document.querySelectorAll(".recipe-card").forEach(card => {
              card.style.display =
                  (!filter || filter === "all" || card.dataset.tags.includes(filter))
                  ? "flex" : "none";
          });
      });
  });
});

function showAllRecipes() {
  document.querySelectorAll(".toggle").forEach(b => b.classList.remove("active"));
  document.querySelector(".recipe-toggle .toggle:first-child").classList.add("active");
  document.querySelectorAll(".recipe-card").forEach(c => c.style.display = "flex");
}

function filterInventoryRecipes() {
  document.querySelectorAll(".toggle").forEach(b => b.classList.remove("active"));
  document.querySelector(".recipe-toggle .toggle:last-child").classList.add("active");
  document.querySelectorAll(".recipe-card").forEach(card => {
      const parts = card.dataset.ingredients.split("/");
      card.style.display = parts[0] === parts[1] ? "flex" : "none";
  });
}

function openRecipe(name) { alert("Opening recipe: " + name); }
function addToShopping()  { alert("Missing ingredients added to shopping list"); }
function saveRecipe()     { alert("Recipe saved"); }
function openCalendar()   { document.getElementById("calendarModal").style.display = "flex"; }
function closeCalendar()  { document.getElementById("calendarModal").style.display = "none"; }
function addToDay(day)    { alert("Added to " + day); closeCalendar(); }

// ─────────────────────────────────────────
// SHOPPING LIST STATE
// ─────────────────────────────────────────
var shopState = {
  items: [
      { id:101, name:"Soy sauce",       qty:3, unit:"tbsp",    cat:"Condiments", source:"recipe", recipe:"Beef & Broccoli", checked:false },
      { id:102, name:"Olive oil",       qty:1, unit:"bottles", cat:"Oils",       source:"manual", recipe:"",               checked:false },
      { id:103, name:"Baby spinach",    qty:5, unit:"oz",      cat:"Produce",    source:"manual", recipe:"",               checked:true  },
      { id:104, name:"Cherry tomatoes", qty:1, unit:"count",   cat:"Produce",    source:"manual", recipe:"",               checked:false },
  ],
  nextId: 200,
  doneQueue: [],
  doneIndex: 0,
};

// ─────────────────────────────────────────
// RENDER SHOPPING LIST
// ─────────────────────────────────────────
function renderShoppingList() {
  var recipeUL  = document.getElementById("shopListRecipe");
  var manualUL  = document.getElementById("shopListManual");
  var checkedUL = document.getElementById("shopListChecked");
  recipeUL.innerHTML = manualUL.innerHTML = checkedUL.innerHTML = "";

  var unchecked = shopState.items.filter(function(i) { return !i.checked; });
  var checked   = shopState.items.filter(function(i) { return  i.checked; });

  unchecked.forEach(function(item) {
      (item.source === "recipe" ? recipeUL : manualUL).appendChild(makeShopRow(item));
  });
  checked.forEach(function(item) { checkedUL.appendChild(makeShopRow(item)); });

  document.getElementById("tobuy-count").textContent = unchecked.length;
  document.getElementById("gotit-count").textContent = checked.length;
  document.getElementById("shop-subtitle").textContent =
      shopState.items.length + " items \u00b7 " + checked.length + " checked";
}

function makeShopRow(item) {
  var li = document.createElement("li");
  li.className = "shop-row" + (item.checked ? " checked" : "");
  li.innerHTML =
      '<input type="checkbox"' + (item.checked ? " checked" : "") + '>' +
      '<div class="shop-row-info">' +
          '<div class="shop-row-name">' + item.name + '</div>' +
          '<div class="shop-row-meta">' + item.qty + ' ' + item.unit +
              (item.recipe ? ' \u00b7 ' + item.recipe : '') + '</div>' +
      '</div>' +
      '<span class="shop-row-cat">' + item.cat + '</span>';

  li.querySelector("input[type=checkbox]").addEventListener("change", function() {
      var it = shopState.items.find(function(x) { return x.id === item.id; });
      if (it) it.checked = this.checked;
      renderShoppingList();
      // stay on whichever panel is currently visible
      var activeTab = document.querySelector(".shop-seg-tab.on");
      if (activeTab && activeTab.id === "shop-tab-gotit") {
          document.getElementById("shop-tobuy-panel").style.display = "none";
          document.getElementById("shop-gotit-panel").style.display = "block";
      } else {
          document.getElementById("shop-tobuy-panel").style.display = "block";
          document.getElementById("shop-gotit-panel").style.display = "none";
      }
  });
  return li;
}

// ─────────────────────────────────────────
// TAB SWITCH (To buy / Got it)
// ─────────────────────────────────────────
function switchShopTab(tab, btn) {
  document.querySelectorAll(".shop-seg-tab").forEach(function(b) { b.classList.remove("on"); });
  btn.classList.add("on");
  document.getElementById("shop-tobuy-panel").style.display = tab === "tobuy" ? "block" : "none";
  document.getElementById("shop-gotit-panel").style.display = tab === "gotit" ? "block"  : "none";
}

// ─────────────────────────────────────────
// MODAL HELPERS
// ─────────────────────────────────────────
function openShopModal(id)  { document.getElementById(id).style.display = "flex"; }
function closeShopModal(id) { document.getElementById(id).style.display = "none"; }

function setKkSeg(btn, groupId) {
  document.querySelectorAll("#" + groupId + " .kk-seg-opt").forEach(function(b) {
      b.classList.remove("on");
  });
  btn.classList.add("on");
}

function getKkSeg(groupId) {
  var on = document.querySelector("#" + groupId + " .kk-seg-opt.on");
  return on ? on.textContent.trim() : "";
}

// ─────────────────────────────────────────
// ADD SHOPPING ITEM  (Deep Task D3)
// ─────────────────────────────────────────
function openAddShopModal() {
  document.getElementById("shop-inp-name").value = "";
  document.getElementById("shop-inp-qty").value  = "1";
  document.getElementById("shop-inp-unit").value = "count";
  document.getElementById("shop-inp-cat").value  = "Produce";
  document.getElementById("shop-inp-err").textContent = "";
  openShopModal("addShopModal");
}

function submitAddShopItem() {
  var name = document.getElementById("shop-inp-name").value.trim();
  if (!name) {
      document.getElementById("shop-inp-err").textContent = "Please enter an item name.";
      return;
  }
  document.getElementById("shop-inp-err").textContent = "";
  shopState.items.push({
      id:      shopState.nextId++,
      name:    name,
      qty:     parseFloat(document.getElementById("shop-inp-qty").value) || 1,
      unit:    document.getElementById("shop-inp-unit").value,
      cat:     document.getElementById("shop-inp-cat").value,
      source:  "manual",
      recipe:  "",
      checked: false,
  });
  closeShopModal("addShopModal");
  renderShoppingList();
}

// ─────────────────────────────────────────
// DONE SHOPPING FLOW  (Deep Task D2)
// ─────────────────────────────────────────
function openDoneShoppingModal() {
  var checked = shopState.items.filter(function(i) { return i.checked; });
  if (!checked.length) {
      alert("Check off the items you have bought first.");
      return;
  }
  shopState.doneQueue = checked.map(function(i) { return Object.assign({}, i); });
  shopState.doneIndex = 0;
  loadDoneItem();
  openShopModal("doneShopModal");
}

function loadDoneItem() {
  var q = shopState.doneQueue;
  var i = shopState.doneIndex;

  if (i >= q.length) {
      var ids = q.map(function(x) { return x.id; });
      shopState.items = shopState.items.filter(function(x) { return !ids.includes(x.id); });
      closeShopModal("doneShopModal");
      renderShoppingList();
      alert("All items added to your inventory!");
      return;
  }

  var item = q[i];
  document.getElementById("done-progress").textContent  = "Item " + (i + 1) + " of " + q.length;
  document.getElementById("done-item-name").textContent = item.name;
  document.getElementById("done-qty").value  = item.qty;
  document.getElementById("done-unit").value = item.unit;
  document.getElementById("done-exp").value  = "";

  // reset location seg to Fridge
  document.querySelectorAll("#done-loc .kk-seg-opt").forEach(function(b) { b.classList.remove("on"); });
  document.querySelector("#done-loc .kk-seg-opt").classList.add("on");

  document.getElementById("done-confirm-btn").textContent =
      i < q.length - 1 ? "Confirm & next" : "Confirm & finish";
}

function confirmDoneItem() {
  shopState.doneIndex++;
  loadDoneItem();
}

// ─────────────────────────────────────────
// INIT
// ─────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function() {
  renderShoppingList();
});