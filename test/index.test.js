/*
 * File: index.test.js
 * Project: steamid-resolver
 * Created Date: 2024-09-07 11:33:09
 * Author: 3urobeat
 *
 * Last Modified: 2025-01-24 17:36:11
 * Modified By: 3urobeat
 *
 * Copyright (c) 2024 - 2025 3urobeat <https://github.com/3urobeat>
 *
 * Licensed under the MIT license: https://opensource.org/licenses/MIT
 * Permission is granted to use, copy, modify, and redistribute the work.
 * Full license information available in the project LICENSE file.
 */

// This file is read by jest to test all functions exposed to the user

const index = require("../dist/index.js");

test("Convert steamID64 '76561198260031749' to customURL '3urobeat'", () => {
  index.steamID64ToCustomUrl("76561198260031749", (err, res) => {
    expect(err).toBe(null);
    expect(res).toBe("3urobeat");
  });
});

test("Convert private steamID64 '76561197960287930' to customURL (resolve by following redirect)", () => {
  index.steamID64ToCustomUrl("76561197960287930", (err, res) => {
    expect(err).toBe(null);
    expect(res).toBe("GabeLoganNewell");
  });
});

test("Convert invalid steamID64 '86561198260031749' to customURL", () => {
  index.steamID64ToCustomUrl("86561198260031749", (err, res) => {
    expect(err).toBe("The specified profile could not be found.");
    expect(res).toBe(null);
  });
});

test("Convert customURL '3urobeat' to steamID64 '76561198260031749'", () => {
  index.customUrlToSteamID64("3urobeat", (err, res) => {
    expect(err).toBe(null);
    expect(res).toBe("76561198260031749");
  });
});

test("Convert private customURL 'gabelogannewell' to steamID64 '76561197960287930'", () => {
  index.customUrlToSteamID64("gabelogannewell", (err, res) => {
    expect(err).toBe(null);
    expect(res).toBe("76561197960287930");
  });
});

test("Convert invalid customURL 'a' to steamID64", () => {
  index.customUrlToSteamID64("a", (err, res) => {
    expect(err).toBe("The specified profile could not be found.");
    expect(res).toBe(null);
  });
});

test("Convert steamID64 '76561197960287930' to profile name 'Rabscuttle'", () => {
  index.steamID64ToProfileName("76561197960287930", (err, res) => {
    expect(err).toBe(null);
    expect(res).toBe("Rabscuttle");
  });
});

test("Convert customURL 'gabelogannewell' to profile name 'Rabscuttle'", () => {
  index.customUrlToProfileName("gabelogannewell", (err, res) => {
    expect(err).toBe(null);
    expect(res).toBe("Rabscuttle");
  });
});

test("Convert steamID64 '76561198260031749' to full info (comprehensive check with in-game and groups)", () => {
  index.steamID64ToFullInfo("76561198260031749", (err, res) => {
    expect(err).toBe(null);
    expect(res).not.toBe(null);

    // Check basic profile info
    expect(res.steamID64).toEqual(["76561198260031749"]);
    expect(res.customURL).toEqual(["3urobeat"]);
    expect(res.onlineState).toEqual(["in-game"]);

    // Check in-game info is present
    expect(res.inGameInfo).toBeDefined();
    expect(res.inGameInfo[0].gameName).toEqual(["Counter-Strike 2"]);
    expect(res.inGameInfo[0].gameLink).toEqual([
      "https://steamcommunity.com/app/730",
    ]);

    // Check groups are present
    expect(res.groups).toBeDefined();
    expect(res.groups[0].group).toBeDefined();
    expect(res.groups[0].group.length).toBeGreaterThan(0);

    // Check primary group
    const primaryGroup = res.groups[0].group.find((g) => g.$.isPrimary === "1");
    expect(primaryGroup).toBeDefined();
    expect(primaryGroup.groupID64).toEqual(["103582791464712227"]);
    expect(primaryGroup.groupName).toEqual(["3urobeat"]);

    // Check that some groups have minimal data (only groupID64)
    const minimalGroups = res.groups[0].group.filter((g) => !g.groupName);
    expect(minimalGroups.length).toBeGreaterThan(0);

    // Check mostPlayedGames structure
    expect(res.mostPlayedGames).toBeDefined();
    expect(res.mostPlayedGames[0].mostPlayedGame).toBeDefined();
    expect(res.mostPlayedGames[0].mostPlayedGame[0].gameName).toEqual([
      "Counter-Strike 2",
    ]);
  });
});

