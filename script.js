// ─── Recipe data ──────────────────────────────────────────────────────────────
var recipes = {
  beef: {
    title:"Beef & Broccoli Stir Fry", time:"25 min", skill:"Intermediate", servings:"2 servings",
    tags:["Dairy-free","Uses expiring items"],
    ingredients:[
      {name:"Ground beef", qty:"1 lb",     have:true},
      {name:"Broccoli",    qty:"1 head",   have:true},
      {name:"Garlic",      qty:"3 cloves", have:true},
      {name:"Brown rice",  qty:"1 cup",    have:true},
      {name:"Yellow onion",qty:"1 onion",  have:true},
      {name:"Soy sauce",   qty:"3 tbsp",   have:false}
    ],
    steps:[
      "Cook brown rice per package directions. Set aside.",
      "Slice beef into thin strips. Season with salt and pepper.",
      "Heat oil in a wok over high heat. Cook beef 3–4 min until browned. Remove.",
      "Add onion and garlic to the same pan. Stir fry 2 minutes.",
      "Add broccoli and soy sauce. Cook 3–4 min until tender-crisp.",
      "Return beef to pan, toss everything together, and serve over rice."
    ]
  },
  pasta: {
    title:"Spaghetti Aglio e Olio", time:"20 min", skill:"Beginner", servings:"2 servings",
    tags:["Vegetarian"],
    ingredients:[
      {name:"Spaghetti", qty:"8 oz",    have:true},
      {name:"Garlic",    qty:"6 cloves",have:true},
      {name:"Olive oil", qty:"1/4 cup", have:true},
      {name:"Parsley",   qty:"2 tbsp",  have:false},
      {name:"Parmesan",  qty:"1/4 cup", have:false}
    ],
    steps:[
      "Boil salted water and cook spaghetti until al dente. Reserve half cup pasta water.",
      "Thinly slice garlic. Heat olive oil in a large pan over medium-low heat.",
      "Add garlic and cook gently for 3–4 min until golden.",
      "Add drained pasta and splash of pasta water. Toss to coat.",
      "Finish with parsley and parmesan. Serve immediately."
    ]
  },
  "fried-rice":{
    title:"Chicken Fried Rice", time:"30 min", skill:"Beginner", servings:"3 servings",
    tags:["Gluten-free","Dairy-free"],
    ingredients:[
      {name:"Chicken breast",qty:"1 lb",    have:true},
      {name:"Brown rice",    qty:"2 cups",  have:true},
      {name:"Eggs",          qty:"2",       have:true},
      {name:"Sesame oil",    qty:"1 tbsp",  have:true},
      {name:"Yellow onion",  qty:"1 onion", have:true},
      {name:"Garlic",        qty:"2 cloves",have:true},
      {name:"Soy sauce",     qty:"2 tbsp",  have:false}
    ],
    steps:[
      "Cook rice ahead of time and let cool.",
      "Dice chicken and cook in oil over high heat until cooked through. Set aside.",
      "In the same pan scramble eggs until just set. Push to side.",
      "Add onion and garlic, cook 2 min. Add cold rice and stir fry 3–4 min.",
      "Add chicken back in. Drizzle with soy sauce and sesame oil. Toss well.",
      "Taste and adjust seasoning. Serve hot."
    ]
  },
  eggs:{
    title:"Cheesy Scrambled Eggs", time:"10 min", skill:"Beginner", servings:"1 serving",
    tags:["Vegetarian"],
    ingredients:[
      {name:"Eggs",          qty:"3",     have:true},
      {name:"Cheddar cheese",qty:"2 oz",  have:true},
      {name:"Whole milk",    qty:"2 tbsp",have:true},
      {name:"Butter",        qty:"1 tbsp",have:true}
    ],
    steps:[
      "Crack eggs into a bowl. Add milk and a pinch of salt. Whisk well.",
      "Melt butter in a non-stick pan over medium-low heat.",
      "Pour in eggs. Stir slowly and constantly with a spatula.",
      "When eggs are almost set but still slightly glossy, remove from heat.",
      "Fold in cheddar cheese. Serve immediately on toast."
    ]
  },
  "rice-bowl":{
    title:"Beef & Rice Bowl", time:"35 min", skill:"Beginner", servings:"2 servings",
    tags:["Gluten-free","Dairy-free"],
    ingredients:[
      {name:"Ground beef",  qty:"1 lb",    have:true},
      {name:"Brown rice",   qty:"1.5 cups",have:true},
      {name:"Yellow onion", qty:"1 onion", have:true},
      {name:"Garlic",       qty:"2 cloves",have:true},
      {name:"Olive oil",    qty:"1 tbsp",  have:true}
    ],
    steps:[
      "Cook brown rice per package directions.",
      "Dice onion and mince garlic. Heat oil in a pan over medium heat.",
      "Add onion and cook 3 min until softened. Add garlic cook 1 min.",
      "Add ground beef. Cook breaking up with a spoon until browned.",
      "Season with salt and pepper. Serve beef mixture over rice."
    ]
  }
};

