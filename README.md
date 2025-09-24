# AI Beginner Tutor

An AI-powered tutoring application built with FastAPI that helps beginners learn programming concepts.

## Features

- AI-powered tutoring using OpenAI and Google Gemini
- User authentication and authorization
- RESTful API design
- SQLite database integration

## Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ai_beginer_tutor
```

2. Create virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your actual API keys
```

5. Run the application:
```bash
uvicorn app.main:app --reload
```

## API Documentation

Visit `http://localhost:8000/docs` for interactive API documentation.

## Project Structure

```
app/
├── core/           # Core configuration
├── models/         # Database models
├── routers/        # API routes
├── schemas/        # Pydantic schemas
├── services/       # Business logic
└── utils/          # Utility functions
```

## License

MIT License