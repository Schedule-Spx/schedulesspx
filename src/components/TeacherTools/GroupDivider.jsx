import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const GroupDivider = () => {
  const { currentTheme } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [groupSize, setGroupSize] = useState(2);
  const [groups, setGroups] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleGroupSizeChange = (e) => {
    setGroupSize(Number(e.target.value));
  };

  const divideIntoGroups = () => {
    const names = inputValue.split('\n').filter(name => name.trim() !== '');
    const newGroups = [];
    for (let i = 0; i < names.length; i += groupSize) {
      newGroups.push(names.slice(i, i + groupSize));
    }
    setGroups(newGroups);
  };

  return (
    <div className={`${currentTheme.main} ${currentTheme.text} p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold mb-4">Group Divider</h2>
      <textarea
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter names (one per line)"
        className={`${currentTheme.input} rounded px-2 py-1 mb-4 w-full`}
        style={{ resize: 'none', color: 'black' }}
      />
      <div className="mb-4">
        <label htmlFor="groupSize" className="block mb-2">People per group: {groupSize}</label>
        <input
          type="range"
          id="groupSize"
          min="1"
          max="10"
          value={groupSize}
          onChange={handleGroupSizeChange}
          className="w-full"
        />
      </div>
      <button
        onClick={divideIntoGroups}
        className={`${currentTheme.accent} ${currentTheme.text} px-4 py-2 rounded hover:opacity-80 transition-opacity duration-200`}
      >
        Divide into Groups
      </button>
      <div className="mt-4">
        {groups.map((group, index) => (
          <div key={index} className="mb-2">
            <strong>Group {index + 1}:</strong> {group.join(', ')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupDivider;
