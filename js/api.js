export async function getModels(year, make, modelDropdownId) {
  try {
    const url = `/api/0.3/?cmd=getModels&make=${make}&year=${year}&sold_in_us=1`;
    console.log('Requesting URL:', url);  // Log the URL to verify it
    
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
    modelDropdown.innerHTML = ''; // Clear the dropdown
    
    const defaultOption = document.createElement('option');
    defaultOption.text = 'Select a model';
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
    const url = `/api/0.3/?cmd=getTrims&make=${make}&year=${year}&model=${model}&sold_in_us=1`;
    const response = await fetch(url);
    const text = await response.text();
    const jsonText = text.replace(/^.*?({.*})[^}]*$/, '$1');
    const data = JSON.parse(jsonText);
    const trims = data.Trims;

    console.log(url)

    const trimDropdown = document.getElementById(trimDropdownId);
    trimDropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.text = 'Select a trim';
    defaultOption.value = '';
    trimDropdown.appendChild(defaultOption);

    trims.forEach(trim => {
      const option = document.createElement('option');
      option.text = trim.model_trim || 'Base';
      option.value = trim.model_trim;
      trimDropdown.appendChild(option);
    });

  } catch (error) {
    console.error('Error fetching trims:', error);
  }
}


export async function getCarDetails(year, make, model, trim) {
  try {
    const url = `/api/0.3/?cmd=getModel&model=${model}`;
    console.log('Fetching car details from:', url); // Add this log for debugging
    const response = await fetch(url);

    if (!response.ok) {
      console.error('API request failed with status:', response.status); // Add more error logging
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Car details response data:', data); // Log the response data

    if (data && data.length > 0) {
      return data[0]; // The API returns car details as an array, so take the first element
    } else {
      console.error('No car details returned from API');
      throw new Error('No car details found');
    }

  } catch (error) {
    console.error('Error fetching car details:', error);
    return {}; // Return empty object in case of error
  }
}





