
import React, { useEffect, useState } from 'react';
import { createAlumni, getAlumni, updateAlumni } from "../services/AlumniService.js";
import { useNavigate, useParams } from "react-router-dom";

const AlumniComponent = () => {
    const [admno, setAdmno] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contact_no, setContact_no] = useState("");
    const [passout_year, setPassout_year] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [removeImage, setRemoveImage] = useState(false); // ✅ Add this line

    const { admno: admnoParam } = useParams();
    const navigator = useNavigate();

    const [errors, setErrors] = useState({
        admno: "", firstname: "", lastname: "", email: "", contact_no: "", passout_year: ""
    });

    useEffect(() => {
        if (admnoParam) {
            getAlumni(admnoParam).then((response) => {
                setAdmno(response.data.admno);
                setFirstName(response.data.firstname);
                setLastName(response.data.lastname);
                setEmail(response.data.email);
                setContact_no(response.data.contact_no);
                setPassout_year(response.data.passout_year);

                if (response.data.image_data && response.data.image_type) {
                    const imgSrc = `data:${response.data.image_type};base64,${response.data.image_data}`;
                    setPreviewUrl(imgSrc);
                }
            }).catch(console.error);
        }
    }, [admnoParam]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setRemoveImage(false); // ✅ Reset this if new image is selected
    };

    const saveOrUpdateAlumni = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append("admno", admno);
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("email", email);
        formData.append("contact_no", contact_no);
        formData.append("passout_year", passout_year);

        if (imageFile) {
            formData.append("imageFile", imageFile);
        }

        // ✅ Add this line always, whether true or false
        formData.append("removeImage", removeImage ? "true" : "false");

        const submitAction = admnoParam
            ? updateAlumni(admnoParam, formData)
            : createAlumni(formData);

        submitAction
            .then(() => navigator("/alumni"))
            .catch(console.error);
    };


    const validateForm = () => {
        let valid = true;
        const errorsCopy = { ...errors };

        if (admno.trim()) errorsCopy.admno = "";
        else { errorsCopy.admno = "Admission Number is required"; valid = false; }

        if (firstname.trim()) errorsCopy.firstname = "";
        else { errorsCopy.firstname = "First Name is required"; valid = false; }

        if (email.trim()) errorsCopy.email = "";
        else { errorsCopy.email = "Email is required"; valid = false; }

        if (contact_no.trim()) errorsCopy.contact_no = "";
        else { errorsCopy.contact_no = "Contact Number is required"; valid = false; }

        if (passout_year.trim()) errorsCopy.passout_year = "";
        else { errorsCopy.passout_year = "Passing Year is required"; valid = false; }

        setErrors(errorsCopy);
        return valid;
    };

    const pageTitle = () => (
        <h1 className="text-center">
            {admnoParam ? "Update Alumni" : "Add Alumni"}
        </h1>
    );

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="card bg-body text-body shadow rounded col-md-8">
                    {pageTitle()}
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-3">
                                <input
                                    type="text"
                                    placeholder="Enter Admission Number"
                                    name="admno"
                                    value={admno}
                                    className={`form-control ${errors.admno ? "is-invalid" : ""}`}
                                    onChange={(e) => setAdmno(e.target.value)}
                                    disabled={!!admnoParam}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <input
                                    type="text"
                                    placeholder="Enter First Name"
                                    name="firstname"
                                    value={firstname}
                                    className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <input
                                    type="text"
                                    placeholder="Enter Last Name"
                                    name="lastname"
                                    value={lastname}
                                    className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    name="email"
                                    value={email}
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <input
                                    type="text"
                                    placeholder="Enter Contact Number"
                                    name="contact_no"
                                    value={contact_no}
                                    className={`form-control ${errors.contact_no ? "is-invalid" : ""}`}
                                    onChange={(e) => setContact_no(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <select
                                    name="passout_year"
                                    value={passout_year}
                                    className={`form-control ${errors.passout_year ? "is-invalid" : ""}`}
                                    onChange={(e) => setPassout_year(e.target.value)}
                                >
                                    <option value="">Select Year</option>
                                    {Array.from({ length: 22 }, (_, i) => {
                                        const year = new Date().getFullYear() - i;
                                        return (
                                            <option key={year} value={year}>{year}</option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className="form-group mb-3">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="form-control"
                                />
                            </div>

                            {previewUrl && (
                                <div className="mb-3 text-center">
                                    <img
                                        src={previewUrl}
                                        alt="Profile Preview"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            borderRadius: "6px",
                                            border: "1px solid #ccc"
                                        }}
                                    />
                                    <div className="mt-2">
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                setImageFile(null);
                                                setPreviewUrl(null);
                                                setRemoveImage(true);
                                            }}
                                        >
                                            Remove Picture
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="text-center">
                                <button className="btn btn-success" onClick={saveOrUpdateAlumni}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default AlumniComponent;
