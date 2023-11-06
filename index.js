const COHORT = "2308-ACC-ET-WEB-PT-B";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
  parties: [],
};


console.log(API_URL.replace("events","event"))
//ul element at the bottom of the index.html
const partyList = document.querySelector("#parties");

const addPartyForm = document.querySelector("#addParty");
addPartyForm.addEventListener("submit", addParty);

/**
 * Sync state with the API and rerender
 */
async function render() {
  await getParties();
  renderParties();
}

render();

/**
 * Update state with artists from API
 */
async function getParties() {
  // TODO
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    state.parties = json.data;
    console.log(state.parties);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Render artists from state
 */
function renderParties() {
  // TODO
  if (state.parties.length===0 || state.parties === undefined) {
    eventList.innerHTML = "<li>No parties.</li>";
    return;
  }

  const partyCards = state.parties.map((party) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h2>${party.name}</h2>
      <p>${party.description}</p>
      <p>${party.date}</p>
      <p>${party.location}</p>
      <button onclick="deleteParty(${party.id})">Delete</button>
    `;
    return li;
  });

  partyList.replaceChildren(...partyCards);
}

/**
 * Ask the API to create a new artist based on form data
 * @param {Event} event
 */
async function addParty(event) {
  event.preventDefault();

  // TODO
  
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: addPartyForm.name.value,
        description: addPartyForm.description.value,
        //standard for web YYYYYY-MM-DDTHH:mm:ss.sssZ
        date: new Date(addPartyForm.date.value).toISOString(),
        location: addPartyForm.location.value
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create party");
    }

    render();
  } catch (error) {
    console.error(error);
  }
}


async function deleteParty(partyID){
 
  try {
    const response = await fetch(`${API_URL}/${partyID}`, {
      method: "DELETE",
      })
   
    render();
  } catch (error) {

  }
}