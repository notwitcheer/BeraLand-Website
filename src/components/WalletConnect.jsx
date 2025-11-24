import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import './WalletConnect.css';

const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [showModal, setShowModal] = useState(false);

  const handleConnect = (connector) => {
    connect({ connector });
    setShowModal(false);
  };

  if (isConnected) {
    return (
      <div className="wallet-connected">
        <span className="wallet-address">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
        <button onClick={() => disconnect()} className="disconnect-button">
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <>
      <button onClick={() => setShowModal(true)} className="connect-button">
        Connect Wallet
      </button>

      {showModal && (
        <div className="wallet-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="wallet-modal" onClick={(e) => e.stopPropagation()}>
            <div className="wallet-modal-header">
              <h3>Connect Wallet</h3>
              <button onClick={() => setShowModal(false)} className="modal-close">
                ✕
              </button>
            </div>
            <div className="wallet-modal-content">
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => handleConnect(connector)}
                  className="wallet-option"
                >
                  <span>{connector.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletConnect;
