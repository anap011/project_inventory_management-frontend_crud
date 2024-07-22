import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, Notification, useToaster } from 'rsuite';

const PutModals = ({ open, handleClose, labels, labelskeys, endpoint, selectedRow }) => {
    const [inputs, setInputs] = useState({});
    const [data, setData] = useState({});
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = process.env.REACT_APP_API_URL;
    const toaster = useToaster();

    useEffect(() => {
        if (selectedRow) {
            setInputs(selectedRow);
        }
    }, [selectedRow]);

    const handleChange = (value, key) => {
        setInputs(prevInputs => ({
            ...prevInputs,
            [key]: value
        }));
    };

    const handleUpdate = async () => {
        const formData = {};
        labelskeys.forEach(key => {
            formData[key] = inputs[key];
        });
        setData(formData);

        handleClose();

        // Comparar formData con selectedRow
        const isEqual = JSON.stringify(formData) === JSON.stringify(selectedRow);

        if (!isEqual) {
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey
                },
                body: JSON.stringify(formData)
            };
            try {
                const response = await fetch(`${url}/v1/${endpoint}/${inputs[labelskeys[0]]}`, options);
                if (response.ok){
                    toaster.push(
                        <Notification type="success" header="Actualización Exitosa">
                            Los datos han sido actualizados correctamente.
                        </Notification>, { placement: 'topCenter' , duration: 3000 }
                    );
                }else{
                    const errorData = await response.json();
                    toaster.push(
                      <Notification type="error" header="Error al actualizar">
                        {errorData.message || 'Ocurrió un error al actualizar los datos.'}
                      </Notification>,
                      { placement: 'topCenter' , duration: 3000 }
                    );
                }

            } catch (error) {
                console.log('Error:', error);
                toaster.push(
                    <Notification type="error" header="Error de Actualización">
                        Ocurrió un error en la creación <br/> 
                        - Revise que los datos esten correctos <br/>
                        - Respete los tipos de datos a ingresar <br/>
                        - Los datos con (*) son obligatorios <br/>
                    </Notification>,
                     { placement: 'topCenter' , duration: 5000 }
                );
            }
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Editar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {labels && labels.map((label, index) => (
                    <div key={index}>
                    <label>{label}</label>
                    <Input
                        disabled={index === 0} 
                        onChange={(value) => handleChange(value, labelskeys[index])}
                        value={inputs[labelskeys[index]]}
                    />
                    </div>
                ))}
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={handleUpdate} appearance="primary">
                    Actualizar
                </Button>
                <Button onClick={handleClose} appearance="subtle">
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PutModals;
