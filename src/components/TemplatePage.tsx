import React, { useState, useEffect } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Line from './Line';

interface PageProps {
  title?: string;
  markdownFiles?: Array<string>;
}

const TemplatePage = ({ title, markdownFiles = [] }: PageProps) => {
    const [fetchedMarkdowns, setFetchedMarkdowns] = useState<any>([]);
    const [displayedMarkdown, setDisplayedMarkdown] = useState<any>();
  
    useEffect(() => {
      markdownFiles.forEach((markdown, index) => {
        fetch(markdown)
        .then((response) => response.text())
        .then((text) => {
            if (text !== fetchedMarkdowns[index]){
                setFetchedMarkdowns(prevFetchedMarkdowns => [
                    ...prevFetchedMarkdowns.slice(0, index),
                    text,
                    ...prevFetchedMarkdowns.slice(index)
                ]);
            }
        });
      });
    }, [markdownFiles, fetchedMarkdowns]);

    useEffect(() => {
        console.log(fetchedMarkdowns);
        const newDisplayedMarkdown = fetchedMarkdowns.map((markdown, index) => (
            <ReactMarkdown key={index} className='markdown px-10 md:px-12'>
                {markdown}
            </ReactMarkdown>
        ))
        setDisplayedMarkdown(newDisplayedMarkdown);
    }, [fetchedMarkdowns]);
  
    return (
      <div
        className='
          py-10 md:py-14 lg:py-18 px-16 md:px-28 lg:px-40
          space-y-4 md:space-y-6 lg:space-y-8
        '
      >
        <div className='px-10 md:px-12'>
          <h1 className='text-center text-4xl font-extrabold text-green-dark'>
            {title}
          </h1>
        </div>
        <Line />
        {displayedMarkdown}
      </div>
    );
  }
  
  export default TemplatePage;