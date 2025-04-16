import { getModels, getTrims, getCarDetails, getCarImage } from './api.js';
import { renderCarDetails } from './car.js';

document.addEventListener("DOMContentLoaded", () => {

  const hardcodedMakes = ["Acura", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ford", "GMC", "Genesis", "Honda", "Hyundai", "Infiniti", "Jeep", "Kia", "Lexus", "Lincoln", "Mazda", "Mercedes-Benz", "Mini", "Nissan", "Porsche", "Ram", "Subaru", "Toyota", "Volkswagen", "Volvo"];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1990 + 1 }, (_, i) => currentYear - i);

  function populateYearDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    years.forEach(year => {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      dropdown.appendChild(option);
    });
  }

  function populateMakeDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    hardcodedMakes.forEach(make => {
      const option = document.createElement('option');
      option.value = make;
      option.textContent = make;
      dropdown.appendChild(option);
    });
  }

  // Initialize Year and Make dropdowns for each car section
  [1, 2, 3].forEach(num => {
    populateYearDropdown(`yearDropdown${num}`);
    populateMakeDropdown(`makeDropdown${num}`);

    const yearDropdown = document.getElementById(`yearDropdown${num}`);
    const makeDropdown = document.getElementById(`makeDropdown${num}`);
    const modelDropdown = document.getElementById(`modelDropdown${num}`);
    const trimDropdown = document.getElementById(`trimDropdown${num}`);
    const container = document.getElementById(`carDetailsContainer${num}`);

    // Load models when year or make changes
    yearDropdown.addEventListener('change', () => {
      const year = yearDropdown.value;
      const make = makeDropdown.value;
      if (year && make) {
        getModels(year, make, `modelDropdown${num}`);
        trimDropdown.innerHTML = '<option value="">Select Trim</option>';
        container.innerHTML = '';
      }
    });

    makeDropdown.addEventListener('change', () => {
      const year = yearDropdown.value;
      const make = makeDropdown.value;
      if (year && make) {
        getModels(year, make, `modelDropdown${num}`);
        trimDropdown.innerHTML = '<option value="">Select Trim</option>';
        container.innerHTML = '';
      }
    });

    // Load trims when model changes
    modelDropdown.addEventListener('change', () => {
      const year = yearDropdown.value;
      const make = makeDropdown.value;
      const model = modelDropdown.value;
      if (year && make && model) {
        getTrims(year, make, model, `trimDropdown${num}`);
      }
    });

    trimDropdown.addEventListener('change', async () => {
      const selectedOption = trimDropdown.selectedOptions[0];
      const modelId = selectedOption?.dataset?.modelId;
    
      if (modelId) {
        const carDetails = await getCarDetails(modelId);
        renderCarDetails(container, carDetails);
      }
    });

    // Render car details when trim is selected
    [makeDropdown, modelDropdown, trimDropdown].forEach(dropdown => {
      dropdown.addEventListener('change', () => {
        const year = yearDropdown.value;
        const make = makeDropdown.value;
        const model = modelDropdown.value;
        const trim = trimDropdown.value;
    
        if (year && make && model && trim) {
          const selectedOption = trimDropdown.options[trimDropdown.selectedIndex];
          const model_id = selectedOption?.dataset.modelId;
    
          if (model_id) {
            console.log("Selected model_id:", model_id);
            getCarDetails(model_id)
              .then(data => renderCarDetails(container, data));
          } else {
            console.warn('No model_id found for selected trim');
          }
        }
      });
    });
  });

  // Handle the display of car forms
  document.querySelectorAll('.addCarBtn').forEach(button => {
    button.addEventListener('click', () => {
      const carNum = button.getAttribute('data-car');
      document.getElementById(`carForm${carNum}`).classList.remove('hidden');
      button.style.display = 'none';
    });
  });
});

