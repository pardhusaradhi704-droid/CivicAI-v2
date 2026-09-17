import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Loader2,
  Bot,
  User,
  MessageSquare,
  ChevronRight,
  ExternalLink,
  ArrowLeft,
} from 'lucide-react';
import { ChatMessage, Complaint } from '../../types';

interface CivicBotChatProps {
  isOpen: boolean;
  onClose: () => void;
  complaints: Complaint[];
  onSelectComplaint?: (complaint: Complaint) => void;
}

export const CivicBotChat: React.FC<CivicBotChatProps> = ({
  isOpen,
  onClose,
  complaints,
  onSelectComplaint,
}) => {
  const language = 'en';
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text:
        'Namaste! I am CivicBot, your AI Assistant for CivicAI. How can I assist you with your municipal grievance today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        'Track my pothole grievance #CIVIC-2026-8942',
        'How to file a water leak issue?',
        'What is the official SLA for street light repair?',
      ],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsSending(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ sender: m.sender, text: m.text })),
          language,
        }),
      });

      const data = await res.json();

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.text || 'I am processing your request with municipal services.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: data.suggestedActions,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('CivicBot chat error:', err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Semi-transparent Backdrop Overlay - Click outside to close */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 transition-opacity animate-fadeIn"
      />

      {/* Floating Chat Container Modal */}
      <div className="fixed bottom-0 sm:bottom-6 right-0 sm:right-6 z-[60] w-full sm:max-w-md h-[90vh] sm:h-[580px] bg-slate-900 border border-slate-800 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white animate-slideUp">
        {/* Header */}
        <div className="bg-slate-950 px-4 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 sm:hidden"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-none">CivicBot AI Assistant</h3>
              <span className="text-[10px] text-emerald-400 flex items-center mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse"></span> Online
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-bold text-xs flex items-center space-x-1.5 transition shadow active:scale-95"
            title="Close CivicBot AI Window"
          >
            <X className="w-4 h-4 text-rose-400" />
            <span>Close Bot</span>
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/40">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-[9px] text-slate-400 block text-right mt-1">{msg.timestamp}</span>
              </div>

              {/* Suggested Chips */}
              {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                  {msg.suggestedActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(action)}
                      className="text-[10px] bg-slate-800 hover:bg-slate-700 text-emerald-300 px-2.5 py-1 rounded-full border border-slate-700 transition text-left"
                    >
                      💡 {action}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isSending && (
            <div className="flex items-center space-x-2 text-xs text-slate-400 italic">
              <Loader2 className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
              <span>CivicBot is thinking...</span>
            </div>
          )}
        </div>

        {/* Bottom Form & Exit Link */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Type your civic query or tracking number..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isSending}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white transition shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <button
            type="button"
            onClick={onClose}
            className="w-full text-center text-[11px] text-slate-400 hover:text-emerald-400 font-medium py-1 flex items-center justify-center space-x-1 transition"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Return to Main Dashboard / Close Chat</span>
          </button>
        </div>
      </div>
    </>
  );
};

