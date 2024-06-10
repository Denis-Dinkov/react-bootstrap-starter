import Button from '../ui/Button';
import { useContext, useState } from 'react';
import { Address } from 'viem';
import { ContractContext } from '../../context/ContractContext';

const FundContract = ({ contractId }: { contractId: Address }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { fundQuiz } = useContext(ContractContext);

  const handleFund = async () => {
    try {
      setIsLoading(true);
      await fundQuiz(contractId, '0.001');
    } catch (error) {
      console.error('Error funding quiz', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button type="secondary" className="mt-3 mx-auto" onClick={handleFund} loading={isLoading}>
      Fund 0.001 eth
    </Button>
  );
};

export default FundContract;
