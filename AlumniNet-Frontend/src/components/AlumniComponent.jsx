import React, {useEffect, useState} from 'react';
import {createAlumni, getAlumni, updateAlumni} from "../services/AlumniService.js";
import {useNavigate, useParams} from "react-router-dom";


const AlumniComponent = () => {

    const [admno, setAdmno] = useState("")
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [contact_no, setContact_no] = useState("")
    const [passout_year, setPassout_year] = useState("")

    const {id} = useParams();

    const [errors, setErrors] = useState({
        admno: "", firstname: "", lastname: "", email: "", contact_no: "", passout_year: ""
    })

    const navigator = useNavigate();

    useEffect(() => {
        if (id){
            getAlumni(id).then((response) => {
                // console.log(response.data);
                setAdmno(response.data.admno)
                setFirstName(response.data.firstname)
                setLastName(response.data.lastname)
                setEmail(response.data.email)
                setContact_no(response.data.contact_no)
                setPassout_year(response.data.passout_year)
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])


    // function saveOrUpdateAlumni(e){
    //     e.preventDefault();
    //
    //
    //     if (validateForm()) {
    //         const alumni = {admno, firstname, lastname, email, contact_no, passout_year}
    //         console.log(alumni)
    //
    //         if (admno){
    //             updateAlumni(admno, alumni).then((response) => {
    //                 console.log(response.data);
    //                 navigator("/alumni");
    //             }).catch(error => {
    //                 console.error(error);
    //             })
    //         } else {
    //             createAlumni(alumni).then((response) => {
    //                 console.log(response.data);
    //                 navigator("/alumni");
    //             })
    //         }
    //     }
    // }

    function saveOrUpdateAlumni(e){
        e.preventDefault();

        if (validateForm()) {
            const alumni = { admno, firstname, lastname, email, contact_no, passout_year };
            console.log(alumni);

            if (id) {
                // If id is present in URL → update
                updateAlumni(admno, alumni).then((response) => {
                    console.log(response.data);
                    navigator("/alumni");
                }).catch(error => {
                    console.error(error);
                });
            } else {
                // Otherwise → create new alumni
                createAlumni(alumni).then((response) => {
                    console.log(response.data);
                    navigator("/alumni");
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    }


    function validateForm(){
        let valid = true;

        const errorsCopy = {...errors};

        if (admno.trim()){
            errorsCopy.admno = "";
        } else {
            errorsCopy.admno = "Admission Number is required";
            valid = false;
        }
        if (firstname.trim()){
            errorsCopy.firstname = "";
        } else {
            errorsCopy.firstname = "First Name is required";
            valid = false;
        }
        if (email.trim()){
            errorsCopy.email = "";
        } else {
            errorsCopy.email = "Email is required";
            valid = false;
        }
        if (contact_no.trim()){
            errorsCopy.contact_no = "";
        } else {
            errorsCopy.contact_no = "Contact Number is required";
            valid = false;
        }
        if (passout_year.trim()){
            errorsCopy.passout_year = "";
        } else {
            errorsCopy.passout_year = "Passing Year is required";
            valid = false;
        }

        setErrors(errorsCopy)
        return valid;
    }

    function pageTitle(){
        if (id){
            return <h1 className="text-center">Update Alumni</h1>
        }else{
            return <h1 className="text-center">Add Alumni</h1>
        }
    }

    return (
        <div className="container">
            <br/>
            <br/>
            <div className="row">
                <div className="card">
                    {
                        pageTitle()
                    }
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                {/*<label className = "form-label">Admission Number</label>*/}
                                <input
                                    type = "text"
                                    placeholder = "Enter Admission Number"
                                    name = "admno"
                                    value = {admno}
                                    className = {`form-control ${errors.admno ? "is-invalid" : ""}`}
                                    onChange = {(e) => setAdmno(e.target.value)}>
                                </input>
                                {/*{errors.id && <div className="invalid-feedback">{errors.admno}</div>}*/}

                                <input
                                    type = "text"
                                    placeholder = "Enter First Name"
                                    name = "firstname"
                                    value = {firstname}
                                    className = {`form-control ${errors.firstname ? "is-invalid" : ""}`}
                                    onChange = {(e) => setFirstName(e.target.value)}>

                                </input>
                                {/*{errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}*/}

                                <input
                                    type = "text"
                                    placeholder = "Enter Last Name"
                                    name = "lastname"
                                    value = {lastname}
                                    className = {`form-control ${errors.lastname ? "is-invalid" : ""}`}
                                    onChange = {(e) => setLastName(e.target.value)}>
                                </input>
                                {/*{errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}*/}

                                <input
                                    type = "text"
                                    placeholder = "Enter Email"
                                    name = "email"
                                    value = {email}
                                    className = {`form-control ${errors.email ? "is-invalid" : ""}`}
                                    onChange = {(e) => setEmail(e.target.value)}>
                                </input>
                                {/*{errors.email && <div className="invalid-feedback">{errors.email}</div>}*/}

                                <input
                                    type = "text"
                                    placeholder = "Enter Contact Number"
                                    name = "contact_no"
                                    value = {contact_no}
                                    className = {`form-control ${errors.contact_no ? "is-invalid" : ""}`}
                                    onChange = {(e) => setContact_no(e.target.value)}>
                                </input>
                                {/*{errors.contact_no && <div className="invalid-feedback">{errors.contact_no}</div>}*/}

                                <input
                                    type = "text"
                                    placeholder = "Enter Passing Year"
                                    name = "passout_year"
                                    value = {passout_year}
                                    className = {`form-control ${errors.passout_year ? "is-invalid" : ""}`}
                                    onChange = {(e) => setPassout_year(e.target.value)}>
                                </input>
                                {/*{errors.passout_year && <div className="invalid-feedback">{errors.passout_year}</div>}*/}

                                <button className="btn btn-success" onClick={saveOrUpdateAlumni}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AlumniComponent