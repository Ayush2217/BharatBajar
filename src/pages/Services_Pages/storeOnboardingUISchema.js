// storeOnboardingUISchema.js
export const page1Fields = [
    "ownerName",
    "storeName",
    "gstNumber",
    "aadhaarNumber",
    "phone",
    "email",
    "businessType",
    "address",
    "city",
    "pincode"
  ];
  
  export const page2Fields = [
    "panNumber",
    "bankName",
    "accountNumber",
    "ifscCode",
    "upiId",
    "website",
    "storeLogo",
    "description",
    "deliveryRadius",
    "openingHours"
  ];
  
  export const createUISchema = (fields) => ({
    type: "Group",
    elements: [
      {
        type: "VerticalLayout",
        elements: fields.map((field) => ({
          type: "Control",
          scope: `#/properties/${field}`
        }))
      }
    ]
  });
  