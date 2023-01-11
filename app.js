const body = document.querySelector("body");

// -----------------------------------------------------------------
const burger = document.querySelector('#burger')
const nav = document.querySelector('nav')
var windowsWidth = window.innerWidth;
if (windowsWidth <= 960) {reducetNav()}
if (windowsWidth > 960) {defaultNav()}
window.addEventListener('resize', () =>{
  windowsWidth = window.innerWidth;
  if (windowsWidth <= 960) {reducetNav()}
  if (windowsWidth > 960) {defaultNav()}
})
function defaultNav() {
  burger.style.display = "none";
  burger.className = "hamburger_open";
  nav.style.display = "block";
  nav.className = "default";
}
function reducetNav() {
  burger.style.display = "block";
  burger.className = "hamburger";
  nav.style.display = "none";
  nav.className = "default";
  burger.className = "hamburger"
}
function superposedNav() {
  burger.style.display = "block";
  burger.className = "hamburger_open";
  nav.style.display = "block";
  nav.className = "open";
  burger.className = "hamburger_open"
}
burger.addEventListener('click', () =>{
  if (burger.className === "hamburger") {
    superposedNav()
  }
  else if (burger.className === "hamburger_open") {
    reducetNav()
  }
  let sel = document.getSelection();
  sel.removeAllRanges();
})
// -----------------------------------------------------------------
allGrabZone = document.querySelectorAll(".grabzone")
window.addEventListener("resize", () => {
  allGrabZone.forEach((grabZone) => {
    closeTicket(grabZone.firstChild)
  })
})
var zIndex = 1;
function grababab() {
  allGrabZone.forEach((grabZone) => {
    let grabZoneParentNode = grabZone.parentNode;
    let grabZoneInformation = grabZone.getBoundingClientRect();
    let mousedownX, mousedownY
    let parentInformation
    let x, y;
    let isGrab = false;
    grabZoneParentNode.addEventListener('mousedown', () =>{
      grabZoneParentNode.style.zIndex = zIndex++;
    })
    grabZone.addEventListener('mousedown', () =>{
      parentInformation = grabZoneParentNode.getBoundingClientRect();
      isGrab = true
      let grabZoneInformation2 = grabZone.getBoundingClientRect();
      mousedownX = (event.x - grabZoneInformation2.x);
      mousedownY = (event.y - grabZoneInformation2.y);
      console.log("down");
    })
    body.addEventListener('mousemove', (event) =>{
      console.log(parentInformation);
      if (isGrab == true) {
        body.style.cursor = "grab";
        grabZoneParentNode.style.transition = "all 0s";
        x = event.x - grabZoneInformation.x;
        y = event.y - grabZoneInformation.y + parentInformation.height/2;
        grabZoneParentNode.style.transform = `translate(calc(-100% + ${x - mousedownX + parentInformation.width}px),calc(-50% + ${y - mousedownY}px))`
      }
    })
    body.addEventListener('mouseup', () =>{
      isGrab = false
      grabZoneParentNode.style.transition = "all .25s";
      body.style.cursor = "default";
    })
  });
}
// -----------------------------------------------------------------
const tickets = document.querySelectorAll(".ticket");
var ticketOpenedId = 0;
var ticketsOpened = document.querySelectorAll(".opened");
var maxZIndex = 1;
tickets.forEach((ticket) => {
  ticket.addEventListener("click", openTicket)
});

function closeTicket(button) {
  let parent = button.parentNode.parentNode
  parent.style.transform = "translate(-50%, -50%) scale(0)";
  setTimeout(() => { parent.remove(); }, 1000);

  if (windowsWidth <= 960) {
    burger.style.display = "block";
    setTimeout(() => { burger.style.opacity = "1"; }, 100);
  }
}

