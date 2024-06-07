import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { abi } from '../../contract/QuizFactory.json';
import { ethers } from 'ethers';

const FACTOR_CONTRACT_ADDRESS = import.meta.env.VITE_QUIZ_FACTOR_CONTRACT_ADDRESS;

const AddQuiz = () => {
  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isLoading } = useWaitForTransactionReceipt({
    hash,
  });
  const salt = '0x123';

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setModalOpen(false);
      setQuestion('');
      setAnswer('');
    }
  }, [isLoading]);

  const handleCreateQuiz = () => {
    const hashedAnswerVariable = ethers.solidityPackedKeccak256(
      ['string', 'string'],
      [answer, salt],
    );

    writeContract({
      abi,
      address: FACTOR_CONTRACT_ADDRESS,
      functionName: 'createQuiz',
      args: [String(question), String(hashedAnswerVariable)],
    });
  };

  return (
    <>
      <Button size="large" type="primary" className="mt-5" onClick={() => setModalOpen(true)}>
        Create Quiz
      </Button>
      <Modal show={modalOpen} closeModal={() => setModalOpen(false)}>
        <div className="modal-header">
          <h5 className="modal-title text-main text-bold" id="exampleModalLabel">
            Create Quiz
          </h5>
          <button
            onClick={() => setModalOpen(false)}
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="question" className="form-label">
              Question
            </label>
            <input
              type="text"
              className="form-control"
              id="question"
              placeholder="Enter the question"
              value={question}
              onChange={e => {
                setQuestion(e.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="answer" className="form-label">
              Answer
            </label>
            <input
              type="text"
              className="form-control"
              id="answer"
              placeholder="Enter the answer"
              value={answer}
              onChange={e => {
                setAnswer(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="modal-footer">
          <div className="d-flex justify-content-end">
            <Button type="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="ms-3"
              type="primary"
              loading={isPending || isLoading}
              disabled={!question || !answer}
              onClick={() => handleCreateQuiz()}
            >
              Create Quiz
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddQuiz;
