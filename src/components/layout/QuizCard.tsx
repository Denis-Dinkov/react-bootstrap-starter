import { Address, formatEther } from 'viem';
import { ContractContext } from '../../context/ContractContext';
import { useContext, useEffect, useState } from 'react';

import AnswerQuiz from './AnswerQuiz';
import FundContract from './FundContract';

const QuizCard = ({ quizId }: { quizId: Address }) => {
  const [question, setQuestion] = useState();
  const [bounty, setBounty] = useState();
  const { getQuiz } = useContext(ContractContext);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const { question, bounty } = await getQuiz(quizId);
        setBounty(bounty);
        setQuestion(question);
      } catch (err) {
        console.log('Problem getting quiz:', err);
      }
    };

    loadQuiz();
  }, [quizId, getQuiz]);

  return (
    <div className="col-lg-4 mt-4 ">
      <div className="rounded p-5 p-lg-6 bg-primary d-s-flex align-items-center h-100">
        <div className="mt-4 mt-lg-0">
          <h2 className="heading-small text-white">{String(question)}</h2>
        </div>
        <div>
          <div className="form-group mt-3">
            <AnswerQuiz contractId={quizId} balance={bounty} />
            <FundContract contractId={quizId} />
            <h4 className=" mt-5 text-center">
              Bounty: {bounty ? formatEther(bounty as bigint) : 0} eth.
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
