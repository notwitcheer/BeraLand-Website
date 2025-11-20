import React from 'react';
import { HaikuWidget } from '@haiku-trade/widget';
import './HaikuWidgetWrapper.css';

const HaikuWidgetWrapper = ({ onClose }) => {
  // Configuration du widget Haiku
  const widgetConfig = {
    theme: {
      mode: 'auto', // 'light', 'dark', ou 'auto'
    },
    // Vous pouvez ajouter d'autres options ici selon vos besoins
    // multiInput: true,
    // multiOutput: true,
    // preselectedInputs: {},
    // preselectedOutputs: {},
  };

  return (
    <div className="haiku-widget-overlay">
      <div className="haiku-widget-container">
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
        <HaikuWidget
          widgetKey={import.meta.env.VITE_HAIKU_WIDGET_KEY || "YOUR_WIDGET_KEY"}
          config={widgetConfig}
        />
      </div>
    </div>
  );
};

export default HaikuWidgetWrapper;
