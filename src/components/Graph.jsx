import React from 'react';
import PieGraph from './PieGraph';

const Graph = ({ data, graphList }) => {
  console.log(data, graphList);

  const test = [
    {
      '성별 환자 수': [
        { item: 'Female', count: 500 },
        { item: 'Male', count: 400 },
      ],
    },

    {
      '인종별 환자 수': [
        { item: 'native', count: 598 },
        { item: 'asian', count: 598 },
        { item: 'white', count: 598 },
        { item: 'black', count: 598 },
        { item: 'other', count: 598 },
      ],
    },
    {
      '민족별 환자 수': [
        { item: 'nonhispanic', count: 598 },
        { item: 'hispanic', count: 598 },
      ],
    },
    {
      '(성별 + 인종)별 환자 수': [
        { item: 'nonhispanic + F', count: 598 },
        { item: 'nonhispanic + M', count: 598 },
        { item: 'hispanic + F', count: 598 },
        { item: 'hispanic + M', count: 598 },
      ],
    },

    {
      '(성별 + 민족)별 환자 수': [
        { item: 'nonhispanic+F', count: 598 },
        { item: 'native+F', count: 598 },
        { item: 'asian+F', count: 598 },
        { item: 'white+F', count: 598 },
        { item: 'black+F', count: 598 },
        { item: 'other+F', count: 598 },
        { item: 'native+M', count: 598 },
        { item: 'asian+M', count: 598 },
        { item: 'white+M', count: 598 },
        { item: 'black+M', count: 598 },
        { item: 'other+M', count: 598 },
      ],
    },
  ];

  return test.map((el) => {
    const title = Object.keys(el)[0];
    return <PieGraph data={el[title]} title={title} />;
  });
};

export default Graph;
