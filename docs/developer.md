# Kisan Mitra (Developer Documentation)


## Development Environment Setup

1. `bun i` - Install all dependencies
2. `cp apps/mobile/.env.example apps/mobile/.env` - Copy the environment file for the mobile app
3. `cd apps/ml && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt` - Setup the virtual environment for the machine learning app
4. `bun start:dev` - Start the development server

## Apps
- [mobile](../apps/mobile/) - Expo Frontend App
- [ml](../apps/ml) - Machine Learning Backend App
- [api](../apps/api) - Django Rest Framework Backend App