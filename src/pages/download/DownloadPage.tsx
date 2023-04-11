import TemplatePage from '../../components/TemplatePage';
import React from 'react';
import downloadMarkdown from './download.md';

const DownloadPage = () => {
  return (
    <TemplatePage title="Download" markdownFiles={[downloadMarkdown]}/>
  );
}

export default DownloadPage;