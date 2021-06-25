import React from 'react';

const Modal = (props) => {
    const { 
        id,
        title, 
        isOpen, 
        setIsOpen, 
        renderFooter,
        renderBody,
        style,
        options
    } = props;

    return (
        <React.Fragment>
            <div className={'modal fade ' + (isOpen ? 'show' : '')} 
            id={id} tabIndex="-1" 
            role="dialog"
            aria-labelledby={id + 'label'} 
            aria-hidden={isOpen ? 'false' : 'true'}
            aria-modal={isOpen ? 'true' : 'false'}
            style={isOpen ? {display: 'block'} : {display: 'none'}}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content" style={style}>
                        <div className="modal-header">
                            <div className="h5" style={{textTransform: 'capitalize'}}>{title}</div>
                            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"
                            onClick={() => setIsOpen(false)}
                            disabled={options?.disabled}
                            ></button>
                        </div>
                        <div className="modal-body">
                            {renderBody()}
                        </div>
                        <div className="modal-footer">
                            {renderFooter()}
                        </div>
                    </div>
                </div>
            </div>
            {isOpen ? <div className="modal-backdrop fade show"></div> : null}
        </React.Fragment>
    );
}

export default Modal;