import React, { useEffect, useState } from 'react';
import PieGraph from './PieGraph';

const Graph = ({ data, graphList }) => {
  const [graph, setGraph] = useState([]);

  // 한가지
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

  // 두가지 조합
  useEffect(() => {
    const genderEthnicity = graphList
      .filter((a) => {
        const key = Object.keys(a);
        return key.includes('gender') || key.includes('ethnicity');
      })
      .map((el) => Object.values(el)[0]);

    const genderRace = graphList
      .filter((a) => {
        const key = Object.keys(a);
        return key.includes('gender') || key.includes('race');
      })
      .map((el) => Object.values(el)[0]);

    const genderEthnicityList = [];
    genderEthnicity[0]?.forEach((eth) => {
      genderEthnicity[1].forEach((gen) => {
        const counts = data.reduce((acc, cur) => {
          if (cur.gender === gen && cur.ethnicity === eth) return acc + cur.count;
          return acc;
        }, 0);

        genderEthnicityList.push({ item: eth + '+' + gen, count: counts });
      });
    });
    setGraph((prev) => [
      ...prev,
      {
        '(성별 + 민족)별 환자 수': genderEthnicityList,
      },
    ]);

    const genderRaceList = [];
    genderRace[0]?.forEach((race) => {
      genderRace[1].forEach((gen) => {
        const counts = data.reduce((acc, cur) => {
          if (cur.gender === gen && cur.race === race) return acc + cur.count;
          return acc;
        }, 0);

        genderRaceList.push({ item: race + '+' + gen, count: counts });
      });
    });

    setGraph((prev) => [
      ...prev,
      {
        '(성별 + 인종)별 환자 수': genderRaceList,
      },
    ]);
  }, [graphList]);

  // 새로고침시 초기화
  useEffect(() => {
    setGraph([]);
  }, []);

  return graph.map((el) => {
    const title = Object.keys(el)[0];
    return <PieGraph key={title} data={el[title]} title={title} />;
  });
};

export default Graph;
