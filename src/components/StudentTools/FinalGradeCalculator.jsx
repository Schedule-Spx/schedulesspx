import React, { useState } from 'react';

const FinalGradeCalculator = () => {
  const [currentGrade, setCurrentGrade] = useState('');
  const [desiredGrade, setDesiredGrade] = useState('');
  const [finalExamWeight, setFinalExamWeight] = useState('');
  const [requiredFinalExamGrade, setRequiredFinalExamGrade] = useState(null);

  const calculateFinalGrade = () => {
    const current = parseFloat(currentGrade);
    const desired = parseFloat(desiredGrade);
    const weight = parseFloat(finalExamWeight) / 100;

    if (isNaN(current) || isNaN(desired) || isNaN(weight)) {
      alert('Please enter valid numbers');
      return;
    }

    const requiredGrade = (desired - (1 - weight) * current) / weight;
    setRequiredFinalExamGrade(requiredGrade.toFixed(2));
  };

  return (
    <div className="final-grade-calculator">
      <h2 className="text-2xl font-bold mb-4">Final Grade Calculator</h2>
      <div className="mb-4">
        <label className="block mb-2">Current Grade (%)</label>
        <input
          type="number"
          value={currentGrade}
          onChange={(e) => setCurrentGrade(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Desired Grade (%)</label>
        <input
          type="number"
          value={desiredGrade}
          onChange={(e) => setDesiredGrade(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Final Exam Weight (%)</label>
        <input
          type="number"
          value={finalExamWeight}
          onChange={(e) => setFinalExamWeight(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={calculateFinalGrade}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Calculate
      </button>
      {requiredFinalExamGrade !== null && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Required Final Exam Grade: {requiredFinalExamGrade}%</h3>
        </div>
      )}
    </div>
  );
};

export default FinalGradeCalculator;
