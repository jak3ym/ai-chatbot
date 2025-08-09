# Free AI Chatbot (OpenRouter + Vercel)

This is a simple AI chatbot built with a serverless backend using OpenRouter's AI API.

## How to Deploy

1. **Get your OpenRouter API key:**

   - Sign up at [https://openrouter.ai](https://openrouter.ai)
   - Go to Settings → API Keys → Create new key
   - Copy your API key

2. **Deploy on Vercel:**

   - Create a GitHub repo with this code
   - Go to [https://vercel.com/import](https://vercel.com/import)
   - Import your repo
   - In your Vercel project settings, add an environment variable:
     ```
     OPENROUTER_API_KEY=your_api_key_here
     ```
   - Deploy the project

3. **Open your deployed site URL:**

   - Chat with the AI chatbot right away!

## Notes

- The chatbot uses the `openchat/openchat-7b` model, which is free to use with OpenRouter’s free tier.
- You can change the model in `api/chat.js` if you want.
- This project keeps your API key safe by handling calls on the server side.

---

Enjoy your free AI chatbot!
