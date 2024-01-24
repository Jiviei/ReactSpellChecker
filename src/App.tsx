import React, { useEffect, useState } from 'react';
import './App.css';
import ContentRenderer from './ContentRenderer';
import partsOfContent, { PartOfContent } from './partsOfContent';

function App() {
  const [partsOfContents, setpartsOfContents] = useState<PartOfContent[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await partsOfContent('Очень, провильное преложение.\nВторая стрчка!');

        setpartsOfContents(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }     
    };
    fetchData();
  }, []);

  return (
    <div className="App">      
      <ContentRenderer data={partsOfContents}/>
    </div>
  );
}

export default App;
