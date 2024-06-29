const { Client, Intents, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');


const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});
const prefix = '!'; 

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity(`looksmaxxing`, { type: 'WATCHING' });
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'resolve') {
        const cfxLink = args.join(' ');
        resolveCFX(cfxLink, message);
    } else if (command === 'ping') {
        message.channel.send('Pong!');
    } 

    async function resolveCFX(cfxLink, message) {
        if (!cfxLink.includes('cfx.re/join/')) {
            message.channel.send('Invalid cfx.re/join link format. Please provide a valid link.');
            return;
        }
    
        const serverCode = cfxLink.split('/').pop();
    
        try {
            const headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0'
            };
            const response = await fetch(`https://servers-frontend.fivem.net/api/servers/single/${serverCode}`, { headers });
    
            if (response.ok) {
                const serverData = await response.json();
                if (serverData.error) {
                    message.channel.send(`Error: ${serverData.error}`);
                } else {
                    console.log('Server Data:', serverData);
    
                    const serverHostname = serverData.Data.hostname || 'Unknown';
                    const serverOwner = serverData.Data.ownerName || 'Unknown';
                    const serverIP = serverData.Data.connectEndPoints[0] || 'Unknown';
                    const serverPort = serverIP.split(':')[1] || 'Unknown'; 
                    const serverPlayers = serverData.Data.clients || 'Unknown';
    
                    console.log('Resolved Values:', serverHostname, serverOwner, serverIP, serverPort, serverPlayers);
    
                    const embed = new MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle('Server Information')
                        .addFields(
                            { name: 'Name', value: String(serverHostname), inline: false },
                            { name: 'Owner', value: String(serverOwner), inline: false },
                            { name: 'IP', value: String(serverIP), inline: true },
                            { name: 'Port', value: String(serverPort), inline: true },
                            { name: 'Players', value: String(serverPlayers), inline: false }
                        );
    
                    message.channel.send({ embeds: [embed] });
                }
            } else {
                message.channel.send(`Failed to fetch data from FiveM API. Status code: ${response.status}`);
            }
        } catch (error) {
            message.channel.send(`Error making request to FiveM API: ${error}`);
        }
    }    
    
});

client.login('token here');