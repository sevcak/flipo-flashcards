import React from 'react';
import contributeMarkdown from './contribute.md';
import TemplatePage from '../../components/TemplatePage';

const ContributePage = () => {
    return (
        <TemplatePage title="Contribute" markdownFiles={[contributeMarkdown]}/>
    );
}

export default ContributePage;