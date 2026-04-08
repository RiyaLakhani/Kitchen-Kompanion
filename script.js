
var thumbLetter = {
  beef: "B",
  pasta: "A",
  "fried-rice": "C",
  eggs: "E",
  "rice-bowl": "R",
};

var recipes = {
  beef: {
    title: "Beef & Broccoli Stir Fry",
    time: "25 min",
    skill: "Intermediate",
    servings: "2 servings",
    tags: ["Dairy-free", "High Protein", "Uses expiring items"],
    ingredients: [
      {name:"Ground beef", qty:"0.8 lbs", have:true},
      {name:"Broccoli", qty:"1 head", have:true},
      {name:"Garlic", qty:"3 cloves", have:true},
      {name:"Brown rice", qty:"1 cup", have:true},
      {name:"Yellow onion", qty:"half onion", have:true},
      {name:"Soy sauce", qty:"3 tbsp", have:false}
    ],
    steps: [
      "Cook brown rice per package directions. Set aside.",
      "Slice beef into thin strips. Season with salt and pepper.",
      "Heat oil in a wok over high heat. Cook beef 3-4 min until browned. Remove and set aside.",
      "Add onion and garlic to the same pan. Stir fry 2 minutes.",
      "Add broccoli and soy sauce. Cook 3-4 min until tender-crisp.",
      "Return beef to pan, toss everything together, and serve over rice."
    ]
  },
  pasta: {
    title: "Spaghetti Aglio e Olio",
    time: "20 min",
    skill: "Beginner",
    servings: "2 servings",
    tags: ["Vegetarian", "Low Cal"],
    ingredients: [
      {name: "Spaghetti", qty: "8 oz", have: true},
      {name: "Garlic", qty: "6 cloves", have: true},
      {name: "Olive oil", qty: "1/4 cup", have: true},
      {name: "Parsley", qty: "2 tbsp", have: false},
      {name: "Parmesan", qty: "1/4 cup", have: false}
    ],
    steps: [
      "Boil salted water and cook spaghetti until al dente. Reserve half cup pasta water.",
      "Thinly slice garlic. Heat olive oil in a large pan over medium-low heat.",
      "Add garlic and cook gently for 3-4 min until golden.",
      "Add drained pasta and splash of pasta water. Toss to coat.",
      "Finish with parsley and parmesan. Serve immediately."
    ]
  },
  "fried-rice": {
    title: "Chicken Fried Rice",
    time: "30 min",
    skill: "Beginner",
    servings: "3 servings",
    tags: ["Gluten-free","High Protein"],
    ingredients: [
      {name:"Chicken breast", qty:"1 lb", have:true},
      {name:"Brown rice", qty:"2 cups", have:true},
      {name:"Eggs", qty:"2", have:true},
      {name:"Sesame oil", qty:"1 tbsp", have:true},
      {name:"Yellow onion", qty:"half onion", have: true},
      {name:"Garlic", qty:"2 cloves", have:true},
      {name:"Soy sauce", qty:"2 tbsp", have:false}
    ],
    steps: [
      "Cook rice ahead of time and let cool.",
      "Dice chicken and cook in oil over high heat until cooked through. Set aside.",
      "In the same pan scramble eggs until just set. Push to side.",
      "Add onion and garlic, cook 2 min. Add cold rice and stir fry 3-4 min.",
      "Add chicken back in. Drizzle with soy sauce and sesame oil. Toss well.",
      "Taste and adjust seasoning. Serve hot."
    ]
  },
  eggs: {
    title: "Cheesy Scrambled Eggs",
    time: "10 min",
    skill: "Beginner",
    servings: "1 serving",
    tags: ["Vegetarian"],
    ingredients: [
      {name:"Eggs", qty:"3", have:true},
      {name:"Cheddar cheese", qty:"2 oz", have:true},
      {name:"Whole milk", qty:"2 tbsp", have:true},
      {name:"Butter", qty: "1 tbsp", have:true}
    ],
    steps: [
      "Crack eggs into a bowl. Add milk and a pinch of salt. Whisk well.",
      "Melt butter in a non-stick pan over medium-low heat.",
      "Pour in eggs. Stir slowly and constantly with a spatula.",
      "When eggs are almost set but still slightly glossy remove from heat.",
      "Fold in cheddar cheese. Serve immediately on toast."
    ]
  },
  "rice-bowl": {
    title: "Beef & Rice Bowl",
    time: "35 min",
    skill: "Beginner",
    servings: "2 servings",
    tags: ["Gluten-free", "Dairy-free"],
    ingredients: [
      {name:"Ground beef", qty:"0.5 lbs", have:true},
      {name:"Brown rice", qty:"1.5 cups", have:true},
      {name:"Yellow onion", qty:"half onion", have:true},
      {name:"Garlic", qty:"2 cloves", have:true},
      {name:"Olive oil", qty:"1 tbsp", have:true}
    ],
    steps: [
      "Cook brown rice per package directions.",
      "Dice onion and mince garlic. Heat oil in a pan over medium heat.",
      "Add onion and cook 3 min until softened. Add garlic cook 1 min.",
      "Add ground beef. Cook breaking up with a spoon until browned.",
      "Season with salt and pepper. Serve beef mixture over rice."
    ]
  }
};

