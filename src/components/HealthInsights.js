import React from 'react';
import './HealthInsights.css';

const HealthInsights = ({ insights }) => {
  const formatInsights = (text) => {
    // Convert headings
    text = text.replace(/## (.+)/g, '<h3>$1</h3>');

    // Convert bold text
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Convert list items (assuming list items are preceded by "* ")
    text = text.replace(/(\n\* .+)/g, (match) => {
      return match.replace(/^\* /gm, '<li>').replace(/\n/g, '</li>\n');
    });

    // Convert paragraphs (split by double newlines)
    text = text.split(/\n{2,}/).map(p => `<p>${p}</p>`).join('\n');

    return text;
  };

  return (
    <div className="health-insights">
      <h2>Health Insights</h2>
      <div dangerouslySetInnerHTML={{ __html: formatInsights(insights) }} />
    </div>
  );
};

export default HealthInsights;
