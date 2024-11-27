import React from 'react';

const FlashMsg = ({ messages }) => {
  if (!messages) return null;

  return (
    <div className="messages">
      <ul className="messages">
        {Object.keys(messages).map((key) =>
          messages[key].map((message, index) => (
            <li key={`${key}-${index}`} className={key}>
              {message}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FlashMsg;
