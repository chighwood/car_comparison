import { getModels, getTrims, getCarDetails } from './api.js';
import { renderCarDetails } from './car.js';

document.addEventListener("DOMContentLoaded", () => {

  const hardcodedMakes = ["Toyota", "Ford", "Chevrolet", "Honda", "Jeep", "Nissan", "Kia", "Subaru", "Hyundai", "GMC", "Lexus", "Mazda", "BMW", "Volkswagen", "Cadillac", "Mercedes-Benz", "Acura", "Volvo", "Porsche"];
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
        container.innerHTML = '';  // Clear car details when year or make changes
      }
    });

    makeDropdown.addEventListener('change', () => {
      const year = yearDropdown.value;
      const make = makeDropdown.value;
      if (year && make) {
        getModels(year, make, `modelDropdown${num}`);
        trimDropdown.innerHTML = '<option value="">Select Trim</option>';
        container.innerHTML = '';  // Clear car details when make changes
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

    // Render car details when trim is selected
    [makeDropdown, modelDropdown, trimDropdown].forEach(dropdown => {
      dropdown.addEventListener('change', () => {
        const year = yearDropdown.value;
        const make = makeDropdown.value;
        const model = modelDropdown.value;
        const trim = trimDropdown.value;

        if (year && make && model && trim) {
          getCarDetails(year, make, model, trim)
            .then(data => renderCarDetails(container, data));
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

