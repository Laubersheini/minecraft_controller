import {
    MatrixClient,
    SimpleFsStorageProvider,
    AutojoinRoomsMixin,
} from "matrix-bot-sdk";

var wol = require("wake_on_lan")
var axios = require("axios")
const macAddress = "4C:CC:6A:64:F4:5C"

const IP = "192.168.178.64:8080"


// This will be the URL where clients can reach your homeserver. Note that this might be different
// from where the web/chat interface is hosted. The server must support password registration without
// captcha or terms of service (public servers typically won't work).
const homeserverUrl = "https://matrix.laubersheimer.eu";

// Use the access token you got from login or registration above.
const accessToken = "syt_bWluZWNyYWZ0Ym90_LmvVgnTIemuLmbhJJdYN_2o76c1";

// In order to make sure the bot doesn't lose its state between restarts, we'll give it a place to cache
// any information it needs to. You can implement your own storage provider if you like, but a JSON file
// will work fine for this example.
const storage = new SimpleFsStorageProvider("hello-bot.json");

// Finally, let's create the client and set it to autojoin rooms. Autojoining is typical of bots to ensure
// they can be easily added to any room.
const client = new MatrixClient(homeserverUrl, accessToken, storage);
AutojoinRoomsMixin.setupOnClient(client);

// Before we start the bot, register our command handler
client.on("room.message", handleCommand);

// Now that everything is set up, start the bot. This will start the sync loop and run until killed.
client.start().then(() => console.log("Bot started!"));

// This is the command handler we registered a few lines up
async function handleCommand(roomId: string, event: any) {
    // Don't handle unhelpful events (ones that aren't text messages, are redacted, or sent by us)
    if (event['content']?.['msgtype'] !== 'm.text') return;
    if (event['sender'] === await client.getUserId()) return;

    // Check to ensure that the `!hello` command is being run
    const body = event['content']['body'];
    if (!body?.startsWith("!minecraft")) return;

    if (body?.startsWith("!minecraft start")) {
        try {

            wol.wake(macAddress)
        } catch(e){

            await client.sendText(roomId, "error starting server")
        }

        await client.sendText(roomId, "Starting server!")

    }


    if (body?.startsWith("!minecraft restart")) {
        wol.wake(macAddress)

        try {
            axios.get("http://" + IP + "/restart_server")
        } catch(e) {

            await client.sendText(roomId, "error restarting server")
        }

    }


    if (body?.startsWith("!minecraft stop")) {

        await client.sendText(roomId, "Shutting down server.")

        try {

            axios.get("http://" + IP + "/stop_server")
        } catch(e) {

            await client.sendText(roomId, "Error stopping server. Is the server running?")
        }
        setTimeout(() => {
            try {
                axios.get("http://" + IP + "/shutdown_server")
            } finally {

            }
        }, 120000)
    }

}