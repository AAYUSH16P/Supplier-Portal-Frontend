import { FORM_TOOLTIPS } from "../utils/formTooltips.js";
import "../style/component/InfoTooltip.css";

export default function InfoTooltip({ field }) {
  const content = FORM_TOOLTIPS[field];

  if (!content) return null;

  return (
    <span className="info-tooltip-wrapper">
      <span className="info-icon">?</span>
      <span className="info-tooltip">{content}</span>
    </span>
  );
}