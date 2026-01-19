import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import './WalletConnect.css';

const walletLogos = {
  'MetaMask': 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg',
  'Rabby Wallet': 'https://rabby.io/assets/images/logo-128.png',
  'Coinbase Wallet': 'https://avatars.githubusercontent.com/u/18060234?s=200&v=4',
};

const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [showModal, setShowModal] = useState(false);

  const handleConnect = (connector) => {
    connect({ connector });
    setShowModal(false);
  };

  const getWalletLogo = (connectorName) => {
    for (const [name, logo] of Object.entries(walletLogos)) {
      if (connectorName.toLowerCase().includes(name.toLowerCase())) {
        return logo;
      }
    }
    return null;
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
        <div
          className="wallet-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="wallet-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="wallet-modal-header">
              <h3>Connect Wallet</h3>
              <button onClick={() => setShowModal(false)} className="modal-close">
                ✕
              </button>
            </div>
            <div className="wallet-modal-content">
              {connectors.map((connector) => {
                const logo = getWalletLogo(connector.name);
                return (
                  <button
                    key={connector.uid}
                    onClick={() => handleConnect(connector)}
                    className="wallet-option"
                  >
                    {logo && (
                      <img
                        src={logo}
                        alt={connector.name}
                        className="wallet-logo"
                        loading="lazy"
                      />
                    )}
                    <span>{connector.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletConnect;
