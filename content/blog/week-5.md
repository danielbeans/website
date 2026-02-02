---
title: "Setting Up *arr"
week: 5
description: "We love Linux ISOs"
---

This week I'll be setting up a *arr stack on my NAS. I'm getting tired of manually searching for, downloading, and copying [my Linux ISOs](https://www.urbandictionary.com/define.php?term=Linux%20ISO) to my NAS.

## What is the *arr stack?

Basically just a [suite of services](https://wiki.servarr.com) that grab and organize collections of different media.

I want the following:
- radarr (movies)
- sonarr (tv & anime)
- prowlarr (index manager)
- Real-Debrid

## The Flow

1. Sonarr/Radarr scans my library on disk
    - On service setup I identify my movies and series such that when an new episode or better version comes out it will be flagged
    - I'll add new media I want to these services
2. Prowlarr gets a media request and uses indexers I add to find the media I wanted
3. Sonarr/Radarr recieves the media settings (download link)
4. Request is now handed off to RDT-Client to initiate download
5. Media is copied to plex-media dataset which triggers plex server library scan.

## Service Stack

Services connect to my Docker internal nginx network such that we can only hit the services using HTTPS through my domain name or tailnet.

```yaml
---
services:
  radarr:
    image: lscr.io/linuxserver/radarr:latest
    container_name: radarr
    environment:
      - PUID=$PUID
      - PGID=$PGID
      - TZ=$TIMEZONE
    volumes:
      - $HOST_VOLUME_PATH/radarr:/config
      - $PLEX_MEDIA_PATH/movies:/movies
      - $HOST_VOLUME_PATH/downloads:/downloads
    restart: unless-stopped

  sonarr:
    image: lscr.io/linuxserver/sonarr:latest
    container_name: sonarr
    environment:
      - PUID=$PUID
      - PGID=$PGID
      - TZ=$TIMEZONE
    volumes:
      - $HOST_VOLUME_PATH/sonarr:/config
      - $PLEX_MEDIA_PATH/tv:/tv
      - $PLEX_MEDIA_PATH/anime:/anime
      - $HOST_VOLUME_PATH/downloads:/downloads
    restart: unless-stopped

  prowlarr:
    image: lscr.io/linuxserver/prowlarr:develop
    container_name: prowlarr
    environment:
      - PUID=$PUID
      - PGID=$PGID
      - TZ=$TIMEZONE
    volumes:
      - $HOST_VOLUME_PATH/prowlarr:/config
    restart: unless-stopped

  rdt-client:
    image: rogerfar/rdtclient
    container_name: rdt-client
    environment:
      - PUID=$PUID
      - PGID=$PGID
      - TZ=$TIMEZONE
    volumes:
      - $HOST_VOLUME_PATH/rdtclient:/db
      - $HOST_VOLUME_PATH/downloads:/downloads
    restart: unless-stopped

networks:
  default:
    external: true
    name: nginx-proxy-manager
```

## Troubleshooting

### Updating Plex

When setting up my plex-media dataset, I used capitalized and spaced folder names: `TV Shows`, `Anime`, and `Movies`. I wanted to update them to one word lower case, so `tv`, `anime`, and `movies`. This was somewhat trivial to do. After updating the directory names, I add them to each Plex library as a secondary directory and let Plex take care of the rest.

The issue came when renaming the media file names. Originally I had them very simple like so:

`One Piece - E0001 - I'm Luffy. The Man Who's Gonna Be King of the Pirates!`.

What this lacks is anything to do with the quality of media, audio quality, languages, etc. I wanted to use this formula for naming: 

`
{Series TitleYear} - S{season:00}E{episode:00} - {Episode CleanTitle:90} {[Custom Formats]}{[Quality Full]}{[Mediainfo AudioCodec}{ Mediainfo AudioChannels]}{MediaInfo AudioLanguages}{[MediaInfo VideoDynamicRangeType]}[{Mediainfo VideoCodec }{MediaInfo VideoBitDepth}bit]{-Release Group}
`

The One Piece episode ends up being renamed to this:

`One Piece (1999) - S01E001 - Im Luffy! The Man Whos Gonna Be King of the Pirates! [WEBRip-1080p][Opus 2.0][JA+EN][x265 10bit].mkv`

There is no way for Plex to map the first to the second. Because One Piece has 1100+ episodes, I don't want to do a rescan of all of the episodes and I want to perserve me and my users watch history. 

Let's try and edit the Plex library SQLite database `com.plexapp.plugins.library.db`!

Just kidding, after a day of looking through tables, and updating rows with new directory/file paths, I ended up just always breaking the library and needing to rescan anyway. Not the end of the world but definitely as annoying as a splinter.

### Permissions!

Running Docker containers in `root` isn't always the best. I also want the plex-media dataset to have proper permissions such that not just anyone can write and read the data. I generally follow these permissions for most of my datasets:

- 755 for directories
- 644 for files

Media files on my NAS also generally follows the `user:group` `docker-svc:media`.

My Plex services had it's own `plex` user that also had an auxillery `media` group. But turns out this auxillery group is not accessible in the docker container so sadly (maybe not so sadly), I had to redo my Plex permissions such that it used the `docker-svc` user.

### One Piece vs Everything Else

Ooooo boy this one took me a while to get correct. So One Piece is not a seasonal anime like some others (JJK, Frerein, etc.). This is ok, because custom the [Plex Scanner](https://github.com/ZeroQI/Absolute-Series-Scanner) and [Metadata Agent](https://github.com/ZeroQI/Hama.bundle) I use [has an "override"](https://github.com/ZeroQI/Absolute-Series-Scanner/blob/master/tvdb4.mapping.xml) for Plex to match metadata correctly and use anime "Arcs" instead of seasons.

 But the metadata source Sonarr uses is TVDB which identifies One Piece in seasons that don't align with One Piece arcs to my liking. Thus, I needed to create a special naming format that doesn't align with the rest of my anime that excludes the season and instead using absoulte numbering. Remember the One Piece episode above? That is not actually the file name I currently use. It's instead:

 `One Piece (1999) - 0001 - Im Luffy! The Man Whos Gonna Be King of the Pirates! [WEBRip-1080p][Opus 2.0][JA+EN][x265 10bit].mkv` 

 Where we exclude the season and in Sonarr, manually (and painfully) map the episodes to the TVDB seasonal episodes.