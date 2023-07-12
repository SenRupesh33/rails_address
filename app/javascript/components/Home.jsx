import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default Home = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const url = "/api/v1/addressbooks/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setRecipes(res);
        setFilteredRecipes(res);
      })
      .catch(() => navigate("/"));
  }, []);

  const deleteAddressbook = (id) => {
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
          setRecipes(updatedRecipes);
          setFilteredRecipes(updatedRecipes);
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => navigate("/"))
      .catch((error) => console.log(error.message));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    let filteredData = [];

    if (filterValue === "name") {
      filteredData = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (filterValue === "age") {
      filteredData = recipes.filter(
        (recipe) => recipe.age.toString() === searchQuery
      );
    } else if (filterValue === "gender") {
      filteredData = recipes.filter((recipe) =>
        recipe.gender.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredRecipes(filteredData);
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select onChange={handleFilterChange}>
          <option value="name">Name</option>
          <option value="age">Age</option>
          <option value="gender">Gender</option>
        </select>
      </div>

      <table className="table container">
        <thead>
          <tr>
            <th scope="col">name</th>
            <th scope="col">age</th>
            <th scope="col">gender</th>
            <th scope="col">mobile</th>
            <th scope="col">address</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecipes.map((item) => (
            <tr key={item.id}>
              <th>{item.name}</th>
              <td>{item.age}</td>
              <td>{item.gender}</td>
              <td>{item.mobile}</td>
              <td>{item.address}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteAddressbook(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="addressbooks/create" className="btn btn-dark" role="button">
        Add Contact
      </Link>
    </>
  );
};
