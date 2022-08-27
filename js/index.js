

document.addEventListener("DOMContentLoaded", init)
let currentPage = 0;

function init() {
  getMonsters()
  monsterForm()
  backAndForward()
}

// getting the monsters
function getMonsters(page) {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
  .then(resp => resp.json())
  .then(monsters => {
    document.querySelector("#monster-container").innerHTML = ""
    for (let i = 0; i < monsters.length; i++)
    makeMonsterCard(monsters[i])
  })
}

// making cards for the monsters
function makeMonsterCard(monster) {
  const div = document.createElement("div")

  const h2 = document.createElement("h2")
  h2.innerText = `${monster.name}`

  const h4 = document.createElement("h4")
  h4.innerText = `Age: ${monster.age}`

  const p = document.createElement("p")
  p.innerText = `Bio: ${monster.description}`

  div.append(h2, h4, p)

  document.querySelector("#monster-container").appendChild(div)
}

// making the form, input and button
function monsterForm() {
  const form = document.createElement("form")
  form.id = "monster-form"
  const name = document.createElement("input")
  name.id = "name"
  name.placeholder ="Name..."
  const age = document.createElement("input")
  age.id = "age"
  age.placeholder ="Age..."
  const description = document.createElement("input")
  description.id = "description"
  description.placeholder ="Description..."
  const btn = document.createElement("button")
  btn.innerText = "Create"

  form.append(name, age, description, btn)

  document.querySelector("#create-monster").appendChild(form)

  submitForm()
}

// making the submitting form interactive
function submitForm() {
  document.querySelector("#monster-form").addEventListener("submit", event => {
    event.preventDefault()
    document.querySelector('#monster-form').reset()
    newMonster()
    postNewMonster()
  })
}

// selecting a monster by add name,age and description search
function newMonster() {
  const name = document.querySelector("#name")
  const age = document.querySelector("#age")
  const description = document.querySelector("#description")
  return {
    name: name.value,
    age: age.value,
    description: description.value
  }
}

// creating monster
function postNewMonster(monster) {
  fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
      Accept : "application/json"
    },
    body: JSON.stringify(monster)
  })
  .then(resp => resp.json())
  .then(json => console.log(json))
}

//  making back and forward arrow button at the bottom of the page  more interactive by adding event listener
function backAndForward() {
  const back = document.querySelector("#back")
  back.addEventListener("click", pageDown)
  const forward = document.querySelector("#forward")
  forward.addEventListener("click", pageUp)
}

// going back to the previous page
function pageDown(){
  if (currentPage > 1) {
    currentPage--,
    getMonsters(currentPage)
  } else {
    alert("Cannot go any farther back :(")
  }
}

// going forward to the next page
function pageUp() {
  currentPage++,
  getMonsters(currentPage)
}