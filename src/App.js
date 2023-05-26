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
  const [latestBlockNumber, setLatestBlockNumber] = useState();
  const [block, setBlock] = useState();
  const [transaction, setTransaction] = useState();

  const onBlockSelect = async (blockNumber) => {
    setBlock(null);
    setTransaction(null);
    if (blockNumber) setBlock(await alchemy.core.getBlock(Number(blockNumber)));
  };

  const onTransactionSelect = async (tr) => {
    setTransaction(null);
    if (tr) setTransaction(await alchemy.core.getTransactionReceipt(tr));
  };

  useEffect(() => {
    async function setBlockNum() {
      setLatestBlockNumber(await alchemy.core.getBlockNumber());
    }

    setBlockNum();
  }, []);

  return (
    <>
      <div className="current-block-number-container">
        <div>Recent Block Numbers :</div>
        {/* <div onClick={onBlockSelect} className="link-text">
          {latestBlockNumber}
        </div> */}
        {latestBlockNumber && (
          <select onChange={(ev) => onBlockSelect(ev.target.value)}>
            <option value={''}>Select block</option>
            <option>{latestBlockNumber}</option>
            <option>{latestBlockNumber - 1}</option>
            <option>{latestBlockNumber - 2}</option>
            <option>{latestBlockNumber - 3}</option>
            <option>{latestBlockNumber - 4}</option>
            <option>{latestBlockNumber - 5}</option>
          </select>
        )}
      </div>
      <br />
      <div>Block</div>
      {block &&
        Object.keys(block).map((key) => (
          <div key={key}>
            {key !== 'transactions' ? (
              `${key} : ${block[key]}`
            ) : (
              <>
                <div>{key} : </div>
                <select onChange={(ev) => onTransactionSelect(ev.target.value)}>
                  <option value={''}>Select transaction</option>
                  {block[key].map((tr) => (
                    <option key={tr}>{tr.toString()}</option>
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
            <div key={key}>
              {key} : {JSON.stringify(transaction[key])}
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
