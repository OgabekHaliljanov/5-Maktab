
// Modal functionality
const modal = document.getElementById('teacherModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.querySelector('.close-btn');
const teacherForm = document.getElementById('teacherForm');
const teacherList = document.getElementById('teacherList');

// Open modal
openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Close modal
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Save new teacher and render in the table
teacherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const teacherName = document.getElementById('teacherName').value;
    const teacherPosition = document.getElementById('teacherPosition').value;
    const teacherExperience = document.getElementById('teacherExperience').value;

    const teachers = JSON.parse(localStorage.getItem('teachers')) || [];
    teachers.push({ teacherName, teacherPosition, teacherExperience });
    localStorage.setItem('teachers', JSON.stringify(teachers));

    renderTeachers();
    modal.style.display = 'none';
});

// Function to render the teachers in the table
function renderTeachers() {
    const teachers = JSON.parse(localStorage.getItem('teachers')) || [];
    teacherList.innerHTML = '';

    teachers.forEach((teacher, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${teacher.teacherName}</td>
                <td>${teacher.teacherPosition}</td>
                <td>${teacher.teacherExperience} лет</td>
            </tr>
        `;
        teacherList.innerHTML += row;
    });
}

// Function to render student attendance with teacher and class information
function renderAttendance() {
    const attendance = JSON.parse(localStorage.getItem('attendance')) || [];
    const teachers = JSON.parse(localStorage.getItem('teachers')) || [];

    attendance.forEach((record) => {
        const teacherInfo = teachers.find((t) => t.teacherName === record.teacherName) || {};
        const row = `
            <tr>
                <td>${record.index}</td>
                <td>${record.studentName}</td>
                <td>${record.teacherName}</td>
                <td>${teacherInfo.teacherPosition}</td>
                <td>${record.status}</td>
            </tr>
        `;
        teacherList.innerHTML += row;
    });
}

// Render teachers and attendance on page load
window.onload = () => {
    renderTeachers();
    renderAttendance();
};
