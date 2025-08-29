# BFHL Challenge API

> **Built by Tanmay Bhatnagar**  
> A robust backend API solution for the BFHL coding challenge

This Node.js Express API efficiently processes arrays containing mixed data types (numbers, alphabetic characters, and special symbols) and returns structured, categorized results.

## Features

- Processes mixed data arrays containing numbers, alphabets, and special characters
- Separates even and odd numbers
- Extracts alphabets and converts to uppercase
- Identifies special characters
- Calculates sum of all numeric values
- Creates concatenated string with alternating capitalization in reverse order

## API Endpoints

### POST /bfhl

Processes an array of mixed data types.

**Request Body:**
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "tanmay_bhatnagar_29082025",
  "email": "tanmay.bhatnagar@student.edu",
  "roll_number": "TB2025001",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-08-29T05:01:29.123Z"
}
```

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

The server will run on port 3000 by default, or the port specified in the `PORT` environment variable.

## Testing

You can test the API using curl:

```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a","1","334","4","R","$"]}'
```

## Deployment

This API is designed to be deployed on platforms like:
- Vercel
- Railway
- Render
- Heroku

Make sure to set the `PORT` environment variable if required by your hosting provider.

## License

ISC
