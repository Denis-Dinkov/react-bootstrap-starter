import { useState } from 'react';
import { Address } from 'viem';
import { abi } from '../../contract/QuizGame.json';
import { useReadContract, useWriteContract } from 'wagmi';
import Button from '../ui/Button';

const QuizCard = ({ contractId }: { contractId: Address }) => {
  const [answer, setAnswer] = useState('');
  const { writeContract } = useWriteContract();

  const question = useReadContract({
    abi: abi,
    address: contractId,
    functionName: 'question',
  });

  const handleAnswer = () => {
    writeContract({
      abi: abi,
      address: contractId,
      functionName: 'guess',
      args: [answer],
    });
  };

  return (
    <div className="col-lg-4 mt-4">
      <div className="rounded p-5 p-lg-6 bg-primary d-lg-flex align-items-center">
        <div className="mt-4 mt-lg-0">
          <h2 className="heading-small text-white">{question.data}</h2>
        </div>
        <div>
          <div className="form-group mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Your answer"
              onChange={e => {
                setAnswer(e.target.value);
              }}
            />

            <Button type="secondary" className="mt-3 mx-3" onClick={handleAnswer}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
