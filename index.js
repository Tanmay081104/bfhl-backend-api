const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper functions
function isNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

function isAlphabet(str) {
    return /^[a-zA-Z]$/.test(str);
}

function isSpecialCharacter(str) {
    return !isNumber(str) && !isAlphabet(str);
}

function processData(data) {
    const evenNumbers = [];
    const oddNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let numericSum = 0;
    let alphabetString = '';

    data.forEach(item => {
        const str = String(item);
        
        if (isNumber(str)) {
            const num = parseInt(str);
            if (num % 2 === 0) {
                evenNumbers.push(str);
            } else {
                oddNumbers.push(str);
            }
            numericSum += num;
        } else if (isAlphabet(str)) {
            alphabets.push(str.toUpperCase());
            alphabetString += str.toLowerCase();
        } else if (isSpecialCharacter(str)) {
            specialCharacters.push(str);
        }
    });

    // Create concatenated string with alternating capitalization in reverse order
    let concatString = '';
    const reversedAlphabet = alphabetString.split('').reverse();
    reversedAlphabet.forEach((char, index) => {
        if (index % 2 === 0) {
            concatString += char.toUpperCase();
        } else {
            concatString += char.toLowerCase();
        }
    });

    return {
        evenNumbers,
        oddNumbers,
        alphabets,
        specialCharacters,
        sum: String(numericSum),
        concatString
    };
}

// Routes
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        // Input validation
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' must be an array"
            });
        }

        const processedData = processData(data);

        const response = {
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            odd_numbers: processedData.oddNumbers,
            even_numbers: processedData.evenNumbers,
            alphabets: processedData.alphabets,
            special_characters: processedData.specialCharacters,
            sum: processedData.sum,
            concat_string: processedData.concatString
        };

        res.status(200).json(response);

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
