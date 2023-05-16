/*
 * File: index.js
 * Project: steamid-resolver
 * Created Date: 05.04.2023 19:04:56
 * Author: 3urobeat
 * 
 * Last Modified: 16.05.2023 18:59:51
 * Modified By: 3urobeat
 * 
 * Copyright (c) 2023 3urobeat <https://github.com/HerrEurobeat>
 * 
 * Licensed under the MIT license: https://opensource.org/licenses/MIT
 * Permission is granted to use, copy, modify, and redistribute the work.
 * Full license information available in the project LICENSE file.
 */


// Source: https://github.com/HerrEurobeat/node-steamid-resolver

const { _parseParam } = require("./helpers/parseParam.js");
const { _parseXML }   = require("./helpers/parseXML.js");


/**
 * Get the custom profile url of a user as String by their steamID64 or full URL
 * @param {String} steamID64 steamID64 or full URL of the user
 * @param {function} [callback] Optional: Called with `err` (String) and `customURL` (String) parameters on completion
 */
module.exports.steamID64ToCustomUrl = (steamID64, callback = () => {}) => {
    return new Promise((resolve, reject) => {
        steamID64 = _parseParam(steamID64);

        _parseXML(`https://steamcommunity.com/profiles/${steamID64}`)
            .then(res => {
                resolve(res.customURL[0]);
                callback(null, res.customURL[0]);
            })
            .catch(err => {
                reject(err);
                callback(err, null);
            });
    });
};


/**
 * Get the steamID64 of a user as String by their custom profile url or full URL
 * @param {String} customID Custom ID or full URL of the user as String
 * @param {function} [callback] Optional: Called with `err` (String) and `steamID64` (String) parameters on completion
 */
module.exports.customUrlToSteamID64 = (customID, callback = () => {}) => {
    return new Promise((resolve, reject) => {
        customID = _parseParam(customID);

        _parseXML(`https://steamcommunity.com/id/${customID}`)
            .then(res => {
                resolve(res.steamID64[0]);
                callback(null, res.steamID64[0]);
            })
            .catch(err => {
                reject(err);
                callback(err, null);
            });
    });
};


/**
 * Get the full information of a user as Object by their steamID64 or full URL
 * @param {String} steamID64 steamID64 or full URL of the user as String
 * @param {function} [callback] Optional: Called with `err` (String) and `info` (Object) parameters on completion
 */
module.exports.steamID64ToFullInfo = (steamID64, callback = () => {}) => {
    return new Promise((resolve, reject) => {
        steamID64 = _parseParam(steamID64);

        _parseXML(`https://steamcommunity.com/profiles/${steamID64}`)
            .then(res => {
                resolve(res);
                callback(null, res);
            })
            .catch(err => {
                reject(err);
                callback(err, null);
            });
    });
};


/**
 * Get the full information of a user as Object by their custom profile url or full URL
 * @param {String} customID Custom ID or full URL of the user as String
 * @param {function} [callback] Optional: Called with `err` (String) and `info` (Object) parameters on completion
 */
module.exports.customUrlToFullInfo = (customID, callback = () => {}) => {
    return new Promise((resolve, reject) => {
        customID = _parseParam(customID);

        _parseXML(`https://steamcommunity.com/id/${customID}`)
            .then(res => {
                resolve(res);
                callback(null, res);
            })
            .catch(err => {
                reject(err);
                callback(err, null);
            });
    });
};


/**
 * Get the group64ID of a group as String by groupURL or full URL
 * @param {String} groupURL Custom Name of the group or full URL as String
 * @param @param {function} [callback] Optional: Called with `err` (String) and `groupID64` (String) parameters on completion
 */
module.exports.groupUrlToGroupID64 = (groupURL, callback = () => {}) => {
    return new Promise((resolve, reject) => {
        groupURL = _parseParam(groupURL);

        _parseXML(`https://steamcommunity.com/groups/${groupURL}/memberslistxml`)
            .then(res => {
                resolve(res.groupID64[0]);
                callback(null, res.groupID64[0]);
            })
            .catch(err => {
                reject(err);
                callback(err, null);
            });
    });
};


/**
 * Get the full information of a group as Object by groupURL or full URL
 * @param {String} groupURL Custom Name of the group or full URL as String
 * @param {function} [callback] Optional: Called with `err` (String) and `info` (Object) parameters on completion
 */
module.exports.groupUrlToFullInfo = (groupURL, callback = () => {}) => {
    return new Promise((resolve, reject) => {
        groupURL = _parseParam(groupURL);

        _parseXML(`https://steamcommunity.com/groups/${groupURL}/memberslistxml`)
            .then(res => {
                resolve(res);
                callback(null, res);
            })
            .catch(err => {
                reject(err);
                callback(err, null);
            });
    });
};


/**
 * Checks if the provided ID or full URL points to a valid sharedfile
 * @param {String} input Sharedfile ID of full URL
 * @param {function} [callback] Optional: Called with `err` (String) and `isValid` (Boolean) parameters on completion
 */
module.exports.isValidSharedfileID = (input, callback = () => {}) => {
    return new Promise((resolve, reject) => {
        // Precede input with URL if only the ID was provided
        if (!input.includes("steamcommunity.com")) input = "https://steamcommunity.com/sharedfiles/filedetails/?id=" + input;

        try {
            let output = "";

            require("https").get(input, (res) => {
                res.on('data', (chunk) => output += chunk); // Append each chunk to output

                res.on("end", () => {
                    // Check if output contains an error msg
                    let isInvalid = output.includes("There was a problem accessing the item") || output.includes("That item does not exist");

                    resolve(!isInvalid);
                    callback(null, !isInvalid);
                });
            });
        } catch (err) {
            reject(err);
            callback(err, null);
        }
    });
};