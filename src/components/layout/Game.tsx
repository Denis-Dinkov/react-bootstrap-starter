import { useAccount, useReadContract } from 'wagmi';
import { abi as factoryAbi } from '../../contract/QuizFactory.json';

import QuizCard from './QuizCard';

const Game = () => {
  const account = useAccount();
  const quizzes = useReadContract({
    abi: factoryAbi,
    address: '0xFb8e84eb94EE4DEcc3E87052EA6d0C29f6000e4D',
    functionName: 'getQuizzes',
  });

  return (
    <div className="mt-10">
      <h2 className="heading-medium text-center ">
        {account.isConnected
          ? 'Select question and earn 💰'
          : 'Connect your wallet to start playing'}
      </h2>

      {account.isConnected && (
        <div className="row mt-5 mt-lg-10">
          {(quizzes.data as [])?.map(quiz => (
            <QuizCard key={quiz} contractId={quiz} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Game;
