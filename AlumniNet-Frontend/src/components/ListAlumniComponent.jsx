import React, {useEffect, useState} from 'react';
import {deleteAlumni, listAlumni} from "../services/AlumniService.js";
import {useNavigate} from "react-router-dom";


const ListAlumniComponent = () => {

    const navigator = useNavigate();

    const [alumni, setAlumni] = useState([])
    useEffect(() => {
        getAllAlumni()
    }, [])

    function getAllAlumni(){
        listAlumni().then((response) => {
            setAlumni(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewAlumni(){
        navigator("/add-alumni");
    }
    function contactAlumni(admno){
        navigator(`/contact-alumni/${admno}`);
    }
    function updateAlumni(admno) {
        navigator(`/edit-alumni/${admno}`);
    }
    function removeAlumni(admno){
        console.log(admno);
        deleteAlumni(admno).then((response) => {
            console.log(response.data);
            getAllAlumni();
        }).catch(error => {
            console.error(error);
        })

    }

    return(
        <div className="container">
            <h1>List of Alumni</h1>
            <button className="btn btn-primary mb-2" onClick={addNewAlumni}>Add Alumni</button>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Admission No</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        {/*<th>Email</th>*/}
                        {/*<th>Contact No</th>*/}
                        <th>Passing Year</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {alumni.map((data,index) => {
                        return(
                            <tr key={index}>
                                <td>{data.admno}</td>
                                <td>{data.firstname}</td>
                                <td>{data.lastname}</td>
                                {/*<td>{data.email}</td>*/}
                                {/*<td>{data.contact_no}</td>*/}
                                <td>{data.passout_year}</td>
                                <td>
                                    <button className="btn btn-info" onClick={() => contactAlumni(data.admno)}>Contact</button>
                                    <button className="btn btn-info" onClick={() => updateAlumni(data.admno) } style={{marginLeft: "10px"}}>Update</button>
                                    <button className="btn btn-danger" onClick={() => removeAlumni(data.admno) } style={{marginLeft: "10px"}}>Delete</button>

                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListAlumniComponent