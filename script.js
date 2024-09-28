document.addEventListener('DOMContentLoaded', () => {
    const noteList = document.getElementById('noteList');
    const noteModal = document.getElementById('noteModal');
    const closeModal = document.querySelector('.close');
    const createNoteBtn = document.getElementById('createNoteBtn');
    const noteForm = document.getElementById('noteForm');
    const noteIdInput = document.getElementById('noteId');
    const noteTitleInput = document.getElementById('noteTitle');
    const noteContentInput = document.getElementById('noteContent');

    function fetchNotes() {
        fetch('get_notes.php')
            .then(response => response.json())
            .then(data => {
                displayNotes(data);
            })
            .catch(error => console.error('Error fetching notes:', error));
    }

    function displayNotes(notes) {
        noteList.innerHTML = '';
        notes.forEach(note => {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('note');
            noteDiv.innerHTML = `
                <h2>${note.title}</h2>
                <p>${note.content}</p>
                <button onclick="editNote(${note.id})">Edit</button>
                <button onclick="deleteNote(${note.id})">Delete</button>
            `;
            noteList.appendChild(noteDiv);
        });
    }

    function openModal() {
        noteModal.style.display = 'flex';
    }

    function closeModalFunc() {
        noteModal.style.display = 'none';
        noteForm.reset();
        noteIdInput.value = '';
    }

    function saveNote() {
        const id = noteIdInput.value;
        const title = noteTitleInput.value;
        const content = noteContentInput.value;

        fetch('create_note.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, title, content })
        })
        .then(response => response.json())
        .then(() => {
            fetchNotes();
            closeModalFunc();
        })
        .catch(error => console.error('Error saving note:', error));
    }

    function deleteNote(id) {
        if (confirm('Are you sure you want to delete this note?')) {
            fetch('delete_note.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            })
            .then(response => response.json())
            .then(() => {
                fetchNotes();
            })
            .catch(error => console.error('Error deleting note:', error));
        }
    }

    window.editNote = function(id) {
        fetch(`get_notes.php`)
            .then(response => response.json())
            .then(notes => {
                const note = notes.find(n => n.id === id);
                if (note) {
                    noteIdInput.value = note.id;
                    noteTitleInput.value = note.title;
                    noteContentInput.value = note.content;
                    openModal();
                }
            })
            .catch(error => console.error('Error fetching note for editing:', error));
    };

    createNoteBtn.addEventListener('click', () => {
        openModal();
    });

    closeModal.addEventListener('click', closeModalFunc);
    noteForm.addEventListener('submit', (event) => {
        event.preventDefault();
        saveNote();
    });

    fetchNotes();
});
