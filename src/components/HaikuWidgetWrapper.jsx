import React from 'react';
import { HaikuWidget } from '@haiku-trade/widget';
import './HaikuWidgetWrapper.css';

const HaikuWidgetWrapper = ({ onClose }) => {
  const widgetConfig = {
    theme: {
      mode: 'auto',
    },
  };

  return (
    <div className="haiku-widget-overlay" onClick={onClose}>
      <div className="haiku-widget-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
        <HaikuWidget
          widgetKey={import.meta.env.VITE_HAIKU_WIDGET_KEY}
          config={widgetConfig}
        />
      </div>
    </div>
  );
};

export default HaikuWidgetWrapper;
