import { useEffect, useState, useRef } from "react";
import { getNotifications, markNotificationRead } from "../services/authService";
import { useNavigate } from "react-router-dom";

function NotificationBell() {

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error("Notification fetch error", err);
    }
  };

  // Load notifications
  useEffect(() => {
    loadNotifications();
  }, []);

  // 🔴 Auto refresh every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadNotifications();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleClickNotification = async (notification) => {

    try {

      if (!notification.isRead) {
        await markNotificationRead(notification._id);
      }

      

    } catch (err) {
      console.error(err);
    }

  };

  return (
    <div className="relative" ref={ref}>

      {/* 🔔 Notification Bell */}
      <button
        onClick={() => {
        setOpen(!open);
        loadNotifications(); // refresh when opened
        }}
        className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition"
      >

        <span className="text-xl">
            <i className="uil uil-bell text-xl"></i>
        </span>

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}

      </button>


      {/* Dropdown */}
      {open && (

        <div className="absolute right-0 mt-3 w-96 max-h-105 overflow-y-auto scrollbar-hide rounded-3xl 
        bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/30 
        shadow-[0_20px_60px_rgba(0,0,0,0.15)] z-50">

          {/* Header */}
          <div className="p-4 border-b border-white/20 flex items-center justify-between">

            <h3 className="font-black text-slate-800 dark:text-white">
              Notifications
            </h3>

            <span className="text-xs text-slate-400">
              {notifications.length}
            </span>

          </div>


          {/* Notification List */}
          {notifications.length === 0 && (
            <div className="p-6 text-center text-sm text-slate-400">
              No notifications yet
            </div>
          )}


          {notifications.map((n) => (

            <div
              key={n._id}
              onClick={() => handleClickNotification(n)}
              className={`group flex items-start gap-3 p-4 cursor-pointer transition
              hover:bg-white/40 dark:hover:bg-slate-800/40
              ${!n.isRead ? "bg-orange-50/50 dark:bg-slate-800/50" : ""}`}
            >

              {/* Avatar */}
              <img
                src={n.sender?.profilePic || "/img/avtar.png"}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-white/60"
              />


              {/* Content */}
              <div className="flex-1">

                <p className="text-sm text-slate-700 dark:text-slate-200 leading-snug">
                  {n.message}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </p>

              </div>


              {/* Unread Dot */}
              {!n.isRead && (
                <span className="w-2.5 h-2.5 bg-ei_orange rounded-full mt-2"></span>
              )}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default NotificationBell;