import React, { useEffect, useState } from 'react';
import PieGraph from './PieGraph';

const Graph = ({ data, graphList }) => {
  const [graph, setGraph] = useState([]);
  // const test = [
  //   {
  //     '성별 환자 수': [
  //       { item: 'Female', count: 500 },
  //       { item: 'Male', count: 400 },
  //     ],
  //   },

  //   {
  //     '인종별 환자 수': [
  //       { item: 'native', count: 598 },
  //       { item: 'asian', count: 598 },
  //       { item: 'white', count: 598 },
  //       { item: 'black', count: 598 },
  //       { item: 'other', count: 598 },
  //     ],
  //   },
  //   {
  //     '민족별 환자 수': [
  //       { item: 'nonhispanic', count: 598 },
  //       { item: 'hispanic', count: 598 },
  //     ],
  //   },
  //   {
  //     '(성별 + 인종)별 환자 수': [
  //       { item: 'nonhispanic + F', count: 598 },
  //       { item: 'nonhispanic + M', count: 598 },
  //       { item: 'hispanic + F', count: 598 },
  //       { item: 'hispanic + M', count: 598 },
  //     ],
  //   },

  //   {
  //     '(성별 + 민족)별 환자 수': [
  //       { item: 'nonhispanic+F', count: 598 },
  //       { item: 'native+F', count: 598 },
  //       { item: 'asian+F', count: 598 },
  //       { item: 'white+F', count: 598 },
  //       { item: 'black+F', count: 598 },
  //       { item: 'other+F', count: 598 },
  //       { item: 'native+M', count: 598 },
  //       { item: 'asian+M', count: 598 },
  //       { item: 'white+M', count: 598 },
  //       { item: 'black+M', count: 598 },
  //       { item: 'other+M', count: 598 },
  //     ],
  //   },
  // ];

  useEffect(() => {
    graphList.map((list) => {
      const key = Object.keys(list)[0];
      const value = Object.values(list)[0];

      if (key === 'race') {
        const raceList = [];
        value.map((item) => {
          const raceCount = data.reduce((acc, cur) => {
            if (cur.race === item) return acc + cur.count;
            return acc;
          }, 0);
          raceList.push({ item, count: raceCount });
        });
        setGraph((prev) => [
          ...prev,
          {
            '인종별 환자 수': raceList,
          },
        ]);
      }
      if (key === 'ethnicity') {
        const ethnicityList = [];
        value.map((item) => {
          const ethnicityCount = data.reduce((acc, cur) => {
            if (cur.ethnicity === item) return acc + cur.count;
            return acc;
          }, 0);
          ethnicityList.push({ item, count: ethnicityCount });
        });

        setGraph((prev) => [
          ...prev,
          {
            '민족별 환자 수': ethnicityList,
          },
        ]);
      }
      if (key === 'gender') {
        const genderList = [];
        value.map((item) => {
          const genderCount = data.reduce((acc, cur) => {
            if (cur.gender === item) return acc + cur.count;
            return acc;
          }, 0);
          genderList.push({ item, count: genderCount });
        });

        setGraph((prev) => [
          ...prev,
          {
            '성별 환자 수': genderList,
          },
        ]);
      }
    });
  }, [data, graphList]);

  console.log(graph);

  useEffect(() => {
    setGraph([]);
  }, []);

  return graph.map((el) => {
    const title = Object.keys(el)[0];
    return <PieGraph key={title} data={el[title]} title={title} />;
  });
};

export default Graph;
