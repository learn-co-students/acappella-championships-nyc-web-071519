document.addEventListener("DOMContentLoaded", () => {
  // URLS
  const groupURL = "http://localhost:3000/a_cappella_groups";
  // ARRAY OF OBJECTS
  groupsCollection = [];
  // DOM ELEMENTS
  const table = document.getElementById("table");
  const winnerContainer = document.getElementById("winner");

  // EVENT LISTENER - WINNER ACTION
  table.addEventListener("click", e => {
    e.preventDefault();

    switch (e.target.dataset.action) {
      case "win":
        let found = groupsCollection.find(
          g => g.id === parseInt(e.target.dataset.id)
        );
        //
        winnerContainer.innerText = `${found.college.name}'s ${found.name} wins!`;
        const winnersRow = document.getElementById(`group-${found.id}`);

        winnersRow.style.display = "none";

        // didWin = JSON.parse(winnersRow.dataset.won);
        // didWin = !didWin;
        // winnersRow.dataset.won = didWin;
        // debugger;
        // switch (didWin) {
        //   case true:
        //     winnersRow.style.display = "none";
        //   case false:
        //     winnersRow.style.display = "";
        //   default:
        //     break;
        // }

        break;
      default:
        break;
    }
  });

  // INITIAL FETCH
  fetch(groupURL)
    .then(resp => resp.json())
    .then(data => {
      groupsCollection = data;
      console.log(groupsCollection);

      data.forEach(group => {
        const card = `
               <tr display="${group.didWin ? "none" : ""}" id="group-${
          group.id
        }" data-won="false">
               <td>${group.college.name}</td>
                <td>${group.name}</td>
                 <td>${group.membership}</td>
                  <td>${group.college.division}</td>
                   <td>
                   <img src='./assets/trophy.png' data-id="${
                     group.id
                   }" data-action="win"/>
                   </td> 
                </tr>
          `;
        table.insertAdjacentHTML("beforeend", card);
      });
    });
});
