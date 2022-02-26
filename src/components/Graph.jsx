import React, { useEffect, useState } from 'react';
import PieGraph from './PieGraph';
import * as d3 from 'd3';

const Graph = ({ data, graphList }) => {
  // gender에 따라 total count , femail count, male count
  // race 에 따라 count
  // ethnicity에 따라 count
  // race+gender에
  // race + ethnicity에

  const [gender, setGender] = useState({});
  const [race, setRace] = useState({});
  const [ethnicity, setEthnicity] = useState({});

  // const test = [
  //   { count: 1, ethnicity: 'hispanic', gender: 'F', race: 'native' },
  //   { count: 22, ethnicity: 'nonhispanic', gender: 'F', race: 'asian' },
  //   { count: 35, ethnicity: 'nonhispanic', gender: 'M', race: 'asian' },
  //   { count: 408, ethnicity: 'nonhispanic', gender: 'M', race: 'white' },
  //   { count: 2, ethnicity: 'nonhispanic', gender: 'M', race: 'native' },
  //   { count: 49, ethnicity: 'hispanic', gender: 'M', race: 'white' },
  //   { count: 2, ethnicity: 'hispanic', gender: 'F', race: 'asian' },
  //   { count: 6, ethnicity: 'hispanic', gender: 'F', race: 'black' },
  //   { count: 4, ethnicity: 'hispanic', gender: 'M', race: 'black' },
  //   { count: 336, ethnicity: 'nonhispanic', gender: 'F', race: 'white' },
  //   { count: 6, ethnicity: 'hispanic', gender: 'M', race: 'asian' },
  //   { count: 52, ethnicity: 'hispanic', gender: 'F', race: 'white' },
  //   { count: 32, ethnicity: 'nonhispanic', gender: 'F', race: 'black' },
  //   { count: 1, ethnicity: 'nonhispanic', gender: 'F', race: 'other' },
  //   { count: 44, ethnicity: 'nonhispanic', gender: 'M', race: 'black' },
  // ];

  console.log(gender, race, ethnicity);

  const generateData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: value === null || value === undefined ? Math.random() * 100 : value,
    }));

  const [dataaaaa, setData] = useState(generateData(0));

  useEffect(() => {
    setData(generateData());
  }, [!dataaaaa]);

  useEffect(() => {
    graphList?.gender?.forEach((el) => setGender((prev) => ({ ...prev, [el]: 0 })));
    graphList?.rece?.forEach((el) => setRace((prev) => ({ ...prev, [el]: 0 })));
    graphList?.ethnicity?.forEach((el) => setEthnicity((prev) => ({ ...prev, [el]: 0 })));
  }, []);

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <div>
      <PieGraph data={data} width={200} height={200} innerRadius={60} outerRadius={100} />
    </div>
  );
};

export default Graph;
