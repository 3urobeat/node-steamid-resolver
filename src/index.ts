/*
 * File: index.ts
 * Project: steamid-resolver
 * Created Date: 2023-04-05 19:04:56
 * Author: 3urobeat
 *
 * Last Modified: 2025-01-24 17:36:11
 * Modified By: 3urobeat
 *
 * Copyright (c) 2023 - 2025 3urobeat <https://github.com/3urobeat>
 *
 * Licensed under the MIT license: https://opensource.org/licenses/MIT
 * Permission is granted to use, copy, modify, and redistribute the work.
 * Full license information available in the project LICENSE file.
 */

// Source: https://github.com/3urobeat/node-steamid-resolver

import * as https from "https";
import { _parseParam } from "./parseParam.js";
import {
  _parseXML,
  FullGroupInfoObject,
  FullProfileInfoObject,
} from "./parseXML.js";

// Type definitions for callback functions
type CallbackFunction<T> = (err: string | null, result: T | null) => void;

/**
 * Get the custom profile url of a user as String by their steamID64 or full URL
 * @param steamID64 steamID64 or full URL of the user
 * @param callback Optional: Called with `err` (String) and `customURL` (String) parameters on completion
 * @returns Resolves with customURL on success or rejects with error on failure
 */
export function steamID64ToCustomUrl(
  steamID64: string,
  callback?: CallbackFunction<string>
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Hack to support Promises & Callbacks: Resolve errors instead of rejecting them when callback is defined to prevent UnhandledPromiseRejection crash
    const rejectFunc =
      !callback || typeof callback !== "function" ? reject : resolve;
    const callbackFunc = callback || (() => {});

    const parsedSteamID64 = _parseParam(steamID64);

    _parseXML(`https://steamcommunity.com/profiles/${parsedSteamID64}`)
      .then((res) => {
        const profileInfo = res as FullProfileInfoObject;
        // Check if profile is private and return an error because private profiles do not contain a customURL property
        if (profileInfo.customURL && profileInfo.customURL[0]) {
          resolve(profileInfo.customURL[0]);
          callbackFunc(null, profileInfo.customURL[0]);
        } else {
          rejectFunc("Failed to resolve customURL!");
          callbackFunc("Failed to resolve customURL!", null);
        }
      })
      .catch((err) => {
        rejectFunc(err);
        callbackFunc(err, null);
      });
  });
}

/**
 * Get the profile name of a user as String by their steamID64 or full URL
 * @param steamID64 steamID64 or full URL of the user
 * @param callback Optional: Called with `err` (String) and `profileName` (String) parameters on completion
 * @returns Resolves with profile name on success or rejects with error on failure
 */
export function steamID64ToProfileName(
  steamID64: string,
  callback?: CallbackFunction<string>
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Hack to support Promises & Callbacks: Resolve errors instead of rejecting them when callback is defined to prevent UnhandledPromiseRejection crash
    const rejectFunc =
      !callback || typeof callback !== "function" ? reject : resolve;
    const callbackFunc = callback || (() => {});

    const parsedSteamID64 = _parseParam(steamID64);

    _parseXML(`https://steamcommunity.com/profiles/${parsedSteamID64}`)
      .then((res) => {
        const profileInfo = res as FullProfileInfoObject;
        resolve(profileInfo.steamID[0]);
        callbackFunc(null, profileInfo.steamID[0]);
      })
      .catch((err) => {
        rejectFunc(err);
        callbackFunc(err, null);
      });
  });
}

/**
 * Get the steamID64 of a user as String by their custom profile url or full URL
 * @param customURL Custom ID or full URL of the user as String
 * @param callback Optional: Called with `err` (String) and `steamID64` (String) parameters on completion
 * @returns Resolves with steamID64 on success or rejects with error on failure
 */
