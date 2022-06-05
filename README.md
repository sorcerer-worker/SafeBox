![](https://img.shields.io/github/license/classy-giraffe/SafeBox?label=License)
![](https://img.shields.io/github/stars/classy-giraffe/SafeBox?label=Stars)
![](https://img.shields.io/github/forks/classy-giraffe/SafeBox?label=Forks)

### Introduction
SafeBox is a playground for testing Linux commands through Discord APIs. It uses Node JS as runtime and it's self containered inside Docker.

### How to use
Define a file called `.env` like this:
```
CLIENT_ID=
GUILD_ID=
DISCORD_TOKEN=
```
Define a file called `compose.yaml` like this:
```
services:
  bot:
    image: tommy03/safebox
    volumes:
      - storage:/bot/
    env_file:
      - .env

volumes:
  storage: {}

networks:
  front-tier: {}
  back-tier: {}
```
This is needed to deploy the bot correctly (make sure to set these variables).

2. Start the bot like this: `docker compose up -d`