const STORAGE_KEY = 'feedback-form-state';

let formData = {
    email: "",
    message: ""
}

const form = document.querySelector('.feedback-form');

function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      
      formData.email = parsedData.email || "";
      formData.message = parsedData.message || "";

      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;
    } catch (error) {
      console.error("Error parsing saved data from localStorage:", error);
    }
  }
}

populateForm();

form.addEventListener("input", (e) => {
    formData[e.target.name] = e.target.value.trim();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log("Form data submitted:", formData);

  localStorage.removeItem(STORAGE_KEY);

  formData = {
    email: "",
    message: ""
  };

  form.reset();
});