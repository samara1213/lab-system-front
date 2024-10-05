import { Paper } from "@mui/material"


export const MuiPaperPage = ({ children }) => {
    return (
        <>
            <Paper elevation={10} sx={{
                marginTop: 2,
                padding: 2,
                borderRadius: 2
            }}>
                {children}
            </Paper>
        </>

    )
}