var mealPlan = {};
var currentRecipe = null;
var roommateOn = false;
var nextId = 200;
var typeFilt = "";
var locFilt = "";

var shopItems = [
  {id:101, name:"Soy sauce", qty:3, unit:"tbsp", cat:"Condiments", source:"recipe", recipe:"Beef & Broccoli", checked:false},
  {id:102, name:"Olive oil", qty:1, unit:"bottles", cat:"Oils", source:"manual", recipe:"", checked:false},
  {id:103, name:"Baby spinach", qty:5, unit:"oz", cat:"Produce", source:"manual", recipe:"", checked:true},
  {id:104, name:"Cherry tomatoes", qty:1, unit:"count", cat: "Produce", source:"manual", recipe:"", checked:false}
];

var seedItems = [
  {name:"Sriracha", qty:1, unit:"bottle", cat:"Pantry", exp:"2026-04-09", loc:"Pantry", shared:true},
  {name:"Broccoli", qty:1, unit:"head", cat:"Produce", exp:"2026-04-11", loc:"Fridge", shared:false},
  {name: "Chicken breast", qty: 2, unit: "lbs", cat: "Protein", exp:"2026-04-04", loc:"Fridge", shared:true},
  {name:"Ground turkey", qty:1, unit:"lb", cat:"Protein", exp:"2026-04-10", loc:"Freezer", shared:true},
  {name:"Spinach", qty:1, unit:"bag", cat:"Produce", exp:"2026-04-07", loc:"Fridge", shared:false},
  {name:"Apples", qty:6, unit:"count", cat:"Produce", exp:"2026-04-07", loc:"Fridge", shared:false},
  {name:"Bananas", qty:1, unit:"bunch", cat:"Produce", exp:"2026-05-07", loc:"Pantry", shared:true},
  {name:"Rice", qty:2, unit:"lbs", cat:"Pantry", exp:"2026-06-07", loc:"Pantry", shared:true},
  {name:"Pasta", qty:1, unit:"box", cat:"Pantry", exp:"2026-06-07", loc: "Pantry", shared:false},
  {name:"Olive oil", qty:1, unit:"bottle", cat:"Pantry", exp:"2026-08-07", loc:"Pantry", shared:true},
  {name:"Sesame oil", qty:1, unit:"bottle", cat:"Pantry", exp:"2026-08-08", loc:"Pantry", shared:false}
];

var doneQueue = [];
var doneIdx = 0;

function openTab(e, tabId) {
  var all = document.getElementsByClassName("tabcontent");
  for (var i = 0; i < all.length; i++) {
    all[i].style.display = "none";
  }
  var btns = document.getElementsByClassName("tablinks");
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove("active");
  }
  document.getElementById(tabId).style.display = "flex";
  e.currentTarget.classList.add("active");
}

