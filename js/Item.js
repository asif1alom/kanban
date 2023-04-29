
import DropZone from "./DropZone.js";
import kanbanAPI from "./KanbanAPI.js";

export default class Item{
    constructor(id, content) {

        const bottomDropZone = DropZone.createDropzone();
        this.elements.root.appendChild(bottomDropZone);

        this.elements = {};
		this.elements.root = Item.createRoot();
		this.elements.input = this.elements.root.querySelector(".kanban__item-input");
        this.elements.root.dataset.id = id;
        this.elements.input.textContent = content;
        this.content = content;
        

        const onBlur = () => {
            const newContent = this.elements.input.textContent.trim();

            if (newContent == this.content) {
                return;
            }
            this.content = newContent;
            kanbanAPI.updateItem(id, {
                
                content: this.content
            });

            console.log(this.content);
            console.log(newContent)
        };
        this.elements.input.addEventListener("blur", onBlur);
        this.elements.root.addEventListener("dblclick", () => {
            const check = confirm("Are you sure you want to delet this item?");
            if (check) {
                kanbanAPI.deletItem(id);

                this.elements.input.removeEventListener("remove", onBlur);
                this.elements.root.parentElement.removeChild(this.elements.root);
            }
        });

        this.elements.root.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text", id);
        });
        this.elements.input.addEventListener("drop", e => {
            e.preventDefault();
        });
    }
    static createRoot() {
         const range = document.createRange();
        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="kanban__item" draggable=true>
            <div class="kanban__item-input" contenteditable></div>
        </div>
        `).children[0];
    }
}