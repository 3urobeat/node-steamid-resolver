// I hope tests are ok this way? No idea, never added tests to my repos but this seems to make somewhat sense.

const checksAmount = 16; // The amount of checks below to be able to check if all tests are done

let okAmount  = 0;
let errAmount = 0;

function response(err, callback, funcname, testval) {
    if (callback == testval) { // Kind of stupid to rely this test on me not changing my my customURL but also why should I ever
        console.log(`${funcname} ok.`);
        okAmount++;
    } else {
        console.log(`${funcname} error: ${err}`);
        errAmount++;
    }

    if (okAmount + errAmount == checksAmount) {
        console.log(`\n\nAll tests done. OK: ${okAmount} | Errors: ${errAmount}`);
        process.exit();
    }
}

function responseFull(err, callback, funcname, type, testval1, testval2) {
    if (type == "profile") {
        if (Object.keys(callback).length > 5 && callback.customURL[0] == testval1 && callback.steamID64[0] == testval2) {
            console.log(`${funcname} ok.`);
            okAmount++;
        } else {
            console.log(`${funcname} error: ${err}`);
            errAmount++;
        }
    } else if (type == "group") {
        if (Object.keys(callback).length > 5 && callback.groupDetails[0].groupURL[0] == testval1 && callback.groupID64[0] == testval2) {
            console.log(`${funcname} ok.`);
            okAmount++;
        } else {
            console.log(`${funcname} error: ${err}`);
            errAmount++;
        }
    }

    if (okAmount + errAmount == checksAmount) {
        console.log(`\n\nAll tests done. OK: ${okAmount} | Errors: ${errAmount}`);
        process.exit();
    }
}

const steamidResolver = require("./index.js");


steamidResolver.steamID64ToCustomUrl("76561198260031749", (err, customURL) => response(err, customURL, "steamID64ToCustomUrl", "3urobeat"));
steamidResolver.steamID64ToCustomUrl("https://steamcommunity.com/profiles/76561198260031749", (err, customURL) => response(err, customURL, "steamID64ToCustomUrl", "3urobeat"));
steamidResolver.steamID64ToCustomUrl("https://steamcommunity.com/profiles/76561198260031749/", (err, customURL) => response(err, customURL, "steamID64ToCustomUrl", "3urobeat")); // Trailing slash test

steamidResolver.customUrlToSteamID64("3urobeat", (err, steamID64) => response(err, steamID64, "customUrlTosteamID64", "76561198260031749"));
steamidResolver.customUrlToSteamID64("https://steamcommunity.com/id/3urobeat", (err, steamID64) => response(err, steamID64, "customUrlTosteamID64", "76561198260031749"));
steamidResolver.customUrlToSteamID64("https://steamcommunity.com/id/3urobeat/", (err, steamID64) => response(err, steamID64, "customUrlTosteamID64", "76561198260031749"));

steamidResolver.steamID64ToFullInfo("76561198260031749", (err, info) => responseFull(err, info, "steamID64ToFullInfo", "profile", "3urobeat", "76561198260031749"));
steamidResolver.steamID64ToFullInfo("https://steamcommunity.com/profiles/76561198260031749", (err, info) => responseFull(err, info, "steamID64ToFullInfo", "profile", "3urobeat", "76561198260031749"));

steamidResolver.customUrlToFullInfo("3urobeat", (err, info) => responseFull(err, info, "customUrlToFullInfo", "profile", "3urobeat", "76561198260031749"));

steamidResolver.groupUrlToGroupID64("3urobeatGroup", (err, groupID64) => response(err, groupID64, "groupUrlToGroupID64", "103582791464712227"));
steamidResolver.groupUrlToGroupID64("https://steamcommunity.com/groups/3urobeatGroup", (err, groupID64) => response(err, groupID64, "groupUrlToGroupID64", "103582791464712227"));
steamidResolver.groupUrlToGroupID64("https://steamcommunity.com/groups/3urobeatGroup/", (err, groupID64) => response(err, groupID64, "groupUrlToGroupID64", "103582791464712227")); // Trailing slash test

steamidResolver.groupUrlToFullInfo("3urobeatGroup", (err, info) => responseFull(err, info, "groupUrlToFullInfo", "group", "3urobeatGroup", "103582791464712227"));

steamidResolver.isValidSharedfileID("https://steamcommunity.com/sharedfiles/filedetails/?id=2966606880", (err, isValid) => response(err, isValid, "isValidSharedfileID", true));
steamidResolver.isValidSharedfileID("2966606880", (err, isValid) => response(err, isValid, "isValidSharedfileID", true));
steamidResolver.isValidSharedfileID("123", (err, isValid) => response(err, isValid, "isValidSharedfileID", false)); // Test not found message