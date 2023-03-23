import FormInput from "../../common/formInput";
import { getUrl } from "../../appManegament/routes";

const Forms = () => {
  const currentUrl = getUrl();
  const url = currentUrl.map((u) => u);

  return (
    <div>
      <h1>HI</h1>
      <FormInput currentPage={url} />
    </div>
  );
};

export default Forms;
