// let urlHouse = "https://api.propublica.org/congress/v1/113/house/members.json";
// let urlSenate = "https://api.propublica.org/congress/v1/113/senate/members.json";

// if (document.title.includes("senate")) {
//     console.log("use senate")
//     fetchMyData(urlSenate)
// } else {
//     console.log("use house")
//     fetchMyData(urlHouse)
// }

// let members = []

// function fetchMyData(url) {
//     fetch(url, {
//             method: "GET",
//             headers: {
//                 "X-API-Key": "pNSoIGLiZ9jL6n1QRDK9DhbNUtewlXvH8QplNDTL"
//             }
//         })
//         .then((response) => {
//             return response.json();
//         })
//         .then((data) => {
//             console.log(data);
//             members = data.results[0].members;
//             if (document.title.includes("data")) {
//                 allEventListeners();
//                 createUniqueStates()
//                 checkCheckedStates()
//                 getCheckboxesValue()
//                 getDropdownValue()
//                 filter(members)
//             }
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

let members = data.results[0].members;

// MAIN TABLES w/ filters
function allEventListeners() {
    if (document.title.includes("data")) {
        document.getElementById("democrats").addEventListener("click", function () {
            filter(members);
        });
        document
            .getElementById("republicans")
            .addEventListener("click", function () {
                filter(members);
            });
        document
            .getElementById("independent")
            .addEventListener("click", function () {
                filter(members);
            });
        document
            .getElementById("state-filter")
            .addEventListener("change", function () {
                filter(members);
            });
    }
}
allEventListeners(data);

// DROPDOWN STATES FILTER

if (document.title.includes("data")) {
    createUniqueStates();
}

//first we create a list of unique states
function createUniqueStates() {
    let uniqueStates = [];
    for (i = 0; i < members.length; i++) {
        if (uniqueStates.indexOf(members[i].state) === -1) {
            uniqueStates.push(members[i].state);
            uniqueStates.sort();
        }
    }

    for (i = 0; i < uniqueStates.length; i++) {
        let select = document.getElementById("state-filter");
        let option = document.createElement("option");
        option.classList.add("stateOptions");
        option.setAttribute("value", uniqueStates[i]); //give the filtered states a value
        option.innerHTML = uniqueStates[i]; // the attributed value will show in the menu
        select.appendChild(option);
    }
}

//function to add member data to selected state
function checkCheckedStates(stateValue, members) {
    let filteredMembersByState = [];
    if (stateValue === "") {
        for (i = 0; i < members.length; i++) {
            filteredMembersByState.push(members[i]);
        }
    }
    for (i = 0; i < members.length; i++) {
        if (stateValue == members[i].state) {
            filteredMembersByState.push(members[i]); //push this member's info into the empty array we created
        }
    }
    renderTable(filteredMembersByState); // show the table with filteredMembersByState
}

// CHECKBOX PARTY FILTER

function getCheckboxesValue() {
    var checkboxes = [];
    var selectedParties = document.querySelectorAll(
        "input[type=checkbox]:checked"
    );
    for (i = 0; i < selectedParties.length; i++) {
        checkboxes.push(selectedParties[i].value);
    }
    return checkboxes;
}

function getDropdownValue() {
    let select = document.getElementById("state-filter");
    var state = select.options[select.selectedIndex].value;
    return state;
}

if (document.title.includes("data")) {
    filter(members);
}

// function that renders the main table according to filters
function filter(members) {
    var checkedCheckboxes = getCheckboxesValue();
    var dropdownSelected = getDropdownValue();
    console.log(dropdownSelected);
    var filteredMembers = [];

    if (checkedCheckboxes.length === 0 && dropdownSelected == "all") {
        renderTable(members);
    } else {
        for (var i = 0; i < members.length; i++) {
            if (
                checkedCheckboxes.includes(members[i].party) &&
                dropdownSelected == members[i].state
            ) {
                filteredMembers.push(members[i]);
                renderTable(filteredMembers);
            } else if (
                checkedCheckboxes.includes(members[i].party) &&
                dropdownSelected == "all"
            ) {
                filteredMembers.push(members[i]);
                renderTable(filteredMembers);
            } else if (
                checkedCheckboxes.length === 0 &&
                dropdownSelected == members[i].state
            ) {
                filteredMembers.push(members[i]);
                renderTable(filteredMembers);
            } else if (filteredMembers.length == 0) {
                const tableBody = document.getElementById("tbody");
                tableBody.innerHTML = "No results";
            }
        }
        renderTable(filteredMembers);
    }
}

