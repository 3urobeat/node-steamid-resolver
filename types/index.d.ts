/**
 * Get the custom profile url of a user as String by their steamID64 or full URL
 * @param {String} steamID64 steamID64 or full URL of the user
 * @param {function(string, string)} [callback] Optional: Called with `err` (String) and `customURL` (String) parameters on completion
 * @return {Promise.<string>} Resolves with customURL on success or rejects with error on failure
 */
export function steamID64ToCustomUrl(steamID64: string, callback?: (arg0: string, arg1: string) => any): Promise<string>;
/**
 * Get the profile name of a user as String by their steamID64 or full URL
 * @param {String} steamID64 steamID64 or full URL of the user
 * @param {function(string, string)} [callback] Optional: Called with `err` (String) and `profileName` (String) parameters on completion
 * @return {Promise.<string>} Resolves with profile name on success or rejects with error on failure
 */
export function steamID64ToProfileName(steamID64: string, callback?: (arg0: string, arg1: string) => any): Promise<string>;
/**
 * Get the steamID64 of a user as String by their custom profile url or full URL
 * @param {String} customURL Custom ID or full URL of the user as String
 * @param {function(string, string)} [callback] Optional: Called with `err` (String) and `steamID64` (String) parameters on completion
 * @return {Promise.<string>} Resolves with steamID64 on success or rejects with error on failure
 */
export function customUrlToSteamID64(customURL: string, callback?: (arg0: string, arg1: string) => any): Promise<string>;
/**
 * Get the profile name of a user as String by their custom profile url or full URL
 * @param {String} customURL Custom ID or full URL of the user as String
 * @param {function(string, string)} [callback] Optional: Called with `err` (String) and `profileName` (String) parameters on completion
 * @return {Promise.<string>} Resolves with profile name on success or rejects with error on failure
 */
export function customUrlToProfileName(customURL: string, callback?: (arg0: string, arg1: string) => any): Promise<string>;
/**
 * Get the full information of a user as Object by their steamID64 or full URL
 * @param {String} steamID64 steamID64 or full URL of the user as String
 * @param {function(string, fullProfileInfoObject)} [callback] Optional: Called with `err` (String) and `info` (Object) parameters on completion
 * @return {Promise.<fullProfileInfoObject>} Resolves with fullInfo object on success or rejects with error string on failure
 */
export function steamID64ToFullInfo(steamID64: string, callback?: (arg0: string, arg1: fullProfileInfoObject) => any): Promise<fullProfileInfoObject>;
/**
 * Get the full information of a user as Object by their custom profile url or full URL
 * @param {String} customURL Custom ID or full URL of the user as String
 * @param {function(string, fullProfileInfoObject)} [callback] Optional: Called with `err` (String) and `info` (Object) parameters on completion
 * @return {Promise.<fullProfileInfoObject>} Resolves with fullInfo object on success or rejects with error string on failure
 */
export function customUrlToFullInfo(customURL: string, callback?: (arg0: string, arg1: fullProfileInfoObject) => any): Promise<fullProfileInfoObject>;
/**
 * Get the group64ID of a group as String by groupURL or full URL
 * @param {String} groupURL Custom Name of the group or full URL as String
 * @param {function(string, string)} [callback] Optional: Called with `err` (String) and `groupID64` (String) parameters on completion
 * @returns {Promise.<string>} Resolves with groupID64 on success or rejects with error on failure
 */
export function groupUrlToGroupID64(groupURL: string, callback?: (arg0: string, arg1: string) => any): Promise<string>;
/**
 * Get the full information of a group as Object by groupURL or full URL
 * @param {String} groupURL Custom Name of the group or full URL as String
 * @param {function(string, fullGroupInfoObject)} [callback] Optional: Called with `err` (String) and `info` (Object) parameters on completion
 * @returns {Promise.<fullGroupInfoObject>} Resolves with fullInfo object on success or rejects with error string on failure
 */
export function groupUrlToFullInfo(groupURL: string, callback?: (arg0: string, arg1: fullGroupInfoObject) => any): Promise<fullGroupInfoObject>;
/**
 * Checks if the provided ID or full URL points to a valid sharedfile
 * @param {String} sharedfileID Sharedfile ID or full sharedfile URL
 * @param {function(string, boolean)} [callback] Optional: Called with `err` (String) and `isValid` (Boolean) parameters on completion
 * @returns {Promise.<boolean>} Resolves with `isValid` boolean on success or rejects with error string on failure
 */
export function isValidSharedfileID(sharedfileID: string, callback?: (arg0: string, arg1: boolean) => any): Promise<boolean>;
/**
 * Full profile information object returned by Steam. Notes: `mostPlayedGames` had 4 elements in testing. `groups` contains full information of the first 3 groups, all following groups only have '$' and 'groupID64' populated.
 */
export type fullProfileInfoObject = {
    steamID64: [string];
    steamID: [string];
    onlineState: [string];
    stateMessage: [string];
    privacyState: [string];
    visibilityState: [string];
    avatarIcon: [string];
    avatarMedium: [string];
    avatarFull: [string];
    vacBanned: [string];
    tradeBanState: [string];
    isLimitedAccount: [string];
    customURL: [string];
    memberSince: [string];
    steamRating: [string];
    hoursPlayed2Wk: [string];
    headline: [string];
    location: [string];
    realname: [string];
    summary: [string];
    mostPlayedGames: [{
        mostPlayedGame: [{
            gameName: [string];
            gameLink: [string];
            gameIcon: [string];
            gameLogo: [string];
            gameLogoSmall: [string];
            hoursPlayed: [string];
            hoursOnRecord: [string];
            statsName: [string];
        }, {
            gameName: [string];
            gameLink: [string];
            gameIcon: [string];
            gameLogo: [string];
            gameLogoSmall: [string];
            hoursPlayed: [string];
            hoursOnRecord: [string];
            statsName: [string];
        }, {
            gameName: [string];
            gameLink: [string];
            gameIcon: [string];
            gameLogo: [string];
            gameLogoSmall: [string];
            hoursPlayed: [string];
            hoursOnRecord: [string];
            statsName: [string];
        }, {
            gameName: [string];
            gameLink: [string];
            gameIcon: [string];
            gameLogo: [string];
            gameLogoSmall: [string];
            hoursPlayed: [string];
            hoursOnRecord: [string];
            statsName: [string];
        }];
    }];
    groups: [{
        group: array<{
            "$": {
                isPrimary: string;
            };
            groupID64: [string];
            groupName: [string];
            groupURL: [string];
            headline: [string];
            summary: [string];
            avatarIcon: [string];
            avatarMedium: [string];
            avatarFull: [string];
            memberCount: [string];
            membersInChat: [string];
            membersInGame: [string];
            membersOnline: [string];
        }>;
    }];
};
/**
 * Full group information object returned by Steam.
 */
export type fullGroupInfoObject = {
    groupID64: [string];
    groupDetails: [{
        groupName: [string];
        groupURL: [string];
        headline: [string];
        summary: [string];
        avatarIcon: [string];
        avatarMedium: [string];
        avatarFull: [string];
        memberCount: [string];
        membersInChat: [string];
        membersInGame: [string];
        membersOnline: [string];
    }];
    memberCount: [string];
    totalPages: [string];
    currentPage: [string];
    startingMember: [string];
    nextPageLink: [string];
    members: [{
        steamID64: array<string>;
    }];
};
//# sourceMappingURL=index.d.ts.map
