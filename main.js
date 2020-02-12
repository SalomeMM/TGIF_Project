// MAIN TABLES

document.getElementById("democrats").addEventListener("click", function () {
    filter(members)
});
document.getElementById("republicans").addEventListener("click", function () {
    filter(members)
});
document.getElementById("independent").addEventListener("click", function () {
    filter(members)
});
// document.getElementById("state-filter").addEventListener("change", function () {
//     renderTable()
// });

// NOTES ON HOW TO CREATE DROPDOWN FILTER
// https: //www.w3schools.com/tags/tag_select.asp
// https://www.w3schools.com/jsref/met_element_setattribute.asp


function getCheckboxesValue() {
    var checkboxes = []
    var selectedParties = document.querySelectorAll('input[type=checkbox]:checked');

    for (i = 0; i < selectedParties.length; i++) {
        checkboxes.push(selectedParties[i].value)
    }
    return checkboxes
}

function filter(members) {
    var checkedCheckboxes = getCheckboxesValue()
    var filteredMembers = []
    if (checkedCheckboxes.length === 0) {
        renderTable(members)
    } else {
        for (var i = 0; i < members.length; i++) {
            if (checkedCheckboxes.includes(members[i].party)) {
                filteredMembers.push(members[i])
            }
        }
        renderTable(filteredMembers)
    }
}

function renderTable(posts) {

    const tableBody = document.getElementById("tbody")
    tableBody.innerHTML = ""

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

// END - MAIN TABLES

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

// END - AT A GLANCE TABLES

// ATTENDANCE TABLES

if (document.title.includes("attendance")) {
    engagedTable(statistics.leastEngaged10pct, "leastEngagedtBody")
    engagedTable(statistics.mostEngaged10pct, "mostEngagedtBody")
}

function engagedTable(sort_list, str) {
    const engagedTableBody = document.getElementById(str)
    for (var i = 0; i < sort_list.length; i++) {

        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")

        if (str = "leastEngagedtBody") {
            td1.innerHTML = sort_list[i].first_name
            td2.innerHTML = sort_list[i].missed_votes
            td3.innerHTML = sort_list[i].missed_votes_pct //.toFixed(2) + " %"

            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)

            engagedTableBody.appendChild(tr)

        } else if (str = "mostEngagedtBody") {
            td1.innerHTML = sort_list[i].first_name
            td2.innerHTML = sort_list[i].missed_votes
            td3.innerHTML = sort_list[i].missed_votes_pct //.toFixed(2) + " %"

            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)

            engagedTableBody.appendChild(tr)

        }

    }
}

// END - ATTENDANCE TABLES

// LOYALTY TABLES

if (document.title.includes("loyalty")) {
    loyalTable(statistics.leastLoyal10pct, "leastLoyaltBody")
    loyalTable(statistics.mostLoyal10pct, "mostLoyaltBody")
}

function loyalTable(sort_list, str) {
    const loyalTableBody = document.getElementById(str)
    for (var i = 0; i < sort_list.length; i++) {

        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")

        if (str = "leastLoyaltBody") {
            td1.innerHTML = sort_list[i].first_name
            td2.innerHTML = sort_list[i].total_votes
            td3.innerHTML = sort_list[i].votes_with_party_pct //.toFixed(2) + " %"

            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)

            loyalTableBody.appendChild(tr)

        } else if (str = "mostLoyaltBody") {
            td1.innerHTML = sort_list[i].first_name
            td2.innerHTML = sort_list[i].total_votes
            td3.innerHTML = sort_list[i].votes_with_party_pct //.toFixed(2) + " %"

            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)

            loyalTableBody.appendChild(tr)
        }
    }
}

// END - LOYALTY TABLES

// FILTERS

//this function will show the selected group AFTER we create the filter
// function getCheckboxesValue() {
//     var checkboxes = []
//     var selectedParties = document.querySelectorAll("input[name=checkboxes]:checked")
//     for (i = 0; i < selectedParties.length; i++) {
//         checkboxes.push(selectedParties[i].value)
//     }
//     return checkboxes
// }

//AMY

// document.getElementById("democrats").addEventListener("click", function () {
//     renderTableFilter()
// });
// document.getElementById("republicans").addEventListener("click", function () {
//     renderTableFilter()
// });
// document.getElementById("independent").addEventListener("click", function () {
//     renderTableFilter()
// });
// // document.getElementById("state-filter").addEventListener("change", function () {
// //     renderTable()
// // });

// function getCheckboxesValue() {
//     var checkboxes = []
//     var selectedParties = document.querySelectorAll('input[type=checkbox]:checked');

//     for (i = 0; i < selectedParties.length; i++) {
//         checkboxes.push(selectedParties[i].value)
//     }
//     return checkboxes
// }

//END-AMY


/*

var data = houseData[0].members

function renderTable() {
    var tbody = document.getElementById("senate-tbody")
    tbody.innerHTML = ""
    var checkedCheckboxes = getCheckboxesValue()
    for (var i = 0: i < houseData.length; i++) {
        if (checkedCheckboxes.includes(data[i].party) && data[i].first_name = "Robert" || checkedCheckboxes.length = 0) {

            var row = document.createElement("tr")
            var td = document.createElement("td")
            var td1 = document.createElement("td1")

            td.innerHTML = houseData[i].first_name
            td1.innerHTML = houseData[i].party

            row.appendChild(td)
            row.appendChild(td1)
            tbody.appendChild(row)
        }
    }
}

// && (logic "and") sums conditions and || es logic "or" , ejemplo: || checkedCheckboxes.length = 0)

//add event listener to the check boxes and tell them to render the table everytime you click it

//getCheckboxesValue as name for the function "filters"


/* LONGER OPTION

function checkBoxesFilter() {
    var checkboxes = []
    var demCheck = document.getElementById("CheckboxDemocrats")
    var repCheck = document.getElementById("CheckboxRepublicans")
    var indCheck = document.getElementById("CheckboxIndependent")

    demCheck.addEventListener()

    if (demCheck.checked) checkboxes.push("D")
    if (repCheck.checked) checkboxes.push("R")
    if (indCheck.checked) checkboxes.push("I")
}
*/



