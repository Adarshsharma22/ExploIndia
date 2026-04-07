import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Image as ImageIcon, 
  Smile, 
  Search, 
  MoreVertical, 
  MapPin, 
  CheckCheck,
  Paperclip
} from "lucide-react";
import {
  getMessages,
  sendMessage,
  getSuggestedUsers,
} from "../services/authService";

const Message = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false); // UI State demo

  const messagesEndRef = useRef();

  useEffect(() => {
    if (!user) return;
    const fetchUsers = async () => {
      try {
        const data = await getSuggestedUsers();
        setUsers(data);
      } catch (err) {
        console.error("User fetch error:", err);
      }
    };
    fetchUsers();
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectUser = async (u) => {
    setSelectedUser(u);
    try {
      const data = await getMessages(u._id);
      setMessages(data);
    } catch (err) {
      setMessages([]);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedUser) return;
    try {
      const msg = await sendMessage(selectedUser._id, newMessage);
      setMessages((prev) => [...prev, msg]);
      setNewMessage("");
    } catch (err) {
      console.error("Send error:", err);
    }
  };

  const filteredUsers = users.filter(u => 
    u.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen pt-20 bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-500">
      <section className="max-w-7xl mx-auto px-4 h-[calc(100vh-7rem)]">
        <div className="flex gap-0 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden h-full">
          
          {/* 🔹 LEFT PANEL: CONVERSATIONS */}
          <aside className="w-full md:w-80 lg:w-[380px] border-r border-slate-100 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-900/50">
            <div className="p-6">
              <h1 className="text-2xl font-black text-slate-800 dark:text-white mb-4">Messages</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search explorers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 space-y-1 scrollbar-hide">
              {filteredUsers.map((u) => (
                <motion.div
                  whileHover={{ x: 5 }}
                  key={u._id}
                  onClick={() => handleSelectUser(u)}
                  className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200 ${
                    selectedUser?._id === u._id
                      ? "bg-white dark:bg-slate-800 shadow-md border-l-4 border-blue-500"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800/40"
                  }`}
                >
                  <div className="relative">
                    <img src={u.profilePic || "/img/avtar.png"} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <p className="font-bold text-slate-900 dark:text-white truncate">{u.fullName}</p>
                      <span className="text-[10px] text-slate-400 uppercase font-medium">12:45 PM</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Ready for the Manali trek?</p>
                  </div>
                  {/* Unread Badge Example */}
                  <div className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">2</div>
                </motion.div>
              ))}
            </div>
          </aside>

          {/* 🔹 RIGHT PANEL: CHAT WINDOW */}
          <div className="hidden md:flex flex-1 flex-col bg-white dark:bg-slate-900 relative">
            {!selectedUser ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-full">
                  <Smile className="w-12 h-12 text-slate-300" />
                </div>
                <p className="font-medium">Select a fellow traveler to start chatting</p>
              </div>
            ) : (
              <>
                {/* CHAT HEADER */}
                <header className="p-4 border-b dark:border-slate-800 flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10">
                  <div className="flex items-center gap-3">
                    <img src={selectedUser.profilePic || "/img/avtar.png"} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white leading-tight">{selectedUser.fullName}</p>
                      <p className="text-[11px] text-green-500 font-medium">Online</p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-slate-400">
                    <MapPin className="w-5 h-5 cursor-pointer hover:text-blue-500 transition" />
                    <MoreVertical className="w-5 h-5 cursor-pointer hover:text-blue-500 transition" />
                  </div>
                </header>

                {/* MESSAGES AREA */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] dark:opacity-90">
                  {messages.map((msg, i) => {
                    const isMe = msg.sender === user?._id;
                    return (
                      <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                        <div className={`group relative flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                          <div className={`px-4 py-2.5 rounded-2xl shadow-sm text-sm max-w-md ${
                            isMe 
                              ? "bg-blue-600 text-white rounded-tr-none" 
                              : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none"
                          }`}>
                            {msg.text}
                          </div>
                          <div className="flex items-center gap-1 mt-1 px-1">
                            <span className="text-[10px] text-slate-400">12:46 PM</span>
                            {isMe && <CheckCheck className="w-3 h-3 text-blue-500" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {isTyping && (
                    <div className="text-[11px] text-slate-400 italic animate-pulse">
                      {selectedUser.fullName} is typing adventure plans...
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* INPUT AREA */}
                <footer className="p-4 bg-white dark:bg-slate-900 border-t dark:border-slate-800">
                  <div className="flex items-center gap-2 max-w-4xl mx-auto bg-slate-50 dark:bg-slate-800 p-2 rounded-2xl shadow-inner">
                    <button className="p-2 text-slate-400 hover:text-blue-500 transition">
                      <Smile className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-blue-500 transition">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                      className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
                      placeholder="Write your message..."
                    />
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={handleSend}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl transition shadow-lg shadow-blue-500/20"
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                </footer>
              </>
            )}
          </div>

        </div>
      </section>
    </main>
  );
};

export default Message;