function pickSeg(btn, groupId) {
  var grp = document.getElementById(groupId);
  var opts = grp.querySelectorAll(".segBtn");
  for (var i = 0; i < opts.length; i++) {
    opts[i].classList.remove("active");
  }
  btn.classList.add("active");
}

function getSegVal(groupId) {
  var b = document.querySelector("#" + groupId + " .segBtn.active");
  if (b) return b.textContent.trim();
  return "";
}

function filterAll(btn) {
  typeFilt = "";
  locFilt = "";
  var filts = document.querySelectorAll("#inventory .filt");
  for (var i = 0; i < filts.length; i++) filts[i].classList.remove("active");
  btn.classList.add("active");
  var items = document.querySelectorAll("#inventoryList .invItem");
  for (var i = 0; i < items.length; i++) items[i].style.display = "";
}

function addInvItem(name, qty, unit, cat, exp, loc, shared) {
  var list = document.getElementById("inventoryList");
  var li = document.createElement("li");
  li.className = "invItem";
  li.dataset.cat = cat;
  li.dataset.loc = loc;
  li.dataset.shared = shared ? "1" : "0";
  li._qty = qty;
  li._unit = unit;

  var days = (new Date(exp) - new Date()) / 86400000;
  var expTag = "";
  if (exp && days <= 0) {
    expTag = '<span class="expiredTag">Expired</span>';
  } else if (exp && days <= 5) {
    expTag = '<span class="expTag">Expiring Soon</span>';
  }

  var badge = "";
  if (roommateOn) {
    if (shared) {
      badge = '<span class="shareBadge sharedItem">Shared</span>';
    } else {
      badge = '<span class="shareBadge personalItem">Personal</span>';
    }
  }

  var catBadge = "";
  if (cat != "Pantry") {
    catBadge = '<span class="catBadge">' + cat + "</span>";
  }

  li.innerHTML = '<span class="invName">' + name + '</span>' + expTag + catBadge +
    '<span class="locBadge">' + loc + '</span>' + badge +
    '<button class="qtyBtn" onclick="changeQty(this, 0.5)">+</button>' +
    '<span class="qtyVal">' + qty + " " + unit + '</span>' +
    '<button class="qtyBtn" onclick="changeQty(this, -0.5)">-</button>' +
    '<button class="delBtn" onclick="this.parentElement.remove()">X</button>';

  list.appendChild(li);
}

for (var s = 0; s < seedItems.length; s++) {
  var si = seedItems[s];
  addInvItem(si.name, si.qty, si.unit, si.cat, si.exp, si.loc, si.shared);
}

document.getElementById("myBtn").onclick = function() {
  document.getElementById("myModal").style.display = "flex";
};

document.getElementById("closeModal").onclick = function() {
  document.getElementById("myModal").style.display = "none";
};

document.getElementById("addInventoryBtn").onclick = function() {
  var n = document.getElementById("invenName").value.trim();
  if (n == "") return;
  var q = parseFloat(document.getElementById("inventQty").value);
  if (!q) q = 1;
  var u = document.getElementById("invenUnit").value;
  var c = document.getElementById("invenCat").value;
  var ex = document.getElementById("invenExp").value;
  var lc = getSegVal("locSeg");
  if (!lc) lc = "Fridge";
  var sh = document.getElementById("invenShared").checked;
  addInvItem(n, q, u, c, ex, lc, sh);
  document.getElementById("invenName").value = "";
  document.getElementById("inventQty").value = "1";
  document.getElementById("myModal").style.display = "none";
};

function changeQty(btn, delta) {
  var li = btn.parentElement;
  li._qty = li._qty + delta;
  if (li._qty <= 0) {
    li.remove();
    return;
  }
  li.querySelector(".qtyVal").textContent = li._qty + " " + li._unit;
}

function filterType(val, btn) {
  typeFilt = val;
  locFilt = "";
  var filts = document.querySelectorAll("#inventory .filt");
  for (var i = 0; i < filts.length; i++) filts[i].classList.remove("active");
  btn.classList.add("active");
  runFilter();
}

