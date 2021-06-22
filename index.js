//Source code: https://github.com/HerrEurobeat/node-steamid-resolver

const https  = require("https")
const xml2js = require("xml2js")

var debug = false; //logs a few more messages


/**
 * Internal function to get the XML information of a user
 * @param {String} url Full URL of the user to steamcommunity.com
 * @returns {Promise} Promise object of the user's full information or an error with description
 */
function getXMLinfo(url) {
    return new Promise((resolve, reject) => {
        try {
            if (debug) console.log(`[steamid-resolver] Trying to get profile information of ${url}`)

            var output = ""

            https.get(`${url}?xml=1`, function(result) {
                result.on('data', function (chunk) {
                    output += chunk 
                })

                result.on('end', () => { //finished request
                    if (debug) console.log(`[steamid-resolver] Successfully retrieved information from Steam.`)

                    new xml2js.Parser().parseString(output, function(err, parsed) { //parse the XML data from Steam into an object
                        if (err) { //check for parsing error
                            if (debug) console.log(`[steamid-resolver] Failed to parse user XML info: ${err}`)

                            reject("Error parsing user info xml: " + err)
                            return;
                        }

                        if (parsed.response && parsed.response.error) { //check for error like profile not found
                            if (debug) console.log(`[steamid-resolver] Error returned from Steam: ${parsed.response.error}`)

                            reject(parsed.response.error)
                            return;
                        }

                        if (parsed.profile) { //check if profile data exists
                            if (debug) console.log("[steamid-resolver] Successfully retrieved valid profile information.")

                            resolve(parsed.profile) //resolve promise and pass data back to caller
                        } else {
                            if (debug) console.log("[steamid-resolver] Steam didn't return any profile information but also no error! Parsed:\n" + parsed)

                            reject("No profile information returned")
                            return;
                        }
                    })
                }) 
            })
        } catch (err) {
            if (debug) console.log("[steamid-resolver] No response from Steam or other https error! Error: " + err)

            reject("Error trying to reach Steam: " + err) //TODO: also check for status code to see if Steam is down
            return;
        }
    })
    
}


/**
 * Get the custom profile url of a user as String by their steam64id
 * @param {String} steam64id steam64id of the user
 * @param {function} [callback] Called with `err` and `customURL` parameters on completion
 */
module.exports.steam64idToCustomUrl = (steam64id, callback) => {
    getXMLinfo(`https://steamcommunity.com/profiles/${steam64id}`)
        .then(res => {
            callback(null, res.customURL[0]) //callback customURL when we are done (which is somehow in an array(?))
        })
        .catch(err => {
            callback(err, null); //callback error
        })
}

/**
 * Get the steam64id of a user as String by their custom profile url
 * @param {String} customID Full URL or just the custom ID of the user as String
 * @param {function} [callback] Called with `err` and `steam64id` parameters on completion
 */
module.exports.customUrlToSteam64id = (customID, callback) => {
    getXMLinfo(`https://steamcommunity.com/id/${customID}`)
        .then(res => {
            callback(null, res.steamID64[0])
        })
        .catch(err => {
            callback(err, null);
        })
}
