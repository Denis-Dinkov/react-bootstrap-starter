import { useAccount, useReadContract } from 'wagmi';
import { abi as factoryAbi } from '../../contract/QuizFactory.json';

import QuizCard from './QuizCard';

const FACTOR_CONTRACT_ADDRESS = import.meta.env.VITE_QUIZ_FACTOR_CONTRACT_ADDRESS;

const QuizzesList = () => {
  const account = useAccount();
  const quizzes = useReadContract({
    abi: factoryAbi,
    address: FACTOR_CONTRACT_ADDRESS,
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

export default QuizzesList;
