import { useState, useContext } from 'react';
import { ContractContext } from '../../context/ContractContext';
import { Address } from 'viem';
import Button from '../ui/Button';

const AnswerQuiz = ({ contractId, balance }: { contractId: Address; balance: string }) => {
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { answerQuiz } = useContext(ContractContext);

  const handleAnswer = async () => {
    try {
      setIsLoading(true);
      await answerQuiz(contractId, answer);
    } catch (error) {
      console.error('Error answering quiz', error);
    } finally {
      setIsLoading(false);
    }
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
        disabled={!answer || !balance}
        loading={isLoading}
      >
        {balance ? 'Answer' : 'No bounty left'}
      </Button>
    </>
  );
};

export default AnswerQuiz;
