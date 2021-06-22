//I hope tests are ok this way? No idea, never added tests to my repos but this seems to make somewhat sense.

var steamidResolver = require("./index.js")

steamidResolver.steam64idToCustomUrl("76561198260031749", (err, customURL) => {
    if (err) return console.log("steam64idToCustomUrl error: " + err)
    
    if (customURL == "3urobeat") { //kind of stupid to rely this test on me not changing my my customURL but also why should I ever
        console.log("steam64idToCustomUrl ok.")
    } else {
        console.log("steam64idToCustomUrl error!")
    }
})

steamidResolver.customUrlToSteam64id("3urobeat", (err, steam64id) => {
    if (err) return console.log("customUrlToSteam64id error: " + err)
    
    if (steam64id == "76561198260031749") {
        console.log("customUrlToSteam64id ok.")
    } else {
        console.log("customUrlToSteam64id error!")
    }
})

steamidResolver.steam64idToFullInfo("76561198260031749", (err, info) => {
    if (err) return console.log("steam64idToFullInfo error: " + err)
    
    if (Object.keys(info).length > 5 && info.customURL[0] == "3urobeat" && info.steamID64[0] == "76561198260031749") {
        console.log("steam64idToFullInfo ok.")
    } else {
        console.log("steam64idToFullInfo error!")
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