// BACKUP ATTENDANCE & LOYALTY TABLES

// if (document.title.includes("attendance")) {
//     leastEngagedTable(statistics.leastEngaged10pct)
//     mostEngagedTable(statistics.mostEngaged10pct)
// }

// if (document.title.includes("loyalty")) {
//     leastLoyalTable(statistics.leastLoyal10pct)
//     mostLoyalTable(statistics.mostLoyal10pct)
// }

// function leastEngagedTable(leastEngaged) {
//     const leastEngagedTableBody = document.getElementById("leastEngagedtBody")
//     for (var i = 0; i < leastEngaged.length; i++) {

//         let tr = document.createElement("tr")
//         let td1 = document.createElement("td")
//         let td2 = document.createElement("td")
//         let td3 = document.createElement("td")

//         td1.innerHTML = leastEngaged[i].first_name
//         td2.innerHTML = leastEngaged[i].missed_votes
//         td3.innerHTML = leastEngaged[i].missed_votes_pct //.toFixed(2) + " %"

//         tr.appendChild(td1)
//         tr.appendChild(td2)
//         tr.appendChild(td3)

//         leastEngagedTableBody.appendChild(tr)
//     }
// }


// function mostEngagedTable(mostEngaged) {
//     const mostEngagedTableBody = document.getElementById("mostEngagedtBody")
//     for (var i = 0; i < mostEngaged.length; i++) {

//         let tr = document.createElement("tr")
//         let td1 = document.createElement("td")
//         let td2 = document.createElement("td")
//         let td3 = document.createElement("td")

//         td1.innerHTML = mostEngaged[i].first_name
//         td2.innerHTML = mostEngaged[i].missed_votes
//         td3.innerHTML = mostEngaged[i].missed_votes_pct //.toFixed(2) + " %"

//         tr.appendChild(td1)
//         tr.appendChild(td2)
//         tr.appendChild(td3)

//         mostEngagedTableBody.appendChild(tr)

//     }
// }


// function leastLoyalTable(leastLoyal) {
//     const leastLoyalTableBody = document.getElementById("leastLoyaltBody")
//     for (var i = 0; i < leastLoyal.length; i++) {

//         let tr = document.createElement("tr")
//         let td1 = document.createElement("td")
//         let td2 = document.createElement("td")
//         let td3 = document.createElement("td")

//         td1.innerHTML = leastLoyal[i].first_name
//         td2.innerHTML = leastLoyal[i].total_votes
//         td3.innerHTML = leastLoyal[i].votes_with_party_pct //.toFixed(2) + " %"

//         tr.appendChild(td1)
//         tr.appendChild(td2)
//         tr.appendChild(td3)

//         leastLoyalTableBody.appendChild(tr)

//     }
// }


// function mostLoyalTable(mostLoyal) {
//     const mostLoyalTableBody = document.getElementById("mostLoyaltBody")
//     for (var i = 0; i < mostLoyal.length; i++) {

//         let tr = document.createElement("tr")
//         let td1 = document.createElement("td")
//         let td2 = document.createElement("td")
//         let td3 = document.createElement("td")

//         td1.innerHTML = mostLoyal[i].first_name
//         td2.innerHTML = mostLoyal[i].total_votes
//         td3.innerHTML = mostLoyal[i].votes_with_party_pct //.toFixed(2) + " %"

//         tr.appendChild(td1)
//         tr.appendChild(td2)
//         tr.appendChild(td3)

//         mostLoyalTableBody.appendChild(tr)

//     }
// }


// BACKUP RENDER BIG TABLES

// MAIN TABLES
// ​
// function renderTable(posts) {
//     const tableBody = document.getElementById("tbody")
//     for (var i = 0; i < posts.length; i++) {
//         let post = posts[i]​
//         let tr = document.createElement("tr")
//         let td1 = document.createElement("td")
//         let td2 = document.createElement("td")
//         let td3 = document.createElement("td")
//         let td4 = document.createElement("td")
//         let td5 = document.createElement("td")
//         let td6 = document.createElement("td")
//         let a = document.createElement("a")​
//         a.href = post.url
//         td1.innerHTML = post.id
//         if (post.middle_name == null) {
//             a.innerHTML = ` ${post.first_name} ${post.last_name}`
//         } else {
//             a.innerHTML = ` ${post.first_name} ${post.middle_name} ${post.last_name}`
//         }
//         td3.innerHTML = post.party
//         td4.innerHTML = post.state
//         td5.innerHTML = post.seniority
//         td6.innerHTML = post.total_votes​
//         td2.appendChild(a)
//         tr.appendChild(td1)
//         tr.appendChild(td2)
//         tr.appendChild(td3)
//         tr.appendChild(td4)
//         tr.appendChild(td5)
//         tr.appendChild(td6)​
//         tableBody.appendChild(tr)
//     }
// }​
// if (document.title.includes("data")) {
//     renderTable(members)
// }​
// END - MAIN TABLES

//Notes:
//let members = data.results[0].members;
// back tick `string text ${post.title} another string...` }