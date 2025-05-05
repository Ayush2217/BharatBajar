// storeOnboardingSchema.js
export const storeOnboardingSchema = {
    type: "object",
    properties: {
      ownerName: { type: "string", minLength: 1, title: "Store Owner Name" },
      storeName: { type: "string", minLength: 1, title: "Store Name" },
      gstNumber: { type: "string", title: "GST Number" },
      aadhaarNumber: { type: "string", title: "Aadhaar Number" },
      phone: { type: "string", title: "Phone Number" },
      email: { type: "string", format: "email", title: "Email" },
      businessType: {
        type: "string",
        enum: ["Retail", "Wholesale", "Service"],
        title: "Business Type"
      },
      address: { type: "string", title: "Store Address" },
      city: { type: "string", title: "City" },
      pincode: { type: "string", title: "PIN Code" },
  
      // Page 2
      panNumber: { type: "string", title: "PAN Number" },
      bankName: { type: "string", title: "Bank Name" },
      accountNumber: { type: "string", title: "Account Number" },
      ifscCode: { type: "string", title: "IFSC Code" },
      upiId: { type: "string", title: "UPI ID" },
      website: { type: "string", title: "Website (optional)" },
      storeLogo: { type: "string", title: "Store Logo URL" },
      description: { type: "string", title: "Short Description" },
      deliveryRadius: { type: "number", title: "Delivery Radius (in km)" },
      openingHours: { type: "string", title: "Opening Hours" }
    },
    required: ["ownerName", "storeName", "gstNumber", "aadhaarNumber", "phone", "email"]
  };
  