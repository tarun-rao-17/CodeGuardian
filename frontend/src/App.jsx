





import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Auth from './Auth';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import "prismjs/themes/prism-tomorrow.css";
import Editor from 'react-simple-code-editor';
import Prism from "prismjs";
import axios from 'axios';
import './App.css';
import Markdown from 'react-markdown';
import { signOut } from 'firebase/auth';
import { FaPlay, FaCode, FaSignOutAlt, FaComments, FaTimes } from 'react-icons/fa';

import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-php";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-swift";

function ChatBot({ code, language }) {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const predefinedQuestions = [
    {
      text: "How can I optimize this code for better performance?",
      prompt: "Analyze the following code for performance optimization opportunities and provide specific improvements:\n\nCode:\n```${language}\n${code}\n```"
    },
    {
      text: "Are there any security vulnerabilities in my code?",
      prompt: "Perform a security audit on the following code and identify potential vulnerabilities:\n\nCode:\n```${language}\n${code}\n```"
    },
    {
      text: "Can you suggest better coding practices for this code?",
      prompt: "Review the following code and suggest improvements based on best practices and coding standards:\n\nCode:\n```${language}\n${code}\n```"
    }
  ];

  async function handleChatSubmit(customPrompt = null) {
    if (!query.trim() && !customPrompt) {
      setResponse('**Error:** Please enter a question or select a predefined query.');
      return;
    }

    setIsLoading(true);
    try {
      const finalPrompt = customPrompt || `
        User Query: ${query}
        Language: ${language}
        Code Context:
        \`\`\`${language}
        ${code}
        \`\`\`
      `;

      const res = await axios.post('http://localhost:3000/ai/chat', {
        query: finalPrompt,
        code,
        language
      });
      setResponse(res.data.response);
      setQuery('');
    } catch (error) {
      setResponse(`**Error:** Could not get chat response.\n\n${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={`chatbot ${isOpen ? 'open' : ''}`}>
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <><FaTimes /> Close Chat</> : <><FaComments /> Chat</>}
      </button>
      {isOpen && (
        <div className="chat-container">
          <div className="predefined-questions">
            <h4>Quick Questions:</h4>
            {predefinedQuestions.map((q, index) => (
              <button
                key={index}
                className="predefined-btn"
                onClick={() => handleChatSubmit(q.prompt)}
                disabled={isLoading}
              >
                {q.text}
              </button>
            ))}
          </div>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about your code or any programming question..."
            className="chat-input"
            disabled={isLoading}
          />
          <button 
            onClick={() => handleChatSubmit()} 
            className="chat-submit"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Send'}
          </button>
          {response && (
            <div className="chat-response">
              <Markdown>{response}</Markdown>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CodeEditor() {
  const [count, setCount] = useState(0);
  const [review, setReview] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');
  const navigate = useNavigate();

  const defaultCodeSamples = {
    javascript: `// Start writing your JavaScript code here
function helloWorld() {
  console.log("Hello, World!");
}
helloWorld();`,
    python: `# Start writing your Python code here
def hello_world():
    print("Hello, World!")
hello_world()`,
    java: `// Start writing your Java code here
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    cpp: `// Start writing your C++ code here
#include <iostream>
int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
    csharp: `// Start writing your C# code here
using System;
class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
    php: `<?php
// Start writing your PHP code here
echo "Hello, World!";
?>`,
    ruby: `# Start writing your Ruby code here
puts "Hello, World!"`,
    go: `// Start writing your Go code here
package main
import "fmt"
func main() {
    fmt.Println("Hello, World!")
}`,
    rust: `// Start writing your Rust code here
fn main() {
    println!("Hello, World!");
}`,
    typescript: `// Start writing your TypeScript code here
function helloWorld(): void {
    console.log("Hello, World!");
}
helloWorld();`,
    swift: `// Start writing your Swift code here
print("Hello, World!")`,
  };

  const [code, setCode] = useState(defaultCodeSamples[language]);

  useEffect(() => {
    setCode(defaultCodeSamples[language]);
  }, [language]);

  const highlightWithLanguage = (code) => {
    try {
      if (Prism.languages[language]) {
        return Prism.highlight(code, Prism.languages[language], language);
      }
      return Prism.highlight(code, Prism.languages.javascript, 'javascript');
    } catch (error) {
      console.error("Highlighting error:", error);
      return code;
    }
  };

  async function reviewCode() {
    try {
      setOutput('');
      const response = await axios.post('http://localhost:3000/ai/get-review', { 
        code,
        language
      });
      setReview(response.data);
    } catch (error) {
      setReview(`**Error:** Could not connect to the server. Make sure your backend is running at http://localhost:3000.\n\n${error.message}`);
    }
  }

  async function runCode() {
    try {
      setReview('');
      setOutput('Running code...');
      const response = await axios.post('http://localhost:3000/ai/run-code', { 
        code,
        language
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput(`**Error:** Could not execute the code.\n\n${error.message}`);
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <main>
        <div className="editor-header">
          <button onClick={handleLogout} className="logout-button">
            <FaSignOutAlt /> <p className='buttontext'>Log Out</p>
          </button>
        </div>
        <div className="left">
          <div className="language-selector">
            <label htmlFor="language-select">Language:</label>
            <select 
              id="language-select" 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="csharp">C#</option>
              <option value="php">PHP</option>
              <option value="ruby">Ruby</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="typescript">TypeScript</option>
              <option value="swift">Swift</option>
            </select>
          </div>
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={highlightWithLanguage}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div className="button-container">
            <button onClick={reviewCode} className="review">
              <FaCode className="button-icon" /> Review Code
            </button>
            <button onClick={runCode} className="run">
              <FaPlay className="button-icon" /> Run Code
            </button>
          </div>
          <ChatBot code={code} language={language} />
        </div>
        <div className="right">
          <div className="tabs">
            <button 
              className={review && !output ? "active" : ""} 
              onClick={() => {
                if (output) setOutput('');
              }}
            >
              Review
            </button>
            <button 
              className={output && !review ? "active" : ""} 
              onClick={() => {
                if (review) setReview('');
              }}
            >
              Output
            </button>
          </div>
          <div className="content">
            {review && !output ? (
              <div className="review-content">
                <Markdown>{review}</Markdown>
              </div>
            ) : (
              <div className="output-content">
                <pre>{output}</pre>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/auth" 
          element={user ? <Navigate to="/editor" /> : <Auth />} 
        />
        <Route 
          path="/editor" 
          element={user ? <CodeEditor /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="*" 
          element={<Navigate to={user ? "/editor" : "/auth"} />} 
        />
      </Routes>  
    </Router>
  );
}

export default App;






