/*
 * File: index.test.js
 * Project: steamid-resolver
 * Created Date: 2024-09-07 11:33:09
 * Author: 3urobeat
 *
 * Last Modified: 2026-08-09 22:41:07
 * Modified By: 3urobeat
 *
 * Copyright (c) 2024 - 2026 3urobeat <https://github.com/3urobeat>
 *
 * Licensed under the MIT license: https://opensource.org/licenses/MIT
 * Permission is granted to use, copy, modify, and redistribute the work.
 * Full license information available in the project LICENSE file.
 */


// This file is read by jest to test all functions exposed to the user


const index        = require("../src/index.js");
const { _httpGet } = require("../src/parseXML.js");


test("Convert steamID64 '76561198260031749' to customURL '3urobeat'", async () => {
    const res = await index.steamID64ToCustomUrl("76561198260031749");

    expect(res).toBe("3urobeat");
});

test("Convert private steamID64 '76561197960287930' to customURL (resolve by following redirect)", async () => {
    const res = await index.steamID64ToCustomUrl("76561197960287930");

    expect(res).toBe("GabeLoganNewell");
});

test("Convert invalid steamID64 '86561198260031749' to customURL", async () => {
    await expect(index.steamID64ToCustomUrl("86561198260031749")).rejects.toBe("The specified profile could not be found.");
});


test("Convert customURL '3urobeat' to steamID64 '76561198260031749'", async () => {
    const res = await index.customUrlToSteamID64("3urobeat");

    expect(res).toBe("76561198260031749");
});

test("Convert private customURL 'gabelogannewell' to steamID64 '76561197960287930'", async () => {
    const res = await index.customUrlToSteamID64("gabelogannewell");

    expect(res).toBe("76561197960287930");
});

test("Convert invalid customURL 'a' to steamID64", async () => {
    await expect(index.customUrlToSteamID64("a")).rejects.toBe("The specified profile could not be found.");
});


test("Convert steamID64 '76561197960287930' to profile name 'Rabscuttle'", async () => {
    const res = await index.steamID64ToProfileName("76561197960287930");

    expect(res).toBe("Rabscuttle");
});


test("Convert customURL 'gabelogannewell' to profile name 'Rabscuttle'", async () => {
    const res = await index.customUrlToProfileName("gabelogannewell");

    expect(res).toBe("Rabscuttle");
});


test("Convert steamID64 '76561198260031749' to full info (partial check)", async () => {
    const res = await index.steamID64ToFullInfo("76561198260031749");

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


test("Convert customURL '3urobeat' to full info (partial check)", async () => {
    const res = await index.customUrlToFullInfo("3urobeat");

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


test("Convert groupURL '3urobeatGroup' to groupID64 '103582791464712227'", async () => {
    const res = await index.groupUrlToGroupID64("3urobeatGroup");

    expect(res).toBe("103582791464712227");
});

test("Convert invalid groupURL 'a' to groupID64", async () => {
    await expect(index.groupUrlToGroupID64("a")).rejects.toBe("The specified group could not be found.");
});


test("Convert groupURL '3urobeatGroup' to full info (partial check)", async () => {
    const res = await index.groupUrlToFullInfo("3urobeatGroup");

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


// The function isValidSharedfileID does not use _parseParam(), we need to test all three variations here
test("Sharedfile URL 'https://steamcommunity.com/sharedfiles/filedetails/?id=2966606880' should point to a valid element", async () => {
    await expect(index.isValidSharedfileID("https://steamcommunity.com/sharedfiles/filedetails/?id=2966606880")).resolves.toBeTruthy();
});

test("Sharedfile URL '2966606880' should point to a valid element", async () => {
    await expect(index.isValidSharedfileID("2966606880")).resolves.toBeTruthy();
});

test("Sharedfile URL '123' should point to an invalid element", async () => {
    await expect(index.isValidSharedfileID("123")).resolves.toBeFalsy();
});


/**
 * Test for proxy instance. These may fail if these publicly accessible proxies become unavailable which sucks a little.
 */

test("SteamIdResolver instance (with HTTP proxy): Check proxy usage and convert customURL '3urobeat' to steamID64 '76561198260031749'", async () => {
    const proxyIp   = "194.150.110.134";
    const proxyPort = "80";
    const resolver = new index.SteamIdResolver(`http://${proxyIp}:${proxyPort}`);

    // Check if connection works
    const myIp = await _httpGet("https://icanhazip.com", resolver.agent);
    expect(myIp.trim()).toBe(proxyIp);

    // Run actual test only after connection is verified
    const res = await resolver.customUrlToSteamID64("3urobeat");
    expect(res).toBe("76561198260031749");
});

test("SteamIdResolver instance (with HTTPS proxy): Check proxy usage and convert customURL '3urobeat' to steamID64 '76561198260031749'", async () => {
    const proxyIp   = "85.93.8.159";
    const proxyPort = "8081";
    const resolver  = new index.SteamIdResolver(`https://${proxyIp}:${proxyPort}`);

    // Check if connection works
    const myIp = await _httpGet("https://icanhazip.com", resolver.agent);
    expect(myIp.trim()).toBe(proxyIp);

    // Run actual test only after connection is verified
    const res = await resolver.customUrlToSteamID64("3urobeat");
    expect(res).toBe("76561198260031749");
});
