/*
 * File: index.js
 * Project: steamid-resolver
 * Created Date: 2023-04-05 19:04:56
 * Author: 3urobeat
 *
 * Last Modified: 2025-01-23 21:51:00
 * Modified By: 3urobeat
 *
 * Copyright (c) 2023 - 2025 3urobeat <https://github.com/3urobeat>
 *
 * Licensed under the MIT license: https://opensource.org/licenses/MIT
 * Permission is granted to use, copy, modify, and redistribute the work.
 * Full license information available in the project LICENSE file.
 */


// Source: https://github.com/3urobeat/node-steamid-resolver

const { _parseParam } = require("./parseParam.js");
const { _parseXML }   = require("./parseXML.js");


// Type definitions for full information objects

/**
 * Full profile information object returned by Steam. Notes: `mostPlayedGames` had 4 elements in testing. `groups` contains full information of the first 3 groups, all following groups only have '$' and 'groupID64' populated.
 * @typedef fullProfileInfoObject
 * @type {{
 *      steamID64: [string], steamID: [string], onlineState: [string], stateMessage: [string], privacyState: [string], visibilityState: [string], avatarIcon: [string], avatarMedium: [string], avatarFull: [string], vacBanned: [string],
 *      tradeBanState: [string], isLimitedAccount: [string], customURL: [string], memberSince: [string], steamRating: [string], hoursPlayed2Wk: [string], headline: [string], location: [string],realname: [string], summary: [string],
 *      mostPlayedGames: [
 *          { mostPlayedGame: [
 *              { gameName: [string], gameLink: [string], gameIcon: [string], gameLogo: [string], gameLogoSmall: [string], hoursPlayed: [string], hoursOnRecord: [string], statsName: [string] },
 *              { gameName: [string], gameLink: [string], gameIcon: [string], gameLogo: [string], gameLogoSmall: [string], hoursPlayed: [string], hoursOnRecord: [string], statsName: [string] },
 *              { gameName: [string], gameLink: [string], gameIcon: [string], gameLogo: [string], gameLogoSmall: [string], hoursPlayed: [string], hoursOnRecord: [string], statsName: [string] },
 *              { gameName: [string], gameLink: [string], gameIcon: [string], gameLogo: [string], gameLogoSmall: [string], hoursPlayed: [string], hoursOnRecord: [string], statsName: [string] }
 *          ] }
 *      ],
 *      groups: [
 *          { group: array<{ "$": { isPrimary: string }, groupID64: [string], groupName: [string], groupURL: [string], headline: [string], summary: [string], avatarIcon: [string], avatarMedium: [string], avatarFull: [string], memberCount: [string], membersInChat: [string], membersInGame: [string], membersOnline: [string] }> }
 *      ]
 * }}
 */

/**
 * Full group information object returned by Steam.
 * @typedef fullGroupInfoObject
 * @type {{
 *      groupID64: [string],
 *      groupDetails: [
 *          { groupName: [string], groupURL: [string], headline: [string], summary: [string], avatarIcon: [string], avatarMedium: [string], avatarFull: [string], memberCount: [string], membersInChat: [string], membersInGame: [string], membersOnline: [string] }
 *      ],
 *      memberCount: [string], totalPages: [string], currentPage: [string], startingMember: [string], nextPageLink: [string],
 *      members: [
 *          { steamID64: array<string> }
 *      ]
 * }}
 */


/**
 * Get the custom profile url of a user as String by their steamID64 or full URL
 * @param {String} steamID64 steamID64 or full URL of the user
 * @param {function(string, string)} [callback] Optional: Called with `err` (String) and `customURL` (String) parameters on completion
 * @return {Promise.<string>} Resolves with customURL on success or rejects with error on failure
 */
