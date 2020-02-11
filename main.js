//MAIN TABLES

//let members = data.results[0].members;

function renderTable(posts) {
    const tableBody = document.getElementById("tbody")
    for (var i = 0; i < posts.length; i++) {
        let post = posts[i]

        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        let td4 = document.createElement("td")
        let td5 = document.createElement("td")
        let td6 = document.createElement("td")
        let a = document.createElement("a")
        /// LINK QUESTION
        // a.innerHTML = post.first_name
        a.href = post.url
        td1.innerHTML = post.id
        if (post.middle_name == null) {
            a.innerHTML = ` ${post.first_name} ${post.last_name}`
        } else {
            a.innerHTML = ` ${post.first_name} ${post.middle_name} ${post.last_name}`
        }
        td3.innerHTML = post.party
        td4.innerHTML = post.state
        td5.innerHTML = post.seniority
        td6.innerHTML = post.total_votes

        td2.appendChild(a)
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        tr.appendChild(td6)


        tableBody.appendChild(tr)

    }
}

if (document.title.includes("data")) {
    renderTable(members)
}

// back tick `string text ${post.title} another string...` 

// AT A GLANCE TABLES

function glanceTable(glance) {
    const glanceTableBody = document.getElementById("glancetBody")
    for (var i = 0; i < glance.length; i++) {

        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")

        td1.innerHTML = glance[i].name
        td2.innerHTML = glance[i].number
        td3.innerHTML = glance[i].pctVoted.toFixed(2) + " %"

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)

        glanceTableBody.appendChild(tr)

    }
}

if (document.title.includes("attendance")) {
    glanceTable(statistics.atAglance)
} else if (document.title.includes("loyalty")) {
    glanceTable(statistics.atAglance)
}


function leastEngagedTable(leastEngaged) {
    const leastEngagedTableBody = document.getElementById("leastLoyaltBody")
    for (var i = 0; i < leastEngaged.length; i++) {

        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")

        td1.innerHTML = leastEngaged[i].first_name
        td2.innerHTML = leastEngaged[i].missed_votes
        td3.innerHTML = leastEngaged[i].missed_votes_pct //.toFixed(2) + " %"

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)

        leastEngagedTableBody.appendChild(tr)
    }
}

leastEngagedTable(statistics.leastEngaged10pct)


function mostEngagedTable(mostEngaged) {
    const mostEngagedTableBody = document.getElementById("mostLoyaltBody")
    for (var i = 0; i < mostEngaged.length; i++) {

        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")

        td1.innerHTML = mostEngaged[i].first_name
        td2.innerHTML = mostEngaged[i].missed_votes
        td3.innerHTML = mostEngaged[i].missed_votes_pct //.toFixed(2) + " %"

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)

        mostEngagedTableBody.appendChild(tr)

    }
}

mostEngagedTable(statistics.mostEngaged10pct)


function leastLoyalTable(leastLoyal) {
    const leastLoyalTableBody = document.getElementById("leastLoyaltBody")
    for (var i = 0; i < leastLoyal.length; i++) {

        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")

        td1.innerHTML = leastLoyal[i].first_name
        td2.innerHTML = leastLoyal[i].total_votes
        td3.innerHTML = leastLoyal[i].votes_with_party_pct //.toFixed(2) + " %"

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)

        leastLoyalTableBody.appendChild(tr)

    }
}

leastLoyalTable(statistics.leastLoyal10pct)



function mostLoyalTable(mostLoyal) {
    const mostLoyalTableBody = document.getElementById("mostLoyaltBody")
    for (var i = 0; i < mostLoyal.length; i++) {

        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")

        td1.innerHTML = mostLoyal[i].first_name
        td2.innerHTML = mostLoyal[i].total_votes
        td3.innerHTML = mostLoyal[i].votes_with_party_pct //.toFixed(2) + " %"

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)

        mostLoyalTableBody.appendChild(tr)

    }
}

mostLoyalTable(statistics.mostLoyal10pct)