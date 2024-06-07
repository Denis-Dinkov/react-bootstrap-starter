import { Address, formatEther } from 'viem';
import { abi } from '../../contract/QuizGame.json';
import { useReadContract } from 'wagmi';

import AnswerQuiz from './AnswerQuiz';
import FundContract from './FundContract';

const QuizCard = ({ contractId }: { contractId: Address }) => {
  const question = useReadContract({
    abi: abi,
    address: contractId,
    functionName: 'question',
  });

  const balance = useReadContract({
    abi: abi,
    address: contractId,
    functionName: 'getBalance',
  });

  return (
    <div className="col-lg-4 mt-4 ">
      <div className="rounded p-5 p-lg-6 bg-primary d-s-flex align-items-center h-100">
        <div className="mt-4 mt-lg-0">
          <h2 className="heading-small text-white">{String(question.data)}</h2>
        </div>
        <div>
          <div className="form-group mt-3">
            <AnswerQuiz contractId={contractId} balance={balance.data as bigint} />
            <FundContract contractId={contractId} />
            <h4 className=" mt-5 text-center">
              Bounty: {balance.data ? formatEther(balance.data as bigint) : 0} eth.
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
