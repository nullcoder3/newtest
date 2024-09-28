<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Note Manager</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
    
</head>
<body>
    <header>
        <h1>Note Manager</h1>
        <nav>
            <button id="createNoteBtn">Create New Note</button>
        </nav>
    </header>

    <main>
        <section id="noteList">
            <!-- Notes will be dynamically inserted here -->
        </section>
    </main>

    <footer>
        <p>&copy; 2024 Note Manager</p>
    </footer>

    <!-- Modal for creating/editing notes -->
    <div id="noteModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2 id="modalTitle">Create/Edit Note</h2>
            <form id="noteForm">
                <input type="hidden" id="noteId" name="noteId">
                <label for="noteTitle">Title:</label>
                <input type="text" id="noteTitle" name="noteTitle" required>
                <label for="noteContent">Content:</label>
                <textarea id="noteContent" name="noteContent" rows="5" required></textarea>
                <button type="submit">Save</button>
            </form>
        </div>
    </div>

</body>
</html>

