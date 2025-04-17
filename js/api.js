export async function getModels(year, make, modelDropdownId) {
  try {
    const baseURL = import.meta.env.PROD 
      ? 'https://car-comparison-xvq9.onrender.com/api' 
      : '/api';
      
    const url = `${baseURL}/0.3/?cmd=getModels&make=${make}&year=${year}&sold_in_us=1`;
    console.log('Requesting URL:', url);
    
    // Fetch data from the CarQuery API via the Vite proxy
    const response = await fetch(url);
    console.log(url);
    
    if (!response.ok) {
      console.error('Failed request with status:', response.status);
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const jsonData = await response.json();
    const models = jsonData.Models;
    
    const modelDropdown = document.getElementById(modelDropdownId);
    modelDropdown.innerHTML = '';
    
    const defaultOption = document.createElement('option');
    defaultOption.text = 'Select Model';
    defaultOption.value = '';
    modelDropdown.appendChild(defaultOption);

    // Populate the dropdown with the models
    models.forEach(model => {
      const option = document.createElement('option');
      option.text = model.model_name;
      option.value = model.model_name;
      modelDropdown.appendChild(option);
    });

  } catch (error) {
    console.error('Error fetching models:', error);
  }
}

// Fetch trims based on selected year, make, and model
export async function getTrims(year, make, model, trimDropdownId) {
  try {
    const baseURL = import.meta.env.PROD 
    ? 'https://car-comparison-xvq9.onrender.com/api' 
    : '/api';

    const url = `${baseURL}/0.3/?cmd=getTrims&make=${make}&year=${year}&model=${model}&sold_in_us=1`;
    const response = await fetch(url);
    const text = await response.text();
    const jsonText = text.replace(/^.*?({.*})[^}]*$/, '$1');
    const data = JSON.parse(jsonText);
    const trims = data.Trims;

    console.log(url)

    const trimDropdown = document.getElementById(trimDropdownId);
    trimDropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.text = 'Select Trim';
    defaultOption.value = '';
    trimDropdown.appendChild(defaultOption);

    trims.forEach(trim => {
      const option = document.createElement('option');
      option.text = trim.model_trim || 'Base';
      option.value = trim.model_trim;
      option.dataset.modelId = trim.model_id;
      trimDropdown.appendChild(option);
    });

  } catch (error) {
    console.error('Error fetching trims:', error);
  }
}


export async function getCarDetails(model_id) {
  try {
    const baseURL = import.meta.env.PROD 
    ? 'https://car-comparison-xvq9.onrender.com/api' 
    : '/api';

    const url = `${baseURL}/0.3/?cmd=getModel&model=${model_id}`;
    console.log('Fetching car details from:', url);
    const response = await fetch(url);

    if (!response.ok) {
      console.error('API request failed with status:', response.status);
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Car details response data:', data);

    if (data && data.length > 0) {
      return data[0];
    } else {
      console.error('No car details returned from API');
      throw new Error('No car details found');
    }

  } catch (error) {
    console.error('Error fetching car details:', error);
    return {};
  }
}

// api.js
export async function getCarImage(make, model, year) {
  try {
    const response = await fetch(`https://www.carimagery.com/api.asmx/GetImageUrl?searchTerm=${year}+${make}+${model}`);
    const data = await response.text();

    // Parse the XML and extract the image URL
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
    const imageUrl = xmlDoc.getElementsByTagName("string")[0].textContent;

    return imageUrl;
  } catch (error) {
    console.error('Error fetching car image:', error);
    return null;
  }
}