export function customUrlToSteamID64(
  customURL: string,
  callback?: CallbackFunction<string>
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Hack to support Promises & Callbacks: Resolve errors instead of rejecting them when callback is defined to prevent UnhandledPromiseRejection crash
    const rejectFunc =
      !callback || typeof callback !== "function" ? reject : resolve;
    const callbackFunc = callback || (() => {});

    const parsedCustomURL = _parseParam(customURL);

    _parseXML(`https://steamcommunity.com/id/${parsedCustomURL}`)
      .then((res) => {
        const profileInfo = res as FullProfileInfoObject;
        resolve(profileInfo.steamID64[0]);
        callbackFunc(null, profileInfo.steamID64[0]);
      })
      .catch((err) => {
        rejectFunc(err);
        callbackFunc(err, null);
      });
  });
}

/**
 * Get the profile name of a user as String by their custom profile url or full URL
 * @param customURL Custom ID or full URL of the user as String
 * @param callback Optional: Called with `err` (String) and `profileName` (String) parameters on completion
 * @returns Resolves with profile name on success or rejects with error on failure
 */
export function customUrlToProfileName(
  customURL: string,
  callback?: CallbackFunction<string>
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Hack to support Promises & Callbacks: Resolve errors instead of rejecting them when callback is defined to prevent UnhandledPromiseRejection crash
    const rejectFunc =
      !callback || typeof callback !== "function" ? reject : resolve;
    const callbackFunc = callback || (() => {});

    const parsedCustomURL = _parseParam(customURL);

    _parseXML(`https://steamcommunity.com/id/${parsedCustomURL}`)
      .then((res) => {
        const profileInfo = res as FullProfileInfoObject;
        resolve(profileInfo.steamID[0]);
        callbackFunc(null, profileInfo.steamID[0]);
      })
      .catch((err) => {
        rejectFunc(err);
        callbackFunc(err, null);
      });
  });
}

/**
 * Get the full information of a user as Object by their steamID64 or full URL
 * @param steamID64 steamID64 or full URL of the user as String
 * @param callback Optional: Called with `err` (String) and `info` (Object) parameters on completion
 * @returns Resolves with fullInfo object on success or rejects with error string on failure
 */
export function steamID64ToFullInfo(
  steamID64: string,
  callback?: CallbackFunction<FullProfileInfoObject>
): Promise<FullProfileInfoObject> {
  return new Promise((resolve, reject) => {
    // Hack to support Promises & Callbacks: Resolve errors instead of rejecting them when callback is defined to prevent UnhandledPromiseRejection crash
    const rejectFunc =
      !callback || typeof callback !== "function" ? reject : resolve;
    const callbackFunc = callback || (() => {});

    const parsedSteamID64 = _parseParam(steamID64);

    _parseXML(`https://steamcommunity.com/profiles/${parsedSteamID64}`)
      .then((res) => {
        const profileInfo = res as FullProfileInfoObject;
        resolve(profileInfo);
        callbackFunc(null, profileInfo);
      })
      .catch((err) => {
        rejectFunc(err);
        callbackFunc(err, null);
      });
  });
}

/**
 * Get the full information of a user as Object by their custom profile url or full URL
 * @param customURL Custom ID or full URL of the user as String
 * @param callback Optional: Called with `err` (String) and `info` (Object) parameters on completion
 * @returns Resolves with fullInfo object on success or rejects with error string on failure
 */
export function customUrlToFullInfo(
  customURL: string,
  callback?: CallbackFunction<FullProfileInfoObject>
): Promise<FullProfileInfoObject> {
  return new Promise((resolve, reject) => {
    // Hack to support Promises & Callbacks: Resolve errors instead of rejecting them when callback is defined to prevent UnhandledPromiseRejection crash
    const rejectFunc =
      !callback || typeof callback !== "function" ? reject : resolve;
    const callbackFunc = callback || (() => {});

    const parsedCustomURL = _parseParam(customURL);

    _parseXML(`https://steamcommunity.com/id/${parsedCustomURL}`)
      .then((res) => {
        const profileInfo = res as FullProfileInfoObject;
        resolve(profileInfo);
        callbackFunc(null, profileInfo);
      })
      .catch((err) => {
        rejectFunc(err);
        callbackFunc(err, null);
      });
  });
}

