import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Container, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridEventListener,
    GridRowEditStopReasons,
    GridRowId,
    GridRowModel,
    GridRowModes,
    GridRowModesModel,
    GridRowsProp,
    GridToolbarContainer,
} from '@mui/x-data-grid';
import {
    randomArrayItem,
    randomId
} from '@mui/x-data-grid-generator';
import * as React from 'react';
import PrimaryButton from '../../../../controls/FormControls/PrimaryButton';
import { ADD_NEW, DOCUMENTS } from '../../../../util/string';
import { HiOutlineCloudArrowUp, HiXMark, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2';

const initialRows: GridRowsProp = [
    {
        id: randomId(),
        srno: 1,
        documentType: 'Aadhar Card',
        documentId: 1908700,
        reason: 'Verification',
        upload: '',
    },
];

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <Container maxWidth='xl' className='bg-tableHeader rounded-t-[12px]'>
            <Grid container className='flex justify-end' >
                <GridToolbarContainer className='my-2'>
                    <PrimaryButton variant='outlined' size="medium" onClick={handleClick} label={ADD_NEW}>
                    </PrimaryButton>
                </GridToolbarContainer>
            </Grid>
        </Container>
    );
}

interface DocumentsProps {
}


const Documents: React.FC<DocumentsProps> = () => {
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
        {
            field: 'srno',
            headerName: 'Sr No',
            editable: true,
            width: 90,
            flex: 1
        },
        { field: 'documentType', headerName: 'Document Type', width: 200, editable: true, flex: 1 },
        {
            field: 'documentId',
            headerName: 'Document ID',
            type: '',
            width: 150,
            align: 'left',
            headerAlign: 'left',
            editable: true,
            flex: 1
        },
        {
            field: 'reason',
            headerName: 'Reason',
            type: 'string',
            flex: 1,
            width: 300,
            editable: true,
        },
        {
            field: 'upload',
            headerName: 'Upload',
            type: '',
            width: 180,
            editable: true,
            flex: 1
        },
        {
            field: 'actions',
            flex: 1,
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<HiOutlineCloudArrowUp size='22px' />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                            color='success'
                        />,
                        <GridActionsCellItem
                            icon={<HiXMark size='22px' />}
                            label="Cancel"
                            onClick={handleCancelClick(id)}
                            color="warning"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<HiOutlinePencil size='22px' />}
                        label="Edit"
                        sx={{
                            color: 'text.primary',
                        }}
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<HiOutlineTrash size='22px' />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="error"
                    />,
                ];
            },
        },
    ];

    return (
        <Grid>
            <Grid sx={{ mb: 2 }}>
                <Typography color="primary" variant='h6' textTransform='uppercase'>
                    {DOCUMENTS}
                </Typography>
            </Grid>
            <DataGrid
                hideFooter={true}
                rows={rows}
                rowHeight={48} 
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
            />
        </Grid>
    );
}


export default Documents;
