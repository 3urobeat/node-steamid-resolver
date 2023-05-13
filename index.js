/*
 * File: index.js
 * Project: steamid-resolver
 * Created Date: 05.04.2023 19:04:56
 * Author: 3urobeat
 * 
 * Last Modified: 13.05.2023 23:15:22
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
 * @param {function} [callback] Called with `err` (String) and `customURL` (String) parameters on completion
 */
module.exports.steamID64ToCustomUrl = (steamID64, callback) => {
    steamID64 = _parseParam(steamID64);

    _parseXML(`https://steamcommunity.com/profiles/${steamID64}`)
        .then(res => callback(null, res.customURL[0]))
        .catch(err => callback(err, null));
};


/**
 * Get the steamID64 of a user as String by their custom profile url or full URL
 * @param {String} customID Custom ID or full URL of the user as String
 * @param {function} [callback] Called with `err` (String) and `steamID64` (String) parameters on completion
 */
module.exports.customUrlToSteamID64 = (customID, callback) => {
    customID = _parseParam(customID);

    _parseXML(`https://steamcommunity.com/id/${customID}`)
        .then(res => callback(null, res.steamID64[0]))
        .catch(err => callback(err, null));
};


/**
 * Get the full information of a user as Object by their steamID64 or full URL
 * @param {String} steamID64 steamID64 or full URL of the user as String
 * @param {function} [callback] Called with `err` (String) and `info` (Object) parameters on completion
 */
module.exports.steamID64ToFullInfo = (steamID64, callback) => {
    steamID64 = _parseParam(steamID64);

    _parseXML(`https://steamcommunity.com/profiles/${steamID64}`)
        .then(res => callback(null, res))
        .catch(err => callback(err, null));
};


/**
 * Get the full information of a user as Object by their custom profile url or full URL
 * @param {String} customID Custom ID or full URL of the user as String
 * @param {function} [callback] Called with `err` (String) and `info` (Object) parameters on completion
 */
module.exports.customUrlToFullInfo = (customID, callback) => {
    customID = _parseParam(customID);

    _parseXML(`https://steamcommunity.com/id/${customID}`)
        .then(res => callback(null, res))
        .catch(err => callback(err, null));
};


/**
 * Get the group64ID of a group as String by groupURL or full URL
 * @param {String} groupURL Custom Name of the group or full URL as String
 * @param @param {function} [callback] Called with `err` (String) and `groupID64` (String) parameters on completion
 */
module.exports.groupUrlToGroupID64 = (groupURL, callback) => {
    groupURL = _parseParam(groupURL);

    _parseXML(`https://steamcommunity.com/groups/${groupURL}/memberslistxml`)
        .then(res => callback(null, res.groupID64[0]))
        .catch(err => callback(err, null));
};


/**
 * Get the full information of a group as Object by groupURL or full URL
 * @param {String} groupURL Custom Name of the group or full URL as String
 * @param {function} [callback] Called with `err` (String) and `info` (Object) parameters on completion
 */
module.exports.groupUrlToFullInfo = (groupURL, callback) => {
    groupURL = _parseParam(groupURL);

    _parseXML(`https://steamcommunity.com/groups/${groupURL}/memberslistxml`)
        .then(res => callback(null, res))
        .catch(err => callback(err, null));
};