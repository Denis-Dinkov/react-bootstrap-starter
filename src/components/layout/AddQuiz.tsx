import { useState, useContext } from 'react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { ethers } from 'ethers';
import { ContractContext } from '../../context/ContractContext';

const AddQuiz = () => {
  const { createQuiz, isCreatingQuiz } = useContext(ContractContext);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateQuiz = async () => {
    const salt = '0x123';
    const hashedAnswerVariable = ethers.solidityPackedKeccak256(
      ['string', 'string'],
      [answer, salt],
    );

    await createQuiz(question, hashedAnswerVariable, '0.000001');
    setModalOpen(false);
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
              loading={isCreatingQuiz}
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
