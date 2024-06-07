import Welcome from './layout/Welcome';
import QuizzesList from './layout/QuizzesList';

const QuizGame = () => {
  return (
    <div className='container my-5 my-lg-10"'>
      <Welcome />
      <QuizzesList />
    </div>
  );
};

export default QuizGame;
