//Fetch function
var members = [];
//API key-y7Nmx6XhWENj7wlayywv15b3CFQtMiExtWTeVU2o
var urlHouse = "https://api.propublica.org/congress/v1/113/house/members.json";
var urlSenate =
    "https://api.propublica.org/congress/v1/113/senate/members.json";

function getDataHouse() {
    fetch(urlHouse, {
            headers: {
                "X-API-Key": "y7Nmx6XhWENj7wlayywv15b3CFQtMiExtWTeVU2o"
            }
        })
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            console.log(data);
            members = data.results[0].members;
            if (document.title.includes("House113")) {
                loader();
                allTable(members);
                createStates();
                CheckBoxesEventListeners();
                dropdownEventListener();
            }
            if (document.title.includes("House Loyalty")) {
                loader();
                calcTotalMembers(members);
                calculateTotalPercentageVotes();
                renderHouseAtGlance("Democrats");
                renderHouseAtGlance("Republicans");
                renderHouseAtGlance("Independents");
                calcLeastLoyal();
                renderLeastLoyalTable();
                calcMostLoyal();
                renderMostLoyalTable();
            }
            if (document.title.includes("House attendance")) {
                loader();
                calcTotalMembers(members);
                calculateTotalPercentageVotes();
                renderHouseAtGlance("Democrats");
                renderHouseAtGlance("Republicans");
                renderHouseAtGlance("Independents");
                calcMissedVotes();
                renderLeastEngagedTable();
                calcMostEngaged();
                renderMostEngagedTable();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
getDataHouse();

//FUNCTIONS

//ALL TABLE

function allTable(members) {
    console.log(members);
    var tbody = document.getElementById("house-data");
    tbody.innerHTML = ""; //we clear the table so it doesn't print first members and then filtered members
    for (var i = 0; i < members.length; i++) {
        var firstName = members[i].first_name;
        var middleName = members[i].middle_name;
        var lastName = members[i].last_name;
        var party = members[i].party;
        var state = members[i].state;
        var yearsOffice = members[i].seniority;
        var votesparty = members[i].votes_with_party_pct;

        var tr = document.createElement("tr");
        var td1 = document.createElement("td");

        if (middleName === null) {
            td1.innerHTML = firstName + " " + lastName;
        } else {
            td1.innerHTML = firstName + " " + middleName + " " + lastName;
        }
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        td2.innerHTML = party;
        tr.appendChild(td2);

        var td3 = document.createElement("td");
        td3.innerHTML = state;
        tr.appendChild(td3);

        var td4 = document.createElement("td");
        td4.innerHTML = yearsOffice;
        tr.appendChild(td4);

        var td5 = document.createElement("td");
        td5.innerHTML = votesparty;
        tr.appendChild(td5);

        tbody.appendChild(tr);
    }
}

//CheckBoxes

//Republican//
function CheckBoxesEventListeners() {
    var partyR = document.getElementById("republican");

    partyR.addEventListener("click", function (e) {
        partyAndState();
    });

    //Democrat//

    var partyD = document.getElementById("democrat");

    partyD.addEventListener("click", function (e) {
        partyAndState();
    });

    //Inpendendent//

    var partyI = document.getElementById("independent");

    var alert = document.getElementById("alert");

    partyI.addEventListener("click", function (e) {
        partyAndState();
    });
}
//Function checkcheckboxes
function checkCheckBoxes() {
    var partyR = document.getElementById("republican");
    var partyD = document.getElementById("democrat");
    var partyI = document.getElementById("independent");

    var checkboxes = Array.from(
        document.querySelectorAll("input[name=checkboxes]:checked")
    );
    var checkboxesValue = [];
    for (i = 0; i < checkboxes.length; i++) {
        checkboxesValue.push(checkboxes[i].value); //push value in to an empty array
    }

    var filteredMembers = [];
    if (
        partyI.checked == false &&
        partyD.checked == false &&
        partyR.checked == false
    ) {
        document.getElementById("alert").style.display = "block";
    }
    for (i = 0; i < members.length; i++) {
        if (partyI.checked == true && members[i].party == "I") {
            filteredMembers.push(members[i]);
        }
        if (partyD.checked == true && members[i].party == "D") {
            filteredMembers.push(members[i]);
        }
        if (partyR.checked == true && members[i].party == "R") {
            filteredMembers.push(members[i]);
        }
    }
    if (
        partyI.checked == true ||
        partyD.checked == true ||
        partyR.checked == true
    ) {
        document.getElementById("alert").style.display = "none"; // if any checkboxes is checked, don't show alert
    }
    return filteredMembers; // call the function with the general table to print it with the filtered memebers
}

//DropDown Filter by State

//Función para crear el dropdown y filtrar los repetidos
var filteredStates = []; // creamos un empty array
function createStates() {
    // making array of states and dropdown

    for (i = 0; i < members.length; i++) {
        // make a loop through the members
        if (filteredStates.indexOf(members[i].state) == -1) {
            // Si hay repetidos no incluir
            filteredStates.push(members[i].state); // push the full member no repetidos en el nuevo array
            filteredStates.sort(); // los ordenamos (por eso "all") esta duera del loop
        }
    }

    for (var a = 0; a < filteredStates.length; a++) {
        // hacemos loop en los estados que hemos filtrado y creamos una lista de opciones
        var option = document.createElement("option");
        option.classList.add("stateOptions"); //lista opciones
        option.setAttribute("value", filteredStates[a]); // atribuimos un valor a los estados filtrados
        option.innerHTML = filteredStates[a]; // ese valor que hemos atribuido será el qué aparecerá en pantalla (AL, ILL...)
        var dropDownOptions = document.getElementById("dropDownBody"); // creamos una variable para posicionar los valores que acabamos de crear, para que aparezcan dentro de la lista
        dropDownOptions.appendChild(option); // posicionamiento
    }
    console.log(filteredStates);
}

// función para crear filteredmembersbystate
function dropdownEventListener() {
    var selectedState = document.getElementById("dropDownBody");
    selectedState.addEventListener("change", function () {
        partyAndState(); // creamos un addevent listener porque queremos que cada vez que elijamos un estado, ocurra una acción
    });
}

function checkCheckStates(stateValue, members) {
    // creamos una función para añadir la información de los miembros al selected state, de esa forma, aparecerá toda la información
    var checkStates = document.getElementById("");
    console.log(members);
    var filteredMembersByState = []; // creamos empty array
    if (stateValue === "") {
        for (i = 0; i < members.length; i++) {
            filteredMembersByState.push(members[i]);
        }
    }
    for (i = 0; i < members.length; i++) {
        // loop todos los miembros
        if (stateValue == members[i].state) {
            filteredMembersByState.push(members[i]); // añadimos toda la información del miembro en cuestión al nuevo array que hemos creado
        }
    }
    allTable(filteredMembersByState); // mostramos la tabla con la información de filteredMembersByState
}

//Función para que aparezca la información de checkboxes y dropdown

function partyAndState() {
    var selectedParties = Array.from(
        document.querySelectorAll("input[name=checkboxes]:checked")
    );

    var selectedStates = document.getElementById("dropDownBody").value;
    var membersToShow = [];

    if (selectedParties.length === 0 && selectedStates === "") {
        for (i = 0; i < members.length; i++) {
            membersToShow.push(members[i]);
        }
        allTable(membersToShow);
    } else if (selectedParties.length !== 0 && selectedStates === "") {
        let membersFilteredByParty = checkCheckBoxes();
        allTable(membersFilteredByParty);
    } else if (selectedParties.length === 0 && selectedStates != "") {
        let membersFilteredByStates = checkCheckStates(selectedStates, members);
        membersFilteredByStates;
    } else {
        let test = checkCheckBoxes();

        checkCheckStates(selectedStates, test);
    }
}

//HOUSE at a Glance TABLE

/*object*/
var statistics = {
    democrats: {
        count: 0,
        percentage: 0,
        party: "D"
    },
    republicans: {
        count: 0,
        percentage: 0,
        party: "R"
    },
    independents: {
        count: 0,
        percentage: 0,
        party: "D"
    },
    missedVotes: 0,
    missedVotesPct: 0,
    votesWithPartypct: 0,
    votesAgainstPartyPct: 0,
    leastEngaged: [],
    mostEngaged: [],
    leastLoyal: [],
    mostLoyal: []
};

/*first column*/

function calcTotalMembers() {
    for (var i = 0; i < members.length; i++) {
        var party = members[i].party;

        if (party === "D") {
            console.log(party);
            statistics.democrats.count++;
        }

        if (party === "R") {
            console.log(party);
            statistics.republicans.count++;
        }
        if (party === "I") {
            console.log(party);
            statistics.independents.count++;
        }
    }
    console.log("democrats " + statistics.democrats.count);
}

/*function calculateTotalPercentageVotes*/
function calculateTotalPercentageVotes() {
    var totalR = 0;
    var totalD = 0;
    var totalI = 0;
    for (i = 0; i < members.length; i++) {
        var party = members[i].party;
        if (party === "R") {
            var membersRep = members[i].votes_with_party_pct;
            totalR = totalR + membersRep;
        } else if (party === "D") {
            membersDem = members[i].votes_with_party_pct;
            totalD = totalD + membersDem;
        } else if (party === "I") {
            membersInd = members[i].votes_with_party_pct;
            totalI = totalI + membersInd;
        }
    }

    statistics.republicans.percentage = totalR / statistics.republicans.count;
    statistics.democrats.percentage = totalD / statistics.democrats.count;
    statistics.independents.percentage = totalI / statistics.independents.count;
}
/*Render table*/

function renderHouseAtGlance(target) {
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    td1.innerHTML = target;
    var tbody = document.getElementById("house-data");
    if (target === "Democrats") {
        td2.innerHTML = statistics.democrats.count;
        td3.innerHTML = Math.round(statistics.democrats.percentage);
    } else if (target === "Republicans") {
        td2.innerHTML = statistics.republicans.count;
        td3.innerHTML = Math.round(statistics.republicans.percentage);
    } else {
        td2.innerHTML = statistics.independents.count;
        td3.innerHTML = "-";
    }

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    tbody.appendChild(tr);
}

//Least Engaged House

/*Function to get Least Engaged 10% missed votes*/

function calcMissedVotes() {
    var sortedMembers = members.sort(function mySorter(a, b) {
        return a.missed_votes_pct - b.missed_votes_pct; // Because its an object, we cant use just sort.(), it loops each member member a memberb and access the key in the object. Gets the value of the key and compares with a and b and does the order.
    });

    for (var i = 0; i < sortedMembers.length; i++) {
        var tenPercent = sortedMembers.length * 0.1;
        if (statistics.leastEngaged.length < tenPercent) {
            //statistics.leastEngaged = lo ponemos en un object para usarlo cuando queramos

            statistics.leastEngaged.push(sortedMembers[i]);
        }
    }
}

/*RENDER in a table CalcMissedVotes*/

function renderLeastEngagedTable() {
    var tbody = document.getElementById("house-data2");
    for (var i = 0; i < statistics.leastEngaged.length; i++) {
        var leastEngaged = statistics.leastEngaged[i];
        var firstName = leastEngaged.first_name;
        var middleName = leastEngaged.middle_name;
        var lastName = leastEngaged.last_name;
        var missedVotes = leastEngaged.missed_votes;
        var missedVotesPct = leastEngaged.missed_votes_pct;
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");

        if (middleName === null) {
            td1.innerHTML = firstName + " " + lastName;
        } else {
            td1.innerHTML = firstName + " " + middleName + " " + lastName;
        }
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        td2.innerHTML = missedVotes;
        tr.appendChild(td2);

        var td3 = document.createElement("td");
        td3.innerHTML = missedVotesPct;
        tr.appendChild(td3);

        tbody.appendChild(tr);
    }
}
if (document.title === "House attendance") {
    renderLeastEngagedTable();
}
//Least Engaged House

//object for this function is on the top of the page

/*Function to get Most Engaged 10% missed votes*/
function calcMostEngaged() {
    var sortedMembers = members.sort(function mySorter(a, b) {
        return b.missed_votes_pct - a.missed_votes_pct;
    });

    for (var i = 0; i < sortedMembers.length; i++) {
        var tenPercent = sortedMembers.length * 0.1;
        if (statistics.mostEngaged.length < tenPercent) {
            //statistics.leastEngaged = lo ponemos en un object para usarlo cuando queramos

            statistics.mostEngaged.push(sortedMembers[i]);
        }
    }
}

/*Render in a table Most engaged 10%*/

function renderMostEngagedTable() {
    var tbody = document.getElementById("house-data3");
    for (var i = 0; i < statistics.mostEngaged.length; i++) {
        var mostEngaged = statistics.mostEngaged[i];
        var firstName = mostEngaged.first_name;
        var middleName = mostEngaged.middle_name;
        var lastName = mostEngaged.last_name;
        var missedVotes = mostEngaged.missed_votes;
        var missedVotesPct = mostEngaged.missed_votes_pct;
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");

        if (middleName === null) {
            td1.innerHTML = firstName + " " + lastName;
        } else {
            td1.innerHTML = firstName + " " + middleName + " " + lastName;
        }
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        td2.innerHTML = missedVotes;
        tr.appendChild(td2);

        var td3 = document.createElement("td");
        td3.innerHTML = missedVotesPct;
        tr.appendChild(td3);

        tbody.appendChild(tr);
    }
}

//Least Loyal House

//object for this function is on the top of the page

/*Function to get least loyal 10% */
// var members = data.results[0].members;

function calcLeastLoyal() {
    var sortedList = members.sort(function mySorter(a, b) {
        return a.votes_against_party_pct - b.votes_against_party_pct;
    });
    var tenPercent = sortedList.length * 0.1;

    for (i = 0; i < sortedList.length; i++) {
        if (
            statistics.leastLoyal.length <= tenPercent &&
            sortedList[i].total_votes != 0
        ) {
            statistics.leastLoyal.push(sortedList[i]);
        }
    }

    var lastElement = statistics.leastLoyal[statistics.leastLoyal.length - 1];

    for (i = tenPercent; i < sortedList.length; i++) {
        if (
            lastElement.votes_against_party_pct ==
            sortedList[i].votes_against_party_pct &&
            lastElement.id !== sortedList[i].id
        ) {
            statistics.leastLoyal.push(sortedList[i]);
        }
    }
}

/*Render table Least Loyal House*/

// var members = data.results[0].members;

function renderLeastLoyalTable() {
    var tbody = document.getElementById("house-data4");
    for (var i = 0; i < statistics.leastLoyal.length; i++) {
        var firstName = statistics.leastLoyal[i].first_name;
        var middleName = statistics.leastLoyal[i].middle_name;
        var lastName = statistics.leastLoyal[i].last_name;
        var numVotes = statistics.leastLoyal[i].total_votes;
        var votesAgainstPartyPct = statistics.leastLoyal[i].votes_against_party_pct;

        var tr = document.createElement("tr");
        var td1 = document.createElement("td");

        if (middleName === null) {
            td1.innerHTML = firstName + " " + lastName;
        } else {
            td1.innerHTML = firstName + " " + middleName + " " + lastName;
        }
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        td2.innerHTML = numVotes;
        tr.appendChild(td2);

        var td3 = document.createElement("td");
        td3.innerHTML = votesAgainstPartyPct;
        tr.appendChild(td3);

        tbody.appendChild(tr);
    }
}

//Most Loyal House

//object for this function is on the top of the page//

/*Function to get Most loyal 10% House */

function calcMostLoyal() {
    var sortedList = members.sort(function mySorter(a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct;
    });
    var tenPercent = sortedList.length * 0.1;

    for (i = 0; i < sortedList.length; i++) {
        if (
            statistics.mostLoyal.length <= tenPercent &&
            sortedList[i].votes_with_party_pct != 0
        ) {
            statistics.mostLoyal.push(sortedList[i]);
        }
    }

    var lastElement = statistics.mostLoyal[statistics.mostLoyal.length - 1];
    for (i = tenPercent; i < sortedList.length; i++) {
        if (
            lastElement.votes_with_party_pct == sortedList[i].votes_with_party_pct &&
            lastElement.id !== sortedList[i].id
        ) {
            statistics.mostLoyal.push(sortedList[i]);
        }
    }
}

/*Render table Most Loyal*/

function renderMostLoyalTable() {
    var tbody = document.getElementById("house-data5");
    for (var i = 0; i < statistics.mostLoyal.length; i++) {
        var firstName = statistics.mostLoyal[i].first_name;
        var middleName = statistics.mostLoyal[i].middle_name;
        var lastName = statistics.mostLoyal[i].last_name;
        var numVotes = statistics.mostLoyal[i].total_votes;
        var votesWithPartyPct = statistics.mostLoyal[i].votes_with_party_pct;

        var tr = document.createElement("tr");
        var td1 = document.createElement("td");

        if (middleName === null) {
            td1.innerHTML = firstName + " " + lastName;
        } else {
            td1.innerHTML = firstName + " " + middleName + " " + lastName;
        }
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        td2.innerHTML = numVotes;
        tr.appendChild(td2);

        var td3 = document.createElement("td");
        td3.innerHTML = votesWithPartyPct;
        tr.appendChild(td3);

        tbody.appendChild(tr);
    }
}

//Loader
function loader() {
    var loader = document.getElementById("loader");
    console.log("test");
    loader.style.display = "none";
}