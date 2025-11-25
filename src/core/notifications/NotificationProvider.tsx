'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from '@/core/i18n/routing';
import { requestNotificationPermission, onMessageListener } from '../firebase/firebase.config';
import { NotificationAlert } from './NotificationAlert';

interface NotificationContextType {
  token: string | null;
  permission: NotificationPermission;
  requestPermission: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationMessage {
  id: string;
  title: string;
  body: string;
  url?: string;
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Check initial permission state
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }

    // Register service worker
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }

    // Set up foreground message listener
    const setupMessageListener = async () => {
      const unsubscribe = await onMessageListener((payload) => {
        console.log('Foreground message received:', payload);
        
        const notification: NotificationMessage = {
          id: Date.now().toString(),
          title: payload.notification?.title || 'New Notification',
          body: payload.notification?.body || '',
          url: payload.data?.url || '/dashboard/notifications',
        };

        setNotifications((prev) => [...prev, notification]);

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
        }, 5000);
      });

      return unsubscribe;
    };

    setupMessageListener();
  }, []);

  const requestPermission = async () => {
    try {
      const fcmToken = await requestNotificationPermission();
      if (fcmToken) {
        setToken(fcmToken);
        setPermission('granted');
        
        // Here you would typically send the token to your backend
        console.log('FCM Token to send to backend:', fcmToken);
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  };

  const handleNotificationClick = (notification: NotificationMessage) => {
    // Remove the notification
    setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
    
    // Navigate to the URL
    if (notification.url) {
      router.push(notification.url);
    }
  };

  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        token,
        permission,
        requestPermission,
      }}
    >
      {children}
      
      {/* Render notification alerts */}
      <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
        {notifications.map((notification) => (
          <NotificationAlert
            key={notification.id}
            title={notification.title}
            body={notification.body}
            onClick={() => handleNotificationClick(notification)}
            onDismiss={() => handleDismiss(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