if (document.title.includes("data")) {
    renderTable(members);
}

// main table with no conditions/filters
function renderTable(posts) {
    const tableBody = document.getElementById("tbody");
    tableBody.innerHTML = "";

    for (var i = 0; i < posts.length; i++) {
        let post = posts[i];

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        let td6 = document.createElement("td");
        let a = document.createElement("a");

        a.href = post.url;
        td1.innerHTML = post.id;
        if (post.middle_name == null) {
            a.innerHTML = ` ${post.first_name} ${post.last_name}`;
        } else {
            a.innerHTML = ` ${post.first_name} ${post.middle_name} ${post.last_name}`;
        }
        td3.innerHTML = post.party;
        td4.innerHTML = post.state;
        td5.innerHTML = post.seniority;
        td6.innerHTML = post.total_votes;

        td2.appendChild(a);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);

        tableBody.appendChild(tr);
    }
}

// END - MAIN TABLES

// STATISTICS OBJECT

var statistics = {
    atAglance: [{
            name: "Democrats",
            number: 0,
            pctVoted: 0
        },
        {
            name: "Republicans",
            number: 0,
            pctVoted: 0
        },
        {
            name: "Independent",
            number: 0,
            pctVoted: 0
        },
        {
            name: "Total",
            number: 0,
            pctVoted: 0
        }
    ],
    leastEngaged10pct: [],
    mostEngaged10pct: [],
    leastLoyal10pct: [],
    mostLoyal10pct: []
};

// END - STATISTICS OBJECT

// AT A GLANCE TABLES

// AT A GLANCE

for (i = 0; i < members.length; i++) {
    if (members[i].party == "D") {
        statistics.atAglance[0].number++;
    } else if (members[i].party == "R") {
        statistics.atAglance[1].number++;
    } else if (members[i].party == "I") {
        statistics.atAglance[2].number++;
    }
}

let pctVotesD = 0;
let pctVotesR = 0;
let pctVotesI = 0;
for (i = 0; i < members.length; i++) {
    if (members[i].party == "D") {
        pctVotesD += members[i].votes_with_party_pct;
        statistics.atAglance[0].pctVoted =
            pctVotesD / statistics.atAglance[0].number;
    } else if (members[i].party == "R") {
        pctVotesR += members[i].votes_with_party_pct;
        statistics.atAglance[1].pctVoted =
            pctVotesR / statistics.atAglance[1].number;
    } else if (members[i].party == "I") {
        pctVotesI += members[i].votes_with_party_pct;
        statistics.atAglance[2].pctVoted =
            pctVotesI / statistics.atAglance[2].number;
    }

    //total amount of senators:
    statistics.atAglance[3].number =
        statistics.atAglance[0].number +
        statistics.atAglance[1].number +
        statistics.atAglance[2].number;
    //sum all pct - method 1
    sumPctVoted =
        statistics.atAglance[0].pctVoted +
        statistics.atAglance[1].pctVoted +
        statistics.atAglance[2].pctVoted;
    //average pct - method 1
    statistics.atAglance[3].pctVoted = sumPctVoted / 3;
    //sum all pct - method 2
    sumPctVotesAll = pctVotesD + pctVotesR + pctVotesI;
    //average pct - method 2
    statistics.atAglance[3].pctVoted = sumPctVotesAll / members.length;
}

// END - AT A GLANCE

function glanceTable(glance) {
    const glanceTableBody = document.getElementById("glancetBody");
    glanceTableBody.innerHTML = "";
    for (var i = 0; i < glance.length; i++) {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");

        td1.innerHTML = glance[i].name;
        td2.innerHTML = glance[i].number;
        td3.innerHTML = glance[i].pctVoted.toFixed(2) + " %";

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        glanceTableBody.appendChild(tr);
    }
}

if (document.title.includes("attendance")) {
    glanceTable(statistics.atAglance);
} else if (document.title.includes("loyalty")) {
    glanceTable(statistics.atAglance);
}

// END - AT A GLANCE TABLES

// ATTENDANCE TABLES

// 10% MOST/LEAST ENGAGED MEMBERS

leastEngaged = members;
mostEngaged = members;

// LEAST ENGAGED

