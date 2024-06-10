import { createContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import { abi as factoryAbi } from '../contract/QuizFactory.json';
import { abi as quizAbi } from '../contract/QuizGame.json';
import { Address } from 'viem';

const FACTOR_CONTRACT_ADDRESS = import.meta.env.VITE_QUIZ_FACTOR_CONTRACT_ADDRESS;

type contractContextType = {
  quizList: Address[];
  isFetchingQuizzes: boolean;
  isCreatingQuiz: boolean;
  createQuiz: (question: string, answer: string, bounty: string) => Promise<void>;
  fundQuiz: (quizId: Address, bounty: string) => Promise<void>;
  getQuiz: (quizId: Address) => Promise<void>;
  answerQuiz: (quizId: Address, answer: string) => Promise<void>;
};

export const ContractContext = createContext({} as contractContextType);

export const ContractProvider = ({ children }: { children: ReactNode }) => {
  const [quizList, setQuizList] = useState([]);
  const [isFetchingQuizzes, setIsFetchingQuizzes] = useState(false);
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);

  const provider = new ethers.BrowserProvider(window.ethereum);

  const getContract = async (address: Address, abi: ethers.InterfaceAbi) => {
    const signer = await provider.getSigner();
    return new ethers.Contract(address, abi, signer);
  };

  const getQuizList = async () => {
    try {
      setIsFetchingQuizzes(true);
      const factoryContract = await getContract(FACTOR_CONTRACT_ADDRESS, factoryAbi);
      const quizzes = await factoryContract.getQuizzes();
      setQuizList(quizzes);
    } catch (error) {
      console.error('Error fetching quizzes', error);
    } finally {
      setIsFetchingQuizzes(false);
    }
  };

  const createQuiz = async (question: string, answer: string, bounty: string) => {
    try {
      setIsCreatingQuiz(true);
      const factoryContract = await getContract(FACTOR_CONTRACT_ADDRESS, factoryAbi);
      const tx = await factoryContract.createQuiz(question, answer, {
        value: ethers.parseEther(bounty),
      });

      await tx.wait();
      getQuizList();
    } catch (error) {
      console.error('Error creating quiz', error);
    } finally {
      setIsCreatingQuiz(false);
    }
  };

  const fundQuiz = async (quizId: Address, bounty: string) => {
    try {
      const signer = await provider.getSigner();
      const transaction = {
        to: quizId,
        value: ethers.parseEther(bounty),
      };

      const tx = await signer.sendTransaction(transaction);
      await tx.wait();
      getQuizList();
    } catch (error) {
      console.error('Error funding quiz', error);
    }
  };

  const getQuiz = async (quizId: Address) => {
    try {
      const signer = await provider.getSigner();
      const quizContract = new ethers.Contract(quizId, quizAbi, signer);
      const question = await quizContract.question();
      const bounty = await quizContract.getBalance();

      return { question, bounty };
    } catch (error) {
      console.error('Error fetching quiz', error);
      throw error;
    }
  };

  const answerQuiz = async (quizId: Address, answer: string) => {
    try {
      const quizContract = await getContract(quizId, quizAbi);
      const tx = await quizContract.guess(answer);
      await tx.wait();
      alert('Successfully collected bounty');
      getQuizList();
    } catch (error) {
      if (error.message.includes('Incorrect answer')) {
        alert('Incorrect answer');
      } else {
        console.error('Error answering quiz', error);
      }
    }
  };

  useEffect(() => {
    getQuizList();
  }, []);

  return (
    <ContractContext.Provider
      value={{
        quizList,
        isFetchingQuizzes,
        isCreatingQuiz,
        createQuiz,
        fundQuiz,
        getQuiz,
        answerQuiz,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export default ContractProvider;
