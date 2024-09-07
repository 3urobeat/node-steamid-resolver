/*
 * File: parseParam.test.js
 * Project: steamid-resolver
 * Created Date: 2024-09-07 12:29:34
 * Author: 3urobeat
 *
 * Last Modified: 2024-09-07 12:44:18
 * Modified By: 3urobeat
 *
 * Copyright (c) 2024 3urobeat <https://github.com/3urobeat>
 *
 * Licensed under the MIT license: https://opensource.org/licenses/MIT
 * Permission is granted to use, copy, modify, and redistribute the work.
 * Full license information available in the project LICENSE file.
 */


// This file is read by jest to test parseParam


const { _parseParam } = require("../src/parseParam.js");


test("Convert input 'https://steamcommunity.com/profiles/76561198260031749' to '76561198260031749'", () => {
    expect(_parseParam("https://steamcommunity.com/profiles/76561198260031749")).toBe("76561198260031749");
});

test("Convert input 'https://steamcommunity.com/profiles/76561198260031749/' to '76561198260031749'", () => { // Test with trailing slash
    expect(_parseParam("https://steamcommunity.com/profiles/76561198260031749/")).toBe("76561198260031749");
});

test("Convert input '76561198260031749' to '76561198260031749'", () => {
    expect(_parseParam("76561198260031749")).toBe("76561198260031749");
});
