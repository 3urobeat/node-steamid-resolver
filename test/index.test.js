/*
 * File: index.test.js
 * Project: steamid-resolver
 * Created Date: 2024-09-07 11:33:09
 * Author: 3urobeat
 *
 * Last Modified: 2024-09-07 13:25:43
 * Modified By: 3urobeat
 *
 * Copyright (c) 2024 3urobeat <https://github.com/3urobeat>
 *
 * Licensed under the MIT license: https://opensource.org/licenses/MIT
 * Permission is granted to use, copy, modify, and redistribute the work.
 * Full license information available in the project LICENSE file.
 */


// This file is read by jest to test all functions exposed to the user


const index = require("../src/index.js");


test("Convert steamID64 '76561198260031749' to customURL '3urobeat'", () => {
    index.steamID64ToCustomUrl("76561198260031749", (err, res) => {
        expect(err).toBe(null);
        expect(res).toBe("3urobeat");
    });
});


test("Convert customURL '3urobeat' to steamID64 '76561198260031749'", () => {
    index.customUrlToSteamID64("3urobeat", (err, res) => {
        expect(err).toBe(null);
        expect(res).toBe("76561198260031749");
    });
});


test("Convert steamID64 '76561198260031749' to full info (partial check)", () => {
    index.steamID64ToFullInfo("76561198260031749", (err, res) => {
        expect(err).toBe(null);

        // Check if object contains at least 5 props which are always there
        expect(Object.keys(res).length > 5).toBeTruthy();

        // Do a partial check of a few properties
        expect(res).toEqual(
            expect.objectContaining({
                customURL: ["3urobeat"],
                steamID64: ["76561198260031749"]
            })
        );
    });
});


test("Convert customURL '3urobeat' to full info (partial check)", () => {
    index.customUrlToFullInfo("3urobeat", (err, res) => {
        expect(err).toBe(null);

        // Check if object contains at least 5 props which are always there
        expect(Object.keys(res).length > 5).toBeTruthy();

        // Do a partial check of a few properties
        expect(res).toEqual(
            expect.objectContaining({
                customURL: ["3urobeat"],
                steamID64: ["76561198260031749"]
            })
        );
    });
});


test("Convert groupURL '3urobeatGroup' to groupID64 '103582791464712227'", () => {
    index.groupUrlToGroupID64("3urobeatGroup", (err, res) => {
        expect(err).toBe(null);
        expect(res).toBe("103582791464712227");
    });
});


test("Convert groupURL '3urobeatGroup' to full info (partial check)", () => {
    index.groupUrlToFullInfo("3urobeatGroup", (err, res) => {
        expect(err).toBe(null);

        // Check if object contains at least 5 props which are always there
        expect(Object.keys(res).length > 5).toBeTruthy();

        // Do a partial check of a few properties
        expect(res).toEqual(
            expect.objectContaining({
                groupDetails: [ expect.objectContaining({ groupURL: ["3urobeatGroup"] }) ],
                groupID64: ["103582791464712227"]
            })
        );
    });
});


// The function isValidSharedfileID does not use _parseParam(), we need to test all three variations here
test("Sharedfile URL 'https://steamcommunity.com/sharedfiles/filedetails/?id=2966606880' should point to a valid element", () => {
    index.isValidSharedfileID("https://steamcommunity.com/sharedfiles/filedetails/?id=2966606880", (err, res) => {
        expect(err).toBe(null);
        expect(res).toBeTruthy();
    });
});

test("Sharedfile URL '2966606880' should point to a valid element", () => {
    index.isValidSharedfileID("2966606880", (err, res) => {
        expect(err).toBe(null);
        expect(res).toBeTruthy();
    });
});

test("Sharedfile URL '123' should point to an invalid element", () => {
    index.isValidSharedfileID("123", (err, res) => {
        expect(err).toBe(null);
        expect(res).toBeFalsy();
    });
});