function runFilter() {
  var items = document.querySelectorAll("#inventoryList .invItem");
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var show = true;
    if (typeFilt != "" && item.dataset.cat != typeFilt) show = false;
    if (locFilt != "" && item.dataset.loc != locFilt) show = false;
    if (show) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  }
}

function openRecipe(key) {
  var r = recipes[key];
  if (!r) return;
  currentRecipe = key;

  document.getElementById("rd-title").textContent = r.title;
  document.getElementById("rd-hero").textContent = thumbLetter[key] || "";

  document.getElementById("rd-meta").innerHTML =
    '<span class="metaChip">' +
    r.time +
    "</span> <span class=\"metaChip\">" +
    r.servings +
    "</span> <span class=\"metaChip\">" +
    r.skill +
    "</span>";

  var tagHtml = "";
  for (var i = 0; i < r.tags.length; i++) {
    tagHtml +=
      '<span class="tag ' + tagClassForName(r.tags[i]) + '">' +
      r.tags[i] +
      "</span>";
  }
  document.getElementById("rd-tags").innerHTML = tagHtml;

  var ingrEl = document.getElementById("rd-ingr-list");
  ingrEl.innerHTML = "";
  var hasMissing = false;
  for (var i = 0; i < r.ingredients.length; i++) {
    var ing = r.ingredients[i];
    if (!ing.have) hasMissing = true;
    var row = document.createElement("div");
    row.className = "ingrRow";
    var checkClass = ing.have ? "ingrYes" : "ingrNo";
    var checkSymbol = ing.have ? "Have" : "Need";
    row.innerHTML = '<span class="ingrCheck ' + checkClass + '">' + checkSymbol + '</span>' +
      '<span class="ingrName">' + ing.name + '</span>' +
      '<span class="ingrQty">' + ing.qty + '</span>';
    ingrEl.appendChild(row);
  }

  if (hasMissing) {
    document.getElementById("rd-add-missing-btn").style.display = "block";
  } else {
    document.getElementById("rd-add-missing-btn").style.display = "none";
  }

  var stepsHtml = "";
  for (var i = 0; i < r.steps.length; i++) {
    stepsHtml += '<div class="stepRow"><div class="stepNum">' + (i+1) + '</div><div class="stepText">' + r.steps[i] + '</div></div>';
  }
  document.getElementById("rd-steps-list").innerHTML = stepsHtml;

  var tabs = document.getElementsByClassName("tabcontent");
  for (var i = 0; i < tabs.length; i++) tabs[i].style.display = "none";
  document.getElementById("recipe-detail").style.display = "flex";

  var navBtns = document.getElementsByClassName("tablinks");
  for (var i = 0; i < navBtns.length; i++) navBtns[i].classList.remove("active");
}

function filterLoc(val, btn) {
  locFilt = val;
  typeFilt = "";
  var filts = document.querySelectorAll("#inventory .filt");
  for (var i = 0; i < filts.length; i++) filts[i].classList.remove("active");
  btn.classList.add("active");
  runFilter();
}

function closeRecipe() {
  document.getElementById("recipe-detail").style.display = "none";
  document.getElementById("recipes").style.display = "flex";
  var links = document.getElementsByClassName("tablinks");
  for (var i = 0; i < links.length; i++) links[i].classList.remove("active");
  var recipesTab = document.getElementById("tab-btn-recipes");
  if (recipesTab) recipesTab.classList.add("active");
}

function tagClassForName(tagName) {
  if (tagName == "Vegetarian") return "tagGreen";
  if (tagName == "High Protein") return "tagPurple";
  if (tagName == "Low Cal") return "tagOrange";
  if (tagName == "Uses expiring items") return "tagWarn";
  return "tagBlue";
}

function recipeFilter(btn) {
  var allFilts = document.querySelectorAll("#recipes .filt");
  for (var i = 0; i < allFilts.length; i++) allFilts[i].classList.remove("active");
  btn.classList.add("active");
  var f = btn.dataset.filter;
  var cards = document.querySelectorAll(".recipeCard");
  for (var i = 0; i < cards.length; i++) {
    var c = cards[i];
    if (!f || f == "all" || c.dataset.tags.indexOf(f) != -1) {
      c.style.display = "flex";
    } else {
      c.style.display = "none";
    }
  }
}

