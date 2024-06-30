type CalculatorProps = {
  pID: string;
};

const Calculator: React.FC<CalculatorProps> = ({ pID }) => {

  return (
    <div>
      <p>Playlist ID: {pID}</p>
    </div>
  );
};

export default Calculator;