// ─── State ────────────────────────────────────────────────────────────────────
var invItems    = [];   // {id, name, qty, unit, cat, exp, loc, shared}
var invNextId   = 100;
var deleteTargetId = null;

var shopItems   = [
  {id:500, name:"Soy sauce",        qty:1,  unit:"bottle", cat:"Condiments", src:"recipe", recipe:"Beef & Broccoli Stir Fry", checked:false},
  {id:501, name:"Parsley",          qty:1,  unit:"bunch",  cat:"Produce",    src:"recipe", recipe:"Spaghetti Aglio e Olio",   checked:false},
  {id:502, name:"Parmesan",         qty:4,  unit:"oz",     cat:"Dairy",      src:"recipe", recipe:"Spaghetti Aglio e Olio",   checked:false},
  {id:503, name:"Cherry tomatoes",  qty:1,  unit:"pint",   cat:"Produce",    src:"manual", recipe:"",                          checked:false},
  {id:504, name:"Greek yogurt",     qty:2,  unit:"cups",   cat:"Dairy",      src:"manual", recipe:"",                          checked:false},
  {id:505, name:"Sriracha",         qty:1,  unit:"bottle", cat:"Condiments", src:"manual", recipe:"",                          checked:false},
  {id:506, name:"Lemon",            qty:3,  unit:"count",  cat:"Produce",    src:"manual", recipe:"",                          checked:false},
  {id:507, name:"Whole wheat bread",qty:1,  unit:"loaf",   cat:"Grain",      src:"manual", recipe:"",                          checked:false},
  {id:508, name:"Peanut butter",    qty:1,  unit:"jar",    cat:"Other",      src:"manual", recipe:"",                          checked:true},
  {id:509, name:"Oat milk",         qty:1,  unit:"carton", cat:"Dairy",      src:"manual", recipe:"",                          checked:true}
];
var shopNextId  = 600;

var mealPlan    = {
  "Monday":    [{title:"Cheesy Scrambled Eggs",      mealType:"Breakfast"}, {title:"Chicken Fried Rice",       mealType:"Dinner"}],
  "Tuesday":   [{title:"Beef & Broccoli Stir Fry",   mealType:"Dinner"}],
  "Wednesday": [{title:"Spaghetti Aglio e Olio",     mealType:"Dinner"}],
  "Thursday":  [{title:"Cheesy Scrambled Eggs",      mealType:"Breakfast"}, {title:"Beef & Rice Bowl",          mealType:"Dinner"}],
  "Friday":    [{title:"Chicken Fried Rice",          mealType:"Dinner"}],
  "Saturday":  [{title:"Beef & Broccoli Stir Fry",   mealType:"Lunch"},   {title:"Beef & Rice Bowl",          mealType:"Dinner"}],
  "Sunday":    [{title:"Cheesy Scrambled Eggs",      mealType:"Breakfast"}]
};  // {day: [{title, mealType}]}
var currentRecipe = null;
var roommateOn  = false;
var typeFiltActive = "";
var locFiltActive  = "";

var doneQueue   = [];
var doneIdx     = 0;

