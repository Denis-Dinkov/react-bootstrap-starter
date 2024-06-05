import Button from '../ui/Button';
import { useAccount, useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import AddQuiz from './AddQuiz';

const Welcome = () => {
  // const account = useAccount();
  const account = useAccount();
  const { connect, status } = useConnect();

  return (
    <>
      <h1 className="heading-large text-bold text-center text-lg-start mt-5 mt-lg-10">
        Web3 Questions App | Play to earn Eth.
      </h1>

      <p className="text-lead text-center text-lg-start mt-4 mt-lg-8">
        Connect your wallet and start playing to earn Eth. The more questions you answer, the more
        Eth you earn.
      </p>

      <div className="d-grid d-lg-block">
        {account.isConnected ? (
          <>
            <AddQuiz />
            <Button size="large" type="primary" className="mt-5 mx-3">
              You are connected. 🚀
            </Button>
          </>
        ) : (
          <Button
            size="large"
            type="primary"
            className="mt-5"
            loading={status === 'pending'}
            onClick={() => connect({ connector: injected() })}
          >
            Connect Wallet
          </Button>
        )}
      </div>
    </>
  );
};

export default Welcome;
