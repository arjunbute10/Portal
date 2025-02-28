import { Container, Grid, Typography } from '@mui/material';
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
import { HiOutlineCloudArrowUp, HiOutlinePencil, HiOutlineTrash, HiXMark } from 'react-icons/hi2';
import PrimaryButton from '../../../../controls/FormControls/PrimaryButton';
import { ACADEMIC_DETAILS, ADD_NEW } from '../../../../util/string';


const initialRows: GridRowsProp = [
    {
        id: randomId(),
        srno: 1,
        degreeName: 'B.Tech',
        college: 'VIIT',
        stream: 'CS',
        graduationYear: 2022,
        cgpa: 9.45,
    },
    {
        id: randomId(),
        srno: 2,
        degreeName: 'M.Tech',
        college: 'VIT',
        stream: 'IT',
        graduationYear: 2020,
        cgpa: 9.00,
    },
    {
        id: randomId(),
        srno: 3,
        degreeName: 'M.Tech',
        college: 'COEP',
        stream: 'ENTC',
        graduationYear: 2019,
        cgpa: 8.50,
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

interface AcademicDetailsProps {
}


const AcademicDetails: React.FC<AcademicDetailsProps> = () => {
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
            flex:1       
        },
        {
            field: 'degreeName',
            headerName: 'Degree Name',
            editable: true, 
            flex:1  
        },
        {
            field: 'college',
            headerName: 'College',
            editable: true,
            flex:1  
        },
        {
            field: 'stream',
            headerName: 'Stream',
            editable: true,
            flex:1  
        },
        {
            field: 'graduationYear',
            headerName: 'Graduation Year',
            editable: true,
            flex:1  
        },
        {
            field: 'cgpa',
            headerName: 'CGPA',
            editable: true,
            type: 'number',
            flex:1  
             
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            cellClassName: 'actions',
            flex:1, 
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
                <Typography textTransform='uppercase' variant="h6" color="primary">
                    {ACADEMIC_DETAILS}
                </Typography>
            </Grid>
                <DataGrid
                    rowHeight={48} 
                    hideFooter={true}
                    rows={rows}
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


export default AcademicDetails;
