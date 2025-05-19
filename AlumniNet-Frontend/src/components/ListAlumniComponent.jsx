import React, { useEffect, useState } from 'react';
import { listAlumni } from "../services/AlumniService.js";
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

    function updateAlumni(admno) {
        const userInput = prompt("Enter Admission Number to confirm update:");
        if (userInput === admno.toString()) {
            navigator(`/edit-alumni/${admno}`);
        } else {
            alert("Admission Number does not match. Update canceled.");
        }
    }

    return (
        <div className="container bg-body text-body py-4 rounded-3 shadow">
            <h1 className="mb-4 text-center">List of Alumni</h1>

            <div className="text-center my-3">
                <button className="custom-add-btn mb-2" onClick={addNewAlumni}>
                    Add Alumni
                </button>
            </div>

            <table className="table table-striped-columns">
                <thead>
                <tr>
                    <th>Profile Pic</th>
                    <th>Name</th>
                    <th>Passing Year</th>
                    <th className="action-column">Action</th>
                </tr>
                </thead>
                <tbody className="table-group-divider">
                {alumni.map((data, index) => {
                    const imageSrc = data.image_data && data.image_type
                        ? `data:${data.image_type};base64,${data.image_data}`
                        : '/no pic.jpg'; // Default image path

                    return (
                        <tr key={index}>
                            <td>
                                <img
                                    src={imageSrc}
                                    alt="Profile"
                                    style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }}
                                />
                            </td>
                            <td>{`${data.firstname} ${data.lastname}`}</td>
                            <td>{data.passout_year}</td>
                            <td className="action-column">
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => contactAlumni(data.admno)}
                                >
                                    Contact
                                </button>
                                <button
                                    className="btn btn-info btn-sm ms-2"
                                    onClick={() => updateAlumni(data.admno)}
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>

    );
}

export default ListAlumniComponent;
