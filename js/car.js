import { getCarImage } from './api.js';

export async function renderCarDetails(container, carData) {
  if (!carData.model_make_display || !carData.model_name || !carData.model_year) {
    container.innerHTML = "<p>Sorry, car details could not be loaded.</p>";
    return;
  }

  // Fetch the car image URL based on the car details
  const carImage = await getCarImage(carData.model_make_display, carData.model_name, carData.model_year);

  // Check if image URL is valid
  if (!carImage) {
    container.innerHTML = "<p>Car image could not be loaded.</p>";
    return;
  }

  // Render car details
  container.innerHTML = `
    <h2>${carData.model_make_display} ${carData.model_name} ${carData.model_year}</h2>
    <img src="${carImage}" alt="${carData.model_make_display} ${carData.model_name}" style="max-width: 100%; height: auto; border-radius: 8px;">
    <p>Trim: ${carData.model_trim || 'N/A'}</p>
    <p>MPG (City): ${carData.model_mpg_city || 'N/A'} mpg</p>
    <p>MPG (Highway): ${carData.model_mpg_hwy || 'N/A'} mpg</p>
    <p>MPG (Average): ${carData.model_mpg_mixed || 'N/A'} mpg</p>
    <p>Engine Size: ${carData.model_engine_l || 'N/A'}L</p>
    <p>Horsepower: ${carData.model_engine_power_hp || 'N/A'} hp</p>
    <p>Torque: ${carData.model_engine_torque_lbft || 'N/A'} lb-ft</p>
    <p>RPM: ${carData.model_engine_power_rpm || 'N/A'}</p>
    <p>Drivetrain: ${carData.model_drive || 'N/A'}</p>
    <p>Stock Tire Size: ${carData.model_tire_size || 'N/A'}</p>
    <p>Fuel Tank Size: ${carData.model_fuel_cap_g || 'N/A'} gallons</p>
  `;
}

  