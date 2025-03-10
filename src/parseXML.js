/*
 * File: parseXML.js
 * Project: steamid-resolver
 * Created Date: 2023-05-13 22:30:59
 * Author: 3urobeat
 *
 * Last Modified: 2025-01-23 21:57:28
 * Modified By: 3urobeat
 *
 * Copyright (c) 2023 - 2025 3urobeat <https://github.com/3urobeat>
 *
 * Licensed under the MIT license: https://opensource.org/licenses/MIT
 * Permission is granted to use, copy, modify, and redistribute the work.
 * Full license information available in the project LICENSE file.
 */


const https  = require("https");
const xml2js = require("xml2js");


const enableDebug = false; // Logs a few more messages

// Small helper function to make debug logging cleaner
function log(txt) {
    if (enableDebug) console.log(txt);
}


// Helper to get customURL from redirect when profile is private. Resolves with String on success or `null` on failure
function resolveCustomURL(url) {
    return new Promise((resolve) => {
        log(`[steamid-resolver] Getting redirect for '${url}'`)

        https.get(url, (redirectResult) => {
            redirectResult.on("data", () => {});

            redirectResult.on("end", () => {
                const result = redirectResult.headers.location;

                log(`[steamid-resolver] Got redirected to '${result}'`);

                if (result && String(result).includes("steamcommunity.com/id/")) {
                    const split = result.split("/");

                    // Remove trailing slash if necessary
                    if (split[split.length - 1] == "") split.pop();

                    // Resolve with ID
                    resolve(split[split.length - 1]);
                } else {
                    resolve(null);
                }
            });
        });
    });
}


/**
 * Internal: Gets data and parses user or group XML data to object
 * @param {String} url Full URL of the user or group to steamcommunity.com
 * @returns {Promise.<import("..").fullProfileInfoObject|import("..").fullGroupInfoObject>} Resolves with user's or group's full information object or rejects with an Error String.
 */
module.exports._parseXML = (url) => {
    return new Promise((resolve, reject) => {
        try {
            log(`[steamid-resolver] Trying to get XML data of ${url}`);

            let output = "";

            // Get XML data from Steam
            https.get(`${url}?xml=1`, (result) => {
                result.on("data", (chunk) => output += chunk); // Add each chunk of incoming data to output

                // Start parsing response when finished
                result.on("end", () => {
                    log("[steamid-resolver] Successfully retrieved information from Steam.");

                    // Check if output is steam group xml data before parsing it in order to provide correct group not found message
                    if (!String(output).includes("<?xml") && !String(output).includes("<error>")) {
                        reject("The specified group could not be found.");
                        return;
                    }

                    // Parse the XML data from Steam into an object
                    new xml2js.Parser().parseString(output, async function(err, parsed) {

                        // Check for parsing error
                        if (err) {
                            log(`[steamid-resolver] Failed to parse XML info: ${err}`);

                            reject("Failed to parse XML: " + err);
                            return;
                        }

                        // Check for profile/group not found error
                        if (parsed.response && parsed.response.error) {
                            log(`[steamid-resolver] Error returned from Steam: ${String(parsed.response.error)}`);

                            reject(String(parsed.response.error));
                            return;
                        }

                        // Check if a match was found
                        if (parsed.profile) {

                            // Attempt to resolve customURL when profile is private
                            if (parsed.profile.privacyState && parsed.profile.privacyState[0] != "public") {
                                log("[steamid-resolve] Profile is private, attempting to resolve customURL...");

                                if (url.includes("steamcommunity.com/profiles/")) {
                                    const redirectResult = await resolveCustomURL(url);

                                    if (redirectResult) parsed.profile.customURL = [ redirectResult ];
                                }

                                if (url.includes("steamcommunity.com/id/")) {
                                    const split = url.split("/");
                                    parsed.profile.customURL = [ split[split.length - 1] ];
                                }
                            }

                            log("[steamid-resolver] Successfully retrieved valid profile information.");
                            resolve(parsed.profile);

                        } else if (parsed.memberList) {

                            log("[steamid-resolver] Successfully retrieved valid group information.");
                            resolve(parsed.memberList);

                        } else { // ...otherwise return an error

                            log("[steamid-resolver] Steam didn't return any profile information but also no error! Parsed:\n" + parsed);

                            reject("Steam returned no profile information");
                            return;
                        }

                    });
                });
            });
        } catch (err) {
            log("[steamid-resolver] No response from Steam or other https error! Error: " + err);

            reject("Error trying to reach Steam: " + err); // TODO: Also check for status code to see if Steam is down
            return;
        }
    });
};
