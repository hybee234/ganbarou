import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { Box, Typography } from '@mui/material';
// import { data } from './makeData';


export default function TaskList (props) {

    const me = props
    console.log ("me", me)

    const data = me.me.tasks

    console.log("data", data)


    const columns = useMemo(
        //column definitions...
        () => [
            {
                accessorKey: 'created_dt',
                // accessorFn: (dataRow) => dataRow.toLocaleString(),
                header: 'Created',
                // size: 50,
            },
            {
                accessorKey: 'title',
                header: 'Title',
            },
            {
                accessorKey: 'review_dt',
                header: 'Review Date',
            },
            {
                accessorKey: 'complete_flag',
                header: 'Complete',
            },
            {
                accessorKey: 'stakeholder',
                header: 'Stakeholder',
            },
            {
                accessorKey: 'Stakeholder',
                header: 'Stakeholder',
            },
        ],
        [],
        //end
    );

    const table = useMaterialReactTable({
        columns,
        data,
        enableExpandAll: true, //disable expand all button
        muiDetailPanelProps: () => ({
        sx: (theme) => ({
            backgroundColor:
            theme.palette.mode === 'dark'
                ? 'rgba(255,210,244,0.1)'
                : 'rgba(0,0,0,0.1)',
        }),
        }),
        //custom expand button rotation
        muiExpandButtonProps: ({ row, table }) => ({
        onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), //only 1 detail panel open at a time
        sx: {
            transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
            transition: 'transform 0.2s',
        },
        }),
        //conditionally render detail panel
        // renders detail panel if data has notes populated.
        renderDetailPanel: ({ row }) =>
        
        
        row.original.note ? (
            
            row.original.note.map( (note) => {
                return (
                    <div className="flexwrap p-5 m-1 input-field" key={note.note_id}>
                        <div className= "w-full flex justify-between">
                            <div>Type: {note.note_type} </div> 
                            <div>{note.note_author.username}, {note.note_dt}</div>                            
                        </div>
                        <div className="w-full pt-5">{note.note_text}</div>
                    </div>
                )
            })

            // <Box
            // sx={{
            //     display: 'grid',
            //     margin: 'auto',
            //     gridTemplateColumns: '1fr 1fr',
            //     width: '100%',
            // }}
            // >
            //     <Typography>Address: {row.original.address}</Typography>
            //     <Typography>City: {row.original.city}</Typography>
            //     <Typography>State: {row.original.state}</Typography>
            //     <Typography>Country: {row.original.country}</Typography>
            // </Box>

        ) : null,


        
    });

    return <MaterialReactTable table={table} />;
};

