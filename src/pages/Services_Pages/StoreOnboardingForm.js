import React, { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";
import { storeOnboardingSchema } from "./storeOnboardingSchema";
import { createUISchema, page1Fields, page2Fields } from "./storeOnboardingUISchema";

const StoreOnboardingForm = ({ onComplete }) => {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);

  const handleNext = () => {
    if (page < 2) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleSubmit = () => {
    console.log("Form data submitted:", data);
    alert("✅ Store onboarding completed.");
    onComplete(); // 🔧 this now works
  };

  const uiSchema = createUISchema(page === 1 ? page1Fields : page2Fields);

  return (
    <div style={{ maxWidth: '1800px', margin: '0 auto' }}>
      <JsonForms
        schema={storeOnboardingSchema}
        uischema={uiSchema}
        data={data}
        renderers={materialRenderers}
        onChange={({ data }) => setData(data)}
        validationMode="ValidateAndHide"
      />
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        {page > 1 && <button onClick={handlePrevious}>Back</button>}
        {page < 2 && <button onClick={handleNext}>Next</button>}
        {page === 2 && <button onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  );
};

export default StoreOnboardingForm;
