```markdown
# GBV Project - Gas Balance Visualization Dashboard

A React-based dashboard for visualizing gas balance and compressor status data, featuring interactive maps and real-time monitoring.

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (version 14.0 or higher)
- npm (usually comes with Node.js) or [yarn](https://yarnpkg.com/)
- OpenWeatherMap API key (for weather data)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/taufik-my/gbv-project.git
```

2. Navigate to the project directory:
```bash
cd gbv-project
```

3. Install dependencies:
```bash
npm install
```

4. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your OpenWeatherMap API key:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```
   - You can get an API key by signing up at [OpenWeatherMap](https://openweathermap.org/api)

The project uses the following key dependencies:
- React and React DOM for UI
- Leaflet and React-Leaflet for interactive maps
- Lucide React for icons
- Recharts for data visualization
- Tailwind CSS for styling
- OpenWeatherMap API for real-time weather data

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Tech Stack

- [React](https://reactjs.org/) - Frontend framework
- [Vite](https://vitejs.dev/) - Build tool
- [Leaflet](https://leafletjs.com/) - Interactive maps
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide React](https://lucide.dev/) - Icon library
- [Recharts](https://recharts.org/) - Charting library
- [OpenWeatherMap](https://openweathermap.org/) - Weather data API

## Environment Variables

The project requires the following environment variables:

| Variable | Description |
|----------|-------------|
| VITE_WEATHER_API_KEY | OpenWeatherMap API key for weather data |

You can get an API key by:
1. Signing up at [OpenWeatherMap](https://openweathermap.org/)
2. Navigate to your account's "API keys" section
3. Generate a new API key
4. Add the key to your `.env` file
```