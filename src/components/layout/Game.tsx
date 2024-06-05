import { useAccount } from 'wagmi';

const Game = () => {
  const account = useAccount();
  return (
    <div className="mt-10">
      <h2 className="heading-medium text-center">
        {account.isConnected
          ? 'Select question and earn 💰'
          : 'Connect your wallet to start playing'}
      </h2>

      <div className="row mt-5 mt-lg-10">
        <div className="col-lg-5 offset-lg-1">
          <div className="rounded p-4 p-lg-6 bg-secondary d-lg-flex align-items-center">
            <div className="mt-4 mt-lg-0">
              <h2 className="heading-small text-white">Pioneers</h2>
              <p className="text-main text-light text-white mt-4">
                Since 2017, we've been helping both start-ups and established enterprises implement
                Web3 solutions and build on blockchain. We've worked on over 150 projects and
                partnered with notable Web3 players like Hedera Hashgraph and Polkadot.
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-5 mt-5 mt-lg-0">
          <div className="rounded p-4 p-lg-6 bg-primary d-lg-flex align-items-center">
            <div className="ms-lg-5 order-lg-1">
              <img
                src="https://cdn-dfnhb.nitrocdn.com/ncvMSDTJqBfzbhjurpWfVBRIBTRVNXNa/assets/images/optimized/rev-7a3495a/limechain.tech/wp-content/uploads/2022/04/Group-26.svg"
                alt=""
              />
            </div>

            <div className="mt-4 mt-lg-0">
              <h2 className="heading-small"> Deep expertise </h2>
              <p className="text-main text-light mt-4">
                We’re extremely well-versed in blockchain and Web3. With a team of over 100
                brilliant people, we can tackle a wide range of projects from developing smart
                contracts, through building NFT marketplaces, to developing purpose-built
                blockchains.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