/**
 * Get the group64ID of a group as String by groupURL or full URL
 * @param groupURL Custom Name of the group or full URL as String
 * @param callback Optional: Called with `err` (String) and `groupID64` (String) parameters on completion
 * @returns Resolves with groupID64 on success or rejects with error on failure
 */
export function groupUrlToGroupID64(
  groupURL: string,
  callback?: CallbackFunction<string>
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Hack to support Promises & Callbacks: Resolve errors instead of rejecting them when callback is defined to prevent UnhandledPromiseRejection crash
    const rejectFunc =
      !callback || typeof callback !== "function" ? reject : resolve;
    const callbackFunc = callback || (() => {});

    const parsedGroupURL = _parseParam(groupURL);

    _parseXML(
      `https://steamcommunity.com/groups/${parsedGroupURL}/memberslistxml`
    )
      .then((res) => {
        const groupInfo = res as FullGroupInfoObject;
        resolve(groupInfo.groupID64[0]);
        callbackFunc(null, groupInfo.groupID64[0]);
      })
      .catch((err) => {
        rejectFunc(err);
        callbackFunc(err, null);
      });
  });
}

/**
 * Get the full information of a group as Object by groupURL or full URL
 * @param groupURL Custom Name of the group or full URL as String
 * @param callback Optional: Called with `err` (String) and `info` (Object) parameters on completion
 * @returns Resolves with fullInfo object on success or rejects with error string on failure
 */
export function groupUrlToFullInfo(
  groupURL: string,
  callback?: CallbackFunction<FullGroupInfoObject>
): Promise<FullGroupInfoObject> {
  return new Promise((resolve, reject) => {
    // Hack to support Promises & Callbacks: Resolve errors instead of rejecting them when callback is defined to prevent UnhandledPromiseRejection crash
    const rejectFunc =
      !callback || typeof callback !== "function" ? reject : resolve;
    const callbackFunc = callback || (() => {});

    const parsedGroupURL = _parseParam(groupURL);

    _parseXML(
      `https://steamcommunity.com/groups/${parsedGroupURL}/memberslistxml`
    )
      .then((res) => {
        const groupInfo = res as FullGroupInfoObject;
        resolve(groupInfo);
        callbackFunc(null, groupInfo);
      })
      .catch((err) => {
        rejectFunc(err);
        callbackFunc(err, null);
      });
  });
}

/**
 * Checks if the provided ID or full URL points to a valid sharedfile
 * @param sharedfileID Sharedfile ID or full sharedfile URL
 * @param callback Optional: Called with `err` (String) and `isValid` (Boolean) parameters on completion
 * @returns Resolves with `isValid` boolean on success or rejects with error string on failure
 */
export function isValidSharedfileID(
  sharedfileID: string,
  callback?: CallbackFunction<boolean>
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    // Hack to support Promises & Callbacks: Resolve errors instead of rejecting them when callback is defined to prevent UnhandledPromiseRejection crash
    const rejectFunc =
      !callback || typeof callback !== "function"
        ? reject
        : (err: string) => resolve(false);
    const callbackFunc = callback || (() => {});

    // Precede sharedfileID with URL if only the ID was provided
    let finalSharedfileID = sharedfileID;
    if (!sharedfileID.includes("steamcommunity.com")) {
      finalSharedfileID =
        "https://steamcommunity.com/sharedfiles/filedetails/?id=" +
        sharedfileID;
    }

    try {
      let output = "";

      https.get(finalSharedfileID, (res) => {
        res.on("data", (chunk) => (output += chunk)); // Append each chunk to output

        res.on("end", () => {
          // Check if output contains an error msg
          const isInvalid =
            output.includes("There was a problem accessing the item") ||
            output.includes("That item does not exist");

          resolve(!isInvalid);
          callbackFunc(null, !isInvalid);
        });
      });
    } catch (err) {
      const errorStr = err as string;
      rejectFunc(errorStr);
      callbackFunc(errorStr, null);
    }
  });
}

// Export types for consumers
export { FullGroupInfoObject, FullProfileInfoObject };

// Export internal functions for testing
export { _parseParam } from "./parseParam.js";
export { _parseXML } from "./parseXML.js";
