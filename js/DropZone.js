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
        })
        return dropZone;
    }
}