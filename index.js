//Source code: https://github.com/HerrEurobeat/node-steamid-resolver

const https  = require("https")
const xml2js = require("xml2js")



/**
 * Internal function to get the XML information of a user
 * @param {String} url Full URL of the user to steamcommunity.com
 * @returns {Promise} Promise object of the user's full information or an error with description
 */
function getXMLinfo(url) {
    return new Promise((resolve, reject) => {
        try {

            var output = ""

            https.get(`${url}?xml=1`, function(result) {
                result.on('data', function (chunk) {
                    output += chunk 
                })

                result.on('end', () => { //finished request
                    new xml2js.Parser().parseString(output, function(err, parsed) { //parse the XML data from Steam into an object
                        if (err) { //check for parsing error
                            reject("Error parsing user info xml: " + err)
                            return;
                        }

                        if (parsed.response && parsed.response.error) { //check for error
                            reject(parsed.response.error)
                            return;
                        }

                        if (parsed.profile) {
                            resolve(parsed.profile)
                        } else {
                            reject("No profile information returned")
                            return;
                        }
                    })
                }) 
            })
        } catch (err) {
            reject("Error getting user information from Steam: " + err) //TODO: also check for status code to see if Steam is down
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
            callback(err, null);
        })
}
