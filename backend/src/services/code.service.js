const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');
const os = require('os');

// Promisify exec for easier usage with async/await
const execPromise = util.promisify(exec);
const writeFilePromise = util.promisify(fs.writeFile);
const unlinkPromise = util.promisify(fs.unlink);
const mkdirPromise = util.promisify(fs.mkdir);

// Create a temp directory for code files if it doesn't exist
const tempDir = path.join(os.tmpdir(), 'code-executor');
fs.existsSync(tempDir) || fs.mkdirSync(tempDir, { recursive: true });

// Configuration for each supported language
const languageConfig = {
  javascript: {
    extension: 'js',
    command: (filename) => `node ${filename}`,
    timeout: 5000,
  },
  python: {
    extension: 'py',
    command: (filename) => `python ${filename}`,
    timeout: 5000,
  },
  java: {
    extension: 'java',
    // Extract class name from the code
    getFileName: (code) => {
      const match = code.match(/public\s+class\s+(\w+)/);
      return match ? `${match[1]}.java` : 'Main.java';
    },
    command: (filename) => {
      const className = path.basename(filename, '.java');
      return `javac ${filename} && java ${className}`;
    },
    timeout: 8000,
  },
  cpp: {
    extension: 'cpp',
    command: (filename) => {
      const executablePath = filename.replace(/\.cpp$/, '');
      return `g++ ${filename} -o ${executablePath} && ${executablePath}`;
    },
    timeout: 5000,
  },
  csharp: {
    extension: 'cs',
    command: (filename) => `dotnet script ${filename}`,
    timeout: 8000,
  },
  php: {
    extension: 'php',
    command: (filename) => `php ${filename}`,
    timeout: 5000,
  },
  ruby: {
    extension: 'rb',
    command: (filename) => `ruby ${filename}`,
    timeout: 5000,
  },
  go: {
    extension: 'go',
    command: (filename) => `go run ${filename}`,
    timeout: 5000,
  },
  rust: {
    extension: 'rs',
    command: (filename) => `rustc ${filename} -o ${filename.replace('.rs', '')} && ${filename.replace('.rs', '')}`,
    timeout: 8000,
  },
  typescript: {
    extension: 'ts',
    command: (filename) => `ts-node ${filename}`,
    timeout: 5000,
  },
  swift: {
    extension: 'swift',
    command: (filename) => `swift ${filename}`,
    timeout: 5000,
  },
};

/**
 * Execute code in the specified language
 * @param {string} code - The code to execute
 * @param {string} language - The programming language
 * @returns {Promise<string>} - The execution output
 */
async function executeCode(code, language) {
    if (!languageConfig[language]) {
      return `Language '${language}' is not supported for execution.`;
    }
  
    const config = languageConfig[language];
    
    // Generate unique filename to prevent conflicts
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const filename = config.getFileName 
      ? config.getFileName(code)
      : `code_${timestamp}_${randomStr}.${config.extension}`;
    
    const filepath = path.join(tempDir, filename);
  
    try {
      // Write code to file
      await writeFilePromise(filepath, code);
      
      // Execute the code with timeout
      const { stdout, stderr } = await execPromise(config.command(filepath), {
        timeout: config.timeout,
        cwd: tempDir
      });
  
      // Return the output
      return stderr ? `Error:\n${stderr}` : stdout || 'Code executed successfully with no output.';
    } catch (error) {
      if (error.killed && error.signal === 'SIGTERM') {
        return 'Execution timed out. Your code took too long to run.';
      }
      return `Execution error: ${error.message}`;
    } finally {
      // Clean up the file
      try {
        await unlinkPromise(filepath);
        // Also remove any compiled files if they exist
        if (language === 'java') {
          const classFile = filepath.replace('.java', '.class');
          if (fs.existsSync(classFile)) {
            await unlinkPromise(classFile);
          }
        }
      } catch (err) {
        console.error('Error cleaning up files:', err);
      }
    }
  }
  
  module.exports = executeCode;