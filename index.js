const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Utility functions for data type checking
const isNumber = (str) => {
    return !isNaN(str) && !isNaN(parseFloat(str));
};

const isAlphabet = (str) => {
    return /^[a-zA-Z]$/.test(str);
};

const isSpecialChar = (str) => {
    return !isNumber(str) && !isAlphabet(str);
};

// Main data processing function
function processInputData(inputArray) {
    const result = {
        evenNumbers: [],
        oddNumbers: [],
        alphabets: [],
        specialCharacters: [],
        numericSum: 0,
        alphabetString: ''
    };

    // Process each item in the input array
    inputArray.forEach(item => {
        const itemStr = String(item);
        
        if (isNumber(itemStr)) {
            const numValue = parseInt(itemStr);
            // Check if even or odd
            if (numValue % 2 === 0) {
                result.evenNumbers.push(itemStr);
            } else {
                result.oddNumbers.push(itemStr);
            }
            result.numericSum += numValue;
        } else if (isAlphabet(itemStr)) {
            result.alphabets.push(itemStr.toUpperCase());
            result.alphabetString += itemStr.toLowerCase();
        } else if (isSpecialChar(itemStr)) {
            result.specialCharacters.push(itemStr);
        }
    });

    // Generate concatenated string with alternating caps (reversed)
    let concatenatedStr = '';
    const reversedAlphabets = result.alphabetString.split('').reverse();
    
    for (let i = 0; i < reversedAlphabets.length; i++) {
        if (i % 2 === 0) {
            concatenatedStr += reversedAlphabets[i].toUpperCase();
        } else {
            concatenatedStr += reversedAlphabets[i].toLowerCase();
        }
    }

    return {
        evenNumbers: result.evenNumbers,
        oddNumbers: result.oddNumbers,
        alphabets: result.alphabets,
        specialCharacters: result.specialCharacters,
        sum: String(result.numericSum),
        concatString: concatenatedStr
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

        const processedData = processInputData(data);

        const response = {
            is_success: true,
            user_id: "tanmay_bhatnagar_29082025",
            email: "tanmay.bhatnagar@student.edu",
            roll_number: "TB2025001",
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
