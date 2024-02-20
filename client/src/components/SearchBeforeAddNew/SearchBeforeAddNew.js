import React, { useState } from "react";
import style from "./SearchBeforeAddNew.module.css";
import { Link } from "react-router-dom";

const SearchBeforeAddNew = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const [isFound, setIsFound] = useState(false);
  return (
    <div className={style.Container}>
      <form onsubmit={handleSubmit} role="search" className={style.contain}>
        <input
          id="search"
          type="search"
          placeholder="رقم المقاطعه"
          autofocus
          required
        />
        <button type="submit">أبحث</button>
      </form>

      
      {isFound && (
        <Link to="/form/add" className={style.add}>
          <button>إضافة مقاطعه جديدة</button>
        </Link>
      )}
    </div>
  );
};

export default SearchBeforeAddNew;
