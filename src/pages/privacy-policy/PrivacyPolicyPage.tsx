import React, { useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import markdownFile from './flipo-privacy-policy.md';
import Line from '../../components/Line';

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
    <div
      className='
        py-10 md:py-14 lg:py-18 px-16 md:px-28 lg:px-40
        space-y-4 md:space-y-6 lg:space-y-8
      '
    >
      <div className='px-10 md:px-12'>
        <h1 className='text-center text-4xl font-extrabold text-green-dark'>
          flipo's Privacy Policy
        </h1>
      </div>
      <Line />
      <ReactMarkdown className='markdown px-10 md:px-12'>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

export default PrivacyPolicyPage;