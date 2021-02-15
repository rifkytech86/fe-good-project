import React, {Component} from 'react';
import {Modal} from "reactstrap";

class Confirm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {isOpen, onClickHandleClose, onClickHandleDelete, data} = this.props
        return (
            <div>
                <Modal
                    isOpen={isOpen}
                >
                    <div className="modal-header">
                        <h5 className="modal-title mt-0" id="myModalLabel">
                            Konfirmasi
                        </h5>
                        <button
                            type="button"
                            onClick={onClickHandleClose}
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h5>Apakah anda yakin untuk menghapus data ?</h5>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            onClick={onClickHandleClose}
                            className="btn btn-secondary waves-effect"
                            data-dismiss="modal"
                        >
                            Tutup
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary waves-effect waves-light"
                            onClick={onClickHandleDelete}
                            data={data}
                        >
                            Ya
                        </button>
                    </div>
                </Modal>

            </div>
        );
    }
}

export default Confirm;