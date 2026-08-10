'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Maximize2, Minimize2, Trash2, Copy, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { generateBotResponse } from '@/lib/chatbotKnowledge';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const quickReplies = [
    'Workshops',
    'DIY Kits',
    'Community',
    'Contact Us',
    'Pricing'
  ];

  // Load from local storage
  useEffect(() => {
    const savedMessages = localStorage.getItem('plugin_chat_history');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        initializeChat();
      }
    } else {
      initializeChat();
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('plugin_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  const initializeChat = () => {
    setMessages([
      {
        id: '1',
        text: '👋 Welcome to Plug-in! How can I help you today?',
        sender: 'bot',
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const clearChat = () => {
    localStorage.removeItem('plugin_chat_history');
    initializeChat();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isMinimized) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Adjust textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = (text: string = inputValue) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    if (text === inputValue) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = generateBotResponse(text);
      
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[90] w-16 h-16 bg-[#000000] rounded-full flex items-center justify-center shadow-2xl hover:shadow-[0_8px_30px_rgba(249,115,22,0.4)] transition-all border border-orange-500/20 text-white"
            aria-label="Open Chat"
          >
            <Bot className="w-8 h-8 text-orange-500" />
            <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 border-2 border-black rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              width: isMaximized ? '90vw' : '400px',
              height: isMinimized ? '64px' : isMaximized ? '90vh' : '600px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`fixed ${isMaximized ? 'bottom-5 right-5 sm:bottom-10 sm:right-10' : 'bottom-6 right-6'} z-[100] max-w-[90vw] max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-200 overflow-hidden backdrop-blur-xl bg-white/95`}
          >
            {/* Header */}
            <div className="bg-[#0B1121] p-4 text-white flex justify-between items-center shadow-lg z-10 shrink-0 border-b border-orange-500/20 cursor-pointer" onClick={() => isMinimized && setIsMinimized(false)}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/30">
                  <Bot className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-bold text-[1rem] leading-tight">Plug-in Assistant</h3>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Online
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); clearChat(); }}
                  className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-300"
                  title="Clear Chat History"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
                  className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-300"
                  title={isMinimized ? "Expand" : "Minimize"}
                >
                  <Minimize2 className={`w-4 h-4 transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); if(isMinimized) setIsMinimized(false); }}
                  className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-300 hidden sm:block"
                  title={isMaximized ? "Restore" : "Maximize"}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                  className="p-1.5 hover:bg-red-500/20 hover:text-red-400 rounded-md transition-colors text-gray-300 ml-1"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 bg-[#F8F9FA] flex flex-col gap-5">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 max-w-[90%] ${
                        msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm ${
                          msg.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-[#0B1121] text-orange-500'
                        }`}
                      >
                        {msg.sender === 'user' ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>
                      
                      <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                        <div
                          className={`px-4 py-3 rounded-2xl text-[0.9rem] leading-relaxed shadow-sm relative group ${
                            msg.sender === 'user'
                              ? 'bg-blue-600 text-white rounded-tr-sm'
                              : 'bg-white text-gray-800 border border-gray-200 rounded-tl-sm'
                          }`}
                        >
                          {msg.sender === 'bot' ? (
                            <div className="prose prose-sm prose-orange max-w-none">
                              <ReactMarkdown>
                                {msg.text}
                              </ReactMarkdown>
                            </div>
                          ) : (
                            <span className="whitespace-pre-wrap">{msg.text}</span>
                          )}

                          {/* Copy Button (only for bot) */}
                          {msg.sender === 'bot' && (
                            <button 
                              onClick={() => copyToClipboard(msg.text, msg.id)}
                              className="absolute -right-8 top-1/2 -translate-y-1/2 p-1.5 bg-white border border-gray-200 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 text-gray-500"
                              title="Copy message"
                            >
                              {copiedId === msg.id ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          )}
                        </div>
                        <div
                          className={`text-[10px] mt-1.5 font-medium ${
                            msg.sender === 'user' ? 'text-gray-400 text-right' : 'text-gray-400'
                          }`}
                        >
                          {formatTime(msg.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-3 max-w-[85%]">
                      <div className="w-8 h-8 rounded-full bg-[#0B1121] text-orange-500 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="px-5 py-4 rounded-2xl bg-white border border-gray-200 shadow-sm rounded-tl-sm flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies & Input Area */}
                <div className="bg-white border-t border-gray-200 flex flex-col shrink-0">
                  {/* Quick Replies (Horizontal Scroll) */}
                  {!isTyping && (
                    <div className="flex overflow-x-auto gap-2 p-3 pb-0 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      {quickReplies.map((reply) => (
                        <button
                          key={reply}
                          onClick={() => handleSend(reply)}
                          className="whitespace-nowrap px-3 py-1.5 text-[13px] font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors shrink-0"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Input Box */}
                  <div className="p-3">
                    <div className="flex items-end gap-2 bg-[#F8F9FA] p-2 rounded-xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all shadow-inner">
                      <textarea
                        ref={textareaRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about workshops, kits, or drone engineering..."
                        className="w-full bg-transparent border-none focus:ring-0 resize-none min-h-[40px] max-h-[120px] py-2 px-3 text-[14px] text-gray-800"
                        rows={1}
                      />
                      <button
                        onClick={() => handleSend()}
                        disabled={!inputValue.trim()}
                        className={`p-3 rounded-lg flex shrink-0 items-center justify-center transition-all shadow-sm ${
                          inputValue.trim()
                            ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <Send className="w-4 h-4 ml-0.5" />
                      </button>
                    </div>
                    <div className="text-[10px] text-center text-gray-400 mt-2 font-medium">
                      Press <span className="text-gray-500 bg-gray-100 px-1 py-0.5 rounded">Enter</span> to send, <span className="text-gray-500 bg-gray-100 px-1 py-0.5 rounded">Shift + Enter</span> for new line
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
