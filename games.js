// Selecting draggable and droppable elements
const items = document.querySelectorAll('.box'); // Draggable items
const targets = document.querySelectorAll('.droppable'); // Droppable targets
let score = 0;

// DRAG START
items.forEach(item => {
    item.addEventListener('dragstart', event => {
        event.dataTransfer.setData('text', event.target.id);
        item.classList.add('dragging');
    });
});

// DROP
targets.forEach(target => {
    target.addEventListener('dragover', event => {
        event.preventDefault(); // Allow dropping
    });

    target.addEventListener('drop', event => {
        event.preventDefault();

        const draggedItemId = event.dataTransfer.getData('text');
        const draggedItem = document.getElementById(draggedItemId);
        const matchId = target.getAttribute('data-draggable-id');

        // Check if the dragged item matches the target
        if (draggedItemId === matchId) {
            target.appendChild(draggedItem);  // Move item to correct spot
            target.classList.add('correct');  // Add success indication
            score += 1; // Increment score
            document.getElementById('remarks').textContent = "Correct!";
        } else {
            document.getElementById('remarks').textContent = "Try Again!";
        }
        
        document.getElementById('scores').textContent = score; // Update score display
    });
});

// DRAG END (resetting styles)
items.forEach(item => {
    item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
    });
});