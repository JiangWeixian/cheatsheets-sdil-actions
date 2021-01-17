# Cheatsheet someday i learn


## Usage

1. Create a `.github/workflows/someday-i-learn.yml` file in your GitHub repo.
2. Add the following code to the `someday-i-learn.yml` file.

```yaml
name: Send someday, i learn cheatsheet at 11:am
on:
  schedule:
    - cron: "0 11 * * *"
name: some-day-i-learn
jobs:
  someday:
    name: Someday
    runs-on: ubuntu-latest
    steps:
    - uses: JiangWeixian/cheatsheets-sdil-actions@v1
      with:
          CHEATSHEET_HOST: example.com
          SLACK_CHANNEL: '#general'
      env:
          SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
```

3. Create `SLACK_WEBHOOK` secret using [GitHub Action's Secret](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets#creating-encrypted-secrets-for-a-repository). You can generate a Slack incoming webhook token from [here](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks).


### Variables

|name|description|required|type|
|:---:|:---:|:---:|:---|
|CHEATSHEET_HOST|your cheatsheet website url|true|string|
|SLACK_CHANNEL|slack channel|false|string|
|debug|log flag|false|boolean|


## Develop

Users shouldn't consume the action from master since that would be latest code and actions can break compatibility between major versions.

Checkin to the v1 release branch

```bash
npm run build
ga .
gpsup
```

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md), the [toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md#packages) for the various packages.


