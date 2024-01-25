import React, { useEffect, useState } from 'react';
import './App.css';
import ContentRenderer from './ContentRenderer';
import partsOfContent, { PartOfContent } from './partsOfContent';

function App() {
  const [partsOfContents, setpartsOfContents] = useState<PartOfContent[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await partsOfContent('Очень, провильное преложение.\n\rВторая стрчка!');
      setpartsOfContents(result);   
    }
    fetchData();
  }, []);

  return (
    <div className="App">      
      <ContentRenderer data={partsOfContents}/>
    </div>
  );
}

export default App;
