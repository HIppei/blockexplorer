import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [block, setBlock] = useState();
  const [transaction, setTransaction] = useState();

  const onCurrentBlockNumClick = async () => {
    setBlock(await alchemy.core.getBlock(blockNumber));
  };

  const onTransactionSelect = async (value) => {
    setTransaction(await alchemy.core.getTransactionReceipt(value));
  };

  useEffect(() => {
    async function setBlockNum() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    setBlockNum();
  });

  return (
    <>
      <div className="current-block-number-container">
        <div>Current Block Number :</div>
        <div onClick={onCurrentBlockNumClick} className="link-text">
          {blockNumber}
        </div>
      </div>
      <div>Select block : </div>
      <div></div>
      <br />
      <div>Block</div>
      {block &&
        Object.keys(block).map((key) => (
          <div>
            {key !== 'transactions' ? (
              `${key} : ${block[key]}`
            ) : (
              <>
                <div key={key}>{key} : </div>
                <select onChange={(ev) => onTransactionSelect(ev.target.value)}>
                  <option key={0} value={0}>
                    Select here!
                  </option>
                  {block[key].map((tr) => (
                    <option key={tr} value={tr}>
                      {tr.toString()}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
        ))}
      <br />
      <div>Transaction Receipt</div>
      <div>
        {transaction &&
          Object.keys(transaction).map((key) => (
            <div>
              {key} : {JSON.stringify(transaction[key])}
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
