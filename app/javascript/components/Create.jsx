import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Create = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [age, setAge] = useState();
    const [gender, setGender] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
        const url = "/api/v1/addressbooks/create";
        const body = {
            name,
            age,
            gender,
            mobile,
            address
          };
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((response) => navigate("/"))
            .catch((error) => console.log(error.message));
    };
    return (
        <div className="card" style={{backgroundColor: "gray"}}>
            <div>
        <div className="container w-50 mt-5">
            <form >
                <div className="mb-3">
                    <label htmlFor="nameInput" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="nameInput"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="ageInput" className="form-label">
                        Age
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="ageInput"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="genderInput" className="form-label">
                        Gender
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="genderInput"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="mobInput" className="form-label">
                        Mobile
                    </label>
                    <input
                        type="tel"
                        className="form-control"
                        id="mobInput"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="addressInput" className="form-label">
                        Address
                    </label>
                    <textarea
                        className="form-control"
                        id="addressInput"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-dark" onClick={onSubmit}>
                    Create Address
                </button>
                <Link to="/" className=" btn btn-dark">
              Back to home
            </Link>
            </form>
            </div>
            </div>
        </div>
    );
};

 export default Create;