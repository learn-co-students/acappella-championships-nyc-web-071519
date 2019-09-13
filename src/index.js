document.addEventListener("DOMContentLoaded", function(){
    const tableBody = document.querySelector("#table-body")

    fetch("http://localhost:3000/a_cappella_groups")
    .then(res => res.json())
    .then(data => {
        groups = data

        for(let i = 0; i < data.length; i++){
            const college = groups[i].college.name
            const group = groups[i].name
            const membership = groups[i].membership
            const division = groups[i].college.division
            const id = groups[i].id

            // console.log(college, group, membership, division)

            const table = `
                <tr id="row-${id}">
                    <td>${college}</td> 
                    <td>${group}</td> 
                    <td>${membership}</td> 
                    <td>${division}</td> 
                    <td><img src='./assets/trophy.png' data-id='${id}'/></td> 
                </tr>
            `
            tableBody.insertAdjacentHTML("beforeend", table)

            const btn = document.querySelector(`[data-id="${id}"]`)
            const winner = document.querySelector("#winner")

            btn.addEventListener("click", function(e){
                e.preventDefault()
                // console.log("CLICK")

                winner.innerText = `Winner: ${college}, ${group}`


                fetch(`http://localhost:3000/a_cappella_groups/${id}`, {
                    method: "DELETE",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(data)
                })
                .then(function(){
                    const toDelete = document.querySelector(`#row-${id}`)
                    toDelete.remove()
                })
            })
        }

        
    })



})