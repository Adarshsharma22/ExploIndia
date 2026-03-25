import { useEffect, useState, useRef } from "react";
import { getNotifications, markNotificationRead } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const loadNotifications = async () => {
  const token = localStorage.getItem("token");

  if (!token) return; // 🚨 stop request

  try {
    const data = await getNotifications();
    setNotifications(data);
  } catch (err) {
    console.error("Notification fetch error", err);
  }
};

  useEffect(() => {
  if (loading || !user) return; // 🚨 MOST IMPORTANT LINE

  loadNotifications();

  const interval = setInterval(() => {
    loadNotifications();
  }, 10000);

  return () => clearInterval(interval);

}, [loading, user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleClickNotification = async (notification) => {
    try {
      if (!notification.isRead) {
        await markNotificationRead(notification._id);
        loadNotifications(); // Refresh list to update UI state
      }
    } catch (err) {
      console.error(err);
    }
  };

const [clearing, setClearing] = useState(false);

const handleClearAll = async () => {
  try {
    setClearing(true);

    const unread = notifications.filter(n => !n.isRead);

    for (let n of unread) {
      try {
        await markNotificationRead(n._id);
      } catch (err) {
        console.error("Failed for:", n._id, err);
      }
    }

    await loadNotifications(); 

  } catch (err) {
    console.error("Clear all error:", err);
  } finally {
    setClearing(false);
  }
};
  return (
    <div className="relative inline-block" ref={ref}>
      {/* 🔔 Notification Bell Button */}
      <button
        onClick={() => {
          setOpen(!open);
          loadNotifications();
        }}
        className="relative p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 active:scale-90 group"
      >
        <i className={`uil uil-bell text-2xl transition-colors ${open ? 'text-orange-500' : 'text-slate-600 dark:text-slate-300'}`}></i>
        
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-[10px] font-bold items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          </span>
        )}
      </button>

      {/* 📱 Dropdown Container */}
      {open && (
        <div className="
          /* Mobile: Full width fixed bottom or center */
          fixed inset-x-4 top-20 mx-auto w-auto max-w-[calc(100vw-2rem)]
          /* Desktop: Absolute positioned dropdown */
          md:absolute md:inset-x-auto md:right-0 md:top-full md:mt-4 md:w-[420px] 
          max-h-[80vh] flex flex-col
          bg-white/80 dark:bg-slate-900/90 backdrop-blur-2xl
          border border-slate-200/50 dark:border-white/10
          shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]
          rounded-[2rem] overflow-hidden z-[100] animate-in fade-in zoom-in duration-200
        ">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-200/50 dark:border-white/10 flex items-center justify-between bg-white/30 dark:bg-transparent">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-none">
                Notifications
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                You have {unreadCount} unread messages
              </p>
            </div>
            <button
              onClick={handleClearAll}
              className="text-xs font-semibold text-orange-500 hover:text-orange-600 transition"
            >
              {clearing ? "Clearing..." : "Clear all"}
            </button>
          </div>

          {/* Notification List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="py-16 flex flex-col items-center justify-center text-center px-10">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <i className="uil uil-bell-slash text-2xl text-slate-400"></i>
                </div>
                <h4 className="text-slate-900 dark:text-white font-medium">All caught up!</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  No new notifications at the moment.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-white/5">
                {notifications.map((n) => (
                  <div
                    key={n._id}
                    onClick={() => handleClickNotification(n)}
                    className={`group flex items-start gap-4 p-5 cursor-pointer transition-all duration-200
                    hover:bg-slate-50 dark:hover:bg-slate-800/50
                    ${!n.isRead ? "bg-orange-50/40 dark:bg-orange-500/5" : ""}`}
                  >
                    {/* Avatar with Status */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={n.sender?.profilePic || "/img/avtar.png"}
                        alt="User"
                        className="w-12 h-12 rounded-2xl object-cover shadow-sm ring-2 ring-white dark:ring-slate-700"
                      />
                      {!n.isRead && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-orange-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <p className={`text-sm leading-tight break-words ${!n.isRead ? "font-bold text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}>
                          {n.message}
                        </p>
                      </div>
                      <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1">
                        <i className="uil uil-clock"></i>
                        {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        <span className="mx-1">•</span>
                        {new Date(n.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-4 border-t border-slate-200/50 dark:border-white/10 text-center">
              <button className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-orange-500 transition">
                View All Activity
              </button>
            </div>
          )}
        </div>
      )}

      {/* CSS for custom scrollbar (Add to your global CSS if possible) */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
      `}} />
    </div>
  );
}

export default NotificationBell;