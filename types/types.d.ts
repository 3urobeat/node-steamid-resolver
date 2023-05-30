/**
 * Full profile information object returned by Steam. Notes: `mostPlayedGames` had 4 elements in testing. `groups` contains full information of the first 3 groups, all following groups only have '$' and 'groupID64' populated.
 */
declare type fullProfileInfoObject = any;

/**
 * Full group information object returned by Steam.
 */
declare type fullGroupInfoObject = any;

/**
 * Get the custom profile url of a user as String by their steamID64 or full URL
 * @param steamID64 - steamID64 or full URL of the user
 * @param [callback] - Optional: Called with `err` (String) and `customURL` (String) parameters on completion
 * @returns Resolves with customURL on success or rejects with error on failure
 */
declare function steamID64ToCustomUrl(steamID64: string, callback?: (...params: any[]) => any): Promise<string>;

/**
 * Get the steamID64 of a user as String by their custom profile url or full URL
 * @param customID - Custom ID or full URL of the user as String
 * @param [callback] - Optional: Called with `err` (String) and `steamID64` (String) parameters on completion
 * @returns Resolves with steamID64 on success or rejects with error on failure
 */
declare function customUrlToSteamID64(customID: string, callback?: (...params: any[]) => any): Promise<string>;

/**
 * Get the full information of a user as Object by their steamID64 or full URL
 * @param steamID64 - steamID64 or full URL of the user as String
 * @param [callback] - Optional: Called with `err` (String) and `info` (Object) parameters on completion
 * @returns Resolves with fullInfo object on success or rejects with error string on failure
 */
declare function steamID64ToFullInfo(steamID64: string, callback?: (...params: any[]) => any): Promise<fullProfileInfoObject>;

/**
 * Get the full information of a user as Object by their custom profile url or full URL
 * @param customID - Custom ID or full URL of the user as String
 * @param [callback] - Optional: Called with `err` (String) and `info` (Object) parameters on completion
 * @returns Resolves with fullInfo object on success or rejects with error string on failure
 */
declare function customUrlToFullInfo(customID: string, callback?: (...params: any[]) => any): Promise<fullProfileInfoObject>;

/**
 * Get the group64ID of a group as String by groupURL or full URL
 * @param groupURL - Custom Name of the group or full URL as String
 * @param [callback] - Optional: Called with `err` (String) and `groupID64` (String) parameters on completion
 * @returns Resolves with groupID64 on success or rejects with error on failure
 */
declare function groupUrlToGroupID64(groupURL: string, callback?: (...params: any[]) => any): Promise<string>;

/**
 * Get the full information of a group as Object by groupURL or full URL
 * @param groupURL - Custom Name of the group or full URL as String
 * @param [callback] - Optional: Called with `err` (String) and `info` (Object) parameters on completion
 * @returns Resolves with fullInfo object on success or rejects with error string on failure
 */
declare function groupUrlToFullInfo(groupURL: string, callback?: (...params: any[]) => any): Promise<fullGroupInfoObject>;

/**
 * Checks if the provided ID or full URL points to a valid sharedfile
 * @param sharedfileID - Sharedfile ID or full sharedfile URL
 * @param [callback] - Optional: Called with `err` (String) and `isValid` (Boolean) parameters on completion
 * @returns Resolves with `isValid` boolean on success or rejects with error string on failure
 */
declare function isValidSharedfileID(sharedfileID: string, callback?: (...params: any[]) => any): Promise<boolean>;

