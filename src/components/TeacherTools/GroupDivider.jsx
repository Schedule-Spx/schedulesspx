import React, { useState } from 'react';

const GroupDivider = () => {
  const [names, setNames] = useState('');
  const [groupSize, setGroupSize] = useState(1);
  const [groups, setGroups] = useState([]);

  const handleInputChange = (e) => {
    setNames(e.target.value);
  };

  const handleGroupSizeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setGroupSize(value);
  };

  const divideIntoGroups = () => {
    const nameArray = names.split('\n').filter(name => name.trim() !== '');
    const shuffledNames = nameArray.sort(() => Math.random() - 0.5);
    const newGroups = [];

    for (let i = 0; i < shuffledNames.length; i += groupSize) {
      newGroups.push(shuffledNames.slice(i, i + groupSize));
    }

    setGroups(newGroups);
  };

  return (
    <div className="flex">
      {/* Left side for names input */}
      <div className="w-1/2 p-4">
        <textarea
          value={names}
          onChange={handleInputChange}
          className="w-full h-64 p-2 border rounded text-black"
          placeholder="Enter names (one per line and select number of people after entering names)"
        />
        <div className="mt-2 flex items-center">
          <input
            type="range"
            min="1"
            max={Math.max(1, names.split('\n').filter(name => name.trim() !== '').length)}
            value={groupSize}
            onChange={handleGroupSizeChange}
            className="w-full"
          />
          <input
            type="number"
            min="1"
            max={Math.max(1, names.split('\n').filter(name => name.trim() !== '').length)}
            value={groupSize}
            onChange={handleGroupSizeChange}
            className="w-16 ml-2 p-1 border rounded text-center text-black"
          />
        </div>
        <button
          onClick={divideIntoGroups}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Divide into Groups
        </button>
      </div>

      {/* Right side for displaying groups */}
      <div className="w-1/2 p-4">
        {groups.length > 0 && groups.map((group, index) => (
          <div key={index} className="mb-4 p-2 border rounded">
            <h3 className="font-bold">Group {index + 1}</h3>
            <ul>
              {group.map((name, i) => (
                <li key={i}>{name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupDivider;
