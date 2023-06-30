/*
 * File: parseParam.js
 * Project: steamid-resolver
 * Created Date: 13.05.2023 22:32:11
 * Author: 3urobeat
 *
 * Last Modified: 30.06.2023 09:58:40
 * Modified By: 3urobeat
 *
 * Copyright (c) 2023 3urobeat <https://github.com/3urobeat>
 *
 * Licensed under the MIT license: https://opensource.org/licenses/MIT
 * Permission is granted to use, copy, modify, and redistribute the work.
 * Full license information available in the project LICENSE file.
 */


const enableDebug = false; // Logs a few more messages

// Small helper function to make debug logging cleaner
function log(txt) {
    if (enableDebug) console.log(txt);
}


/**
 * Internal: Processes ID parameter to also accept full URLs
 * @param {String} param The parameter provided by the user
 * @returns {String} The processed parameter
 */
module.exports._parseParam = (param) => {
    log(`[steamid-resolver] Processing parameter: ${param}`);

    if (param.includes("steamcommunity.com/")) { // Check if full URL was provided
        log("[steamid-resolver] Parameter is an url. Splitting...");
        let split = param.split("/");

        log("[steamid-resolver] Checking & removing trailing slash...");
        if (split[split.length - 1] == "") split.pop(); // Remove trailing slash (which is now a space because of split("/"))

        log(`[steamid-resolver] Split url and returning this: ${split[split.length - 1]}`);
        return split[split.length - 1];

    } else { // Return parameter if user already provided only the important part

        log("[steamid-resolver] Parameter is not an url. Returning unmodified parameter...");
        return param;
    }
};