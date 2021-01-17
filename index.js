const core = require('@actions/core');
const wait = require('./wait');
const fetch = require('node-fetch')
const { IncomingWebhook } = require('@slack/webhook')

// most @actions toolkit packages have async methods
async function run() {
  try {
    const ms = core.getInput('milliseconds');
    const url = process.env.SLACK_WEBHOOK
    const webhook = new IncomingWebhook(url);
    core.info(`Waiting ${ms} milliseconds ...`);
    const response = await fetch('https://jiangweixian-cheatsheets.vercel.app/api/someday', { method: 'GET' }).then(res => res.json())
    // core.info(JSON.stringify(response))
    core.info(url)
    await webhook.send({
      text: 'I\'ve got news for you...',
    });
    core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    await wait(parseInt(ms));
    core.info((new Date()).toTimeString());

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
