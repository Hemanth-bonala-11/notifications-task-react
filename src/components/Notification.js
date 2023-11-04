import React, { useState, useEffect } from 'react';

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    
    const socket = new WebSocket('ws://127.0.0.1:8000/ws/notification/');

    
    socket.addEventListener('message', (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    });

    
    
  }, []);

  return (
    <div>
      
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            {notification}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;