for (let i = 0; i < leastEngaged.length; i++) {
    leastEngaged.sort(function (a, b) {
        return b.missed_votes_pct - a.missed_votes_pct;
    });
}

for (let n = 0; n < leastEngaged.length * 0.1; n++) {
    statistics.leastEngaged10pct.push(leastEngaged[n]);
    //console.log(statistics.leastEngaged10pct[n].missed_votes_pct + statistics.leastEngaged10pct[n].first_name + statistics.leastEngaged10pct[n].missed_votes)
    //console.log("length" + statistics.least_Engaged_pct.length)
}

// MOST ENGAGED

for (let i = 0; i < mostEngaged.length; i++) {
    mostEngaged.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct;
    });
}

for (let n = 0; n < mostEngaged.length * 0.1; n++) {
    statistics.mostEngaged10pct.push(mostEngaged[n]);
    //console.log(statistics.mostEngaged10pct[n].missed_votes_pct + statistics.mostEngaged10pct[n].first_name + statistics.mostEngaged10pct[n].missed_votes)
    //console.log("length" + statistics.least_Engaged_pct.length)
}

// END 10% MOST/LEAST ENGAGED MEMBERS

if (document.title.includes("attendance")) {
    engagedTable(statistics.leastEngaged10pct, "leastEngagedtBody");
    engagedTable(statistics.mostEngaged10pct, "mostEngagedtBody");
}

function engagedTable(sort_list, str) {
    const engagedTableBody = document.getElementById(str);
    for (var i = 0; i < sort_list.length; i++) {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");

        if ((str = "leastEngagedtBody")) {
            td1.innerHTML = sort_list[i].first_name;
            td2.innerHTML = sort_list[i].missed_votes;
            td3.innerHTML = sort_list[i].missed_votes_pct; //.toFixed(2) + " %"

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);

            engagedTableBody.appendChild(tr);
        } else if ((str = "mostEngagedtBody")) {
            td1.innerHTML = sort_list[i].first_name;
            td2.innerHTML = sort_list[i].missed_votes;
            td3.innerHTML = sort_list[i].missed_votes_pct; //.toFixed(2) + " %"

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);

            engagedTableBody.appendChild(tr);
        }
    }
}

// END - ATTENDANCE TABLES

// LOYALTY TABLES

// 10% MOST/LEAST LOYAL MEMBERS

leastLoyal = members;
mostLoyal = members;

// MOST LOYAL CALC

for (let i = 0; i < mostLoyal.length; i++) {
    mostLoyal.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct;
    });
}

for (let n = 0; n < mostLoyal.length * 0.1; n++) {
    statistics.mostLoyal10pct.push(mostLoyal[n]);
    //console.log(statistics.mostLoyal10pct[n].total_votes + statistics.mostLoyal10pct[n].first_name + statistics.mostLoyal10pct[n].votes_with_party_pct)
}

// LEAST LOYAL CALC

for (let i = 0; i < leastLoyal.length; i++) {
    leastLoyal.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct;
    });
}

for (let n = 0; n < leastLoyal.length * 0.1; n++) {
    statistics.leastLoyal10pct.push(leastLoyal[n]);
    // console.log(statistics.leastLoyal10pct[n].total_votes + statistics.leastLoyal10pct[n].first_name + statistics.leastLoyal10pct[n].votes_with_party_pct)
}

// END - 10% MOST/LEAST LOYAL MEMBERS CALC

if (document.title.includes("loyalty")) {
    loyalTable(statistics.leastLoyal10pct, "leastLoyaltBody");
    loyalTable(statistics.mostLoyal10pct, "mostLoyaltBody");
}

function loyalTable(sort_list, str) {
    const loyalTableBody = document.getElementById(str);
    for (var i = 0; i < sort_list.length; i++) {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");

        if ((str = "leastLoyaltBody")) {
            td1.innerHTML = sort_list[i].first_name;
            td2.innerHTML = sort_list[i].total_votes;
            td3.innerHTML = sort_list[i].votes_with_party_pct; //.toFixed(2) + " %"

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);

            loyalTableBody.appendChild(tr);
        } else if ((str = "mostLoyaltBody")) {
            td1.innerHTML = sort_list[i].first_name;
            td2.innerHTML = sort_list[i].total_votes;
            td3.innerHTML = sort_list[i].votes_with_party_pct; //.toFixed(2) + " %"

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);

            loyalTableBody.appendChild(tr);
        }
    }
}

// END - LOYALTY TABLES