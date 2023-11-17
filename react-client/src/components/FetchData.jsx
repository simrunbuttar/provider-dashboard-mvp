const fetchData = async () => {
    try {
      console.log("Fetching data...");
      const response = await fetch('/api/patients');
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (!data) {
        throw new Error("Data received from the API is not in the expected format");
      }

      return data;
  
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  };
  
  export default fetchData;