var seedItems = [
  {name:"Chicken breast", qty:2,  unit:"lbs",    cat:"Protein", exp:"2026-05-08", loc:"Fridge",  shared:true},
  {name:"Ground beef",    qty:1,  unit:"lb",     cat:"Protein", exp:"2026-05-09", loc:"Fridge",  shared:true},
  {name:"Eggs",           qty:12, unit:"count",  cat:"Protein", exp:"2026-05-20", loc:"Fridge",  shared:false},
  {name:"Cheddar cheese", qty:8,  unit:"oz",     cat:"Dairy",   exp:"2026-05-18", loc:"Fridge",  shared:true},
  {name:"Whole milk",     qty:1,  unit:"gallon", cat:"Dairy",   exp:"2026-05-10", loc:"Fridge",  shared:true},
  {name:"Butter",         qty:2,  unit:"count",  cat:"Dairy",   exp:"2026-07-01", loc:"Fridge",  shared:true},
  {name:"Broccoli",       qty:1,  unit:"head",   cat:"Produce", exp:"2026-05-08", loc:"Fridge",  shared:false},
  {name:"Spinach",        qty:1,  unit:"bag",    cat:"Produce", exp:"2026-05-07", loc:"Fridge",  shared:false},
  {name:"Apples",         qty:6,  unit:"count",  cat:"Produce", exp:"2026-05-14", loc:"Fridge",  shared:false},
  {name:"Bananas",        qty:5,  unit:"count",  cat:"Produce", exp:"2026-05-09", loc:"Pantry",  shared:true},
  {name:"Garlic",         qty:1,  unit:"head",   cat:"Produce", exp:"2026-06-01", loc:"Pantry",  shared:true},
  {name:"Yellow onion",   qty:3,  unit:"count",  cat:"Produce", exp:"2026-06-01", loc:"Pantry",  shared:true},
  {name:"Brown rice",     qty:2,  unit:"lbs",    cat:"Grain",  exp:"2027-01-01", loc:"Pantry",  shared:true},
  {name:"Spaghetti",      qty:1,  unit:"box",    cat:"Grain",  exp:"2027-03-01", loc:"Pantry",  shared:false},
  {name:"Olive oil",      qty:1,  unit:"bottle", cat:"Other",  exp:"2026-12-01", loc:"Pantry",  shared:true},
  {name:"Sesame oil",     qty:1,  unit:"bottle", cat:"Other",  exp:"2026-11-01", loc:"Pantry",  shared:false},
  {name:"Soy sauce",      qty:1,  unit:"bottle", cat:"Other",  exp:"2026-10-01", loc:"Pantry",  shared:true},
  {name:"Ground turkey",  qty:1,  unit:"lb",     cat:"Protein", exp:"2026-05-15", loc:"Freezer", shared:true},
  {name:"Frozen peas",    qty:2,  unit:"cups",   cat:"Produce", exp:"2026-12-01", loc:"Freezer", shared:false},
  {name:"Frozen shrimp",  qty:1,  unit:"lb",     cat:"Protein", exp:"2026-10-01", loc:"Freezer", shared:true},
  {name:"Yogurt",         qty:3,  unit:"count",  cat:"Dairy",   exp:"2026-05-12", loc:"Fridge",  shared:false},
  {name:"Bell pepper",    qty:2,  unit:"count",  cat:"Produce", exp:"2026-05-11", loc:"Fridge",  shared:true},
  {name:"Carrots",        qty:1,  unit:"bag",    cat:"Produce", exp:"2026-05-20", loc:"Fridge",  shared:true},
  {name:"Oat milk",       qty:1,  unit:"carton", cat:"Dairy",   exp:"2026-05-16", loc:"Fridge",  shared:true},
  {name:"Bread",          qty:1,  unit:"loaf",   cat:"Grain",   exp:"2026-05-10", loc:"Pantry",  shared:true},
  {name:"Peanut butter",  qty:1,  unit:"jar",    cat:"Other",   exp:"2026-11-01", loc:"Pantry",  shared:false},
  {name:"Honey",          qty:1,  unit:"bottle", cat:"Other",   exp:"2027-01-01", loc:"Pantry",  shared:true},
  {name:"Black beans",    qty:2,  unit:"cans",   cat:"Protein", exp:"2027-06-01", loc:"Pantry",  shared:true},
  {name:"Diced tomatoes", qty:2,  unit:"cans",   cat:"Produce", exp:"2027-06-01", loc:"Pantry",  shared:true}
];

// ─── Toast (no window.alert / confirm ever) ───────────────────────────────────
function showToast(msg) {
  var t = document.getElementById("toastBar");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(function() { t.classList.remove("show"); }, 2800);
}

// ─── Tab switching ────────────────────────────────────────────────────────────
function openTab(e, tabId) {
  document.querySelectorAll(".tabcontent").forEach(function(t){ t.style.display="none"; });
  document.querySelectorAll(".tablinks").forEach(function(b){ b.classList.remove("active"); });
  document.getElementById(tabId).style.display="flex";
  e.currentTarget.classList.add("active");
  if (tabId === "recipes") applyDietaryPref();
}

function pickSeg(btn, groupId) {
  document.querySelectorAll("#"+groupId+" .segBtn").forEach(function(b){ b.classList.remove("active"); });
  btn.classList.add("active");
}
function getSegVal(groupId) {
  var b = document.querySelector("#"+groupId+" .segBtn.active");
  return b ? b.textContent.trim() : "";
}

