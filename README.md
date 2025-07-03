### `IP-Checker-And-Blocker-Discord-Bot`

_A Discord bot that verifies users by country & VPN detection before allowing access._

It is a Discord verification system that **checks user location and VPN status** before granting access to your Discord server. You can set a specific country (e.g. Pakistan), and only users from that country will be allowed through the verification process.

Basically, discord does not give access to people IPs. So this repositry contains a website made using handlebars engine where user goes for verification (we can grab the ip off user from the site).

## 🔐 Features

- ✅ Country-based verification using IP geolocation
- 🚫 VPN/proxy detection via [IPHub](https://iphub.info)
- 🎯 Configurable country (e.g., only allow users from `PK`)
- 🛡️ Discord role assignment for verified users
- ✨ Handlebars templates for custom verification UI

---

## ⚙️ Setup

### 1. Clone the Repo

```bash
git clone https://github.com/bilal-the-dev/IP-Checker-And-Blocker-Discord-Bot ipBot
cd ipBot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file by looking at .env.example:

```env
PORT=3000
NODE_ENV='development'
BASE_URL=''
DOMAIN=http://localhost:3000

## Database
MONGO_URI='your_mongo_connection_string'

## VPN AND IP Detection
IP_COUNTRY='PK'  # ISO country code to allow (e.g., PK = Pakistan)
VPN_DETECTION_API_BASE_URL='http://v2.api.iphub.info'
VPN_DETECTION_API_KEY='your_iphub_api_key'

## Discord Side
BOT_TOKEN='your_discord_bot_token'
GUILD_ID='your_guild_id'
VERIFIED_ROLE_ID='your_verified_role_id'
```

> The `VERIFIED_ROLE_ID` is the role users will receive after verification.

---

### 4. Start the Bot

```bash
npm start
```

---

## 🖥️ How It Works

1. Use the command `/send_embed` and it'll send an embed with a **"Verify"** button.
2. Users click the button → they're taken to your hosted verification site (`/verify?token=xxx`).
3. Their IP is checked for:

   - Country match (e.g., `PK`)
   - No VPN/proxy usage

4. If they pass, a message is shown and role is assigned.

---

## ✨ Technologies Used

- `Express.js` – backend server
- `MongoDB` – stores temporary verification tokens
- `geoip-lite` – for IP geolocation
- `IPHub API` – for VPN/proxy detection
- `Discord.js` – bot framework
- `Handlebars` – for rendering dynamic HTML templates

---

## 📌 Notes

- VPN detection is done using [IPHub](https://iphub.info) – sign up to get a free API key.
- Tokens expire after 10 minutes.
- You can customize verification messages and page styling using Handlebars (`views/verify.handlebars`).

---
