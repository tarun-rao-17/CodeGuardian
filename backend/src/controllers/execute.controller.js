const express = require('express');
const safeEval = require('safe-eval');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);


module.exports.executeCode = async (req, res) => {
    const { code, language } = req.body;
    
    if (!code || !language) {
        return res.status(400).send('Code and language are required');
    }

    try {
        let output;
        
        // Handle different languages
        switch (language.toLowerCase()) {
            case 'javascript':
                try {
                    // Use safe-eval for JavaScript execution
                    const result = safeEval(code, { console });
                    output = {
                        success: true,
                        result: result?.toString() || 'No output',
                        logs: console.logs || []
                    };
                } catch (error) {
                    output = {
                        success: false,
                        error: error.message
                    };
                }
                break;

            case 'python':
                try {
                    const { stdout, stderr } = await execPromise(`python -c "${code}"`);
                    output = {
                        success: true,
                        result: stdout,
                        error: stderr
                    };
                } catch (error) {
                    output = {
                        success: false,
                        error: error.stderr || error.message
                    };
                }
                break;

            default:
                return res.status(400).send('Unsupported language');
        }

        res.json(output);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error executing code: ' + error.message
        });
    }
};

// Override console methods to capture logs
console.logs = [];
const originalLog = console.log;
console.log = function(...args) {
    console.logs.push(args.join(' '));
    originalLog.apply(console, args);
};