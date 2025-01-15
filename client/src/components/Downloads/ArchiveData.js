import React, { useState } from "react";
import { server_url } from "../../config";

export const ArchiveData = () => {
  const [dis, setDis] = useState(false);
  const [pass, setPass] = useState("");

  const downloadCSV = (e) => {
    setDis(true);
    e.preventDefault();
    fetch(`${server_url}/archive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pass }),
    })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          return response.blob();
        } else {
          setDis(false)
        }
      })
      .then((blob) => {
        // Create a temporary URL for the blob
        const url = window.URL.createObjectURL(new Blob([blob]));

        // Create a temporary <a> element and trigger the download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "database.csv");
        document.body.appendChild(link);
        link.click();

        // Cleanup the temporary URL and element
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
        setDis(false)
      })
      .catch((error) => {
        console.error("Error downloading CSV:", error);
        setDis(false);
      });
  };

  return (
    <form
      onSubmit={downloadCSV}
      style={{ display: "flex", justifyContent: "center", marginTop: "20%" }}
    >
      <div>
        <input
          type="password"
          style={{ width: "150px", padding: "4px" }}
          placeholder="ادخل الباسورد"
          onChange={(e) => setPass(e.target.value)}
        ></input>
      </div>
      <button type="submit" disabled={dis}>
        Download Archive
      </button>
    </form>
  );
};
