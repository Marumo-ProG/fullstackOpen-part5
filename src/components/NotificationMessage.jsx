const NotificationMessage = ({ notification }) => {
  return (
    <div
      style={{
        border: `2px solid ${notification.color}`,
        paddingLeft: "8px",
      }}
    >
      <h4 style={{ color: notification.color }}>{notification.message}</h4>
    </div>
  );
};

export default NotificationMessage;
