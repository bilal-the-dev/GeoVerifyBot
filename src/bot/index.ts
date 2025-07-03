import { Client, GatewayIntentBits } from "discord.js";

import registerEventsOnClient from "./botUtils/registrars/registerEvents.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = [];

await registerEventsOnClient(client);

client.login(process.env.BOT_TOKEN);

export default client;
