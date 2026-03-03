export default function AddModal({ onClose, onSubmit }) {
    return (
        <div id="modal-container" onClick={onClose}>
            <div id="modal-wrapper" onClick={(e) => e.stopPropagation()}>
                <div id="modal-header">
                    <h1>New Item</h1>
                    <button className="bttn-x" onClick={onClose}>X</button>
                </div>
                <form id="modal-form" onSubmit={(e) => onSubmit(e)}>
                    <div id="modal-form-content">
                        <div className="modal-form-block">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" placeholder="Modem: XB8" id="name" required/>
                        </div>
                        <div className="modal-form-block">
                            <label htmlFor="onHand">Currently On Hand</label>
                            <input type="number" name="onHand" placeholder="0" step="1" id="onHand" required/>
                        </div>
                        <div className="modal-form-block">
                            <label htmlFor="target">Minimum</label>
                            <input type="number" name="target" placeholder="1" step="1" id="target" required/>
                        </div>
                    </div>
                    <div id="modal-form-actions">
                        <button type="button" className="bttn bttn-secondary" onClick={onClose}>Close</button>
                        <button type="submit" className="bttn bttn-primary">Create Item</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