// ─── Inventory rendering ─────────────────────────────────────────────────────
function renderInv() {
  var ul = document.getElementById("inventoryList");
  ul.innerHTML = "";
  var today = new Date();
  invItems.forEach(function(item) {
    if (typeFiltActive && item.cat !== typeFiltActive) return;
    if (locFiltActive  && item.loc !== locFiltActive)  return;

    var daysLeft = item.exp ? (new Date(item.exp) - today) / 86400000 : 999;
    var expBadge = "";
    if (item.exp && daysLeft <= 0)   expBadge = '<span class="badge expiredBadge">Expired</span>';
    else if (item.exp && daysLeft<=5) expBadge = '<span class="badge expiringBadge">Expiring</span>';

    var shareBadge = "";
    if (roommateOn) {
      shareBadge = item.shared
        ? '<span class="badge sharedBadge">Shared</span>'
        : '<span class="badge personalBadge">Personal</span>';
    }

    var dotColor = daysLeft <= 0 ? "#b91c1c" : daysLeft <= 5 ? "#b45309" : "#1b5e3b";
    var li = document.createElement("li");
    li.className = "invItem";
    li.innerHTML =
      '<span class="invDot" style="background:'+dotColor+'"></span>'+
      '<div class="invNameCell">'+
        '<span class="invName">'+item.name+'</span>'+
        '<span class="invBadges">'+
          '<span class="badge locBadge">'+item.loc+'</span>'+
          '<span class="badge catBadge">'+item.cat+'</span>'+
          expBadge+shareBadge+
        '</span>'+
      '</div>'+
      '<span class="invQtyBlock">'+
        '<button class="qtyBtn" onclick="changeInvQty('+item.id+',-1)">&#8722;</button>'+
        '<span class="qtyVal">'+item.qty+' '+item.unit+'</span>'+
        '<button class="qtyBtn" onclick="changeInvQty('+item.id+',1)">+</button>'+
      '</span>'+
      '<button class="editBtn" onclick="openEditItem('+item.id+')" title="Edit">&#9998;</button>'+
      '<button class="delBtn" onclick="promptDelete('+item.id+')" title="Remove">&#10005;</button>';
    ul.appendChild(li);
  });
}

function changeInvQty(id, delta) {
  var item = invItems.find(function(x){ return x.id===id; });
  if (!item) return;
  var nq = item.qty + delta;
  if (nq < 1) { promptDelete(id); return; }  // confirm before removing
  item.qty = nq;
  renderInv();
}

// In-app delete confirmation (never window.confirm)
function promptDelete(id) {
  var item = invItems.find(function(x){ return x.id===id; });
  if (!item) return;
  deleteTargetId = id;
  document.getElementById("deleteItemName").textContent = item.name;
  document.getElementById("deleteModal").style.display = "flex";
}
function confirmDelete() {
  invItems = invItems.filter(function(x){ return x.id!==deleteTargetId; });
  closeModal("deleteModal");
  renderInv();
  showToast("Item removed from inventory.");
}

// Edit item
function openEditItem(id) {
  var item = invItems.find(function(x){ return x.id===id; });
  if (!item) return;
  document.getElementById("editItemId").value = id;
  document.getElementById("editName").value   = item.name;
  document.getElementById("editQty").value    = item.qty;
  document.getElementById("editUnit").value   = item.unit;
  document.getElementById("editCat").value    = item.cat;
  document.getElementById("editExp").value    = item.exp || "";
  document.getElementById("editShared").checked = item.shared;
  var lBtns = document.querySelectorAll("#editLocSeg .segBtn");
  lBtns.forEach(function(b){ b.classList.toggle("active", b.textContent.trim()===item.loc); });
  document.getElementById("editModal").style.display = "flex";
}
function saveEditItem() {
  var id   = parseInt(document.getElementById("editItemId").value);
  var item = invItems.find(function(x){ return x.id===id; });
  if (!item) return;
  item.name   = document.getElementById("editName").value.trim() || item.name;
  item.qty    = Math.max(1, parseInt(document.getElementById("editQty").value)||1);
  item.unit   = document.getElementById("editUnit").value;
  item.cat    = document.getElementById("editCat").value;
  item.exp    = document.getElementById("editExp").value;
  item.loc    = getSegVal("editLocSeg") || item.loc;
  item.shared = document.getElementById("editShared").checked;
  closeModal("editModal");
  renderInv();
  showToast("Item updated.");
}

// Seed
seedItems.forEach(function(s){
  invItems.push({id:invNextId++, name:s.name, qty:s.qty, unit:s.unit,
    cat:s.cat, exp:s.exp, loc:s.loc, shared:s.shared});
});
renderInv();

// Add Item
document.getElementById("myBtn").onclick = function() {
  document.getElementById("invenName").value="";
  document.getElementById("inventQty").value="1";
  document.getElementById("invenExp").value="";
  document.getElementById("inven-err").textContent="";
  document.getElementById("myModal").style.display="flex";
};
document.getElementById("closeModal").onclick = function(){ closeModal("myModal"); };
document.getElementById("addInventoryBtn").onclick = function() {
  var n = document.getElementById("invenName").value.trim();
  if (!n) { document.getElementById("inven-err").textContent="Please enter a name."; return; }
  var q  = Math.max(1, parseInt(document.getElementById("inventQty").value)||1);
  var u  = document.getElementById("invenUnit").value;
  var c  = document.getElementById("invenCat").value;
  var ex = document.getElementById("invenExp").value;
  var lc = getSegVal("locSeg")||"Fridge";
  var sh = document.getElementById("invenShared").checked;
  invItems.push({id:invNextId++, name:n, qty:q, unit:u, cat:c, exp:ex, loc:lc, shared:sh});
  closeModal("myModal");
  renderInv();
  showToast(n+" added to your kitchen!");
};

