//Source code: https://github.com/HerrEurobeat/node-steamid-resolver

const https  = require("https")
const xml2js = require("xml2js")



//internal function to get the XML information of a user
function getXMLinfo(url, callback) {
    try {
        var output = ""

        https.get(`${url}?xml=1`, function(result) {
            result.on('data', function (chunk) {
                output += chunk 
            })

            result.on('end', () => { //finished request
                new xml2js.Parser().parseString(output, function(err, parsed) { //parse the XML data from Steam into an object
                    if (err) { //check for parsing error
                        callback()
                        console.log("[steamid-resolver] Error parsing user info xml: " + err) //error logging needs to be improved I guess
                        return;
                    }

                    if (parsed.response && parsed.response.error) {
                        callback()
                        console.log("[steamid-resolver] Response error: " + ownerResult.response.error)
                        return;
                    }

                    if (parsed.profile) {
                        callback(parsed.profile)
                    } else {
                        console.log("[steamid-resolver] No profile information returned by Steam.")
                        return;
                    }
                })
            }) 
        })
    } catch (err) {
        callback()
        return console.log("[steamid-resolver] Error getting user information from Steam: " + err) //error logging needs to be improved I guess (also check for status code to see if Steam is down)
    }
}


/**
 * Get the custom profile url of a user as String by their steam64id
 * @param {String} steam64id steam64id of the user
 * @callback String The user's custom ID as callback
 */
module.exports.steam64idToCustomUrl = (steam64id, callback) => {
    getXMLinfo(`https://steamcommunity.com/profiles/${steam64id}`, (res) => {
        callback(res.customURL[0]) //callback customURL when we are done (which is somehow in an array(?))
    })
}
