---
title: "Migrating from Dokage to Komodo"
week: 9
description: "One docker container to rule them all."
---

## What is Dokage?

Truenas allows me create applications (that they dub ix-applications) but they are managed though the Truenas GUI which is too clunky. Enter [Dokage](https://github.com/louislam/dockge). This uses Docker compose files to spin up my apps. I used this versus the popular [Portainer](https://github.com/portainer/portainer) because of the simplicty.

## Why Komodo?

After a couple of months using Dokage, I desired more features from my container manager. Mainly:

- Syncing with a git repo
- Expanded Stack managment
- Better environment variable management
- Better monitoring

Why did I end up going with Komodo instead of Portainer? Well for one I prefer the UI of Komodo. But after a shallow search, I found immediate solutions for migrating my stacks (compose files + .env files + config files) to Komodo that were simpler. Did I mention Komodo looks prettier?

## Migration to Komodo

This developer made a [Komodo import tool](https://foxxmd.github.io/komodo-import/) that takes existing stacks and imports them into Komodo resources.

```yml
services:
  komodo-import:
    image: foxxmd/komodo-import:latest
    user: 0:0
    restart: no
    volumes:
      - /mnt/tank/docker/stacks:/filesOnServer
    environment:
      - HOST_DIR=/mnt/tank/docker/stacks
      - STACKS_FROM=dir
      - SERVER_NAME=Local
      - KOMODO_URL=http://192.168.1.3:${KOMODO_PORT}
      - API_KEY=${KOMODO_API_KEY}
      - API_SECRET=${KOMODO_API_SECRET}
      - OUTPUT_API_SYNC=true
```

This tool most importantly for me, synced my environment variables to Komodo for my 15 services which would've been a PAIN to manual sync. Spinning up this container generated Komdodo "resourse syncs" which allowed me to audit all of my services before actually importing them as a stack.

This step was important because it allowed me to switch my stack "source" from my local compose files to compose files living in my [homelab repo](https://github.com/danielbeans/homelab):

```toml
[[stack]]
name = "my-stack"
[stack.config]
server_id = "Local"
run_directoy = "stacks"
file_paths = ["my-stack.compose.yml"]
git_provider = "github.com"
git_account = "danielbeans"
repo = "danielbeans/homelab"
```

## Conclusion

The only real issue I ran into was that some of the environment variables got a redundant `\"` when syncing which cause some things to break (ex: `TIMEZONE="America/New_York"` -> `TIMEZONE="\"America/New_York\""`).

Other than that, it's been actually such a breeze working with Komodo. Making modifications to my compose files auto commits to my homelab repo and troubleshooting with the ability to see each container's logs individually has been nice (yea I could just do `docker logs -f my-stack` but I like the UI).
