import axios from "axios";

const searchProductsAndServices = async (query) => {
    if (!query || query.trim() === "") {
        return { results: [], message: "Please enter a search term." };
    }

    try {
        // Query backend API for products
        const response = await axios.get(`http://127.0.0.1:8000/api/products/search/`, {
            params: { query },
        });

        const products = response.data.products || []; // Assume the API returns a `products` array

        // Filter results for partial matches if backend doesn't handle it
        const filteredResults = products.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            (product.description &&
                product.description.toLowerCase().includes(query.toLowerCase()))
        );

        if (filteredResults.length === 0) {
            return { results: [], message: "No matching products found." };
        }

        return { results: filteredResults, message: null };
    } catch (error) {
        console.error("Error during search:", error);
        return { results: [], message: "An error occurred while searching. Please try again." };
    }
};

export default searchProductsAndServices;
