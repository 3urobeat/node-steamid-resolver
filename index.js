//Source code: https://github.com/HerrEurobeat/node-steamid-resolver

const https  = require("https")
const xml2js = require("xml2js")

var debug = false; //logs a few more messages


/**
 * Internal function to get the XML information of a user or group
 * @param {String} url Full URL of the user or group to steamcommunity.com
 * @returns {Promise} Promise object of the user's or group's full information or an error with description
 */
function getXMLinfo(url) {
    return new Promise((resolve, reject) => {
        try {
            if (debug) console.log(`[steamid-resolver] Trying to get XML data of ${url}`)

            var output = ""

            https.get(`${url}?xml=1`, function(result) {
                result.on('data', function (chunk) {
                    output += chunk 
                })

                result.on('end', () => { //finished request
                    if (debug) console.log(`[steamid-resolver] Successfully retrieved information from Steam.`)

                    new xml2js.Parser().parseString(output, function(err, parsed) { //parse the XML data from Steam into an object
                        if (err) { //check for parsing error
                            if (debug) console.log(`[steamid-resolver] Failed to parse XML info: ${err}`)

                            reject("Error parsing user info xml: " + err)
                            return;
                        }

                        if (parsed.response && parsed.response.error) { //check for error like profile/group not found
                            if (debug) console.log(`[steamid-resolver] Error returned from Steam: ${parsed.response.error}`)

                            reject(parsed.response.error)
                            return;
                        }

                        if (parsed.profile || parsed.memberList) { //check if profile data exists
                            if (debug) console.log("[steamid-resolver] Successfully retrieved valid profile/group information.")

                            if (parsed.profile) resolve(parsed.profile) //resolve promise and pass data back to caller
                            if (parsed.memberList) resolve(parsed.memberList)
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
 * Internal function to process the id parameter in order to also accept urls from the user
 * @param {String} param The parameter which the user provided
 * @returns {String} The processed parameter
 */
function processParameter(param) {
    if (debug) console.log(`[steamid-resolver] Processing parameter: ${param}`)

    if (param.includes("steamcommunity.com/")) { //check if full url was provided
        if (debug) console.log(`[steamid-resolver] Parameter is an url. Splitting...`)
        var split = param.split("/")

        if (debug) console.log(`[steamid-resolver] Split url and returning this: ${split[split.length - 1]}`)
        return split[split.length - 1]

    } else { //if the user already provided only the important part then just return the parameter again
        if (debug) console.log(`[steamid-resolver] Parameter is not an url. Returning unmodified parameter...`)
        return param;
    }
}


/**
 * Get the custom profile url of a user as String by their steamID64 or full URL
 * @param {String} steamID64 steamID64 or full URL of the user
 * @param {function} [callback] Called with `err` (String) and `customURL` (String) parameters on completion
 */
module.exports.steamID64ToCustomUrl = (steamID64, callback) => {
    var steamID64 = processParameter(steamID64)

    getXMLinfo(`https://steamcommunity.com/profiles/${steamID64}`)
        .then(res => {
            callback(null, res.customURL[0]) //callback customURL when we are done (which is somehow in an array(?))
        })
        .catch(err => {
            callback(err, null); //callback error
        })
}

/**
 * Get the steamID64 of a user as String by their custom profile url or full URL
 * @param {String} customID Custom ID or full URL of the user as String
 * @param {function} [callback] Called with `err` (String) and `steamID64` (String) parameters on completion
 */
module.exports.customUrlTosteamID64 = (customID, callback) => {
    var customID = processParameter(customID)

    getXMLinfo(`https://steamcommunity.com/id/${customID}`)
        .then(res => {
            callback(null, res.steamID64[0])
        })
        .catch(err => {
            callback(err, null);
        })
}

/**
 * Get the full information of a user as Object by their steamID64 or full URL
 * @param {String} steamID64 steamID64 or full URL of the user as String
 * @param {function} [callback] Called with `err` (String) and `info` (Object) parameters on completion
 */
module.exports.steamID64ToFullInfo = (steamID64, callback) => {
    var steamID64 = processParameter(steamID64)

    getXMLinfo(`https://steamcommunity.com/profiles/${steamID64}`)
        .then(res => {
            callback(null, res) //callback full object
        })
        .catch(err => {
            callback(err, null); //callback error
        })
}

/**
 * Get the full information of a user as Object by their custom profile url or full URL
 * @param {String} customID Custom ID or full URL of the user as String
 * @param {function} [callback] Called with `err` (String) and `info` (Object) parameters on completion
 */
module.exports.customUrlToFullInfo = (customID, callback) => {
    var customID = processParameter(customID)

    getXMLinfo(`https://steamcommunity.com/id/${customID}`)
        .then(res => {
            callback(null, res)
        })
        .catch(err => {
            callback(err, null);
        })
}

/**
 * Get the group64ID of a group as String by groupURL or full URL
 * @param {String} groupURL Custom Name of the group or full URL as String
 * @param @param {function} [callback] Called with `err` (String) and `groupID64` (String) parameters on completion
 */
module.exports.groupUrlToGroupID64 = (groupURL, callback) => {
    var groupURL = processParameter(groupURL)

    getXMLinfo(`https://steamcommunity.com/groups/${groupURL}/memberslistxml`)
        .then(res => {
            callback(null, res.groupID64[0]) //callback groupID64
        })
        .catch(err => {
            callback(err, null); //callback error
        })
}

/**
 * Get the full information of a group as Object by groupURL or full URL
 * @param {String} groupURL Custom Name of the group or full URL as String
 * @param {function} [callback] Called with `err` (String) and `info` (Object) parameters on completion
 */
module.exports.groupUrlToFullInfo = (groupURL, callback) => {
    var groupURL = processParameter(groupURL)

    getXMLinfo(`https://steamcommunity.com/groups/${groupURL}/memberslistxml`)
        .then(res => {
            callback(null, res)
        })
        .catch(err => {
            callback(err, null); //callback error
        })
}