function openTicket() {
  console.log(this, "Open");
  if (windowsWidth <= 960) {
    burger.style.opacity = "0";
    setTimeout(() => { burger.style.display = "none"; }, 1000);
  }

  // création de la div de base
  let ticketOpened = document.createElement("div");
  ticketOpened.className = "ticket opened";
  ticketOpenedId ++;
  ticketOpened.id = "ticketOpened" + ticketOpenedId;

  let grabZoneDiv = document.createElement('div');
  grabZoneDiv.className = "grabzone";
  ticketOpened.appendChild(grabZoneDiv)

  let closeButton = document.createElement("button")
  closeButton.classList.add("close_button")
  closeButton.setAttribute("onclick", "closeTicket(this)");
  grabZoneDiv.appendChild(closeButton)

  // ajout de la div basic_information
  let basicInformation = document.createElement("div");
  basicInformation.classList.add("basic_information")
  // ajout des paragraph a basic_information
  // name
  let name = document.createElement("p")
  name.classList.add("name")
  name.innerHTML = "Erwan Decoster"
  basicInformation.appendChild(name)
  // compagnie_service
  let compagnieService = document.createElement("p")
  compagnieService.classList.add("compagnie_service")
  compagnieService.innerHTML = "McDonald's - Comptabiliter"
  basicInformation.appendChild(compagnieService)
  // affected_device
  let affectedDevice = document.createElement("p")
  affectedDevice.classList.add("affected_device")
  affectedDevice.innerHTML = "Paneau affichage"
  basicInformation.appendChild(affectedDevice)
  // date_creation
  let dateCreation = document.createElement("p")
  dateCreation.classList.add("date_creation")
  dateCreation.innerHTML = "08/04/2021"
  basicInformation.appendChild(dateCreation)
  // max_date_end
  let maxDateEnd = document.createElement("p")
  maxDateEnd.classList.add("max_date_end")
  maxDateEnd.innerHTML = "25/04/2021"
  basicInformation.appendChild(maxDateEnd)
  // daysLeft
  let daysLeft = document.createElement("p")
  daysLeft.classList.add("days_left")
  daysLeft.innerHTML = "Jours restant : 14"
  basicInformation.appendChild(daysLeft)

  // ajout de basicInformation a la div de base
  ticketOpened.appendChild(basicInformation)

  // ajout de la div complet_information
  let completInformation = document.createElement("div");
  completInformation.classList.add("complet_information")
  // ajout des paragraph a basic_information
  // phone_number
  let phoneNumber = document.createElement("p")
  phoneNumber.classList.add("phone_number")
  phoneNumber.innerHTML = "Tel : "
  // ajout de u a phone_number
  let phoneNumberU = document.createElement("button")
  phoneNumberU.classList.add("phone_number_u")
  phoneNumberU.setAttribute("onclick", "copyMe(this)");
  phoneNumberU.innerHTML = "06 25 30 68 13"
  phoneNumber.appendChild(phoneNumberU)
  completInformation.appendChild(phoneNumber)
  // email
  let email = document.createElement("p")
  email.classList.add("email")
  email.innerHTML = "Email : "
  // ajout de u a email
  let emailU = document.createElement("button")
  emailU.setAttribute("onclick", "copyMe(this)");
  emailU.innerHTML = "erwan.decoster.pro@gmail.com"
  email.appendChild(emailU)
  completInformation.appendChild(email)
  // Id TeamViewer
  let IdTeamViewer = document.createElement("p")
  IdTeamViewer.classList.add("teamviewer_id")
  IdTeamViewer.innerHTML = "Id TeamViewer : "
  // ajout de u a email
  let IdTeamViewerU = document.createElement("button")
  IdTeamViewerU.setAttribute("onclick", "copyMe(this)");
  IdTeamViewerU.innerHTML = "123 456 789"
  IdTeamViewer.appendChild(IdTeamViewerU)
  completInformation.appendChild(IdTeamViewer)
  // ajout de completInformation a la div de base
  ticketOpened.appendChild(completInformation)

  // ajout de la div problem_information
  let problemInformation = document.createElement("div");
  problemInformation.classList.add("problem_information")
  // ajout des paragraph a basic_information
  // nb_persons_concerned
  let nbPersonsConcerned = document.createElement("p")
  nbPersonsConcerned.classList.add("nb_persons_concerned")
  nbPersonsConcerned.innerHTML = "5"
  // ajout de strong
  let nbPersonsConcernedStrong = document.createElement("strong")
  nbPersonsConcernedStrong.innerHTML = "Nombre de personnes concernées : "
  nbPersonsConcerned.prepend(nbPersonsConcernedStrong)
  problemInformation.appendChild(nbPersonsConcerned)
  // affected_device2
  let affectedDevice2 = document.createElement("p")
  affectedDevice2.classList.add("affected_device")
  affectedDevice2.innerHTML = "imprimante"
  // ajout de strong
  let affectedDevice2Strong = document.createElement("strong")
  affectedDevice2Strong.innerHTML = "Appareil concerné : "
  affectedDevice2.prepend(affectedDevice2Strong)
  // affected_app
  problemInformation.appendChild(affectedDevice2)
  let affectedApp = document.createElement("p")
  affectedApp.classList.add("affected_app")
  affectedApp.innerHTML = "word"
  // ajout de strong
  let affectedAppStrong = document.createElement("strong")
  affectedAppStrong.innerHTML = "Application concerné : "
  affectedApp.prepend(affectedAppStrong)
  problemInformation.appendChild(affectedApp)
  // problem_description
  let problemDescription = document.createElement("p")
  problemDescription.classList.add("problem_description")
  problemDescription.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  // ajout de strong
  let problemDescriptionStrong = document.createElement("strong")
  problemDescriptionStrong.innerHTML = "Description du problème : "
  problemDescription.prepend(problemDescriptionStrong)
  problemInformation.appendChild(problemDescription)
  // ajout de div attached_file
  let attachedFileDiv = document.createElement("div")
  attachedFileDiv.classList.add("attached_file")
  // ajout de p attached_file a div attached_file
  let attachedFileP = document.createElement("p")
  attachedFileP.classList.add("attached_file")
  attachedFileP.innerHTML = "Fichier joint :"
  attachedFileDiv.appendChild(attachedFileP)
  // ajout de img a attached_file
  let buttonImg = document.createElement("button")
  buttonImg.classList.add("file_icon")
  attachedFileDiv.appendChild(buttonImg)
  let img = document.createElement("img")
  img.setAttribute("src", "./resources/file_icone.svg");
  buttonImg.appendChild(img)

  let buttonImg2 = document.createElement("button")
  buttonImg2.classList.add("file_icon")
  attachedFileDiv.appendChild(buttonImg2)
  let img2 = document.createElement("img")
  img2.setAttribute("src", "./resources/picture_icone.svg");
  buttonImg2.appendChild(img2)
  // ajout de problemInformation a la div de base
  problemInformation.appendChild(attachedFileDiv)
  ticketOpened.appendChild(problemInformation)

  // ajout de la div problem_resolution
  let problemResolution = document.createElement("div")
  problemResolution.classList.add("problem_resolution")
  // ajout de resolution_description a problemResolution
  let resolutionDescription = document.createElement("p")
  resolutionDescription.classList.add("resolution_description")
  let resolutionDescriptionStrong = document.createElement("strong")
  resolutionDescriptionStrong.innerHTML = "Resolution du probleme : "
  resolutionDescription.prepend(resolutionDescriptionStrong)
  problemResolution.appendChild(resolutionDescription)
  // ajout de textarea a problemResolution
  let textarea = document.createElement("textarea")
  textarea.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  problemResolution.appendChild(textarea)
  // -----------------
  let ressolutionAttachedFileDiv = document.createElement("div")
  ressolutionAttachedFileDiv.classList.add("attached_file")
  // ajout de p attached_file a div attached_file
  let ressolutionAttachedFileP = document.createElement("p")
  ressolutionAttachedFileP.classList.add("attached_file")
  ressolutionAttachedFileP.innerHTML = "Fichier joint :"
  ressolutionAttachedFileDiv.appendChild(ressolutionAttachedFileP)
  // ajout de img a attached_file
  let buttonRessolutionImg = document.createElement("button")
  buttonRessolutionImg.classList.add("file_icon")
  ressolutionAttachedFileDiv.appendChild(buttonRessolutionImg)
  let ressolutionImg = document.createElement("img")
  ressolutionImg.classList.add("file_icone")
  ressolutionImg.setAttribute("src", "./resources/file_icone.svg");
  buttonRessolutionImg.appendChild(ressolutionImg)

  let buttonRessolutionImg2 = document.createElement("button")
  buttonRessolutionImg2.classList.add("file_icon")
  ressolutionAttachedFileDiv.appendChild(buttonRessolutionImg2)
  let ressolutionImg2 = document.createElement("img")
  ressolutionImg2.classList.add("file_icone")
  ressolutionImg2.setAttribute("src", "./resources/picture_icone.svg");
  buttonRessolutionImg2.appendChild(ressolutionImg2)
  // ajout de problemResolution a la div de base
  problemResolution.appendChild(ressolutionAttachedFileDiv)

  ticketOpened.appendChild(problemResolution)

  body.prepend(ticketOpened);
  ticketOpened.style.transform = "translate(-50%, -50%) scale(0)";
  setTimeout(() => { ticketOpened.style.transform = "translate(-50%, -50%) scale(1)"; }, 200);
  allGrabZone = document.querySelectorAll(".grabzone")
  grababab()
}
