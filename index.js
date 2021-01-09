const core = require('@actions/core');
const wait = require('./wait');
const fetch = require('node-fetch')

// most @actions toolkit packages have async methods
async function run() {
  try {
    const ms = core.getInput('milliseconds');
    core.info(`Waiting ${ms} milliseconds ...`);
    const response = await fetch('https://jiangweixian-cheatsheets.vercel.app/api/labels?page=1', { method: 'GET' })
    core.setOutput('response', JSON.stringify(response))
    core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    await wait(parseInt(ms));
    core.info((new Date()).toTimeString());

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