module.exports.steamID64ToCustomUrl = (steamID64, callback) => {
    return new Promise((resolve, reject) => {
        // Hack to support Promises & Callbacks: Resolve errors instead of rejecting them when callback is defined to prevent UnhandledPromiseRejection crash
        reject = (!callback || typeof callback !== "function") ? reject : resolve;
        callback = callback || (() => {});

        steamID64 = _parseParam(steamID64);

        _parseXML(`https://steamcommunity.com/profiles/${steamID64}`)
            .then(res => {
                // Check if profile is private and return an error because private profiles do not contain a customURL property
                if (res.customURL && res.customURL[0]) {
                    resolve(res.customURL[0]);
                    callback(null, res.customURL[0]);
                } else {
                    reject("Failed to resolve customURL!")
                    callback("Failed to resolve customURL!", null);
                }
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
 * @param {function(string, string)} [callback] Optional: Called with `err` (String) and `steamID64` (String) parameters on completion
 * @return {Promise.<string>} Resolves with steamID64 on success or rejects with error on failure
 */
module.exports.customUrlToSteamID64 = (customID, callback) => {
    return new Promise((resolve, reject) => {
        // Hack to support Promises & Callbacks: Resolve errors instead of rejecting them when callback is defined to prevent UnhandledPromiseRejection crash
        reject = (!callback || typeof callback !== "function") ? reject : resolve;
        callback = callback || (() => {});

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
 * @param {function(string, fullProfileInfoObject)} [callback] Optional: Called with `err` (String) and `info` (Object) parameters on completion
 * @return {Promise.<fullProfileInfoObject>} Resolves with fullInfo object on success or rejects with error string on failure
 */
module.exports.steamID64ToFullInfo = (steamID64, callback) => {
    return new Promise((resolve, reject) => {
        // Hack to support Promises & Callbacks: Resolve errors instead of rejecting them when callback is defined to prevent UnhandledPromiseRejection crash
        reject = (!callback || typeof callback !== "function") ? reject : resolve;
        callback = callback || (() => {});

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
 * @param {function(string, fullProfileInfoObject)} [callback] Optional: Called with `err` (String) and `info` (Object) parameters on completion
 * @return {Promise.<fullProfileInfoObject>} Resolves with fullInfo object on success or rejects with error string on failure
 */
module.exports.customUrlToFullInfo = (customID, callback) => {
    return new Promise((resolve, reject) => {
        // Hack to support Promises & Callbacks: Resolve errors instead of rejecting them when callback is defined to prevent UnhandledPromiseRejection crash
        reject = (!callback || typeof callback !== "function") ? reject : resolve;
        callback = callback || (() => {});

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
 * @param {function(string, string)} [callback] Optional: Called with `err` (String) and `groupID64` (String) parameters on completion
 * @returns {Promise.<string>} Resolves with groupID64 on success or rejects with error on failure
 */
module.exports.groupUrlToGroupID64 = (groupURL, callback) => {
    return new Promise((resolve, reject) => {
        // Hack to support Promises & Callbacks: Resolve errors instead of rejecting them when callback is defined to prevent UnhandledPromiseRejection crash
        reject = (!callback || typeof callback !== "function") ? reject : resolve;
        callback = callback || (() => {});

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
 * @param {function(string, fullGroupInfoObject)} [callback] Optional: Called with `err` (String) and `info` (Object) parameters on completion
 * @returns {Promise.<fullGroupInfoObject>} Resolves with fullInfo object on success or rejects with error string on failure
 */
module.exports.groupUrlToFullInfo = (groupURL, callback) => {
    return new Promise((resolve, reject) => {
        // Hack to support Promises & Callbacks: Resolve errors instead of rejecting them when callback is defined to prevent UnhandledPromiseRejection crash
        reject = (!callback || typeof callback !== "function") ? reject : resolve;
        callback = callback || (() => {});

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
 * @param {String} sharedfileID Sharedfile ID or full sharedfile URL
 * @param {function(string, boolean)} [callback] Optional: Called with `err` (String) and `isValid` (Boolean) parameters on completion
 * @returns {Promise.<boolean>} Resolves with `isValid` boolean on success or rejects with error string on failure
 */
module.exports.isValidSharedfileID = (sharedfileID, callback) => {
    return new Promise((resolve, reject) => {
        // Hack to support Promises & Callbacks: Resolve errors instead of rejecting them when callback is defined to prevent UnhandledPromiseRejection crash
        reject = (!callback || typeof callback !== "function") ? reject : resolve;
        callback = callback || (() => {});

        // Precede sharedfileID with URL if only the ID was provided
        if (!sharedfileID.includes("steamcommunity.com")) sharedfileID = "https://steamcommunity.com/sharedfiles/filedetails/?id=" + sharedfileID;

        try {
            let output = "";

            require("https").get(sharedfileID, (res) => {
                res.on("data", (chunk) => output += chunk); // Append each chunk to output

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
