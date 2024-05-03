import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import GeneralConst from '../resource/General.js';

const DeleteAccountConfirmationModal = ({
  username,
  setIsShowModalDelete = () => {}
}) => {

  const closeHandler = () =>{
    setIsShowModalDelete(false);
  }

  return(
    <>
      <Modal show={true} onHide={closeHandler}>
        <Modal.Header closeButton>
          <Modal.Title>
            {GeneralConst.DELETE_ACCOUNT_CONFIRMATION_TITLE}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>          
          <p>{GeneralConst.DELETE_ACCOUNT_CONFIRMATION_TEXT.replace("{username}", username)}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="danger"
          >
            {GeneralConst.DELETE_ACCOUNT_YES_BTN}
          </Button>
          <Button 
            variant="secondary"
            onClick={closeHandler}
          >
            {GeneralConst.BTN_CLOSE}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteAccountConfirmationModal