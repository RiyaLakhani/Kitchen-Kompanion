var recipeData = {
  beef: {
    title: "Beef & Broccoli Stir Fry",
    emoji: "🥩🥦",
    time: "25 min",
    skill: "Intermediate",
    servings: "2 servings",
    tags: ["Dairy-free", "High Protein", "Uses expiring items"],
    ingredients: [
      { name: "Ground beef", qty: "0.8 lbs", inStock: true },
      { name: "Broccoli", qty: "1 head", inStock: true },
      { name: "Garlic", qty: "3 cloves", inStock: true },
      { name: "Brown rice", qty: "1 cup", inStock: true },
      { name: "Yellow onion", qty: "½ onion", inStock: true },
      { name: "Soy sauce", qty: "3 tbsp", inStock: false },
    ],
    steps: [
      "Cook brown rice per package directions. Set aside.",
      "Slice beef into thin strips. Season with salt and pepper.",
      "Heat oil in a wok over high heat. Cook beef 3–4 min until browned. Remove and set aside.",
      "Add onion and garlic to the same pan. Stir fry 2 minutes.",
      "Add broccoli and soy sauce. Cook 3–4 min until tender-crisp.",
      "Return beef to pan, toss everything together, and serve over rice.",
    ],
  },
  pasta: {
    title: "Spaghetti Aglio e Olio",
    emoji: "🍝🧄",
    time: "20 min",
    skill: "Beginner",
    servings: "2 servings",
    tags: ["Vegetarian", "Low Cal"],
    ingredients: [
      { name: "Spaghetti", qty: "8 oz", inStock: true },
      { name: "Garlic", qty: "6 cloves", inStock: true },
      { name: "Olive oil", qty: "¼ cup", inStock: true },
      { name: "Parsley", qty: "2 tbsp", inStock: false },
      { name: "Parmesan", qty: "¼ cup", inStock: false },
    ],
    steps: [
      "Boil salted water and cook spaghetti until al dente. Reserve ½ cup pasta water.",
      "Thinly slice garlic. Heat olive oil in a large pan over medium-low heat.",
      "Add garlic and cook gently for 3–4 min until golden — do not burn.",
      "Add drained pasta and a splash of pasta water. Toss to coat.",
      "Finish with parsley and parmesan. Serve immediately.",
    ],
  },
  "fried-rice": {
    title: "Chicken Fried Rice",
    emoji: "🍚🍗",
    time: "30 min",
    skill: "Beginner",
    servings: "3 servings",
    tags: ["Gluten-free", "High Protein"],
    ingredients: [
      { name: "Chicken breast", qty: "1 lb", inStock: true },
      { name: "Brown rice", qty: "2 cups", inStock: true },
      { name: "Eggs", qty: "2", inStock: true },
      { name: "Sesame oil", qty: "1 tbsp", inStock: true },
      { name: "Yellow onion", qty: "½ onion", inStock: true },
      { name: "Garlic", qty: "2 cloves", inStock: true },
      { name: "Soy sauce", qty: "2 tbsp", inStock: false },
    ],
    steps: [
      "Cook rice ahead of time and let cool (day-old rice works best).",
      "Dice chicken and cook in oil over high heat until cooked through. Set aside.",
      "In the same pan, scramble eggs until just set. Push to side.",
      "Add onion and garlic, cook 2 min. Add cold rice and stir fry 3–4 min.",
      "Add chicken back in. Drizzle with soy sauce and sesame oil. Toss well.",
      "Taste and adjust seasoning. Serve hot.",
    ],
  },
  eggs: {
    title: "Cheesy Scrambled Eggs",
    emoji: "🍳🧀",
    time: "10 min",
    skill: "Beginner",
    servings: "1 serving",
    tags: ["Vegetarian"],
    ingredients: [
      { name: "Eggs", qty: "3", inStock: true },
      { name: "Cheddar cheese", qty: "2 oz", inStock: true },
      { name: "Whole milk", qty: "2 tbsp", inStock: true },
      { name: "Butter", qty: "1 tbsp", inStock: true },
    ],
    steps: [
      "Crack eggs into a bowl. Add milk and a pinch of salt. Whisk well.",
      "Melt butter in a non-stick pan over medium-low heat.",
      "Pour in eggs. Stir slowly and constantly with a spatula.",
      "When eggs are almost set but still slightly glossy, remove from heat.",
      "Fold in cheddar cheese. Serve immediately on toast.",
    ],
  },
  "rice-bowl": {
    title: "Beef & Rice Bowl",
    emoji: "🍲🥩",
    time: "35 min",
    skill: "Beginner",
    servings: "2 servings",
    tags: ["Gluten-free", "Dairy-free"],
    ingredients: [
      { name: "Ground beef", qty: "0.5 lbs", inStock: true },
      { name: "Brown rice", qty: "1.5 cups", inStock: true },
      { name: "Yellow onion", qty: "½ onion", inStock: true },
      { name: "Garlic", qty: "2 cloves", inStock: true },
      { name: "Olive oil", qty: "1 tbsp", inStock: true },
    ],
    steps: [
      "Cook brown rice per package directions.",
      "Dice onion and mince garlic. Heat oil in a pan over medium heat.",
      "Add onion and cook 3 min until softened. Add garlic, cook 1 min.",
      "Add ground beef. Cook, breaking up with a spoon, until browned (6–8 min).",
      "Season with salt and pepper. Serve beef mixture over rice.",
    ],
  },
};

function setLocSeg(btn) {
  var seg = btn.closest(".loc-seg");
  if (!seg) return;
  seg.querySelectorAll(".loc-opt").forEach(function (b) {
    b.classList.remove("active");
  });
  btn.classList.add("active");
}

function getLocSeg() {
  var btn = document.querySelector("#inv-loc-seg .loc-opt.active");
  return btn ? btn.textContent.trim() : "Fridge";
}

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

function Inventory() {
  var list = document.getElementById("inventoryList");
  var addBtn = document.getElementById("addInventoryBtn");
  var modal = document.getElementById("myModal");
  var openModalBtn = document.getElementById("myBtn");
  var closeModalBtn = document.getElementsByClassName("close")[0];

  function getVals() {
    return {
      name: document.getElementById("invenName").value.trim(),
      qty: parseFloat(document.getElementById("inventQty").value) || 1,
      unit: document.getElementById("invenUnit").value,
      cat: document.getElementById("invenCat").value,
      exp: document.getElementById("invenExp").value,
      shared: document.getElementById("invenShared").checked,
      loc: getLocSeg(),
    };
  }

  function clearVals() {
    document.getElementById("invenName").value = "";
    document.getElementById("inventQty").value = "1";
  }

  addBtn.addEventListener("click", function () {
    var item = getVals();
    if (!item.name) return;
    addInvItem(
      item.name,
      item.qty,
      item.unit,
      item.cat,
      item.exp,
      item.loc,
      item.shared,
    );
    clearVals();
    modal.style.display = "none";
  });

  openModalBtn.onclick = function () {
    modal.style.display = "flex";
  };
  closeModalBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) modal.style.display = "none";
    ["addShopModal", "doneShopModal"].forEach(function (id) {
      var m = document.getElementById(id);
      if (m && event.target === m) closeShopModal(id);
    });
  };

  var seedItems = [
    {
      name: "Sriracha",
      qty: "1 bottle",
      cat: "Pantry",
      expiration: "2026-04-09",
      loc: "Pantry",
      shared: true,
    },
    {
      name: "Broccoli",
      qty: "1 head",
      cat: "Produce",
      expiration: "2026-04-11",
      loc: "Fridge",
      shared: false,
    },
    {
      name: "Chicken breast",
      qty: "2 lbs",
      cat: "Protein",
      expiration: "2026-04-04",
      loc: "Fridge",
      shared: true,
    },
    {
      name: "Ground turkey",
      qty: "1 lb",
      cat: "Protein",
      expiration: "2026-04-10",
      loc: "Freezer",
      shared: true,
    },
    {
      name: "Spinach",
      qty: "1 bag",
      cat: "Produce",
      expiration: "2026-04-07",
      loc: "Fridge",
      shared: false,
    },
    {
      name: "Apples",
      qty: "6",
      cat: "Produce",
      expiration: "2026-04-07",
      loc: "Fridge",
      shared: false,
    },
    {
      name: "Bananas",
      qty: "1 bunch",
      cat: "Produce",
      expiration: "2026-05-07",
      loc: "Pantry",
      shared: true,
    },
    {
      name: "Rice",
      qty: "2 lbs",
      cat: "Pantry",
      expiration: "2026-06-07",
      loc: "Pantry",
      shared: true,
    },
    {
      name: "Pasta",
      qty: "1 box",
      cat: "Pantry",
      expiration: "2026-06-07",
      loc: "Pantry",
      shared: false,
    },
    {
      name: "Olive oil",
      qty: "1 bottle",
      cat: "Pantry",
      expiration: "2026-08-07",
      loc: "Pantry",
      shared: true,
    },
    {
      name: "Sesame oil",
      qty: "1 bottle",
      cat: "Pantry",
      expiration: "2026-08-08",
      loc: "Pantry",
      shared: false,
    },
  ];

  function expiringSoon(expiration) {
    return (new Date(expiration) - new Date()) / (1000 * 24 * 60 * 60);
  }

  function addInvItem(name, qty, unit, cat, expiration, loc, shared) {
    if (!name.trim()) return;
    var li = document.createElement("li");
    li.className = "shop-item";
    li.dataset.cat = cat;
    li.dataset.expiration = expiration;
    li.dataset.loc = loc;
    li.dataset.shared = shared ? "1" : "0";

    var daysLeft = expiringSoon(expiration);
    var expTag = "";
    if (daysLeft <= 0) expTag = '<span class="expired-tag">Expired</span>';
    else if (daysLeft <= 5)
      expTag = '<span class="exp-tag">Expiring Soon</span>';

    var shareLabel = roommateMode
      ? '<span class="share-badge ' +
        (shared ? "shared" : "personal") +
        '">' +
        (shared ? "Shared" : "Personal") +
        "</span>"
      : "";
    var catLabel =
      cat === "Pantry" ? "" : '<span class="shop-item-cat">' + cat + "</span>";

    li.innerHTML =
      '<span class="shop-item-name">' +
      name +
      "</span>" +
      expTag +
      catLabel +
      '<span class="shop-item-loc">' +
      loc +
      "</span>" +
      shareLabel +
      '<button class="increase-quant">+</button>' +
      '<span class="shop-item-qty">' +
      qty +
      " " +
      unit +
      "</span>" +
      '<button class="decrease-quant">−</button>' +
      '<button class="delete-item" title="Delete item">✕</button>';
    var num = qty;

    li.querySelector(".increase-quant").addEventListener("click", function () {
      num += 0.5;
      li.querySelector(".shop-item-qty").textContent = num + " " + unit;
    });
    li.querySelector(".decrease-quant").addEventListener("click", function () {
      if (num <= 0.5) {
        li.remove();
        return;
      }
      num -= 0.5;
      li.querySelector(".shop-item-qty").textContent = num + " " + unit;
    });
    li.querySelector(".delete-item").addEventListener("click", function () {
      li.remove();
    });

    list.appendChild(li);
  }

  window.kkAddInvItem = addInvItem;

  seedItems.forEach(function (i) {
    var p = String(i.qty).split(" ");
    var n = parseFloat(p[0]) || 1;
    var u = p.slice(1).join(" ") || "count";
    addInvItem(i.name, n, u, i.cat, i.expiration, i.loc, i.shared);
  });

  var typePick = "";
  var locPick = "";
  var allOn = true;

  function runFilters() {
    list.querySelectorAll(".shop-item").forEach(function (item) {
      var matchesType = !typePick || item.dataset.cat === typePick;
      var matchesLoc = !locPick || item.dataset.loc === locPick;
      item.style.display = allOn || (matchesType && matchesLoc) ? "" : "none";
    });
  }

  document.querySelectorAll("#inventory .shop-filter").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var group = btn.dataset.filterGroup;
      var value = btn.dataset.filterValue;

      if (group === "all") {
        allOn = true;
        typePick = "";
        locPick = "";
        document
          .querySelectorAll(
            '#inventory .shop-filter[data-filter-group="type"], #inventory .shop-filter[data-filter-group="loc"]',
          )
          .forEach(function (b) {
            b.classList.remove("active");
          });
        btn.classList.add("active");
      } else {
        allOn = false;
        var allBtn = document.querySelector(
          '#inventory .shop-filter[data-filter-group="all"]',
        );
        if (allBtn) allBtn.classList.remove("active");
        var selector =
          '#inventory .shop-filter[data-filter-group="' + group + '"]';
        document.querySelectorAll(selector).forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        if (group === "type") typePick = value;
        if (group === "loc") locPick = value;
      }

      runFilters();
    });
  });
}

function saveProfile() {
  localStorage.setItem(
    "profileGoals",
    document.getElementById("profileGoals").value,
  );
  localStorage.setItem("profileTime", document.getElementById("profileTime").value);
  localStorage.setItem(
    "profileSkill",
    document.getElementById("profileSkill").value,
  );
  localStorage.setItem(
    "profileRestriction",
    document.getElementById("profileRestriction").value,
  );
  localStorage.setItem(
    "roommateMode",
    document.getElementById("roommateMode").checked,
  );
  var photoPreview = document.getElementById("profilePhotoPreview");
  if (photoPreview && photoPreview.src) {
    localStorage.setItem("profilePhoto", photoPreview.src);
  }
  document.getElementById("profileMessage").textContent = "Profile saved!";
  setTimeout(function () {
    document.getElementById("profileMessage").textContent = "";
  }, 2000);
  applyRoommateMode();
}

var roommateMode = false;

function applyRoommateMode() {
  roommateMode = document.getElementById("roommateMode").checked;
  var namesDiv = document.getElementById("roommate-names");
  if (namesDiv) namesDiv.style.display = roommateMode ? "block" : "none";
  document.querySelectorAll("#inventoryList .shop-item").forEach(function (li) {
    var existing = li.querySelector(".share-badge");
    if (existing) existing.remove();
    if (roommateMode) {
      var isShared = li.dataset.shared !== "0";
      var badge = document.createElement("span");
      badge.className =
        "share-badge " + (isShared ? "shared" : "personal");
      badge.textContent = isShared ? "Shared" : "Personal";
      var loc = li.querySelector(".shop-item-loc");
      if (loc) loc.insertAdjacentElement("afterend", badge);
      else li.appendChild(badge);
    }
  });
}

function loadProfileFromStorage() {
  var g = localStorage.getItem("profileGoals");
  var t = localStorage.getItem("profileTime");
  var s = localStorage.getItem("profileSkill");
  var r = localStorage.getItem("profileRestriction");
  var m = localStorage.getItem("roommateMode");
  var p = localStorage.getItem("profilePhoto");
  if (g) document.getElementById("profileGoals").value = g;
  if (t) document.getElementById("profileTime").value = t;
  if (s) document.getElementById("profileSkill").value = s;
  if (r) document.getElementById("profileRestriction").value = r;
  if (m === "true") {
    document.getElementById("roommateMode").checked = true;
    applyRoommateMode();
  }
  if (p) {
    var preview = document.getElementById("profilePhotoPreview");
    preview.src = p;
    preview.style.display = "block";
  }

  var photoInput = document.getElementById("profilePhoto");
  if (photoInput) {
    photoInput.addEventListener("change", function () {
      var file = photoInput.files && photoInput.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function (event) {
        var pv = document.getElementById("profilePhotoPreview");
        pv.src = event.target.result;
        pv.style.display = "block";
      };
      reader.readAsDataURL(file);
    });
  }
  applyProfileToRecipes();
}

function setupRecipeFilterClicks() {
  document.querySelectorAll(".filter").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".filter").forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      var filter = btn.dataset.filter;
      document.querySelectorAll(".recipe-card").forEach(function (card) {
        if (!filter || filter === "all" || card.dataset.tags.includes(filter)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

function applyProfileToRecipes() {
  var restriction = localStorage.getItem("profileRestriction") || "";
  var filterMap = {
    Vegetarian: "vegetarian",
    Vegan: "vegetarian",
    "Gluten-Free": "gluten-free",
    "Dairy-Free": "dairy-free",
  };
  var filterVal = filterMap[restriction];
  if (!filterVal) return;
  document.querySelectorAll(".filter").forEach(function (b) {
    b.classList.remove("active");
  });
  var matchBtn = document.querySelector(
    '.filter[data-filter="' + filterVal + '"]',
  );
  if (matchBtn) matchBtn.classList.add("active");
  document.querySelectorAll(".recipe-card").forEach(function (card) {
    card.style.display = card.dataset.tags.includes(filterVal)
      ? "flex"
      : "none";
  });
}

function showAllRecipes() {
  document.querySelectorAll(".toggle").forEach(function (b) {
    b.classList.remove("active");
  });
  document
    .querySelector(".recipe-toggle .toggle:first-child")
    .classList.add("active");
  document.querySelectorAll(".recipe-card").forEach(function (c) {
    c.style.display = "flex";
  });
}

function filterInventoryRecipes() {
  document.querySelectorAll(".toggle").forEach(function (b) {
    b.classList.remove("active");
  });
  document
    .querySelector(".recipe-toggle .toggle:last-child")
    .classList.add("active");
  document.querySelectorAll(".recipe-card").forEach(function (card) {
    var parts = card.dataset.ingredients.split("/");
    card.style.display = parts[0] === parts[1] ? "flex" : "none";
  });
}

function openRecipe(key) {
  var recipe = recipeData[key];
  if (!recipe) return;
  currentRecipeKey = key;

  document.getElementById("rd-title").textContent = recipe.title;
  document.getElementById("rd-hero").textContent = recipe.emoji;

  document.getElementById("rd-meta").innerHTML =
    '<span class="rd-meta-chip">⏱ ' +
    recipe.time +
    "</span>" +
    '<span class="rd-meta-chip">👤 ' +
    recipe.servings +
    "</span>" +
    '<span class="rd-meta-chip">⭐ ' +
    recipe.skill +
    "</span>";

  var tagColors = {
    Vegetarian: "green",
    "Dairy-free": "blue",
    "Gluten-free": "blue",
    "High Protein": "purple",
    "Low Cal": "orange",
    "Uses expiring items": "warn",
  };
  document.getElementById("rd-tags").innerHTML = recipe.tags
    .map(function (t) {
      return (
        '<span class="tag ' + (tagColors[t] || "blue") + '">' + t + "</span>"
      );
    })
    .join("");

  var ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
  var ingrList = document.getElementById("rd-ingr-list");
  ingrList.innerHTML = "";
  ingrList.style.display = "block";
  if (!ingredients.length) {
    ingrList.innerHTML =
      '<div class="rd-empty">No ingredients available.</div>';
  } else {
    ingredients.forEach(function (ing) {
      var row = document.createElement("div");
      row.className = "rd-ingr-row";

      var check = document.createElement("span");
      check.className = "rd-ingr-check " + (ing.inStock ? "yes" : "no");
      check.textContent = ing.inStock ? "✓" : "✕";

      var name = document.createElement("span");
      name.className = "rd-ingr-name";
      name.textContent = ing.name;

      var qty = document.createElement("span");
      qty.className = "rd-ingr-qty";
      qty.textContent = ing.qty;

      row.appendChild(check);
      row.appendChild(name);
      row.appendChild(qty);
      ingrList.appendChild(row);
    });
  }

  var hasMissing = recipe.ingredients.some(function (i) {
    return !i.inStock;
  });
  document.getElementById("rd-add-missing-btn").style.display = hasMissing
    ? "block"
    : "none";

  var stepsHTML = "";
  recipe.steps.forEach(function (step, idx) {
    stepsHTML +=
      '<div class="rd-step">' +
      '<div class="rd-step-num">' +
      (idx + 1) +
      "</div>" +
      '<div class="rd-step-text">' +
      step +
      "</div>" +
      "</div>";
  });
  document.getElementById("rd-steps-list").innerHTML = stepsHTML;

  document.querySelectorAll(".tabcontent").forEach(function (t) {
    t.style.display = "none";
  });
  document.getElementById("recipe-detail").style.display = "flex";
  document.querySelectorAll(".tablinks").forEach(function (b) {
    b.className = b.className.replace(" active", "");
  });
}

function closeRecipeDetail() {
  document.getElementById("recipe-detail").style.display = "none";
  document.getElementById("recipes").style.display = "flex";
  document.querySelectorAll(".tablinks").forEach(function (btn) {
    btn.classList.remove("active");
  });
  var recipesTab = document.getElementById("tab-btn-recipes");
  if (recipesTab) recipesTab.classList.add("active");
}

function addMissingToShopping() {
  var recipe = recipeData[currentRecipeKey];
  if (!recipe) return;

  var missing = recipe.ingredients.filter(function (i) {
    return !i.inStock;
  });
  missing.forEach(function (ing) {
    var alreadyAdded = shopState.items.some(function (x) {
      return (
        x.name.toLowerCase() === ing.name.toLowerCase() && x.source === "recipe"
      );
    });
    if (!alreadyAdded) {
      shopState.items.push({
        id: shopState.nextId++,
        name: ing.name,
        qty: parseFloat(ing.qty) || 1,
        unit: ing.qty.replace(/[0-9.½¼¾\s]/g, "").trim() || "count",
        cat: "Other",
        source: "recipe",
        recipe: recipe.title,
        checked: false,
      });
    }
  });

  renderShoppingList();
  alert(missing.length + " missing item(s) added to your shopping list!");
}

var mealPlan = {};
var currentRecipeKey = null;

function openCalendar() {
  var recipe = currentRecipeKey ? recipeData[currentRecipeKey] : null;
  var nameEl = document.getElementById("cal-recipe-name");
  if (nameEl) nameEl.textContent = recipe ? recipe.title : "Meal Plan";
  renderMealPlan();
  document.getElementById("calendarModal").style.display = "flex";
}

function openMealPlanFromRecipes() {
  currentRecipeKey = null;
  openCalendar();
}

function closeCalendar() {
  document.getElementById("calendarModal").style.display = "none";
}

function addToDay(day) {
  var recipe = currentRecipeKey ? recipeData[currentRecipeKey] : null;
  if (!recipe) return;
  mealPlan[day] = recipe.title;
  document.querySelectorAll(".cal-day-btn").forEach(function (b) {
    b.classList.toggle("cal-day-active", b.textContent === day.slice(0, 3));
  });
  renderMealPlan();
}

function renderMealPlan() {
  var list = document.getElementById("meal-plan-list");
  var preview = document.getElementById("recipe-meal-plan-preview");
  if (!list) return;
  var days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  var html = "";
  var previewHtml = "";
  days.forEach(function (day) {
    if (mealPlan[day]) {
      html +=
        '<div class="meal-plan-row">' +
        '<span class="meal-plan-day">' +
        day +
        "</span>" +
        '<span class="meal-plan-recipe">' +
        mealPlan[day] +
        "</span>" +
        "</div>";
      previewHtml +=
        '<div class="meal-plan-preview-row">' +
        '<span class="meal-plan-preview-day">' +
        day +
        "</span>" +
        "<span>" +
        mealPlan[day] +
        "</span>" +
        "</div>";
    }
  });
  list.innerHTML =
    html ||
    '<p style="font-size:14px;color:#aaa;text-align:center;margin-top:8px;">No meals planned yet</p>';
  if (preview) preview.innerHTML = previewHtml || "No meals planned yet";
}

var shopState = {
  items: [
    {
      id: 101,
      name: "Soy sauce",
      qty: 3,
      unit: "tbsp",
      cat: "Condiments",
      source: "recipe",
      recipe: "Beef & Broccoli",
      checked: false,
    },
    {
      id: 102,
      name: "Olive oil",
      qty: 1,
      unit: "bottles",
      cat: "Oils",
      source: "manual",
      recipe: "",
      checked: false,
    },
    {
      id: 103,
      name: "Baby spinach",
      qty: 5,
      unit: "oz",
      cat: "Produce",
      source: "manual",
      recipe: "",
      checked: true,
    },
    {
      id: 104,
      name: "Cherry tomatoes",
      qty: 1,
      unit: "count",
      cat: "Produce",
      source: "manual",
      recipe: "",
      checked: false,
    },
  ],
  nextId: 200,
  doneQueue: [],
  doneIndex: 0,
};

function renderShoppingList() {
  var recipeUL = document.getElementById("shopListRecipe");
  var manualUL = document.getElementById("shopListManual");
  var checkedUL = document.getElementById("shopListChecked");
  recipeUL.innerHTML = manualUL.innerHTML = checkedUL.innerHTML = "";

  var unchecked = shopState.items.filter(function (i) {
    return !i.checked;
  });
  var checked = shopState.items.filter(function (i) {
    return i.checked;
  });

  unchecked.forEach(function (item) {
    (item.source === "recipe" ? recipeUL : manualUL).appendChild(
      makeShopRow(item),
    );
  });
  checked.forEach(function (item) {
    checkedUL.appendChild(makeShopRow(item));
  });

  document.getElementById("tobuy-count").textContent = unchecked.length;
  document.getElementById("gotit-count").textContent = checked.length;
  document.getElementById("shop-subtitle").textContent =
    shopState.items.length + " items \u00b7 " + checked.length + " checked";
}

function makeShopRow(item) {
  var li = document.createElement("li");
  li.className = "shop-row" + (item.checked ? " checked" : "");
  li.innerHTML =
    '<input type="checkbox"' +
    (item.checked ? " checked" : "") +
    ">" +
    '<div class="shop-row-info">' +
    '<div class="shop-row-name">' +
    item.name +
    "</div>" +
    '<div class="shop-row-meta">' +
    item.qty +
    " " +
    item.unit +
    (item.recipe ? " \u00b7 " + item.recipe : "") +
    "</div>" +
    "</div>" +
    '<span class="shop-row-cat">' +
    item.cat +
    "</span>";

  li.querySelector("input[type=checkbox]").addEventListener(
    "change",
    function () {
      var it = shopState.items.find(function (x) {
        return x.id === item.id;
      });
      if (it) it.checked = this.checked;
      renderShoppingList();
      syncShopTabPanels();
    },
  );
  return li;
}

function syncShopTabPanels() {
  var gotItOn = document
    .getElementById("shop-tab-gotit")
    .classList.contains("on");
  document.getElementById("shop-tobuy-panel").style.display = gotItOn
    ? "none"
    : "block";
  document.getElementById("shop-gotit-panel").style.display = gotItOn
    ? "block"
    : "none";
}

function switchShopTab(tab, btn) {
  document.querySelectorAll(".shop-seg-tab").forEach(function (b) {
    b.classList.remove("on");
  });
  btn.classList.add("on");
  document.getElementById("shop-tobuy-panel").style.display =
    tab === "tobuy" ? "block" : "none";
  document.getElementById("shop-gotit-panel").style.display =
    tab === "gotit" ? "block" : "none";
}

function openShopModal(id) {
  document.getElementById(id).style.display = "flex";
}
function closeShopModal(id) {
  document.getElementById(id).style.display = "none";
}

function setKkSeg(btn, groupId) {
  document
    .querySelectorAll("#" + groupId + " .kk-seg-opt")
    .forEach(function (b) {
      b.classList.remove("on");
    });
  btn.classList.add("on");
}

function getKkSeg(groupId) {
  var on = document.querySelector("#" + groupId + " .kk-seg-opt.on");
  return on ? on.textContent.trim() : "";
}

function openAddShopModal() {
  document.getElementById("shop-inp-name").value = "";
  document.getElementById("shop-inp-qty").value = "1";
  document.getElementById("shop-inp-unit").value = "count";
  document.getElementById("shop-inp-cat").value = "Produce";
  document.getElementById("shop-inp-err").textContent = "";
  openShopModal("addShopModal");
}

function submitAddShopItem() {
  var name = document.getElementById("shop-inp-name").value.trim();
  if (!name) {
    document.getElementById("shop-inp-err").textContent =
      "Please enter an item name.";
    return;
  }
  document.getElementById("shop-inp-err").textContent = "";
  shopState.items.push({
    id: shopState.nextId++,
    name: name,
    qty: parseFloat(document.getElementById("shop-inp-qty").value) || 1,
    unit: document.getElementById("shop-inp-unit").value,
    cat: document.getElementById("shop-inp-cat").value,
    source: "manual",
    recipe: "",
    checked: false,
  });
  closeShopModal("addShopModal");
  renderShoppingList();
}

function shopCatToInvCat(shopCat) {
  var c = String(shopCat || "")
    .toLowerCase()
    .trim();
  if (c === "produce") return "Produce";
  if (c === "dairy") return "Dairy";
  if (c === "protein" || c === "meat" || c === "seafood") return "Protein";
  if (c === "frozen") return "Frozen";
  return "Other";
}

function openDoneShoppingModal() {
  var checked = shopState.items.filter(function (i) {
    return i.checked;
  });
  if (!checked.length) {
    alert("Check off items you have bought first.");
    return;
  }
  shopState.doneQueue = checked.map(function (i) {
    return Object.assign({}, i);
  });
  shopState.doneIndex = 0;
  loadDoneItem();
  openShopModal("doneShopModal");
}

function loadDoneItem() {
  var q = shopState.doneQueue;
  var i = shopState.doneIndex;
  if (i >= q.length) {
    var ids = q.map(function (x) {
      return x.id;
    });
    shopState.items = shopState.items.filter(function (x) {
      return !ids.includes(x.id);
    });
    closeShopModal("doneShopModal");
    renderShoppingList();
    alert("All items added to your inventory!");
    return;
  }
  var item = q[i];
  document.getElementById("done-progress").textContent =
    "Item " + (i + 1) + " of " + q.length;
  document.getElementById("done-item-name").textContent = item.name;
  document.getElementById("done-qty").value = item.qty;
  document.getElementById("done-unit").value = item.unit;
  document.getElementById("done-exp").value = "";
  var sharedEl = document.getElementById("done-shared");
  if (sharedEl) {
    sharedEl.checked = item.source === "recipe";
  }
  document.querySelectorAll("#done-loc .kk-seg-opt").forEach(function (b) {
    b.classList.remove("on");
  });
  document.querySelector("#done-loc .kk-seg-opt").classList.add("on");
  document.getElementById("done-confirm-btn").textContent =
    i < q.length - 1 ? "Confirm & next" : "Confirm & finish";
}

function confirmDoneItem() {
  var q = shopState.doneQueue;
  var i = shopState.doneIndex;
  if (i >= q.length) return;
  var item = q[i];
  var qty = parseFloat(document.getElementById("done-qty").value) || 1;
  var unit = document.getElementById("done-unit").value;
  var exp = document.getElementById("done-exp").value;
  var loc = getKkSeg("done-loc") || "Fridge";
  var invCat = shopCatToInvCat(item.cat);
  var shared = document.getElementById("done-shared").checked;
  if (typeof window.kkAddInvItem === "function") {
    window.kkAddInvItem(item.name, qty, unit, invCat, exp, loc, shared);
  }
  shopState.doneIndex++;
  loadDoneItem();
}

function initApp() {
  Inventory();
  loadProfileFromStorage();
  setupRecipeFilterClicks();
  renderShoppingList();
}

document.addEventListener("DOMContentLoaded", initApp);
