import React from "react";

function PolicySearch({ policies, selected, toggleSelect }) {
  return (
    <div>
      <h2>정책 목록</h2>
      <ul>
        {policies.map((policy) => (
          <li key={policy.id}>
            <label>
              <input
                type="checkbox"
                checked={selected.includes(policy.id)}
                onChange={() => toggleSelect(policy.id)}
              />
              {policy.name} ({policy.target})
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PolicySearch;
