import Button from '../ui/Button';
import { Address, parseEther } from 'viem';
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';

const FundContract = ({ contractId }: { contractId: Address }) => {
  const {
    data: transactionHash,
    sendTransaction,
    isPending: isPendingTransaction,
  } = useSendTransaction();

  const { isLoading: isConfirmingTransaction } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  const addEth = () => {
    sendTransaction({
      to: contractId,
      value: parseEther('0.001'),
    });
  };

  return (
    <Button
      type="secondary"
      className="mt-3 mx-auto"
      onClick={addEth}
      loading={isConfirmingTransaction || isPendingTransaction}
    >
      Add 0.001 eth
    </Button>
  );
};

export default FundContract;
