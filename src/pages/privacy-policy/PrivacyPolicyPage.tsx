import React, { useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import markdownFile from './flipo-privacy-policy.md';

const PrivacyPolicyPage = () => {
  const [markdown, setMarkdown] = useState('Privacy and Policy');

  useEffect(() => {
    fetch(markdownFile)
    .then((response) => response.text())
    .then((text) => {
      setMarkdown(text);
    });
  }, []);

  return (
    <div className='p-10'>
      <ReactMarkdown className='markdown'>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

export default PrivacyPolicyPage;