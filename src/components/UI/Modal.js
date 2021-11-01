import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter, 
} from 'reactstrap';
import './Modal.scss'

const ModalComponent = props=>{
    return(
        <div>
          <Modal isOpen={props.opened} toggle={props.toggle}  className='modal-dialog' >
            <ModalHeader toggle={props.toggle}>{props.header}</ModalHeader>
            <ModalBody>
             {props.children}
            </ModalBody>
            <ModalFooter>
                {props.footer}
            </ModalFooter>
          </Modal>
        </div>

    )

}


export default ModalComponent;