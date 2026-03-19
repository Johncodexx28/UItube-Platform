import React, { useState } from 'react';
import { 
  Search, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Image as ImageIcon, 
  Paperclip, 
  Smile,
  Circle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Messages = () => {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState(0);
  const [message, setMessage] = useState('');

  const contacts = [
    { id: 1, name: 'Dr. Sarah Wilson', role: 'UI/UX Design', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', status: 'online', lastMsg: 'Your latest assignment looks great!', time: '2m ago', unread: 2 },
    { id: 2, name: 'Prof. Michael Chen', role: 'Web Development', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', status: 'offline', lastMsg: 'The React hooks lecture is updated.', time: '1h ago', unread: 0 },
    { id: 3, name: 'Emma Thompson', role: 'Brand Identity', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', status: 'online', lastMsg: 'Can we discuss the logo sketch?', time: '3h ago', unread: 0 },
    { id: 4, name: 'James Rodriguez', role: 'Motion Design', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', status: 'online', lastMsg: 'Thanks for the feedback!', time: 'Yesterday', unread: 0 },
  ];

  const chatHistory = [
    { id: 1, sender: 'them', text: 'Hi! Have you had a chance to look at the UI/UX assignment feedback I sent?', time: '10:30 AM' },
    { id: 2, sender: 'me', text: "Yes, I just saw it! Thank you for the detailed notes on the spacing and typography. It really helped clarify the visual hierarchy.", time: '10:32 AM' },
    { id: 3, sender: 'them', text: 'Glad it helped! The way you used the primary color for the CTA was brilliant. Keep it up!', time: '10:35 AM' },
    { id: 4, sender: 'them', text: 'Your latest assignment looks great! One minor thing: try experimenting with more whitespace in the hero section.', time: '10:36 AM' },
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex bg-white rounded-[40px] shadow-2xl shadow-indigo-100/50 border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Contact List */}
      <div className="w-80 border-r border-gray-50 flex flex-col bg-gray-50/30">
        <div className="p-6">
          <h2 className="text-2xl font-black text-gray-900 mb-6 px-1">Messages</h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full bg-white border-none rounded-2xl py-3 pl-11 pr-4 text-sm font-bold shadow-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-300"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-2">
          {contacts.map((contact, idx) => (
            <button
              key={contact.id}
              onClick={() => setActiveChat(idx)}
              className={`w-full p-4 rounded-3xl flex items-center gap-4 transition-all hover:bg-white hover:shadow-md group ${activeChat === idx ? 'bg-white shadow-lg shadow-indigo-50 border border-indigo-50' : 'bg-transparent border-transparent'}`}
            >
              <div className="relative shrink-0">
                <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                {contact.status === 'online' && (
                  <Circle className="absolute -bottom-1 -right-1 w-3.5 h-3.5 fill-emerald-500 text-white border-2 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="font-black text-gray-900 text-sm truncate">{contact.name}</h4>
                  <span className="text-[10px] font-bold text-gray-400">{contact.time}</span>
                </div>
                <p className="text-xs text-gray-400 font-medium truncate italic">{contact.lastMsg}</p>
              </div>
              {contact.unread > 0 && (
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-primary/20">
                  {contact.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={contacts[activeChat].avatar} alt={contacts[activeChat].name} className="w-12 h-12 rounded-2xl object-cover shadow-md" />
              <Circle className="absolute -bottom-1 -right-1 w-3.5 h-3.5 fill-emerald-500 text-white border-2 border-white rounded-full" />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 tracking-tight">{contacts[activeChat].name}</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{contacts[activeChat].role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-400 hover:text-gray-900 shadow-sm border border-transparent hover:border-gray-100">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-400 hover:text-gray-900 shadow-sm border border-transparent hover:border-gray-100">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-3 hover:bg-gray-50 rounded-2xl transition-all text-gray-400 hover:text-gray-900 shadow-sm border border-transparent hover:border-gray-100">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-gray-50/20">
          {chatHistory.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-500`}>
              <div className={`max-w-[70%] group`}>
                <div className={`px-6 py-4 rounded-[28px] shadow-sm relative ${
                  msg.sender === 'me' 
                    ? 'bg-primary text-white font-medium rounded-tr-none shadow-primary/20' 
                    : 'bg-white text-gray-700 font-medium rounded-tl-none border border-gray-100'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <span className={`text-[10px] font-bold mt-2 block opacity-50 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-gray-50">
          <div className="bg-gray-50 rounded-[30px] p-2 flex items-center gap-2 border border-transparent focus-within:border-primary/20 focus-within:bg-white focus-within:shadow-xl transition-all">
            <div className="flex items-center gap-1 pl-2">
              <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                <ImageIcon className="w-5 h-5" />
              </button>
            </div>
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..." 
              className="flex-1 bg-transparent border-none py-3 px-4 outline-none font-bold text-gray-900 text-sm placeholder:text-gray-400"
            />
            <div className="flex items-center gap-2 pr-2">
              <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                <Smile className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
