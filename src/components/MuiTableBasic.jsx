import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid2';

export const MuiTableBasic = ({rows, columns}) => {
    return (
        <>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}    
                        initialState={{
                            pagination: {
                              paginationModel: {
                                pageSize: 5,
                              },
                            },
                          }}
                          pageSizeOptions={[5, 10, 15, 30, 50, 100]}
                          disableSelectionOnClick
                    />
                </Grid>
            </Grid>
        </>
    )
}
