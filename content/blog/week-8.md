---
title: "Holding Myself Accountable (Pt. 1)"
week: 8
description: "Is this just a phase?"
---

I missed the blog post for week 6 and 7. There needs to be a consequence for when I miss a week.

## What Hurts the Most?

Right now the most "painful" thing would be harm to my wallet. But where should my money go?

- A charity
  - A little bit weird because it's not the worst thing to give money to a charity so would it have to be to a cause I don't like?
- Securities
  - Investing a bit of money into a stock. crypto, or something else makes my pocket less liquid for sure, but still benefits me so I won't be necessarily upset but missing a week with this one
- A family member or friend
  - I like this one because it has the dual effect of hurting my wallet and outing me to someone else that I didn't "go to the gym".

Using Cloudflare Workers and cron jobs within that Worker, we can easily _run_ code, but this code needs to do the following:

- Run every week when I don't fill out a blog post
- Take money from my account, _securely_

Running every week will be trivial. I'll add a value I have to set to disable the cron job for that week. Taking the money out turns out, is a lot harder due to the sensitive nature of banking. I had wanted to send money to my brother every time I failed but the hoops I'd have to go through to make it clean and automated I don't think is worth it for now.

I found this site [Beeminder](https://www.beeminder.com) that has an API for charging a User (turns out these charges are how the service makes money) so I'll use that.

## Using Beeminder

Beeminder has a goal system itself that will charge you if you don't complete a goal, but I'm a software developer and like to solve things in 5 hours that should've taken 5 minutes. I want to use their service as a free way to use [Stripe](https://stripe.com) to take money from my account in a predictable, customizable manner.

We can write some simple Javascript to send a POST request to the charge endpoint:

```js
const createBeeminderCharge = async () => {
  const url = "https://www.beeminder.com/api/v1/charges.json";
  const data = {
    auth_token: process.env.BEEMINDER_AUTH_TOKEN,
    user_id: "danielbeans",
    amount: "5",
    note: "smh daniel...",
  };
  const params = new URLSearchParams(Object.entries(data));

  try {
    const response = await fetch(url, { method: "POST", body: params });
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};
```

One of my past supervisors Michael loved commenting on my MRs to make my code "smaller" and more testable, which I've taken to heart:

```js
const USER_ID = "danielbeans";
const BEEMINDER_AUTH_TOKEN = process.env.BEEMINDER_AUTH_TOKEN;
const BEEMINDER_BASE_URL = "https://www.beeminder.com/api/v1";

const sendBeeminderRequest = async (url, data) => {
  data.auth_token = BEEMINDER_AUTH_TOKEN;

  const params = new URLSearchParams(Object.entries(data));
  const response = await fetch(url, { method: "POST", body: params });
  return await response.json();
};

const createBeeminderCharge = async (amount, dry_run = true) => {
  const url = `${BEEMINDER_BASE_URL}/charges.json`;
  const data = {
    user_id: USER_ID,
    amount: "5",
    note: "smh daniel...",
    dry_run: "", // Curiously only needs to exist as a parameter to count as a dry run
  };
  if (dry_run === false) {
    delete data.dry_run;
  }

  try {
    return await sendBeeminderRequest(url, data);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

Then we can simply call:

```js
createBeeminderCharge(5);
```

We will leave implementing this code to next week...
