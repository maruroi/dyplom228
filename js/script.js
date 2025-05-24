const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
    hamMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
});


function switchWorks(index, clickedBtn) {
    document.querySelectorAll('.our-works-items').forEach(item => {
        item.style.display = 'none';
    });

    document.getElementById(`works-set-${index}`).style.display = 'block';

    document.querySelectorAll('.works-headline button').forEach(btn => {
        btn.classList.remove('active');
    });

    clickedBtn.classList.add('active');
}

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); 
        }
    });
    }, {
        threshold: 0.1 
    });

    elements.forEach(el => {
        observer.observe(el);
    });
});

const dropdown = document.getElementById("phonePickerDropdown");
const phoneInput = document.getElementById("phoneNumber");
const flag = document.getElementById("selectedFlag");

function togglePhoneDropdown() {
    dropdown.classList.toggle("show");
}

function selectPhoneCountry(code, prefix) {
    flag.src = `https://flagcdn.com/w40/${code}.png`;
    phoneInput.value = prefix + " ";
    dropdown.classList.remove("show");
}

document.addEventListener("click", function (e) {
    const picker = document.querySelector(".number-picker");
    if (picker && !picker.contains(e.target)) {
        dropdown.classList.remove("show");
    }
});

async function submitContactForm(event) {
    event.preventDefault();
    console.log('Form submission started');
    
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    const data = {};
    
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    console.log('Sending data:', data);

    try {
        const response = await fetch('http://localhost:3000/submit-contact', {  // Changed endpoint path
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const result = await response.json();
        console.log('Success:', result);
        alert('Message sent successfully!');
        form.reset();
    } catch (error) {
        console.error('Error details:', error);
        alert('Failed to send message. Please try again.');
    }
}

async function submitQuestionForm(event) {
    event.preventDefault();
    
    const form = document.getElementById('questionForm');
    const formData = new FormData(form);
    const data = {};
    
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    console.log('Sending question data:', data);

    try {
        const response = await fetch('http://localhost:3000/submit-question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log('Server response:', result);
        
        if (response.ok) {
            alert('Question sent successfully!');
            form.reset();
        } else {
            throw new Error(result.error || 'Server error');
        }
    } catch (error) {
        console.error('Error details:', error);
        alert('Failed to send question: ' + error.message);
    }
}

document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:3000/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
    });

    if (response.ok) {
        alert('Message sent successfully!');
        this.reset();
    } else {
        alert('Failed to send message.');
    }

    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred.');
    }
});

// document.getElementById('contactForm').addEventListener('submit', async function(event) {
//     event.preventDefault();

//     const formData = new FormData(this);
//     const data = Object.fromEntries(formData.entries());

//     try {
//         const response = await fetch('https://nexgen-backend.onrender.com/api/messages', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data)
//         });

//         if (response.ok) {
//             alert('Message sent successfully!');
//             this.reset();
//         } else {
//             alert('Failed to send message.');
//         }

//     } catch (error) {
//         console.error('Error submitting form:', error);
//         alert('An error occurred.');
//     }
// });


window.addEventListener("scroll", function () {
    const nav = document.querySelector("nav");
    if (window.scrollY > 50) {
        nav.style.backgroundColor = "rgba(26, 26, 26, 0.7)"; 
    } else {
        nav.style.backgroundColor = "#1A1A1A"; 
    }
});