// ─── Inventory filters (type AND loc simultaneously; toggle off on second tap) ──
function filterAll(btn) {
  typeFiltActive=""; locFiltActive="";
  document.querySelectorAll(".filt.typeFilt,.filt.locFilt").forEach(function(f){ f.classList.remove("active"); });
  btn.classList.add("active");
  renderInv();
}
function toggleTypeFilt(val, btn) {
  if (typeFiltActive===val) { typeFiltActive=""; btn.classList.remove("active"); }
  else { typeFiltActive=val; document.querySelectorAll(".filt.typeFilt").forEach(function(f){ f.classList.remove("active"); }); btn.classList.add("active"); }
  document.getElementById("filtAll").classList.remove("active");
  renderInv();
}
function toggleLocFilt(val, btn) {
  if (locFiltActive===val) { locFiltActive=""; btn.classList.remove("active"); }
  else { locFiltActive=val; document.querySelectorAll(".filt.locFilt").forEach(function(f){ f.classList.remove("active"); }); btn.classList.add("active"); }
  document.getElementById("filtAll").classList.remove("active");
  renderInv();
}

// ─── Recipe filters ───────────────────────────────────────────────────────────
var activeDietFilter = "all";
function recipeFilterBtn(btn) {
  document.querySelectorAll("#recipeList .recipeCard").forEach(function(c){ c.style.display="flex"; });
  document.querySelectorAll("#recipes .filterBar .filt").forEach(function(f){ f.classList.remove("active"); });
  btn.classList.add("active");
  activeDietFilter = btn.dataset.filter;
  applyRecipeFilters();
}
function applyRecipeFilters() {
  var search = (document.getElementById("recipeSearch").value||"").toLowerCase().trim();
  var owned  = document.getElementById("togOwned").classList.contains("active");
  document.querySelectorAll(".recipeCard").forEach(function(c){
    var matchDiet   = (!activeDietFilter || activeDietFilter==="all" || c.dataset.tags.indexOf(activeDietFilter)!==-1);
    var matchSearch = !search || c.querySelector(".recipeName").textContent.toLowerCase().indexOf(search)!==-1;
    var matchOwned  = !owned  || (function(){ var p=c.dataset.ing.split("/"); return p[0]===p[1]; })();
    c.style.display = (matchDiet && matchSearch && matchOwned) ? "flex" : "none";
  });
}
function showAll(btn) {
  document.querySelectorAll(".togBtn").forEach(function(b){ b.classList.remove("active"); });
  btn.classList.add("active");
  applyRecipeFilters();
}
function showOwned(btn) {
  document.querySelectorAll(".togBtn").forEach(function(b){ b.classList.remove("active"); });
  btn.classList.add("active");
  applyRecipeFilters();
}

// Dietary preference from profile auto-applied
function applyDietaryPref() {
  var pref = localStorage.getItem("profileRestriction")||"";
  var banner = document.getElementById("dietaryBanner");
  var map = {vegetarian:"vegetarian",vegan:"vegetarian","gluten-free":"gluten-free","dairy-free":"dairy-free"};
  var fKey = map[pref];
  if (fKey) {
    document.getElementById("dietaryBannerText").textContent = "Filtered by your profile: "+pref.charAt(0).toUpperCase()+pref.slice(1);
    banner.style.display="flex";
    activeDietFilter = fKey;
    document.querySelectorAll("#recipes .filterBar .filt").forEach(function(f){
      f.classList.toggle("active", f.dataset.filter===fKey);
    });
    applyRecipeFilters();
  } else {
    banner.style.display="none";
  }
}
function clearDietaryFilter() {
  document.getElementById("dietaryBanner").style.display="none";
  activeDietFilter="all";
  document.querySelectorAll("#recipes .filterBar .filt").forEach(function(f){ f.classList.toggle("active", f.dataset.filter==="all"); });
  applyRecipeFilters();
}

