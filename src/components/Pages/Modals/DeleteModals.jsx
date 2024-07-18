import { Modal, Button, Notification, useToaster } from 'rsuite';
import RemindIcon from '@rsuite/icons/legacy/Remind';

const DeleteModals = ({ open, handleClose, endpoint, idRow}) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = process.env.REACT_APP_API_URL;
    const toaster = useToaster();

    const handleDelete = async () => {
        handleClose();

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            }
        };
        try {
            const response = await fetch(`${url}/${endpoint}/delete/id=${idRow}`, options);
            if (response.ok){
                toaster.push(
                    <Notification type="success" header="Eliminación Exitosa">
                        Los datos han sido eliminados correctamente.
                    </Notification>, { placement: 'topCenter' , duration: 3000 }
                );
            }else{
                const errorData = await response.json();
                    toaster.push(
                      <Notification type="error" header="Error al eliminar">
                        {errorData.message || 'Ocurrió un error al eliminar los datos.'}
                      </Notification>,
                      { placement: 'topCenter' , duration: 3000 }
                    );
            }
        } catch (error) {
            console.error('Error:', error);
            toaster.push(
                <Notification type="error" header="Error de Eliminación">
                    Ocurrió un error en la creación <br/> 
                        - Si trata de eliminar un proveedor o lote revise que no existan productos asociados <br/>
                </Notification>,
                 { placement: 'topCenter' , duration: 5000 }
            );
        }
    }; 

    return(
        <>
            <Modal backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs">
                <Modal.Body>
                    <RemindIcon style={{ color: '#ffb300', fontSize: 24, marginRight:20}} />
                    Estas seguro que quieres eliminar?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleDelete} appearance="primary">
                        Si
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteModals;