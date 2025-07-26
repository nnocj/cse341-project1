// script.js

document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in');

  fadeElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('show');
    }, index * 300); // I'M staggering animations by 300ms
  });
});


async function deleteContact(contactId) {
    const confirmDelete = confirm('Are you sure you want to delete this contact?');
    if (!confirmDelete) return;

    try {
        const response = await fetch(`https://cse341-project1-abgw.onrender.com/api/deleteContact/${contactId}`, {
          method: 'DELETE'
      });

    if (response.status === 204) {
        alert('Contact deleted successfully.');
    } else {
        const data = await response.json();
        alert(`Failed to delete contact: ${data.error}`);
      }
      } catch (error) {
        alert('Error deleting contact: ' + error.message);
      }
    }

async function updateContact(contactId) {
  const updatedData = {
    name: "Updated Name",
    email: "updated@example.com",
    phone: "123-456-7890"
  };

  try {
    const response = await fetch(`https://cse341-project1-abgw.onrender.com/api/updateContact/${contactId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
       body: JSON.stringify(updatedData)
    });

    const data = await response.json();

    if (response.ok) {
      alert('Contact updated successfully');
    } else {
      alert(`Failed to update contact: ${data.error}`);
    }
  } catch (error) {
     alert('Error updating contact: ' + error.message);
  }
}