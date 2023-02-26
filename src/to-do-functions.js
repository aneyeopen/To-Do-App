
export const domManipulator = (function () {


    function openModal(modal, overlay) {
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
        return;
    };

    function closeModal(modal, overlay) {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
        // resetForm() //
        return;
    }


    function showToDos(toDos, element){

    }

    return {
        openModal,
        closeModal
    }
})();