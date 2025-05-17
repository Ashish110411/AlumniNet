import React, { useEffect, useState } from 'react';
import { deleteAlumni, listAlumni } from "../services/AlumniService.js";
import { useNavigate } from "react-router-dom";

const ListAlumniComponent = () => {
    const navigator = useNavigate();
    const [alumni, setAlumni] = useState([]);

    useEffect(() => {
        getAllAlumni();
    }, []);

    function getAllAlumni() {
        listAlumni().then((response) => {
            setAlumni(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    function addNewAlumni() {
        navigator("/add-alumni");
    }

    function contactAlumni(admno) {
        navigator(`/contact-alumni/${admno}`);
    }

    // function updateAlumni(admno) {
    //     navigator(`/edit-alumni/${admno}`);
    // }
    //
    // function removeAlumni(admno) {
    //     deleteAlumni(admno).then((response) => {
    //         getAllAlumni();
    //     }).catch(error => {
    //         console.error(error);
    //     });
    // }

    function updateAlumni(admno) {
        const userInput = prompt("Enter Admission Number to confirm update:");
        if (userInput === admno.toString()) {
            navigator(`/edit-alumni/${admno}`);
        } else {
            alert("Admission Number does not match. Update canceled.");
        }
    }

    function removeAlumni(admno) {
        const userInput = prompt("Enter Admission Number to confirm deletion:");
        if (userInput === admno.toString()) {
            deleteAlumni(admno).then(() => {
                getAllAlumni();
            }).catch(error => {
                console.error(error);
            });
        } else {
            alert("Admission Number does not match. Deletion canceled.");
        }
    }


    return (
        <div className="container">
            <h1>List of Alumni</h1>
            {/*<button className="btn btn-primary mb-2" onClick={addNewAlumni}>Add Alumni</button>*/}
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Profile Pic</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Passing Year</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {alumni.map((data, index) => {
                    const imageSrc = data.image_data && data.image_type
                        ? `data:${data.image_type};base64,${data.image_data}`
                        : null;

                    return (
                        <tr key={index}>
                            <td>
                                {imageSrc ? (
                                    <img
                                        src={imageSrc}
                                        alt="Profile"
                                        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                                    />
                                ) : (
                                    <span>No Image</span>
                                )}
                            </td>
                            <td>{data.firstname}</td>
                            <td>{data.lastname}</td>
                            <td>{data.passout_year}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => contactAlumni(data.admno)}>Contact</button>
                                <button className="btn btn-info" onClick={() => updateAlumni(data.admno)} style={{ marginLeft: "10px" }}>Update</button>
                                <button className="btn btn-danger" onClick={() => removeAlumni(data.admno)} style={{ marginLeft: "10px" }}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <div style={{
                position: "fixed",
                bottom: "100px",
                right: "100px",
                zIndex: 1
            }}>
                <button className="btn btn-primary" onClick={addNewAlumni}>Add Alumni</button>
            </div>
        </div>
    );
}

export default ListAlumniComponent;
