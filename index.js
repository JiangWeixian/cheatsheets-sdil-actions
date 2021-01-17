const core = require('@actions/core');
const wait = require('./wait');
const fetch = require('node-fetch')
const dayjs = require('dayjs')
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
    if (response && response[0]) {
      const { body, created_at, labels } = response[0]
      await webhook.send({
        username: 'Cheatsheet Someday',
        attachments: [
          {
            fallback: body,
            pretext: body,
            text: body,
            fields: [
              {
                title: 'Labels',
                value: labels.map(label => label.name).join(','),
                short: false,
              },
              {
                title: 'Learned At',
                value: dayjs(created_at).format('YYYY-MM-DD HH:mm:ss'),
                short: false,
              }
            ]
          }
        ]
      });
    }
    core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    await wait(parseInt(ms));
    core.info((new Date()).toTimeString());

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
