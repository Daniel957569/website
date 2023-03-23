import React from "react";
import ListApp from "../../common/list";

const Links = () => {
  const thirdField = "Link";
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   async function test2() {
  //     const dbGET = await axios.get("http://localhost:3001/api/links");
  //     setData(dbGET.data);
  //   }
  //   test2();
  // }, []);

  return (
    <div>
      <h1>Links</h1>
      <ListApp thirdField={thirdField} formHref="/links/linksForm" />
    </div>
  );
};

export default Links;
