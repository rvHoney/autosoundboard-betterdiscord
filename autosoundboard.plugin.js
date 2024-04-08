/**
 * @name AutoSoundboard
 * @author rvhoney
 * @description Thank you for downloading this plugin. This extension allows you to automatically play soundboards when you join a Discord room. Please go to the settings panel to configure the extension. ⚠️ **A Stream Deck and an additional plugin are required for this plugin to work.**
 * @version 0.0.1
 * @authorId 770755946846355477
 * @source https://github.com/rvHoney/autosoundboard-betterdiscord
 */

module.exports = class AutoSoundboard {
    start() {
        this.registerCSS();
    }

    stop() {
    }

    loadSettings() {
        const streamDeckWS = BdApi.loadData("autosb", "streamDeckWS");
        return { streamDeckWS: streamDeckWS };
    }

    getSettingsPanel() {
        this.loadSettings();

        const SettingsPanel = document.createElement("div");
        SettingsPanel.classList.add = "autosb-settings";

        const streamDeckWSField = document.createElement("div");
        streamDeckWSField.classList.add("autosb-ws-setting");

        const streamDeckWSDescription = document.createElement("p");
        streamDeckWSDescription.textContent = "Please enter the WebSocket address of your Stream Deck plugin. For more information, please refer to the documentation of the plugin to be installed on your Stream Deck.";

        const streamDeckWSLinkSeparator = document.createElement("span");
        streamDeckWSLinkSeparator.textContent = "|";

        const streamDeckWSError = document.createElement("p");
        streamDeckWSError.classList.add("autosb-ws-error");
        streamDeckWSError.textContent = "Please enter a valid WebSocket address.";
        streamDeckWSError.style.color = "#FA777C";

        const streamDeckWSSuccess = document.createElement("p");
        streamDeckWSSuccess.classList.add("autosb-ws-success");
        streamDeckWSSuccess.textContent = "Successfully saved the WebSocket address.";
        streamDeckWSSuccess.style.color = "#2DC770";

        const streamDeckWSInput = document.createElement("input");
        streamDeckWSInput.type = "text";
        streamDeckWSInput.name = "streamDeckWS";
        streamDeckWSInput.placeholder = "Format: ws://{ip}:{port}";
        streamDeckWSInput.value = this.loadSettings().streamDeckWS ?? "";

        const streamDeckWSButton = document.createElement("button");
        streamDeckWSButton.textContent = "Save";
        streamDeckWSButton.onclick = () => {
            const streamDeckWS = streamDeckWSInput.value;
            if (!streamDeckWS.match(/^ws:\/\/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]+$/)) {
                streamDeckWSError.style.display = "block";
                streamDeckWSSuccess.style.display = "none";
                BdApi.saveData("autosb", "streamDeckWS", null);
            } else {
                streamDeckWSError.style.display = "none";
                streamDeckWSSuccess.style.display = "block";
                BdApi.saveData("autosb", "streamDeckWS", streamDeckWS);
            }
        };

        const streamDeckWSLinkList = document.createElement("div");
        streamDeckWSLinkList.classList.add("autosb-ws-links");

        const streamDeckWSLink1 = document.createElement("a");
        streamDeckWSLink1.href = "https://github.com/rvHoney/autosoundboard-betterdiscord";
        streamDeckWSLink1.target = "_blank";
        streamDeckWSLink1.textContent = "BetterDiscord Plugin Repository";

        const streamDeckWSLink2 = document.createElement("a");
        streamDeckWSLink2.href = "https://github.com/rvHoney/autosoundboard-streamdeck";
        streamDeckWSLink2.target = "_blank";
        streamDeckWSLink2.textContent = "Stream Deck Plugin Repository";

        streamDeckWSField.append(streamDeckWSDescription)
        streamDeckWSField.append(streamDeckWSError);
        streamDeckWSField.append(streamDeckWSSuccess);
        streamDeckWSField.append(streamDeckWSInput);
        streamDeckWSField.append(streamDeckWSButton);
        streamDeckWSField.append(streamDeckWSLinkList);
        streamDeckWSLinkList.append(streamDeckWSLink1)
        streamDeckWSLinkList.append(streamDeckWSLinkSeparator);
        streamDeckWSLinkList.append(streamDeckWSLink2);
        SettingsPanel.append(streamDeckWSField);

        return SettingsPanel;
    }

    registerCSS() {
        BdApi.DOM.addStyle("AutoSoundboard", `
            .autosb-settings * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            .autosb-ws-setting {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .autosb-ws-setting p {
                margin: 10px 0;
                font-size: 16px;
                color: #B5BAC1;
            }

            .autosb-ws-setting .autosb-ws-links {
                display: flex;
                gap: 5px;
                margin-top: 15px;
            }

            .autosb-ws-setting .autosb-ws-links span {
                color: #B5BAC1;
            }

            .autosb-ws-setting input {
                padding: 0 10px;
                background-color: #1E1F22;
                border: none;
                border-radius: 3px;
                height: 40px;
                font-size: 16px;
                color: #F2F3F5;
            }

            .autosb-ws-setting button {
                padding: 0 10px;
                background-color: #3E82E5;
                color: #F2F3F5;
                border-radius: 3px;
                height: 40px;
                font-size: 16px;
                transition: background-color 0.25s ease;
            }

            .autosb-ws-setting button:hover {
                cursor: pointer;
                background-color: #4752C4;
            }

            .autosb-ws-setting .autosb-ws-error,
            .autosb-ws-setting .autosb-ws-success {
                display: none;
                margin-top: -5px;
                margin-bottom: -5px;
            }

            .autosb-ws-setting .autosb-ws-error,
                color: #FA777C;
            }

            .autosb-ws-setting .autosb-ws-success {
                color: #2DC770;
            }
        `);
    }
}