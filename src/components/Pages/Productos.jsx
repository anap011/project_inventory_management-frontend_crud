import './styles.css';
import React, { useState } from 'react';
import { Table, Button } from 'rsuite';
import GetRequest from './HttpRequest/GetRequest';
import PostModals from './Modals/PostModals';
import PutModals from './Modals/PutModals';
import DeleteModals from './Modals/DeleteModals';

const labels = ['Id', 'Nombre', 'Descripción', 'Cantidad', 'Lote Id', 'Proveedor Id'];
const labelskeys = ['producto_Id', 'producto_Nombre', 'descripcion', 'cantidad', 'lote_id', 'proveedor_id'];
const endpoint = "productos";

const Productos = () => {
  const {Column, HeaderCell, Cell} = Table;
  const {data} = GetRequest(endpoint);
  const [selectedRow, setSelectedRow] = useState(null);
  const [idRow, setIdRow] = useState(null);

  // Post Modals
  const [openPostModal, setOpenPostModal] = useState(false);
  const handleOpenPostModal = () => setOpenPostModal(true);
  const handleClosePostModal = () => setOpenPostModal(false);

  // Put Modals
  const [openPutModal, setOpenPutModal] = useState(false);
  const handleOpenPutModal = (rowData) => {
    setSelectedRow(rowData);
    setOpenPutModal(true);
  };
  const handleClosePutModal = () => setOpenPutModal(false);

  // Delete Modals
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = (rowData) => {
    setIdRow(rowData.producto_Id);
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  
  return (
    <div className='dashboard'>
      <div className='titleTable'>Productos</div>
      <div className='buttom-add'>
        <Button appearance="default" onClick={handleOpenPostModal}>Agregar</Button>
        <PostModals open={openPostModal} handleClose={handleClosePostModal} labels={labels} labelskeys={labelskeys} endpoint={endpoint} />
      </div>
      <div className='table'>
        <Table
          height={450}
          headerHeight={50}
          rowHeight={52}
          data={data}
        >
          <Column width={60} align="center" resizable className="column">
            <HeaderCell className="column-item">{labels[0]}</HeaderCell>
            <Cell dataKey={labelskeys[0]} />
          </Column>

          <Column width={150} resizable className="column">
            <HeaderCell>{labels[1]}</HeaderCell>
            <Cell dataKey={labelskeys[1]} />
          </Column>

          <Column width={250} resizable className="column">
            <HeaderCell>{labels[2]}</HeaderCell>
            <Cell dataKey={labelskeys[2]} />
          </Column>

          <Column width={90} align="center" resizable className="column">
            <HeaderCell>{labels[3]}</HeaderCell>
            <Cell dataKey={labelskeys[3]} />
          </Column>

          <Column width={100} align="center" resizable className="column">
            <HeaderCell>{labels[4]}</HeaderCell>
            <Cell dataKey={labelskeys[4]} />
          </Column>

          <Column width={100} align="center" resizable className="column">
            <HeaderCell>{labels[5]}</HeaderCell>
            <Cell dataKey={labelskeys[5]} />
          </Column>

          <Column width={100} align="center" className="column">
            <HeaderCell></HeaderCell>
            <Cell style={{ padding: '6px' }}>
              {rowData => (
                <Button appearance="default" onClick={() => handleOpenPutModal(rowData)}>Editar</Button>
              )}
            </Cell>
          </Column>
            
          <Column width={100} align="center" className="column">
            <HeaderCell></HeaderCell>
            <Cell style={{ padding: '6px' }}>
              {rowData => (
                <Button appearance="default" onClick={() => handleOpenDeleteModal(rowData)}>Eliminar</Button>
              )}
            </Cell>
          </Column>
        </Table>
        <PutModals open={openPutModal} handleClose={handleClosePutModal} labels={labels} labelskeys={labelskeys} endpoint={endpoint} selectedRow={selectedRow} />
        <DeleteModals open={openDeleteModal} handleClose={handleCloseDeleteModal} endpoint={endpoint} idRow={idRow}/>
      </div>
    </div>
  );
}

export default Productos;
