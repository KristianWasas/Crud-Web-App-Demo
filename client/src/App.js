import React, {useEffect, useState} from 'react';
import './App.css';
import Axios from 'axios'
import Form from 'react-jsonschema-form';
import DynamicTable from "./dynamictable/dynamictable";
import schema from "./template"

const schemaAsObject = JSON.parse(schema);

function App() {

  const [dbList, setDBList] = useState([])
  const [renderTable, setRenderTable] = useState(false)

  useEffect(() => {
    Axios.post("http://localhost:3001/getelements", {template: schemaAsObject}).then((response) => {
      setDBList(response.data);
    })
  }, [])

  const createtable = () => {
    Axios.post("http://localhost:3001/createtable", {template: schemaAsObject}).then((response) => {
      alert(response.data)
    })
  }

  const submit = ({formData}) => {
    Axios.post("http://localhost:3001/insert", {data: formData, template: schemaAsObject}).then((response) => {
      alert(response.data)
    })
  }

  const CheckTable = () => {
    Axios.post("http://localhost:3001/exists", {template: schemaAsObject}).then((response) => {
      if(Array.isArray(response.data)){
        setRenderTable(true)
      }else{
        setRenderTable(false)
      }
    })
}

  const error = (errors) => alert(errors);
  
  return (
    <div className="App">
      <h1>Dynamic database Vitec</h1>
      <div className='form'>
        <Form schema={schemaAsObject}
          onSubmit = {submit}
          onError = {error} />,
      </div>
      <div>
      <script>
        {CheckTable()}
      </script>
      {renderTable ? (
        <DynamicTable sqlData={dbList}/>
      ) : (
        <div></div>
      )}
      </div>
      <div>
        <button onClick = {createtable}>Create Table</button>
      </div>
    </div>
  );

}

export default App;
