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
    mostLoyal10pct: [],
}

let members = data.results[0].members

for (i = 0; i < members.length; i++) {
    if (members[i].party == "D") {
        statistics.atAglance[0].number++

    } else if (members[i].party == "R") {
        statistics.atAglance[1].number++

    } else if (members[i].party == "I") {
        statistics.atAglance[2].number++
    }
}

let pctVotesD = 0
let pctVotesR = 0
let pctVotesI = 0
for (i = 0; i < members.length; i++) {
    if (members[i].party == "D") {
        pctVotesD += members[i].votes_with_party_pct
        statistics.atAglance[0].pctVoted = pctVotesD / statistics.atAglance[0].number
    } else if (members[i].party == "R") {
        pctVotesR += members[i].votes_with_party_pct
        statistics.atAglance[1].pctVoted = pctVotesR / statistics.atAglance[1].number

    } else if (members[i].party == "I") {
        pctVotesI += members[i].votes_with_party_pct
        statistics.atAglance[2].pctVoted = pctVotesI / statistics.atAglance[2].number
    }

    //total amount of senators:
    statistics.atAglance[3].number = statistics.atAglance[0].number + statistics.atAglance[1].number + statistics.atAglance[2].number
    //sum all pct - method 1
    sumPctVoted = statistics.atAglance[0].pctVoted + statistics.atAglance[1].pctVoted + statistics.atAglance[2].pctVoted
    //average pct - method 1
    statistics.atAglance[3].pctVoted = sumPctVoted / 3
    //sum all pct - method 2
    sumPctVotesAll = pctVotesD + pctVotesR + pctVotesI
    //average pct - method 2
    statistics.atAglance[3].pctVoted = sumPctVotesAll / members.length
}

console.log(statistics)

// 10% MOST/LEAST ENGAGED MEMBERS


leastEngaged = members
mostEngaged = members


//least engaged

for (let i = 0; i < leastEngaged.length; i++) {
    leastEngaged.sort(function (a, b) {
        return b.missed_votes_pct - a.missed_votes_pct
    })
}

//hiba
// let tenPct = Math.round(leastEngaged.length * 0.1)
// for (var i = 0; i < tenPct; i++) {
//     statistics.least_Engaged_pct.push(leastEngaged[i])
// }


for (let n = 0; n < (leastEngaged.length) * 0.1; n++) {
    statistics.leastEngaged10pct.push(leastEngaged[n])
    console.log(statistics.leastEngaged10pct[n].missed_votes_pct + statistics.leastEngaged10pct[n].first_name + statistics.leastEngaged10pct[n].missed_votes)
    //console.log("length" + statistics.least_Engaged_pct.length)
}

//most engaged:
for (let i = 0; i < mostEngaged.length; i++) {
    mostEngaged.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct
    })
}

for (let n = 0; n < (mostEngaged.length) * 0.1; n++) {
    statistics.mostEngaged10pct.push(mostEngaged[n])
    console.log(statistics.mostEngaged10pct[n].missed_votes_pct + statistics.mostEngaged10pct[n].first_name + statistics.mostEngaged10pct[n].missed_votes)
    //console.log("length" + statistics.least_Engaged_pct.length)
}

leastLoyal = members
mostLoyal = members

//least loyal:
for (let i = 0; i < leastLoyal.length; i++) {
    leastLoyal.sort(function (a, b) {
        return a.votes_with_party_pct - b.votes_with_party_pct
    })
}

for (let n = 0; n < (leastLoyal.length) * 0.1; n++) {
    statistics.leastLoyal10pct.push(leastLoyal[n])
    console.log(statistics.leastLoyal10pct[n].total_votes + statistics.leastLoyal10pct[n].first_name + statistics.leastLoyal10pct[n].votes_with_party_pct)
}

//most loyal:
for (let i = 0; i < mostLoyal.length; i++) {
    mostLoyal.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct
    })
}

for (let n = 0; n < (mostLoyal.length) * 0.1; n++) {
    statistics.mostLoyal10pct.push(mostLoyal[n])
    console.log(statistics.mostLoyal10pct[n].total_votes + statistics.mostLoyal10pct[n].first_name + statistics.mostLoyal10pct[n].votes_with_party_pct)
}



"votes_with_party_pct"
"total_votes"