document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('openModalBtn');
    const modal = document.getElementById('teacherModal');
    const closeModalBtn = document.querySelector('.close-btn');
    const teacherForm = document.getElementById('teacherForm');
    const teacherList = document.getElementById('teacherList');

    // Open the modal
    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Close the modal
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close the modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Add teacher to the list
    teacherForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const teacherName = document.getElementById('teacherName').value;
        const teacherPosition = document.getElementById('teacherPosition').value;
        const teacherExperience = document.getElementById('teacherExperience').value;

        const teacherData = {
            name: teacherName,
            position: teacherPosition,
            experience: teacherExperience
        };

        addTeacherToTable(teacherData);
        saveTeacherToLocalStorage(teacherData);
        teacherForm.reset();
        modal.style.display = 'none';
    });

    // Add teacher to the table
    function addTeacherToTable(teacherData) {
        const rowCount = teacherList.children.length + 1;
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${rowCount}</td>
            <td>${teacherData.name}</td>
            <td>${teacherData.position}</td>
            <td>${teacherData.experience}</td>
            <td><button class="action-btn" onclick="removeTeacher(this)">Удалить</button></td>
        `;
        
        teacherList.appendChild(row);
    }

    // Save teacher data to local storage
    function saveTeacherToLocalStorage(teacherData) {
        let teachers = JSON.parse(localStorage.getItem('teachers')) || [];
        teachers.push(teacherData);
        localStorage.setItem('teachers', JSON.stringify(teachers));
    }

    // Remove teacher from the list
    window.removeTeacher = function(button) {
        const row = button.closest('tr');
        const name = row.cells[1].textContent;

        let teachers = JSON.parse(localStorage.getItem('teachers')) || [];
        teachers = teachers.filter(teacher => teacher.name !== name);
        localStorage.setItem('teachers', JSON.stringify(teachers));

        row.remove();
    };

    // Load teachers from local storage
    function loadTeachers() {
        let teachers = JSON.parse(localStorage.getItem('teachers')) || [];
        teachers.forEach((teacherData, index) => {
            addTeacherToTable(teacherData);
        });
    }

    loadTeachers();
});
