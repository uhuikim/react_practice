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
          rece: raceList?.data?.raceList,
        },
        { ethnicity: EthnicityList?.data?.ethnicityList },
        { gender: GenderList?.data?.genderList },
        { death: ['true', 'false'] },
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
      age_min: ageFilter.min,
      age_max: ageFilter.max,
    });
  }, [currentPage, inputRow, sort, filter, ageFilter]);

  useEffect(() => {
    getGraphDatas();
    getGraphList();
  }, []);

  return (
    <div className="app">
      <h1>환자 정보</h1>
      <InputRow inputValue={inputRow} handleInput={handleInputRow} />
      <Graph data={graphData} graphList={graphList} />
      <Filter
        handleFilter={handleFilter}
        handleMinMaxFilter={handleMinMaxFilter}
        graphList={graphList}
        filter={filter}
        ageFilter={ageFilter}
        handleResetButton={handleResetButton}
      />
      <Table data={patientData?.list} handleSort={handleSort} />
      <Pagination
        totalPageCount={Math.ceil(patientData?.totalLength / inputRow)}
        countList={inputRow}
        handlePageClick={handlePageClick}
        currentPage={currentPage}
      />
    </div>
  );
}

export default App;
