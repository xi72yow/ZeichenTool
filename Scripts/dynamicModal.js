let modalSpace = null;
/**
 *
 * @param {string} title
 * @param {string} description content of modal body
 * @param {string} yesBtnLabel label of Yes button
 * @param {string} noBtnLabel label of No button
 * @param {function} callback callback function when click Yes button
 * @param {function} callback callback function when click No button
 *
 */
const showModal = (
  title,
  description,
  yesBtnLabel = "Yes",
  noBtnLabel = "Cancel",
  callbackYes,
  callbackNo
) => {
  return new Promise((resolve, reject) => {
    if (modalSpace !== null) {
      modalSpace.remove();
    }

    modalSpace = document.createElement("div");
    modalSpace.innerHTML = `
    <div class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-light">
            <h5 class="modal-title">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>${description}</p>
          </div>
          <div class="modal-footer bg-light">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${noBtnLabel}</button>
            <button type="button" class="btn btn-primary modal-success-btn" data-bs-dismiss="modal">${yesBtnLabel}</button>
          </div>
        </div>
      </div>
    </div>
  `;

    modalSpace.querySelector(".modal-success-btn").onclick = callbackYes;
    modalSpace.querySelector(".btn-secondary").onclick = callbackNo;
    modalSpace.querySelector(".btn-close").onclick = callbackNo;

    document.body.append(modalSpace);

    var modal = new bootstrap.Modal(modalSpace.querySelector(".modal"));
    modal.show();
  });
};
