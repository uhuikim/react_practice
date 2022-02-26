import { useCallback, useEffect, useState } from 'react';
import { getPatientList, getRaceList, getEthnicityList, getGenderList, getGraphData } from './apis';
import Filter from './components/Filter';
import InputRow from './components/InputRow';
import Pagination from './components/Pagination';
import Table from './components/Table';
import Graph from './components/Graph';
import './styles/App.scss';

function App() {
  const [patientData, setPatientData] = useState('');
  const [graphData, setGraphData] = useState('');
  const [inputRow, setInputRow] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState({
    name: 'person_id',
    desc: true,
  });

  const [graphList, setGraphList] = useState([]);
  const [filterGraphList, setFilterGraphList] = useState([]);

  const [filter, setFilter] = useState({
    race: null,
    ethnicity: null,
    gender: null,
    death: null,
  });

  const [ageFilter, setAgeFilter] = useState({
    min: null,
    max: null,
  });

  const getPatientData = async (props) => {
    try {
      const data = await getPatientList(props);
      setPatientData(data?.data?.patient);
    } catch (err) {
      console.log(err);
    }
  };

  const getGraphDatas = async () => {
    try {
      const data = await getGraphData();
      setGraphData(data?.data?.stats);
    } catch (err) {
      console.log(err);
    }
  };

  const getGraphList = async () => {
    try {
      const raceList = await getRaceList();
      const EthnicityList = await getEthnicityList();
      const GenderList = await getGenderList();

      setGraphList([
        {
          race: raceList?.data?.raceList,
        },
        { ethnicity: EthnicityList?.data?.ethnicityList },
        { gender: GenderList?.data?.genderList },
        { death: ['true', 'false'] },
      ]);

      setFilterGraphList([
        {
          race: raceList?.data?.raceList,
        },
        { ethnicity: EthnicityList?.data?.ethnicityList },
        { gender: GenderList?.data?.genderList },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilter = useCallback(
    (name, value) => () => {
      setFilter((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  const handleMinMaxFilter = useCallback(
    (title) => (el) => {
      console.log(title, el);
      setAgeFilter((prev) => ({ ...prev, [title]: el.target.value }));
    },
    [],
  );

  const handleInputRow = useCallback((el) => {
    setInputRow(el.target.value);
  }, []);

  const handlePageClick = useCallback(
    (page) => (e) => {
      e.preventDefault();
      if (currentPage !== page) {
        setCurrentPage(Number(page));
      }
    },
    [currentPage],
  );

  const handleResetButton = () => {
    setFilter({
      race: null,
      ethnicity: null,
      gender: null,
    });

    setAgeFilter({
      min: null,
      max: null,
    });
  };

  const handleSort = useCallback(
    (sort) => () => {
      const sortMapping = {
        personID: 'person_id',
        gender: 'gender',
        birthDatetime: 'birth',
        race: 'race',
        ethnicity: 'ethnicity',
        isDeath: 'death',
      };
      setSort((prev) => {
        if (prev.name === sortMapping[sort]) return { ...prev, desc: !prev.desc };
        else return { name: sortMapping[sort], desc: true };
      });
    },
    [],
  );

  useEffect(() => {
    getPatientData({
      page: currentPage,
      length: inputRow,
      order_column: sort.name,
      order_desc: sort.desc,
      gender: filter.gender,
      race: filter.race,
      death: filter.death,
      ethnicity: filter.ethnicity,
      age_min: ageFilter.min ? +ageFilter.min : null,
      age_max: ageFilter.max ? +ageFilter.max : null,
    });
  }, [currentPage, inputRow, sort, filter, ageFilter]);

  useEffect(() => {
    getGraphList();
  }, []);

  useEffect(() => {
    getGraphDatas();
  }, [filterGraphList]);

  useEffect(() => {
    if (filter.race) {
      const left = filterGraphList.filter((el) => !Object.keys(el).includes('race'));
      left.push({ race: [filter.race] });
      setFilterGraphList(left);
    }
    if (filter.gender) {
      const left = filterGraphList.filter((el) => !Object.keys(el).includes('gender'));
      left.push({ gender: [filter.gender] });
      setFilterGraphList(left);
    }
    if (filter.ethnicity) {
      const left = filterGraphList.filter((el) => !Object.keys(el).includes('ethnicity'));
      left.push({ ethnicity: [filter.ethnicity] });
      setFilterGraphList(left);
    }
  }, [filter]);

  return (
    <div className="app">
      <div className="content">
        <h1>환자 정보</h1>

        <Graph data={graphData} graphList={filterGraphList} />
        <Filter
          handleFilter={handleFilter}
          handleMinMaxFilter={handleMinMaxFilter}
          graphList={graphList}
          filter={filter}
          ageFilter={ageFilter}
          handleResetButton={handleResetButton}
        />
        <div className="bread">
          <InputRow inputValue={inputRow} handleInput={handleInputRow} />
        </div>

        <Table data={patientData?.list} handleSort={handleSort} />
        <Pagination
          totalPageCount={Math.ceil(patientData?.totalLength / inputRow)}
          countList={inputRow}
          handlePageClick={handlePageClick}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default App;
