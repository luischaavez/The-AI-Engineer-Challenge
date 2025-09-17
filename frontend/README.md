# AI Chat Frontend

A modern, responsive frontend application for communicating with the OpenAI Chat API. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🤖 **Real-time Chat Interface** - Stream responses from OpenAI models
- 🔐 **Secure API Key Management** - Password-protected API key input
- 🎨 **Modern UI Design** - Forest green color palette with excellent contrast
- 📱 **Responsive Design** - Works on desktop and mobile devices
- ⚡ **Streaming Support** - Real-time message streaming for better UX
- 🎛️ **Model Selection** - Choose from different OpenAI models
- 💬 **System Message Configuration** - Customize AI behavior

## Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Your FastAPI backend running (see main project README)

## Quick Start

1. **Install Dependencies**

   ```bash
   cd frontend
   npm install
   ```

2. **Set up Environment Variables**
   Create a `.env.local` file in the frontend directory:

   ```bash
   echo "API_URL=http://localhost:8000" > .env.local
   ```

3. **Start the Development Server**

   ```bash
   npm run dev
   ```

4. **Open Your Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Configuration

### API URL Configuration

The frontend connects to your FastAPI backend. Update the `API_URL` in `.env.local`:

- **Local Development**: `http://localhost:8000`
- **Production**: Your deployed API URL

### Environment Variables

| Variable  | Description                 | Default                 |
| --------- | --------------------------- | ----------------------- |
| `API_URL` | URL of your FastAPI backend | `http://localhost:8000` |

## Usage

1. **Enter API Key**: When you first open the app, you'll be prompted to enter your OpenAI API key
2. **Configure Settings**: Choose your preferred AI model and system message
3. **Start Chatting**: Type your message and press Enter to send
4. **Streaming Responses**: Watch as the AI responds in real-time

## Available Models

- GPT-4.1 Mini (default)
- GPT-4
- GPT-3.5 Turbo
- GPT-4 Turbo

## Development

### Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ApiKeyModal.tsx    # API key input modal
│   ├── ChatInterface.tsx  # Main chat interface
│   ├── MessageInput.tsx   # Message input component
│   ├── MessageList.tsx    # Message display component
│   └── ModelSelector.tsx  # Model selection dropdown
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Security Notes

- API keys are stored locally in the browser and never sent to our servers
- All communication with OpenAI goes through your FastAPI backend
- CORS is properly configured for secure cross-origin requests

## Troubleshooting

### Common Issues

1. **API Connection Failed**

   - Ensure your FastAPI backend is running
   - Check the `API_URL` in `.env.local`
   - Verify CORS settings in your backend

2. **Streaming Not Working**

   - Check browser console for errors
   - Ensure your backend supports streaming responses
   - Verify network connectivity

3. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check TypeScript errors with `npm run lint`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of The AI Engineer Challenge.
