import React, { useState, useEffect } from "react";

function TestComponent() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("api/hello")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log(data[0].name);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <h1>{data[0].name}</h1>
      <p>Here</p>
    </div>
  );
}
export default TestComponent;
//calls to the database to get the availability
