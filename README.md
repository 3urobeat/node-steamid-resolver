# node-steamid-resolver
NPM library to get steamIDs from profile or group links and the other way around.  
It can also return you all information Steam knows [about a profile](https://steamcommunity.com/id/3urobeat?xml=1) in a nice object format and check if a sharedfile ID (Screenshots, Artworks & Guides) is valid or not.  

&nbsp;

## Install
> Note: If you are here from GitHub **Packages** please use the npm package with the command below instead of the scoped GitHub command from above. It won't work.  

Open a terminal in your project folder and run:  
`npm install steamid-resolver`  

You can then import the library in your code:  
```
const steamIdResolver = require("steamid-resolver")
```  

&nbsp;

## Functions  
All functions support both Promises and callbacks!  
This means you can either use `await`, `.then(response => {})` & `.catch(err => {})` or pass a callback function `(err, response) => {}` as parameter.  

&nbsp;

### steamID64ToCustomUrl(steamID64, callback)  
- `steamID64` - steamID64 or full URL of the user you want to get the customURL of. Example: `"76561198260031749"` or `"https://steamcommunity.com/profiles/76561198260031749"`  
- `callback` - Optional: Called on error or success  
    - `err` - A String detailing the reason of the failure or `null` on success
    - `customURL` - The customURL of the user or `null` on failure. Example on success: `"3urobeat"`  

### customUrlToSteamID64(customURL, callback)  
- `customURL` - customURL or full URL of the user you want to get the steamID64 of. Example: `"3urobeat"` or `"https://steamcommunity.com/id/3urobeat"`  
- `callback` - Optional: Called on error or success  
    - `err` - A String detailing the reason of the failure or `null` on success
    - `steamID64` - The steamID64 of the user or `null` on failure. Example on success: `"76561198260031749"`  

### steamID64ToFullInfo(customURL, callback)  
- `customURL` - steamID64 or full URL of the user you want to get all information of.  
- `callback` - Optional: Called on error or success  
    - `err` - A String detailing the reason of the failure or `null` on success
    - `info` - The full information of the user as object or `null` on failure. Example: [Imagine this but as an object](https://steamcommunity.com/id/3urobeat?xml=1)  

### customUrlToFullInfo(customURL, callback)  
- `customURL` - customURL or full URL of the user you want to get all information of.  
- `callback` - Optional: Called on error or success  
    - `err` - A String detailing the reason of the failure or `null` on success
    - `info` - The full information of the user as object or `null` on failure. Example: [Imagine this but as an object](https://steamcommunity.com/id/3urobeat?xml=1) 

### groupUrlToGroupID64(groupURL, callback)  
- `groupURL` - groupURL or full URL of the group you want to get the groupID64 of. Example: `"3urobeatGroup"` or `"https://steamcommunity.com/groups/3urobeatGroup"`  
- `callback` - Optional: Called on error or success  
    - `err` - A String detailing the reason of the failure or `null` on success
    - `groupID64` - The groupID64 of the group or `null` on failure. Example on success: `"103582791464712227"`  

### groupUrlToFullInfo(groupURL, callback)  
- `groupURL` - groupURL or full URL of the group you want to get all information of.  
- `callback` - Optional: Called on error or success  
    - `err` - A String detailing the reason of the failure or `null` on success
    - `info` - The full information of the group as object or `null` on failure. Example: [Imagine this but as an object](https://steamcommunity.com/groups/3urobeatGroup/memberslistxml?xml=1) 

### isValidSharedfileID(sharedfileID, callback)  
- `sharedfileID` - Sharedfile ID or full sharedfile URL. Example: `"2966606880"` or `"https://steamcommunity.com/sharedfiles/filedetails/?id=2966606880"`
- `callback` - Optional: Called on error or success
    - `err` - A string detailing the reason of the failure or `null` on success
    - `isValid` - `true` if a sharedfile with that ID exists or `false` if not