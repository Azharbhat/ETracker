import React, { useState, useEffect } from 'react';

const DateTimeDisplay = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDateTime = () => {
    const options = {
      
      minute: 'numeric',
      second: 'numeric',
      day: 'numeric',
      weekday: 'long',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
    };

    return dateTime.toLocaleString('en-US', options);
  };

  return (
    <div>
      <p>{formattedDateTime()}</p>
    </div>
  );
};

export default DateTimeDisplay;
