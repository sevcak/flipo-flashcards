import React from 'react';
import flipoMarkdown from './flipo.md';
import featuresMarkdown from './features.md';
import TemplatePage from '../../components/TemplatePage';

const HomePage = () => {
    return (
        <TemplatePage title="flipo flashcards" markdownFiles={[flipoMarkdown, featuresMarkdown]}/>
    );
}

export default HomePage;