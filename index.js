const core = require('@actions/core');
const fetch = require('node-fetch')
const dayjs = require('dayjs')
const { IncomingWebhook } = require('@slack/webhook')

// most @actions toolkit packages have async methods
async function run() {
  try {
    const url = process.env.SLACK_WEBHOOK
    const webhook = new IncomingWebhook(url);
    const response = await fetch('https://jiangweixian-cheatsheets.vercel.app/api/someday', { method: 'GET' }).then(res => res.json())
    // core.info(JSON.stringify(response))
    if (response && response[0]) {
      const { body, created_at, labels, title } = response[0]
      await webhook.send({
        username: 'Cheatsheet Someday',
        icon_url: 'https://a.slack-edge.com/production-standard-emoji-assets/13.0/apple-large/1f9d1-1f3fb-200d-1f4bb@2x.png',
        attachments: [
          {
            fallback: body,
            pretext: title,
            text: body,
            fields: [
              {
                title: 'Learned At',
                value: dayjs(created_at).format('YYYY-MM-DD HH:mm:ss'),
                short: false,
              },
              {
                title: 'Labels',
                value: labels.map(label => label.name).join(','),
                short: false,
              },
            ]
          }
        ]
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
