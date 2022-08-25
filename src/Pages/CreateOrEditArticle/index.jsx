import React, { useContext } from "react";
import FormArticle from "../../Components/FormArticle";
import { UserContext } from "../../UserProvider";

const CreateOrEditArticle = () => {
  const context = useContext(UserContext)
  const user = context.user
  return (
    <>
    {user && <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <FormArticle/>
          </div>
        </div>
      </div>
    </div>}
    </>
  );
};

export default CreateOrEditArticle;
