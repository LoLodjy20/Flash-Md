const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK1BOTmxUbWhMeFphTDdheWhkdzBsNjl1TTMyQWZDTkR3QVUzUHZKUGJVdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0tWR3dNdGh4SWJ6ekhkN1ZJR3RUNFNUK3QwSW54NDByWWQ3WmtpWnZFaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNS05qMHIydkxjczU4dzY3MjIzZnV5WDBmaWdPY3hSVE1vN2hHVGZ2dG1JPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0bW4rblJVUXJPTUdVeGxiS2ZZSWlVeDdxMmhaN1NtL0F1K21CTGVydTAwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdLZ3ZLUkZ5eVN4TGJhTjRwS1B2dUc0RlhaY3VwWXFBZnNZTlZGWUVIRUU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im8yWDVWblhrV2wyeE5PSGNOMkhSeWxlbElHWUdVaFNJOGdPUko5bitleUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUc4eS8vckN5Z1o1ZjVqTnZVOXlvdGp2aVNhSVBLWHF5TExEZEJkZC8xbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSG43YmFUZXBUaTZ0WHNjcGt0T3RIaitMMHFNU0FnWWNWNEtSakFEMnptST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ind2N0JBRDlPN2dlRnRjWXkwWGJaTXZQMVllZElZMGVwN0FiRk1KNzhDc1FvdXlKdGozeDNPUUk1WkZ4YzJDNjJiUzZEczNYYkorb2ZvMTFkTk9OUmhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE0LCJhZHZTZWNyZXRLZXkiOiJGUmE2MkxYYnUvakRCdSt5MDFIYktvNGNhWVZZMFJXelZxSk83WndTVzZzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJJRnVCRFlSU1RRLWVIcGtCNXI1bU5nIiwicGhvbmVJZCI6IjU1N2RkZWYwLTA0NzUtNDA0ZC05MjVmLThkMGY0YzM3NzM5OCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjYm1FWTV1ZFkxY0xWSzhPckdMSVlBc1hVN009In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0ZoUXJaOFVya1Z2QnBmOSt5bysyZEx6SDJFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkQ5Njg5WFo0IiwibWUiOnsiaWQiOiIyNDEwMjI3MTUxMTozOEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT1AzeUlJQkVQN2YwYmdHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidGF0SjRuT0NrOW5abmxEQkZpd0JnY1ExSllPcjUxMWZzTGw1TXNFZmZDaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiTnNvczhjaVlVUUdsb2ZzSjBnSFU1TmVhNFQ5REN2Z1ladkJ4NkwxVlFDNS91MEJ6NFNKd0x0Z0JsZjB6bnJPNHN5QndpWUU0L1FHTk9lZjNrSXBrQUE9PSIsImRldmljZVNpZ25hdHVyZSI6IkpBa09OVWhqSENGRlBFNXNVTEZIVy92L0RyWVJVNllraUF3SDQwNTZ2TWdSOTNmc3J0dG8zUmYwYy9TYlE5R3Vnd21VcUxvQnB4RzRoY1l0b3JCNWpBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjQxMDIyNzE1MTE6MzhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYldyU2VKemdwUFoyWjVRd1JZc0FZSEVOU1dEcStkZFg3QzVlVExCSDN3cCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyOTM5MjY1MSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFKbkIifQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "♕𝙇𝙊𝙇𝙊𝘿𝙅𝙔☘𓆤𐂊︎",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "50932539509", 
             
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || '♕𝙇𝙊𝙇𝙊𝘿𝙅𝙔☘𓆤𐂊︎-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
