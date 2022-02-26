import React, { useEffect, useState } from 'react';
import PieGraph from './PieGraph';

const Graph = ({ data, graphList }) => {
  const [graph, setGraph] = useState([]);
  const [twoConGraph, setTwoConGraph] = useState([]);

  const handleOneCondition = (name, value) => {
    const returnList = [];
    value.map((item) => {
      const sumCount = data.reduce((acc, cur) => {
        if (cur[name] === item) return acc + cur.count;
        return acc;
      }, 0);
      returnList.push({ item, count: sumCount });
    });

    return returnList;
  };

  const handleTwoCondition = (firstName, secondName) => {
    const conditionsList = [];
    const conditions = graphList
      .filter((item) => {
        const key = Object.keys(item);
        return key.includes(firstName) || key.includes(secondName);
      })
      .map((el) => Object.values(el)[0]);

    conditions[0]?.forEach((first) => {
      conditions[1].forEach((second) => {
        const counts = data.reduce((acc, cur) => {
          if (cur[firstName] === second && cur[secondName] === first) return acc + cur.count;
          return acc;
        }, 0);

        conditionsList.push({ item: first + '+' + second, count: counts });
      });
    });

    return conditionsList;
  };

  // 한가지
  useEffect(() => {
    graphList.map((list) => {
      const key = Object.keys(list)[0];
      const value = Object.values(list)[0];

      if (key === 'race') {
        const raceList = handleOneCondition('race', value);
        setGraph((prev) => [
          ...prev,
          {
            '인종별 환자 수': raceList,
          },
        ]);
      }

      if (key === 'ethnicity') {
        const ethnicityList = handleOneCondition('ethnicity', value);
        setGraph((prev) => [
          ...prev,
          {
            '민족별 환자 수': ethnicityList,
          },
        ]);
      }
      if (key === 'gender') {
        const genderList = handleOneCondition('gender', value);
        setGraph((prev) => [
          ...prev,
          {
            '성별 환자 수': genderList,
          },
        ]);
      }
    });
  }, [graphList]);

  // 두가지 조합
  useEffect(() => {
    const genderEthnicityList = handleTwoCondition('gender', 'ethnicity');
    const genderRaceList = handleTwoCondition('gender', 'race');
    setTwoConGraph((prev) => [
      ...prev,
      {
        '(성별 + 민족)별 환자 수': genderEthnicityList,
      },
      {
        '(성별 + 인종)별 환자 수': genderRaceList,
      },
    ]);
  }, [graphList]);

  // 새로고침시 초기화
  useEffect(() => {
    setGraph([]);
    setTwoConGraph([]);
  }, []);

  return (
    <>
      {graph.map((el, index) => {
        const title = Object.keys(el)[0];
        return <PieGraph key={title + index} data={el[title]} title={title} />;
      })}
      {twoConGraph.map((el, index) => {
        const title = Object.keys(el)[0];
        return <PieGraph key={title + index} data={el[title]} title={title} />;
      })}
    </>
  );
};

export default Graph;