function addMissingToShopping() {
  var r = recipes[currentRecipe];
  if (!r) return;
  var count = 0;
  for (var i = 0; i < r.ingredients.length; i++) {
    var ing = r.ingredients[i];
    if (!ing.have) {
      var found = false;
      for (var j = 0; j < shopItems.length; j++) {
        if (shopItems[j].name.toLowerCase() == ing.name.toLowerCase()) {
          found = true;
          break;
        }
      }
      if (!found) {
        shopItems.push({id:nextId, name:ing.name, qty:1, unit:"count", cat:"Other", source:"recipe", recipe:r.title, checked:false});
        nextId++;
        count++;
      }
    }
  }
  renderShopList();
  alert(count + " item(s) added to shopping list!");
}

function renderShopList() {
  var rUL = document.getElementById("shopListRecipe");
  var mUL = document.getElementById("shopListManual");
  var cUL = document.getElementById("shopListChecked");
  rUL.innerHTML = "";
  mUL.innerHTML = "";
  cUL.innerHTML = "";

  var toBuyCount = 0;
  var gotItCount = 0;

  for (var i = 0; i < shopItems.length; i++) {
    var item = shopItems[i];

    var li = document.createElement("li");
    li.className = "shopRow";
    if (item.checked) li.className += " rowChecked";

    var metaText = item.qty + " " + item.unit;
    if (item.recipe != "") metaText += " · " + item.recipe;

    li.innerHTML = '<input type="checkbox"' + (item.checked ? " checked" : "") + '>' +
      '<div class="shopRowInfo"><div class="shopRowName">' + item.name + '</div>' +
      '<div class="shopRowMeta">' + metaText + '</div></div>' +
      '<span class="shopRowCat">' + item.cat + '</span>';

    var checkbox = li.querySelector("input");
    var itemId = item.id;
    checkbox.addEventListener("change", function() {
      for (var i = 0; i < shopItems.length; i++) {
        if (shopItems[i].id == itemId) {
          shopItems[i].checked = checkbox.checked;
          break;
        }
      }
      renderShopList();
      var gotItOn = document.getElementById("tab-gotit").classList.contains("active");
      if (gotItOn) {
        document.getElementById("panel-tobuy").style.display = "none";
        document.getElementById("panel-gotit").style.display = "block";
      }
    });

    if (item.checked) {
      cUL.appendChild(li);
      gotItCount++;
    } else {
      if (item.source == "recipe") {
        rUL.appendChild(li);
      } else {
        mUL.appendChild(li);
      }
      toBuyCount++;
    }
  }

  document.getElementById("tobuy-count").textContent = toBuyCount;
  document.getElementById("gotit-count").textContent = gotItCount;
  document.getElementById("shop-subtitle").textContent = shopItems.length + " items · " + gotItCount + " checked";
}

function showAll(btn) {
  var togs = document.querySelectorAll(".togBtn");
  for (var i = 0; i < togs.length; i++) togs[i].classList.remove("active");
  btn.classList.add("active");
  var cards = document.querySelectorAll(".recipeCard");
  for (var i = 0; i < cards.length; i++) cards[i].style.display = "flex";
}

function showOwned(btn) {
  var togs = document.querySelectorAll(".togBtn");
  for (var i = 0; i < togs.length; i++) togs[i].classList.remove("active");
  btn.classList.add("active");
  var cards = document.querySelectorAll(".recipeCard");
  for (var i = 0; i < cards.length; i++) {
    var parts = cards[i].dataset.ing.split("/");
    if (parts[0] == parts[1]) {
      cards[i].style.display = "flex";
    } else {
      cards[i].style.display = "none";
    }
  }
}

function openAddShop() {
  document.getElementById("shop-inp-name").value = "";
  document.getElementById("shop-inp-qty").value = "1";
  document.getElementById("shop-inp-err").textContent = "";
  document.getElementById("addShopModal").style.display = "flex";
}

