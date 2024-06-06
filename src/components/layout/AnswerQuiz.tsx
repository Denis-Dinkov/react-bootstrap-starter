import { useEffect, useState } from 'react';
import { abi } from '../../contract/QuizGame.json';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { Address } from 'viem';
import Button from '../ui/Button';

const AnswerQuiz = ({ contractId }: { contractId: Address }) => {
  const [answer, setAnswer] = useState('');
  const { data: contractHash, writeContract, failureReason, isPending } = useWriteContract();

  const { isLoading } = useWaitForTransactionReceipt({
    hash: contractHash,
  });

  useEffect(() => {
    if (failureReason?.name === 'ContractFunctionExecutionError') {
      alert('Wrong answer');
    }
  }, [failureReason]);

  const handleAnswer = () => {
    writeContract({
      abi: abi,
      address: contractId,
      functionName: 'guess',
      args: [answer],
    });

    setAnswer('');
  };

  return (
    <>
      <input
        type="text"
        className="form-control"
        placeholder="Your answer"
        value={answer}
        onChange={e => {
          setAnswer(e.target.value);
        }}
      />

      <Button
        type="secondary"
        className="mt-3 mx-2"
        onClick={() => handleAnswer()}
        disabled={!answer}
        loading={isLoading || isPending}
      >
        {isPending && failureReason?.name ? 'You win' : 'Answer'}
      </Button>
    </>
  );
};

export default AnswerQuiz;