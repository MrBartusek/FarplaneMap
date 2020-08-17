# FarplaneMap

[Webiste](https://farplane.herokuapp.com) | [Discord](https://discord.gg/vUn6dVa)

## Running Locally

1. Clone project
2. Instal dependencies `npm i`
3. Setup [Environmental Variables](#Environmental-Variables)
3. Run `npm start`. App is now listening on [localhost:3000](localhost:3000)

## Environmental Variables
`FARPLANE_GOOGLE_KEY` - API key used for google sheets fetching
`FARPLANE_DISCORD_KEY` - Bot API key used for discord details fetching

## Command Line Arguments
- `--no-event` - Always show that event is not available
- `--no-cache` - Disable endpoint caching

## AJAX Endpoints

endpoint | description | example | caching
-|-|-|-
`/get-data` | fetches most important data (players, tasks) | n/a | 60 minutes
`/get-event` | fetches data about next event | n/a | 60 minutes
`/get-user-discord` | fetches data about specific player discord | `/get-user-discord?id=212988300137463809` | 10 minutes

## Google Sheets Setup

sheet | function
-|-
n/a | not used by website
PlayerStats | Data about players and their completed tasks
Tasks | Information about all tasks
n/a | not used by website
n/a | not used by website
Events | Information about all events