function submitShopItem() {
  var name = document.getElementById("shop-inp-name").value.trim();
  if (name == "") {
    document.getElementById("shop-inp-err").textContent = "Please enter an item name.";
    return;
  }
  var qty = parseFloat(document.getElementById("shop-inp-qty").value);
  if (!qty) qty = 1;
  shopItems.push({
    id: nextId,
    name: name,
    qty: qty,
    unit: document.getElementById("shop-inp-unit").value,
    cat: document.getElementById("shop-inp-cat").value,
    source: "manual",
    recipe: "",
    checked: false
  });
  nextId++;
  closeModal("addShopModal");
  renderShopList();
}

function openCalendar() {
  var r = currentRecipe ? recipes[currentRecipe] : null;
  if (r) {
    document.getElementById("cal-recipe-name").textContent = r.title;
  } else {
    document.getElementById("cal-recipe-name").textContent = "";
  }
  renderMealPlan();
  document.getElementById("calendarModal").style.display = "flex";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

function openDoneShopping() {
  var checked = [];
  for (var i = 0; i < shopItems.length; i++) {
    if (shopItems[i].checked) checked.push(shopItems[i]);
  }
  if (checked.length == 0) {
    alert("Check off items you bought first.");
    return;
  }
  doneQueue = checked.slice();
  doneIdx = 0;
  loadDoneItem();
  document.getElementById("doneShopModal").style.display = "flex";
}

function addToDay(day) {
  var r = currentRecipe ? recipes[currentRecipe] : null;
  if (!r) return;
  mealPlan[day] = r.title;
  var dayBtns = document.querySelectorAll(".calDayBtn");
  for (var i = 0; i < dayBtns.length; i++) {
    if (dayBtns[i].textContent == day.slice(0,3)) {
      dayBtns[i].classList.add("calDayActive");
    } else {
      dayBtns[i].classList.remove("calDayActive");
    }
  }
  renderMealPlan();
}

function loadDoneItem() {
  if (doneIdx >= doneQueue.length) {
    var kept = [];
    for (var i = 0; i < shopItems.length; i++) {
      var shouldRemove = false;
      for (var j = 0; j < doneQueue.length; j++) {
        if (shopItems[i].id == doneQueue[j].id) {
          shouldRemove = true;
        }
      }
      if (!shouldRemove) {
        kept.push(shopItems[i]);
      }
    }
    shopItems = kept;
    closeModal("doneShopModal");
    renderShopList();
    alert("All items added to inventory!");
    return;
  }

  var item = doneQueue[doneIdx];

  document.getElementById("done-progress").textContent = "Item " + (doneIdx+1) + " of " + doneQueue.length;
  document.getElementById("done-item-name").textContent = item.name;
  document.getElementById("done-qty").value = item.qty;

  var unitDrop = document.getElementById("done-unit");
  unitDrop.value = item.unit;
  if (unitDrop.value != item.unit) {
    unitDrop.value = "count";
  }

  document.getElementById("done-exp").value = "";
  document.getElementById("done-shared").checked = item.source == "recipe";

  var locBtns = document.querySelectorAll("#done-loc .segBtn");
  for (var i = 0; i < locBtns.length; i++) {
    locBtns[i].classList.remove("active");
  }
  locBtns[0].classList.add("active");

  var confirmBtn = document.getElementById("done-confirm-btn");
  if (doneIdx == doneQueue.length - 1) {
    confirmBtn.textContent = "Confirm & finish";
  } else {
    confirmBtn.textContent = "Confirm & next";
  }
}

function renderMealPlan() {
  var days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  var html = "";
  var previewHtml = "";
  for (var i = 0; i < days.length; i++) {
    var d = days[i];
    if (mealPlan[d]) {
      html += '<div class="mealRow"><span class="mealDay">' + d + '</span><span>' + mealPlan[d] + '</span></div>';
      previewHtml += '<div class="mealPreviewRow"><span class="mealPreviewDay">' + d + '</span><span>' + mealPlan[d] + '</span></div>';
    }
  }
  if (html == "") html = '<p class="emptyMsg">No meals planned yet</p>';
  document.getElementById("mealPlanList").innerHTML = html;
  var prev = document.getElementById("weekPreview");
  if (previewHtml == "") {
    prev.innerHTML = "No meals planned yet";
  } else {
    prev.innerHTML = previewHtml;
  }
}

function confirmDoneItem() {
  var item = doneQueue[doneIdx];
  var qty = parseFloat(document.getElementById("done-qty").value);
  if (!qty) qty = 1;
  var unit = document.getElementById("done-unit").value;
  var exp = document.getElementById("done-exp").value;
  var loc = getSegVal("done-loc");
  if (!loc) loc = "Fridge";
  var shared = document.getElementById("done-shared").checked;
  addInvItem(item.name, qty, unit, "Other", exp, loc, shared);
  doneIdx++;
  loadDoneItem();
}

function saveProfile() {
  localStorage.setItem("profileGoals", document.getElementById("profileGoals").value);
  localStorage.setItem("profileTime", document.getElementById("profileTime").value);
  localStorage.setItem("profileSkill", document.getElementById("profileSkill").value);
  localStorage.setItem("profileRestriction", document.getElementById("profileRestriction").value);
  localStorage.setItem("roommateMode", document.getElementById("roommateToggle").checked);
  document.getElementById("profileMsg").textContent = "Profile saved!";
  setTimeout(function() {
    document.getElementById("profileMsg").textContent = "";
  }, 2000);
  applyRoommateMode();
}

function applyRoommateMode() {
  roommateOn = document.getElementById("roommateToggle").checked;
  if (roommateOn) {
    document.getElementById("roommateNames").style.display = "block";
  } else {
    document.getElementById("roommateNames").style.display = "none";
  }
  var items = document.querySelectorAll("#inventoryList .invItem");
  for (var i = 0; i < items.length; i++) {
    var li = items[i];
    var old = li.querySelector(".shareBadge");
    if (old) old.remove();
    if (roommateOn) {
      var badge = document.createElement("span");
      if (li.dataset.shared == "1") {
        badge.className = "shareBadge sharedItem";
        badge.textContent = "Shared";
      } else {
        badge.className = "shareBadge personalItem";
        badge.textContent = "Personal";
      }
      li.appendChild(badge);
    }
  }
}

function shopTab(tab, btn) {
  var segs = document.querySelectorAll(".shopSeg .segBtn");
  for (var i = 0; i < segs.length; i++) segs[i].classList.remove("active");
  btn.classList.add("active");
  if (tab == "tobuy") {
    document.getElementById("panel-tobuy").style.display = "block";
    document.getElementById("panel-gotit").style.display = "none";
  } else {
    document.getElementById("panel-tobuy").style.display = "none";
    document.getElementById("panel-gotit").style.display = "block";
  }
}

function loadProfile() {
  var g = localStorage.getItem("profileGoals");
  var t = localStorage.getItem("profileTime");
  var s = localStorage.getItem("profileSkill");
  var r = localStorage.getItem("profileRestriction");
  var m = localStorage.getItem("roommateMode");
  if (g) document.getElementById("profileGoals").value = g;
  if (t) document.getElementById("profileTime").value = t;
  if (s) document.getElementById("profileSkill").value = s;
  if (r) document.getElementById("profileRestriction").value = r;
  if (m == "true") {
    document.getElementById("roommateToggle").checked = true;
    applyRoommateMode();
  }
  document.getElementById("profilePhoto").addEventListener("change", function() {
    var file = this.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById("photoPreview").src = e.target.result;
      document.getElementById("photoPreview").style.display = "block";
    };
    reader.readAsDataURL(file);
  });
}

function closeModalIfBackdrop(ev) {
  var ids = ["myModal", "addShopModal", "doneShopModal", "calendarModal"];
  for (var i = 0; i < ids.length; i++) {
    var el = document.getElementById(ids[i]);
    if (el && ev.target === el) el.style.display = "none";
  }
}
window.onclick = closeModalIfBackdrop;

loadProfile();
renderShopList();