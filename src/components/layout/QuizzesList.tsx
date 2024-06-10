import { useAccount } from 'wagmi';
import { useContext } from 'react';
import { ContractContext } from '../../context/ContractContext';
import QuizCard from './QuizCard';

const QuizzesList = () => {
  const { quizList, isFetchingQuizzes } = useContext(ContractContext);
  const account = useAccount();

  return (
    <div className="mt-10">
      <h2 className="heading-medium text-center ">
        {account.isConnected
          ? 'Select question and earn 💰'
          : 'Connect your wallet to start playing'}
      </h2>

      {/* list all quizzes */}
      {account.isConnected && (
        <div className="row mt-5 mt-lg-10">
          {isFetchingQuizzes && <p>Loading quizzes...</p>}
          {!isFetchingQuizzes && quizList.length === 0 && <p>No quizzes available</p>}
          {quizList.map(quiz => (
            <QuizCard key={quiz} quizId={quiz} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizzesList;
