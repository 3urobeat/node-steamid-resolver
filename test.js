//I hope tests are ok this way? No idea, never added tests to my repos but this seems to make somewhat sense.

var steamidResolver = require("./index.js")

steamidResolver.steamID64ToCustomUrl("76561198260031749", (err, customURL) => {
    if (err) return console.log("steamID64ToCustomUrl error: " + err)
    
    if (customURL == "3urobeat") { //kind of stupid to rely this test on me not changing my my customURL but also why should I ever
        console.log("steamID64ToCustomUrl ok.")
    } else {
        console.log("steamID64ToCustomUrl error!")
    }
})

steamidResolver.customUrlTosteamID64("3urobeat", (err, steamID64) => {
    if (err) return console.log("customUrlTosteamID64 error: " + err)
    
    if (steamID64 == "76561198260031749") {
        console.log("customUrlTosteamID64 ok.")
    } else {
        console.log("customUrlTosteamID64 error!")
    }
})

steamidResolver.steamID64ToFullInfo("76561198260031749", (err, info) => {
    if (err) return console.log("steamID64ToFullInfo error: " + err)
    
    if (Object.keys(info).length > 5 && info.customURL[0] == "3urobeat" && info.steamID64[0] == "76561198260031749") {
        console.log("steamID64ToFullInfo ok.")
    } else {
        console.log("steamID64ToFullInfo error!")
    }
})

steamidResolver.customUrlToFullInfo("3urobeat", (err, info) => {
    if (err) return console.log("customUrlToFullInfo error: " + err)
    
    if (Object.keys(info).length > 5 && info.customURL[0] == "3urobeat" && info.steamID64[0] == "76561198260031749") {
        console.log("customUrlToFullInfo ok.")
    } else {
        console.log("customUrlToFullInfo error!")
    }
})

steamidResolver.groupUrlToGroupID64("3urobeatGroup", (err, groupID64) => {
    if (err) return console.log("groupUrlToGroupID64 error: " + err)
    
    if (groupID64 == "103582791464712227") {
        console.log("groupUrlToGroupID64 ok.")
    } else {
        console.log("groupUrlToGroupID64 error!")
    }
})

steamidResolver.groupUrlToFullInfo("3urobeatGroup", (err, info) => {
    if (err) return console.log("groupUrlToFullInfo error: " + err)
    
    if (Object.keys(info).length > 5 && info.groupDetails[0].groupURL[0] == "3urobeatGroup" && info.groupID64[0] == "103582791464712227") {
        console.log("groupUrlToFullInfo ok.")
    } else {
        console.log("groupUrlToFullInfo error!")
    }
})