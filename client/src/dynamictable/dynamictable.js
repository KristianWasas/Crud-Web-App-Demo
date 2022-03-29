import React, {useState, Fragment} from "react";
import "./dynamictable.css"
import schema from "../template"
import Axios from 'axios'

const schemaAsObject = JSON.parse(schema);

const DynamicTable = ({sqlData}) => {

    const deleteElement = (id) => {
        Axios.post(`http://localhost:3001/deleteelement/${id}`, {template: schemaAsObject}).then((response) => {
            alert(response.data)
        })
    }
    
    const saveElement = (id) => {
        Axios.post(`http://localhost:3001/editelement/${id}`, {template: schemaAsObject, data: editFormData}).then((response) => {
            alert(response.data)
        })
    }

    let columns = []
    for(let i in schemaAsObject.properties){
        columns.push(i)
    }

    const [editElementID, setEditElementID] = useState(null)
    const [editFormData, setEditFormData] = useState(null)

    const handleEditClick = (event, index) => {
        event.preventDefault()
        setEditFormData(sqlData[index])
        setEditElementID(index)
    }

    const handleFormChange = (event) => {
        const fieldName = event.target.id
        let fieldValue = event.target.value
        if(event.target.type === "checkbox"){
            fieldValue = event.target.checked
        }
        let newFormData = editFormData
        newFormData[fieldName] = fieldValue
        setEditFormData(newFormData)
        
    }

    const handleSaveClick = (event, item) => {
        event.preventDefault()
        console.log(editFormData)
        saveElement(item.id)
        setEditElementID(null)
    }

    const EditType = (item) => {
        if(schemaAsObject.properties[item["item"]].hasOwnProperty("enum")){   
            const a = []
            for(let i in schemaAsObject.properties[item["item"]].enum){
                a.push(schemaAsObject.properties[item["item"]].enum[i])
            }
            return  (<select id={item["item"]} onChange={(event) => handleFormChange(event)}>
                        {a.map(opt => <option key={opt}> {opt} </option>)}
                    </select>)
        }else if(schemaAsObject.properties[item["item"]].type === "boolean"){
            return <input id={item["item"]} type = "checkbox" onClick={(event) => handleFormChange(event)}/>
        }else if(schemaAsObject.properties[item["item"]].format === "date"){
            return <input id={item["item"]} type = "date" onChange={(event) => handleFormChange(event)}/>
        }else if(schemaAsObject.properties[item["item"]].type === "integer"){
            return <input id={item["item"]} type = "number" onChange={(event) => handleFormChange(event)}/>
        }else{
            return <input id={item["item"]} type = "text" onChange={(event) => handleFormChange(event)} placeholder={editFormData[item["item"]]}/>
        }
    }

    const ColumnName = ({item}) => <th>{item}</th>
    const ColumnValues = ({item, columns, index}) => (
        <tr>
            {columns.map((columnName) => {
                return <td> {item[`${columnName}`]} </td>
            })}
            <td>
                <button onClick={(event) => handleEditClick(event, index)}>Edit</button>
            </td>
            <td>
                <button onClick = {() => {deleteElement(item.id)}}>Delete</button>
            </td>
        </tr>
    )
    const ColumnEdit = ({item, columns}) => (
        <tr>
            {columns.map((item) => (
                <td><EditType item = {item}/></td>
            ))}
            <td>
                <button onClick={(event) => handleSaveClick(event, item)}>Save changes</button>
            </td>
            <td>
                <button onClick={(event) => handleEditClick(event, null)}>Cancel changes</button>
            </td>
        </tr>
    )

    return (
        <form id="table">
            <div>
                <h1>{schemaAsObject.tablename}</h1>
            </div>
            <table>
                <thead>
                    <tr>
                        {columns.map((item, index) => <ColumnName item = {item}/>)}
                    </tr>
                </thead>
                <tbody>
                    {sqlData.map((item, index) => (
                        <Fragment>
                            {editElementID === index ? (
                            <ColumnEdit item = {item} columns = {columns} index = {index}/>) : (
                            <ColumnValues item = {item} columns = {columns} index = {index}/>)}
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </form>
    )
}

export default DynamicTable;