// ─── Recipe detail ────────────────────────────────────────────────────────────
function openRecipe(key) {
  var r = recipes[key];
  if (!r) return;
  currentRecipe = key;
  document.getElementById("rd-title").textContent = r.title;
  var hero = document.getElementById("rd-hero");
  hero.src = encodeURIComponent(r.title+".png"); hero.alt = r.title;
  document.getElementById("rd-meta").innerHTML =
    '<span class="metaChip">&#x23F1; '+r.time+'</span>'+
    '<span class="metaChip">&#x1F374; '+r.servings+'</span>'+
    '<span class="metaChip">&#x1F52A; '+r.skill+'</span>';
  var tagHtml="";
  r.tags.forEach(function(t){ tagHtml+='<span class="tag '+tagClass(t)+'">'+t+'</span>'; });
  document.getElementById("rd-tags").innerHTML=tagHtml;

  var ingrEl = document.getElementById("rd-ingr-list");
  ingrEl.innerHTML="";
  var hasMissing=false;
  r.ingredients.forEach(function(ing){
    if (!ing.have) hasMissing=true;
    var row=document.createElement("div"); row.className="ingrRow";
    row.innerHTML='<span class="ingrCheck '+(ing.have?"ingrYes":"ingrNo")+'">'+(ing.have?"&#x2713;":"&#x2717;")+'</span>'+
      '<span class="ingrName">'+ing.name+'</span><span class="ingrQty">'+ing.qty+'</span>';
    ingrEl.appendChild(row);
  });
  document.getElementById("rd-add-missing-btn").style.display = hasMissing?"block":"none";

  var stepsEl = document.getElementById("rd-steps-list");
  stepsEl.innerHTML="";
  r.steps.forEach(function(step,i){
    var row=document.createElement("div"); row.className="stepRow";
    row.innerHTML='<div class="stepNum">'+(i+1)+'</div><div class="stepText">'+step+'</div>';
    stepsEl.appendChild(row);
  });
  document.querySelectorAll(".tabcontent").forEach(function(t){ t.style.display="none"; });
  document.getElementById("recipe-detail").style.display="flex";
  document.querySelectorAll(".tablinks").forEach(function(b){ b.classList.remove("active"); });
}
function closeRecipe() {
  document.getElementById("recipe-detail").style.display="none";
  document.getElementById("recipes").style.display="flex";
  document.querySelectorAll(".tablinks").forEach(function(b){ b.classList.remove("active"); });
  var rb = document.getElementById("tab-btn-recipes"); if (rb) rb.classList.add("active");
}
function tagClass(t) {
  if (t==="Vegetarian") return "tagGreen";
  if (t==="Uses expiring items") return "tagWarn";
  return "tagBlue";
}

function addMissingToShopping() {
  var r=recipes[currentRecipe]; if (!r) return;
  var count=0;
  r.ingredients.forEach(function(ing){
    if (!ing.have && !shopItems.some(function(s){ return s.name.toLowerCase()===ing.name.toLowerCase(); })) {
      shopItems.push({id:shopNextId++, name:ing.name, qty:1, unit:"count", cat:"Other",
        src:"recipe", recipe:r.title, checked:false});
      count++;
    }
  });
  renderShopList();
  showToast(count>0 ? count+" item(s) added to your shopping list." : "All missing items already on your list.");
}

// ─── Meal plan ────────────────────────────────────────────────────────────────
function quickAddMealPlan(key) {
  currentRecipe = key;
  openAddToMealPlan();
}
function openAddToMealPlan() {
  var r = currentRecipe ? recipes[currentRecipe] : null;
  document.getElementById("cal-recipe-name").textContent = r ? r.title : "";
  document.querySelectorAll(".calDayBtn").forEach(function(b){ b.classList.remove("calDayActive"); });
  renderPlanPreview();
  document.getElementById("addMealModal").style.display="flex";
}
function toggleDay(btn) {
  btn.classList.toggle("calDayActive");
  renderPlanPreview();
}
function renderPlanPreview() {
  var el = document.getElementById("planPreviewInModal");
  var html="";
  var days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  days.forEach(function(d){
    if (mealPlan[d]) mealPlan[d].forEach(function(entry){
      var safeD=d.replace(/'/g,"\\'"), safeT=entry.title.replace(/'/g,"\\'"), safeMT=entry.mealType.replace(/'/g,"\\'");
      html+='<div class="planRow"><span class="planRowDay">'+d.slice(0,3)+'</span>'+
        '<span class="planRowMeal">'+entry.title+'</span>'+
        '<span class="planRowType">'+entry.mealType+'</span>'+
        '<button class="planRowDel" onclick="removePlanEntry(\''+safeD+'\',\''+safeT+'\',\''+safeMT+'\')">&#x2715;</button></div>';
    });
  });
  el.innerHTML = html || '<p class="emptyMsg">No meals planned yet</p>';
}
function removePlanEntry(day, title, mealType) {
  if (mealPlan[day]) {
    mealPlan[day] = mealPlan[day].filter(function(e){ return !(e.title===title && e.mealType===mealType); });
    if (!mealPlan[day].length) delete mealPlan[day];
  }
  renderPlanPreview();
  renderWeekPreview();
}
function confirmMealPlan() {
  var r = currentRecipe ? recipes[currentRecipe] : null;
  if (!r) return;
  var mealType = getSegVal("mealTypeSeg")||"Dinner";
  var selected = document.querySelectorAll(".calDayBtn.calDayActive");
  if (!selected.length) { showToast("Please tap at least one day."); return; }
  selected.forEach(function(btn){
    var day = btn.dataset.day;
    if (!mealPlan[day]) mealPlan[day]=[];
    var dup = mealPlan[day].some(function(e){ return e.title===r.title && e.mealType===mealType; });
    if (!dup) mealPlan[day].push({title:r.title, mealType:mealType});
  });
  renderWeekPreview();
  renderPlanPreview();
  closeModal("addMealModal");
  showToast("Added to your meal plan!");
}
function renderWeekPreview() {
  var days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  var html = "";
  days.forEach(function(d){
    var entries = mealPlan[d];
    if (!entries || !entries.length) return;
    // All meals for this day joined on ONE line: "B: Eggs · D: Fried Rice"
    var meals = entries.map(function(e){
      return e.mealType.charAt(0) + ": " + e.title;
    }).join(" &middot; ");
    html += '<div class="wpRow"><span class="wpDay">' + d.slice(0,3) + '</span><span class="wpMeals">' + meals + '</span></div>';
  });
  document.getElementById("weekPreview").innerHTML = html || "<span class='wpEmpty'>No meals planned yet</span>";
}
function openViewPlan() {
  var days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  var html="";
  days.forEach(function(d){
    html+='<div class="vpDayRow"><span class="vpDayName">'+d+'</span><span class="vpMeals">';
    if (mealPlan[d] && mealPlan[d].length) {
      html += mealPlan[d].map(function(e){ return e.mealType+": "+e.title; }).join("<br>");
    } else { html+='<span style="color:#bbb">&#x2014;</span>'; }
    html+='</span></div>';
  });
  document.getElementById("viewPlanList").innerHTML = html;
  document.getElementById("viewPlanModal").style.display="flex";
}

