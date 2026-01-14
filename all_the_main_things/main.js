import { 
    Client, Collection, GatewayIntentBits
} from 'discord.js'; 
import 'dotenv/config';
import { setupEventHandlers } from './utils/eventhandler.js';
import { deploy } from './deploy-command.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
    ],
});

client.commands = new Collection();

await deploy(client); 

setupEventHandlers(client);

client.login(process.env.Token);

// make simple than usual
