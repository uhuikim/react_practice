import { useCallback, useEffect, useState } from 'react';
import { getPatientList } from './apis';
import InputRow from './components/InputRow';
import Pagination from './components/Pagination';
import Table from './components/Table';
import './styles/App.scss';

function App() {
  const [patientData, setPatientData] = useState('');
  const [sliceData, setSliceData] = useState([]);
  const [inputRow, setInputRow] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  const getHandle = async () => {
    try {
      const data = await getPatientList();
      setPatientData(data?.data?.patient);
    } catch (err) {
      console.log(err);
    }
  };
  const handleInputRow = useCallback((el) => {
    setInputRow(el.target.value);
  }, []);

  useEffect(() => {
    getHandle();
  }, []);

  const handlePageClick = useCallback(
    (page) => (e) => {
      e.preventDefault();
      console.log(page);
      if (currentPage !== page) {
        setCurrentPage(Number(page));
      }
    },
    [currentPage],
  );

  useEffect(() => {
    const start = (currentPage - 1) * inputRow;
    const end = currentPage * inputRow;
    setSliceData(patientData?.list?.slice(start, end));
  }, [currentPage, patientData, inputRow]);

  return (
    <div className="app">
      <h1>환자 정보</h1>
      <InputRow inputValue={inputRow} handleInput={handleInputRow} />
      <Table data={sliceData} />
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
