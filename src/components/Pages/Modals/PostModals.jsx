import React, { useState } from 'react';
import { Modal, Input, Button, Notification, useToaster } from 'rsuite';

const PostModals = ({ open, handleClose, labels, labelskeys, endpoint }) => {
    const [inputs, setInputs] = useState({});
    const [data, setData] = useState({});
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = process.env.REACT_APP_API_URL;
    const toaster = useToaster();
    const newlabels = labels.slice(1);
    const newlabelskeys = labelskeys.slice(1);
    
    const handleChange = (value, index) => {
        setInputs(prevInputs => ({
            ...prevInputs,
            [newlabelskeys[index]]: value
        }));
    };

    const handleSubmit = async () => {
        const formData = {};
        newlabelskeys.forEach((newlabelskeys) => {
          formData[newlabelskeys] = inputs[newlabelskeys];
        });
        setData(formData);
      
        handleClose();
      
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
          },
          body: JSON.stringify(formData),
        };
      
        try {
          const response = await fetch(`${url}/v1/${endpoint}`, options);
      
          if (response.ok) {
            toaster.push(
              <Notification type="success" header="Creación Exitosa">
                Los datos han sido creados correctamente.
              </Notification>,
              { placement: 'topCenter' , duration: 3000 }
            );
          } else {
            const errorData = await response.json();
            toaster.push(
              <Notification type="error" header="Error al Crear">
                {errorData.message || 'Ocurrió un error al crear los datos.'}
              </Notification>,
              { placement: 'topCenter' , duration: 3000 }
            );
          }
        } catch (error) {
          console.error('Error:', error);
          toaster.push(
            <Notification type="error" header="Error al Crear">
              Ocurrió un error en la creación <br/> 
               - Revise que los datos esten correctos <br/>
               - Respete los tipos de datos a ingresar <br/>
               - Los datos con (*) son obligatorios <br/>
            </Notification>,
             { placement: 'topCenter' , duration: 5000 }
          );
        }
    };
      
    return (
        <Modal open={open} onClose={handleClose} >
            <Modal.Header>
                <Modal.Title>Agregar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {newlabels.map((label, index) => (
                    <div key={index}>
                        <label>{label}</label>
                        <Input
                            onChange={(value) => handleChange(value, index)}
                            defaultValue=''
                        />
                    </div>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit} appearance="primary">
                    Guardar
                </Button>
                <Button onClick={handleClose} appearance="subtle">
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PostModals;
