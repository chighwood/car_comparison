export function renderCarDetails(container, carData) {
  if (!carData.Make || !carData.Model || !carData.Year) {
    container.innerHTML = "<p>Sorry, car details could not be loaded.</p>";
    return;
  }

  container.innerHTML = `
    <h2>${carData.Make} ${carData.Model} ${carData.Year}</h2>
    <p>Trim: ${carData.Trim || 'N/A'}</p>
    <p>MPG: ${carData.MPG || 'N/A'}</p>
    <p>Engine Size: ${carData.EngineSize || 'N/A'}</p>
    <p>Horsepower: ${carData.Horsepower || 'N/A'}</p>
    <p>Torque: ${carData.Torque || 'N/A'}</p>
    <p>RPM: ${carData.RPM || 'N/A'}</p>
    <p>Drivetrain: ${carData.Drivetrain || 'N/A'}</p>
    <p>Stock Tire Size: ${carData.TireSize || 'N/A'}</p>
    <p>Average Annual Fuel Cost: ${carData.FuelCost || 'N/A'}</p>
  `;
}
  