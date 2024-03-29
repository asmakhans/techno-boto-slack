import { RTMClient } from '@slack/rtm-api'; //real time messaging client
import { SLACK_OAUTH_TOKEN, BOT_SPAM_CHANNEL } from './constants';
import {WebClient} from '@slack/web-api';
const packageJson = require('../package.json')

const rtm = new RTMClient(SLACK_OAUTH_TOKEN);
const web = new WebClient(SLACK_OAUTH_TOKEN);

rtm.start()
    .catch(console.error);

rtm.on('ready', async () => {
    console.log('bot started')
    sendMessage(BOT_SPAM_CHANNEL, 'Bot version ${packageJson.version} is online')
});

rtm.on('slack_event', async (eventType, event) => {
    if(event && event.type === 'message'){
        if(event.text === '!hello'){
            hello()//from logs event.channel)
        }
    }
})

function hello(channelId){
    sendMessage(channelId, 'Heya!')
}
async function sendMessage(channel, message){
    await web.chat.postMessage({
        channel: channel,
        text: message,
    });
}
