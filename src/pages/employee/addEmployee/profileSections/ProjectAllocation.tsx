import * as React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';
import { Container, Grid, Typography } from '@mui/material';
import PrimaryButton from '../../../../controls/FormControls/PrimaryButton';
import { ADD_NEW, PROJECT_ALLOCATIONS } from '../../../../util/string';
import { HiOutlineCloudArrowUp, HiXMark, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
    return randomArrayItem(roles);
};

const initialRows: GridRowsProp = [
    {
        id: randomId(),
        srno: 1,
        projectName: 'SEP',
        role: randomRole(),
        projectCode: '1ML98',
        startDate: randomCreatedDate(),
        endDate: randomCreatedDate(),
    },
    {
        id: randomId(),
        srno: 2,
        projectName: 'CLM',
        role: randomRole(),
        projectCode: '0CLMD',
        startDate: randomCreatedDate(),
        endDate: randomCreatedDate(),
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

interface ProjectAllocationProps {
}


const ProjectAllocation: React.FC<ProjectAllocationProps> = () => {
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
        { field: 'projectName', headerName: 'Project Name', width: 190, editable: true },
        {
            field: 'role',
            headerName: 'Role',
            type: '',
            width: 190,
            align: 'left',
            headerAlign: 'left',
            editable: true,
            flex: 1 
        },
        {
            field: 'projectCode',
            headerName: 'Project Code',
            type: '',
            width: 150,
            align: 'left',
            headerAlign: 'left',
            editable: true,
            flex: 1 
        },
        {
            field: 'startDate',
            headerName: 'Start date',
            type: 'date',
            width: 180,
            editable: true,
            flex: 1 
        },
        {
            field: 'endDate',
            headerName: 'End date',
            type: 'date',
            width: 180,
            editable: true,
            flex: 1 
        },
        {
            field: 'actions',
            flex: 1 ,
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
                <Typography color="primary" variant="h6" textTransform='uppercase'>
                    {PROJECT_ALLOCATIONS}
                </Typography>
            </Grid>
                <DataGrid
                    hideFooter={true} 
                    rowHeight={48} 
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


export default ProjectAllocation;
