---
title: Consolidating Authentication To My NAS Services
week: 28
description: One guarded castle door with impenetrable castle walls.
---

Currently I have a lot of my services (like Plex and Calibre) authenticated via their own internal authenication mechanisms. Some services like Plex have a great Auth flow and are used for other services like Seerr, but some services could benefit from a singular point of entry and have one username/password. Let's get comforable with what this implies.

## OAuth and OIDC

There are two components when gating access to a service: Authorization and Authentication.

### Authorization (OAuth)

OAuth is an open standard defines how to let an application access specific user data without needing the user's password. If I want access to App B data from App A, how would I allow data acess to App B from App A without giving app A my password?

You may ask why we even care about giving App A my password to App B? Well let's say App B store tons of data like music, photos, and movies. If App A is a photo app, if I give it my App B password I'm not only giving App A access to photos, but the music and movies too. We want more granular access to data in App B such that App A only gets photo access. In other words, we want to control who has authorization to what.

OAuth standardizes this with `access tokens`. Instead of giving App A my "master" password to App B to access all of App B's data, I have App A give an access token to App B that says "this access token allows only me to grab photos and only photos". This gives us our granular control and the benefit of being able to revoke access to App B from App A by detroying the access token, thus preventing us from needing to change App B's password to do the same thing.

But how can App B trust this access token? That brings us to the next component...

### Authentication (OIDC)

OIDC (OpenID Connect) was build on top OAuth to determine who the user logging in is. While OAuth solves the data access problem by issuing an access token, it leaves App A completely in the dark about your identity. To solve this, OIDC introduces a second, specialized token called an id token.

Unlike the access token (which is usually a random string of characters meant only for App B's API to read), the ID token is formatted as a JWT (JSON Web Token). This token has the following information:

- Who you are (a unique User ID, your name, and email).
- Who issued it (proving it came from a trusted source like Google or Okta).
- An expiration date (ensuring the login session doesn't last forever).

But does App A generate this JWT and access token itself? That'd suck for the App A developer, we instead hand all of this implementation off to a third party.

### Identity Provider

A third party (like Auth0 or Google), implements both OAuth and OIDC so that services can delgate authentication and authorization to a dedicate service and make connections easier. This third party is called an Identity Provider (IdP) or Authorization Server. Both App A and App B trust this third party.

When App A initiates the login request for access to App B, it adds a special instruction called `scope=openid`. This tells the IdP: "Don't just give me permission to access data; prove to me who this person is."

By combining the two, OIDC verifies your identity and vouches for you, while OAuth hands App A the highly specific, limited access keycard to get exactly the data it needs from App B.