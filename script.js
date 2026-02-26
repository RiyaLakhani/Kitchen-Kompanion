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

function displayForm(evt) {
  const radioButton = document.querySelector('input[name="selection1"]:checked');
  const dropdown = document.getElementById("selection2");

  if (!radioButton || !dropdown.value) {
    document.getElementById("selections").textContent = "Please select a camera mode and camera quality.";
  } else {
    const text = `Camera mode: ${radioButton.value}` + "<br>" + `Camera quality: ${dropdown.value}`;
    document.getElementById("selections").innerHTML = text
  }

}