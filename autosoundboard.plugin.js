/**
 * @name AutoSoundboard
 * @author rbvihoney
 * @description Automatically play soundboards when you join a Discord voice channel.
 * @version 0.0.1
 * @authorId 770755946846355477
 * @source https://github.com/rvHoney/autosoundboard-betterdiscord
 */

module.exports = class AutoSoundboard {
    start() {
      BdApi.alert("Auto Soundboard (enabled)", "Thank you for downloading this plugin. This extension allows you to play soundboards automatically when you join a Discord room.\n\n⚠️ **A Stream Deck is required for this plugin to work.**");
    } 
}