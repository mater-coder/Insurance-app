(async function fetchData() {
  try {
    const response = await fetch(
      "https://microservice-project-415514.df.r.appspot.com/getConfig"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    localStorage.setItem("mfe1", JSON.stringify(data.configurationList[0]));
    localStorage.setItem("mfe2", JSON.stringify(data.configurationList[1]));
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
})();
