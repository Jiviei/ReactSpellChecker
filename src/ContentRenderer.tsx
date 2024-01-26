import React, { useEffect, useState } from 'react';
import {PartOfContent} from './partsOfContent';
import Tooltip from './Tooltip';
import './ContentRenderer.css'



const ContentRenderer = ({ data }: { data: PartOfContent[] }) => {
	const [partsOfContent, setpartsOfContent] = useState<PartOfContent[]>([]);
	useEffect(() => {
		setpartsOfContent(data);
	  }, [data]);
    return (
		<pre className='content_container'>
			{partsOfContent.map((content, index) => (
				<span key={index}>
					{content.advices ? (
						<Tooltip
							children={<span className='misspelled_word'>{content.content}</span>}
							content={
							<div  className='advices'>
								{content.advices.map((advice) => 
									<div key={advice} className='advice'
									onClick={() => {
										content.content = advice;
										delete content.advices;
										setpartsOfContent([...partsOfContent]);
										}}
									>
										{advice}
									</div>)
								}									
							</div> 
							}
							hideInMobile={false}
							interactive={true}
						/>
					) : (
						content.content
					)}
				</span>
			))}
		</pre>
	);
 };
 
 export default ContentRenderer;