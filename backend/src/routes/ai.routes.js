



// const express = require('express');
// const router = express.Router();
// const generateText = require('../services/ai.service'); // Update the path to match your project structure

// router.post('/get-review', async (req, res) => {
//   try {
//     const { code, language } = req.body;
    
//     // Create a prompt that includes both the code and the language for Gemini
//     const prompt = `
// Please review the following ${language} code:

// \`\`\`${language}
// ${code}
// \`\`\`

// Provide a detailed code review including:
// 1. Code quality assessment
// 2. Best practices recommendations
// 3. Performance optimizations
// 4. Potential bugs or edge cases
// 5. Security considerations specific to ${language}
// 6. Readability and maintainability suggestions
// `;

//     // Call the Gemini API using your generateText function
//     const reviewResponse = await generateText(prompt);
    
//     // Return the generated review
//     res.json(reviewResponse);
//   } catch (error) {
//     console.error('Error reviewing code:', error);
//     res.status(500).json('Error processing your request: ' + error.message);
//   }
// });

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const generateText = require('../services/ai.service');
// const executeCode = require('../services/code.service');

// router.post('/get-review', async (req, res) => {
//   try {
//     const { code, language } = req.body;
    
//     // Create a prompt that includes both the code and the language for Gemini
//     const prompt = `
// Please review the following ${language} code:

// \`\`\`${language}
// ${code}
// \`\`\`

// Provide a detailed code review including:
// 1. Code quality assessment
// 2. Best practices recommendations
// 3. Performance optimizations
// 4. Potential bugs or edge cases
// 5. Security considerations specific to ${language}
// 6. Readability and maintainability suggestions
// `;

//     // Call the Gemini API using your generateText function
//     const reviewResponse = await generateText(prompt);
    
//     // Return the generated review
//     res.json(reviewResponse);
//   } catch (error) {
//     console.error('Error reviewing code:', error);
//     res.status(500).json('Error processing your request: ' + error.message);
//   }
// });

// // Add new route for code execution
// router.post('/run-code', async (req, res) => {
//   try {
//     const { code, language } = req.body;
//     const result = await executeCode(code, language);
//     res.json({ output: result });
//   } catch (error) {
//     console.error('Error executing code:', error);
//     res.status(500).json({ output: `Error: ${error.message}` });
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const { generateText, chatWithAI } = require('../services/ai.service');
const executeCode = require('../services/code.service');

router.post('/get-review', async (req, res) => {
  try {
    const { code, language } = req.body;
    const prompt = `
Please review the following ${language} code:

\`\`\`${language}
${code}
\`\`\`

Provide a detailed code review including:
1. Code quality assessment
2. Best practices recommendations
3. Performance optimizations
4. Potential bugs or edge cases
5. Security considerations specific to ${language}
6. Readability and maintainability suggestions
`;
    const reviewResponse = await generateText(prompt);
    res.json(reviewResponse);
  } catch (error) {
    console.error('Error reviewing code:', error);
    res.status(500).json('Error processing your request: ' + error.message);
  }
});

router.post('/run-code', async (req, res) => {
  try {
    const { code, language } = req.body;
    const result = await executeCode(code, language);
    res.json({ output: result });
  } catch (error) {
    console.error('Error executing code:', error);
    res.status(500).json({ output: `Error: ${error.message}` });
  }
});

router.post('/chat', async (req, res) => {
  try {
    const { query, code, language } = req.body;
    const fullPrompt = `
Context: The user is working with the following ${language} code:
\`\`\`${language}
${code}
\`\`\`

User Query: ${query}
`;
    const chatResponse = await chatWithAI(fullPrompt);
    res.json({ response: chatResponse });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json('Error processing chat request: ' + error.message);
  }
});

module.exports = router;