test("Convert customURL 'doblev' to full info (profile with no groups)", () => {
  index.customUrlToFullInfo("doblev", (err, res) => {
    expect(err).toBe(null);
    expect(res).not.toBe(null);

    // Check basic profile info
    expect(res.steamID64).toEqual(["76561198060012473"]);
    expect(res.customURL).toEqual(["doblev"]);
    expect(res.onlineState).toEqual(["offline"]);
    expect(res.location).toEqual(["Switzerland"]);
    expect(res.summary).toEqual(["YCombinator partner"]);

    // Check groups are NOT present
    expect(res.groups).toBeUndefined();

    // Check in-game info is NOT present (offline)
    expect(res.inGameInfo).toBeUndefined();

    // Check mostPlayedGames might not be present
    if (res.mostPlayedGames) {
      expect(res.mostPlayedGames).toBeDefined();
    }
  });
});

test("Convert invalid customURL to steamID64 (not found)", () => {
  index.customUrlToSteamID64("nonexistentuser123456", (err, res) => {
    expect(err).toBe("The specified profile could not be found.");
    expect(res).toBe(null);
  });
});

test("Convert invalid steamID64 to customURL (not found)", () => {
  index.steamID64ToCustomUrl("12345678901234567", (err, res) => {
    expect(err).toBe("The specified profile could not be found.");
    expect(res).toBe(null);
  });
});

test("Convert invalid customURL to full info (not found)", () => {
  index.customUrlToFullInfo("nonexistentuser123456", (err, res) => {
    expect(err).toBe("The specified profile could not be found.");
    expect(res).toBe(null);
  });
});

test("Convert invalid steamID64 to full info (not found)", () => {
  index.steamID64ToFullInfo("12345678901234567", (err, res) => {
    expect(err).toBe("The specified profile could not be found.");
    expect(res).toBe(null);
  });
});

test("Convert invalid customURL to profile name (not found)", () => {
  index.customUrlToProfileName("nonexistentuser123456", (err, res) => {
    expect(err).toBe("The specified profile could not be found.");
    expect(res).toBe(null);
  });
});

test("Convert invalid steamID64 to profile name (not found)", () => {
  index.steamID64ToProfileName("12345678901234567", (err, res) => {
    expect(err).toBe("The specified profile could not be found.");
    expect(res).toBe(null);
  });
});

test("Test private profile customURL resolution", () => {
  // Test with Gabe's profile which is private but has redirect
  index.steamID64ToCustomUrl("76561197960287930", (err, res) => {
    expect(err).toBe(null);
    expect(res).toBe("GabeLoganNewell");
  });
});

test("Test profile with different online states", () => {
  // Test offline profile
  index.customUrlToFullInfo("doblev", (err, res) => {
    expect(err).toBe(null);
    expect(res.onlineState).toEqual(["offline"]);
    expect(res.stateMessage).toEqual(["Offline"]);
  });

  // Test in-game profile
  index.customUrlToFullInfo("3urobeat", (err, res) => {
    expect(err).toBe(null);
    expect(res.onlineState).toEqual(["in-game"]);
    expect(res.stateMessage[0]).toContain("In-Game");
  });
});

test("Test groups structure with minimal data", () => {
  index.steamID64ToFullInfo("76561198260031749", (err, res) => {
    expect(err).toBe(null);
    expect(res.groups).toBeDefined();

    const groups = res.groups[0].group;
    expect(groups.length).toBeGreaterThan(10); // Should have many groups

    // Check that some groups have full data
    const fullGroups = groups.filter((g) => g.groupName && g.groupURL);
    expect(fullGroups.length).toBeGreaterThan(0);

    // Check that some groups have minimal data
    const minimalGroups = groups.filter((g) => !g.groupName);
    expect(minimalGroups.length).toBeGreaterThan(0);

    // All groups should have isPrimary and groupID64
    groups.forEach((group) => {
      expect(group.$).toBeDefined();
      expect(group.$.isPrimary).toBeDefined();
      expect(group.groupID64).toBeDefined();
      expect(group.groupID64[0]).toMatch(/^\d+$/);
    });
  });
});

test("Convert groupURL '3urobeatGroup' to groupID64 '103582791464712227'", () => {
  index.groupUrlToGroupID64("3urobeatGroup", (err, res) => {
    expect(err).toBe(null);
    expect(res).toBe("103582791464712227");
  });
});

test("Convert invalid groupURL 'a' to groupID64", () => {
  index.groupUrlToGroupID64("a", (err, res) => {
    expect(err).toBe("The specified group could not be found.");
    expect(res).toBe(null);
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
        groupDetails: [
          expect.objectContaining({ groupURL: ["3urobeatGroup"] }),
        ],
        groupID64: ["103582791464712227"],
      })
    );
  });
});

// The function isValidSharedfileID does not use _parseParam(), we need to test all three variations here
test("Sharedfile URL 'https://steamcommunity.com/sharedfiles/filedetails/?id=2966606880' should point to a valid element", () => {
  index.isValidSharedfileID(
    "https://steamcommunity.com/sharedfiles/filedetails/?id=2966606880",
    (err, res) => {
      expect(err).toBe(null);
      expect(res).toBeTruthy();
    }
  );
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
