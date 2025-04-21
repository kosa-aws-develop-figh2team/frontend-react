import React from "react";
import PolicyHeader from "./PolicyHeader";
import "../styles/PolicyCompare.css";

const FIELDS = [
  { key: "name", label: "정책명" },
  { key: "target", label: "지원대상" },
  { key: "content", label: "지원내용" },
  { key: "period", label: "신청기간" },
];

function PolicyCompare({ policies, onClose }) {
  const [left, right] = policies;

  if (!left && !right) return null;

  return (
    <div className="policy-compare-container">
      <PolicyHeader onClose={onClose} />

      <table className="compare-table">
        <thead>
          <tr>
            <th>정책 1</th>
            <th>항목</th>
            <th>정책 2</th>
          </tr>
        </thead>
        <tbody>
          {FIELDS.map((field) => (
            <tr key={field.key}>
              <td>{left ? left[field.key] : "-"}</td>
              <td className="field-label">{field.label}</td>
              <td>{right ? right[field.key] : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PolicyCompare;
