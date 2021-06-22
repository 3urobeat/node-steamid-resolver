# node-steamid-resolver
NPM library to get steamids from profile links/names and the other way around.  
Also includes function to return you all information returned by Steam [from this page](https://steamcommunity.com/id/3urobeat?xml=1) in a nice object format.  

## Install
> Note: If you are here from GitHub **Packages** please use the npm package with the command below instead of the scoped GitHub command from above. It won't work.  

Open a terminal in your project folder and type:  
`$ npm install steamid-resolver`  

You can then import the library in your code:  
`var steamidResolver = require("steamid-resolver")`  

## Functions  
### steam64idToCustomUrl(steam64id, callback)  
- `steam64id` - The steam64id as String of the user you want to get the customURL of. Example: `"76561198260031749"`  
- `callback` - Called on error or success  
    - `err` - A String detailing the reason of the failure or `null` on success
    - `customURL` - The customURL of the user of `null` on failure. Example on succes: `"3urobeat"`
