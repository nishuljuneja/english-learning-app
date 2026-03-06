'use client';

import { useState, useEffect, useCallback } from 'react';
import { Bell, BellOff, X, Clock } from 'lucide-react';

/**
 * Local notification reminder system using the Notification API.
 * Sets a repeating daily reminder using setTimeout loops.
 * (Web Push with VAPID keys requires a backend — this is a client-only solution.)
 */

const NOTIF_PREF_KEY = 'speakeasy-notif-enabled';
const NOTIF_TIME_KEY = 'speakeasy-notif-time';
const DEFAULT_TIME = '09:00'; // 9 AM

function getStoredPref(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(NOTIF_PREF_KEY) === 'true';
}

function getStoredTime(): string {
  if (typeof window === 'undefined') return DEFAULT_TIME;
  return localStorage.getItem(NOTIF_TIME_KEY) || DEFAULT_TIME;
}

export default function NotificationPrompt() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [enabled, setEnabled] = useState(false);
  const [time, setTime] = useState(DEFAULT_TIME);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    setPermission(Notification.permission);
    setEnabled(getStoredPref());
    setTime(getStoredTime());

    // Show banner after 5 seconds if never asked
    if (Notification.permission === 'default' && !localStorage.getItem(NOTIF_PREF_KEY)) {
      const timer = setTimeout(() => setShowBanner(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Schedule daily notification
  useEffect(() => {
    if (!enabled || permission !== 'granted') return;

    const scheduleNext = () => {
      const [hours, minutes] = time.split(':').map(Number);
      const now = new Date();
      const target = new Date();
      target.setHours(hours, minutes, 0, 0);

      // If time already passed today, schedule for tomorrow
      if (target <= now) {
        target.setDate(target.getDate() + 1);
      }

      const delay = target.getTime() - now.getTime();

      const timer = setTimeout(() => {
        if (Notification.permission === 'granted') {
          new Notification('SpeakEasy', {
            body: "Time for your daily English practice! Keep your streak alive 🔥",
            icon: '/icons/icon-192.svg',
            tag: 'daily-reminder',
          });
        }
        // Schedule next day
        scheduleNext();
      }, delay);

      return timer;
    };

    const timer = scheduleNext();
    return () => { if (timer) clearTimeout(timer); };
  }, [enabled, permission, time]);

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) return;

    const result = await Notification.requestPermission();
    setPermission(result);

    if (result === 'granted') {
      setEnabled(true);
      localStorage.setItem(NOTIF_PREF_KEY, 'true');
      localStorage.setItem(NOTIF_TIME_KEY, time);

      // Show confirmation notification
      new Notification('SpeakEasy', {
        body: `Daily reminders enabled at ${time}! Keep learning English every day.`,
        icon: '/icons/icon-192.svg',
      });
    }

    setShowBanner(false);
  }, [time]);

  const toggleNotifications = useCallback(() => {
    if (enabled) {
      setEnabled(false);
      localStorage.setItem(NOTIF_PREF_KEY, 'false');
    } else {
      if (permission === 'granted') {
        setEnabled(true);
        localStorage.setItem(NOTIF_PREF_KEY, 'true');
      } else {
        requestPermission();
      }
    }
  }, [enabled, permission, requestPermission]);

  const updateTime = useCallback(
    (newTime: string) => {
      setTime(newTime);
      localStorage.setItem(NOTIF_TIME_KEY, newTime);
    },
    []
  );

  // Floating notification settings button (always visible when logged in)
  // Plus the initial banner prompt

  return (
    <>
      {/* Initial permission banner */}
      {showBanner && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-200 p-5 z-[9999] isolate pointer-events-auto animate-slide-up">
          <button
            onClick={() => setShowBanner(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Stay on track!</h3>
              <p className="text-sm text-gray-500 mb-3">
                Get a daily reminder to practice English and keep your streak alive.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={requestPermission}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
                >
                  Enable Reminders
                </button>
                <button
                  onClick={() => {
                    setShowBanner(false);
                    localStorage.setItem(NOTIF_PREF_KEY, 'false');
                  }}
                  className="px-4 py-2 text-gray-500 text-sm font-medium hover:text-gray-700 transition"
                >
                  Not now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification settings toggle in profile area */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setShowSettings(false)}>
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Notification Settings</h3>
              <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {enabled ? (
                    <Bell className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <BellOff className="w-5 h-5 text-gray-400" />
                  )}
                  <span className="font-medium text-gray-700">Daily Reminders</span>
                </div>
                <button
                  onClick={toggleNotifications}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    enabled ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      enabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Time picker */}
              {enabled && (
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <label className="text-sm text-gray-600">Remind me at:</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => updateTime(e.target.value)}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              {permission === 'denied' && (
                <p className="text-sm text-red-500">
                  Notifications are blocked. Please enable them in your browser settings.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Export settings trigger for use in other components
export function NotificationSettingsButton() {
  const [showSettings, setShowSettings] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(getStoredPref() && typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted');
  }, []);

  return (
    <>
      <button
        onClick={() => setShowSettings(true)}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition"
        title="Notification settings"
      >
        {enabled ? (
          <Bell className="w-4 h-4 text-indigo-600" />
        ) : (
          <BellOff className="w-4 h-4" />
        )}
      </button>
      {showSettings && (
        <NotificationSettingsModal onClose={() => setShowSettings(false)} />
      )}
    </>
  );
}

function NotificationSettingsModal({ onClose }: { onClose: () => void }) {
  const [enabled, setEnabled] = useState(getStoredPref());
  const [time, setTime] = useState(getStoredTime());
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const toggle = async () => {
    if (enabled) {
      setEnabled(false);
      localStorage.setItem(NOTIF_PREF_KEY, 'false');
    } else {
      if (permission !== 'granted') {
        const result = await Notification.requestPermission();
        setPermission(result);
        if (result !== 'granted') return;
      }
      setEnabled(true);
      localStorage.setItem(NOTIF_PREF_KEY, 'true');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Notification Settings</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {enabled ? <Bell className="w-5 h-5 text-indigo-600" /> : <BellOff className="w-5 h-5 text-gray-400" />}
              <span className="font-medium text-gray-700">Daily Reminders</span>
            </div>
            <button
              onClick={toggle}
              className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? 'bg-indigo-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${enabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
          {enabled && (
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <label className="text-sm text-gray-600">Remind at:</label>
              <input
                type="time"
                value={time}
                onChange={(e) => { setTime(e.target.value); localStorage.setItem(NOTIF_TIME_KEY, e.target.value); }}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}
          {permission === 'denied' && (
            <p className="text-sm text-red-500">
              Notifications are blocked. Enable them in browser settings.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