// ─── Shopping list ────────────────────────────────────────────────────────────
function renderShopList() {
  var ul = document.getElementById("shopList");
  ul.innerHTML="";
  var unchecked = shopItems.filter(function(x){ return !x.checked; });
  var checked   = shopItems.filter(function(x){ return  x.checked; });

  function makeRow(item) {
    var li = document.createElement("li");
    li.className = "shopRow" + (item.checked?" checked":"");
    var meta = item.qty+" "+item.unit + (item.recipe?" · "+item.recipe:"");
    li.innerHTML =
      '<label class="shopCheckWrap">'+
        '<input type="checkbox"'+(item.checked?" checked":"")+'>'+
        '<span class="shopCB">'+(item.checked?"&#x2713;":"")+'</span>'+
      '</label>'+
      '<div class="shopInfo">'+
        '<div class="shopName">'+item.name+'</div>'+
        '<div class="shopMeta">'+meta+'</div>'+
      '</div>'+
      '<span class="shopCatBadge">'+item.cat+'</span>'+
      '<button class="shopEditBtn" onclick="openEditShop('+item.id+')" title="Edit">&#9998;</button>'+
      '<button class="shopDelBtn" onclick="deleteShopItem('+item.id+')" title="Remove">&#x2715;</button>';
    var cb = li.querySelector("input[type=checkbox]");
    var id = item.id;
    cb.addEventListener("change", function(){
      var s = shopItems.find(function(x){ return x.id===id; });
      if (s) s.checked = cb.checked;
      renderShopList();
    });
    return li;
  }

  unchecked.forEach(function(item){ ul.appendChild(makeRow(item)); });
  if (checked.length && unchecked.length) {
    var sep=document.createElement("li"); sep.className="shopSepRow"; sep.textContent="Got it ("+checked.length+")";
    ul.appendChild(sep);
  }
  checked.forEach(function(item){ ul.appendChild(makeRow(item)); });

  document.getElementById("shop-subtitle").textContent = shopItems.length+" items · "+checked.length+" checked";
}

