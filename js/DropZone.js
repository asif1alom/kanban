import kanbanAPI from "./KanbanAPI.js";

export default class DropZone{
    static createDropzone() {
         const range = document.createRange();
        range.selectNode(document.body);

     const dropZone= range.createContextualFragment(`
        <div class="kanban__dropzone" draggable=true>
        </div>
        `).children[0];

        dropZone.addEventListener("dragover", e => {
            e.preventDefault();
            dropZone.classList.add("kanban__dropzone--active");
        });

        dropZone.addEventListener("dragleave", () => {
            dropZone.classList.remove("kanban__dropzone--active");
        });

        dropZone.addEventListener("drop", (e) => {
            e.preventDefault();
            dropZone.classList.remove("kanban__dropzone--active");
            
            const columnElement = dropZone.closest(".kanban__column");
            const columnId = Number(columnElement.dataset.id);

            const dropZonesInColumn = Array.from(columnElement.querySelectorAll(".kanban__dropzone"));

            const DroppedIndex = dropZonesInColumn.indexOf(dropZone);

            const itemId = Number(e.dataTransfer.getData("text"));

            const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`);

            const insertAfter = dropZone.parentElement.classList.contains(".kanban__item") ? dropZone.parentElement : dropZone;

            insertAfter.after(droppedItemElement);

            if (droppedItemElement.contains(dropZone)) {
                return;
            }

            kanbanAPI.updateItem(itemId, {
                columnId,
              position:DroppedIndex
            })
        });

        return dropZone;
    }
}