function deleteShopItem(id) {
  shopItems = shopItems.filter(function(x){ return x.id!==id; });
  renderShopList();
  showToast("Item removed from list.");
}
function openEditShop(id) {
  var item = shopItems.find(function(x){ return x.id===id; });
  if (!item) return;
  document.getElementById("editShop-id").value   = id;
  document.getElementById("editShop-name").value = item.name;
  document.getElementById("editShop-qty").value  = item.qty;
  document.getElementById("editShop-unit").value = item.unit;
  document.getElementById("editShop-cat").value  = item.cat;
  document.getElementById("editShopModal").style.display="flex";
}
function saveShopEdit() {
  var id   = parseInt(document.getElementById("editShop-id").value);
  var item = shopItems.find(function(x){ return x.id===id; });
  if (!item) return;
  item.name = document.getElementById("editShop-name").value.trim()||item.name;
  item.qty  = Math.max(1, parseInt(document.getElementById("editShop-qty").value)||1);
  item.unit = document.getElementById("editShop-unit").value;
  item.cat  = document.getElementById("editShop-cat").value;
  closeModal("editShopModal");
  renderShopList();
  showToast("Item updated.");
}
function openAddShop() {
  document.getElementById("shop-inp-name").value="";
  document.getElementById("shop-inp-qty").value="1";
  document.getElementById("shop-inp-err").textContent="";
  document.getElementById("addShopModal").style.display="flex";
}
function submitShopItem() {
  var name=document.getElementById("shop-inp-name").value.trim();
  if (!name) { document.getElementById("shop-inp-err").textContent="Please enter an item name."; return; }
  var qty=Math.max(1, parseInt(document.getElementById("shop-inp-qty").value)||1);
  shopItems.push({id:shopNextId++, name:name, qty:qty,
    unit:document.getElementById("shop-inp-unit").value,
    cat:document.getElementById("shop-inp-cat").value,
    src:"manual", recipe:"", checked:false});
  closeModal("addShopModal");
  renderShopList();
  showToast(name+" added to your list.");
}
function openDoneShopping() {
  var checked=shopItems.filter(function(x){ return x.checked; });
  if (!checked.length) { showToast("Check off items you've bought first."); return; }
  doneQueue=checked.slice(); doneIdx=0;
  loadDoneItem();
  document.getElementById("doneShopModal").style.display="flex";
}
function loadDoneItem() {
  if (doneIdx>=doneQueue.length) {
    var ids=doneQueue.map(function(x){ return x.id; });
    shopItems=shopItems.filter(function(x){ return ids.indexOf(x.id)===-1; });
    closeModal("doneShopModal");
    renderShopList();
    showToast("Purchased items added to your inventory!");
    return;
  }
  var item=doneQueue[doneIdx];
  document.getElementById("done-progress").textContent="Item "+(doneIdx+1)+" of "+doneQueue.length;
  document.getElementById("done-item-name").textContent=item.name;
  document.getElementById("done-qty").value=item.qty;
  document.getElementById("done-unit").value=item.unit;
  document.getElementById("done-exp").value="";
  document.getElementById("done-shared").checked=false;
  document.querySelectorAll("#done-loc .segBtn").forEach(function(b,i){ b.classList.toggle("active",i===0); });
  document.getElementById("done-confirm-btn").textContent=
    doneIdx===doneQueue.length-1?"Confirm & finish":"Confirm & next";
}
function confirmDoneItem() {
  var item=doneQueue[doneIdx];
  var qty=Math.max(1,parseInt(document.getElementById("done-qty").value)||1);
  invItems.push({id:invNextId++, name:item.name, qty:qty,
    unit:document.getElementById("done-unit").value,
    cat:"Other", exp:document.getElementById("done-exp").value,
    loc:getSegVal("done-loc")||"Fridge",
    shared:document.getElementById("done-shared").checked});
  renderInv();
  doneIdx++;
  loadDoneItem();
}

// ─── Profile ──────────────────────────────────────────────────────────────────
function saveProfile() {
  var r=document.getElementById("profileRestriction").value;
  var s=document.getElementById("profileSkill").value;
  var t=document.getElementById("profileTime").value;
  localStorage.setItem("profileRestriction",r);
  localStorage.setItem("profileSkill",s);
  localStorage.setItem("profileTime",t);
  // Update summary card
  document.getElementById("summDiet").textContent  = r ? r.charAt(0).toUpperCase()+r.slice(1) : "None";
  document.getElementById("summSkill").textContent = s || "Not set";
  document.getElementById("summTime").textContent  = t || "Not set";
  applyDietaryPref();
  applyRoommateMode();
  var msg=document.getElementById("profileMsg");
  msg.style.color="#1b5e3b";
  msg.textContent="&#x2713; Preferences saved. Recipe tab updated.";
  setTimeout(function(){ msg.textContent=""; },3000);
}
function applyRoommateMode() {
  roommateOn = document.getElementById("roommateToggle").checked;
  document.getElementById("roommateNames").style.display = roommateOn?"flex":"none";
  renderInv();
}
function loadProfile() {
  var r=localStorage.getItem("profileRestriction");
  var s=localStorage.getItem("profileSkill");
  var t=localStorage.getItem("profileTime");
  var m=localStorage.getItem("roommateMode");
  if (r) { document.getElementById("profileRestriction").value=r; document.getElementById("summDiet").textContent=r.charAt(0).toUpperCase()+r.slice(1); }
  if (s) { document.getElementById("profileSkill").value=s; document.getElementById("summSkill").textContent=s; }
  if (t) { document.getElementById("profileTime").value=t; document.getElementById("summTime").textContent=t; }
  if (m==="true") { document.getElementById("roommateToggle").checked=true; applyRoommateMode(); }
}

// ─── Modal utilities ──────────────────────────────────────────────────────────
function closeModal(id) { document.getElementById(id).style.display="none"; }
window.onclick = function(ev) {
  ["myModal","editModal","deleteModal","addShopModal","editShopModal","doneShopModal","addMealModal","viewPlanModal"].forEach(function(id){
    var el=document.getElementById(id);
    if (el && ev.target===el) el.style.display="none";
  });
};

// ─── Init ─────────────────────────────────────────────────────────────────────
loadProfile();
renderShopList();
renderWeekPreview();