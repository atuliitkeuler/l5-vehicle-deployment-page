import React,{useState} from 'react';
import {Button, TextField} from "@mui/material";
import { postRequest } from "../../api-service";
import Grid from "@material-ui/core/Grid";
import InputLabel from '@mui/material/InputLabel';




const DeleteVehicleComponent=()=>{
    
    const [vehicleRegNo, updateVehicleRegNo] = useState("")

    const handleVehicleRegNo=(event:any)=>{
        updateVehicleRegNo(event.target.value)
    }

    const onConfirmDelete=()=>{
        postRequest('delete',{
            "vehicle_registration_number": vehicleRegNo
        }).then((response)=>{
            console.log(response["data"])
            alert(response["data"])
            }
        )
    }

    const onCancelDelete=()=>{
        return(
            <>
            </>
        );
    }

    return(
        <div >
            <br></br>
            <br></br>
            <Grid container direction={"column"} spacing={3}>
                <Grid item md={3}>
                    <InputLabel id="vehicle-registration-number">Vehicle Registration Number</InputLabel>
                </Grid>
                <Grid item md={3}>
                    <TextField
                            title={' Vehicle Registration Number: '}
                            placeholder={'Enter Vehicle Registration Number here'}
                            helperText={"It should be a 9/10 digit string"}
                            type={'text'}
                            value={vehicleRegNo}
                            label={'Enter Vehicle Registration Number here'}
                            variant={'outlined'}
                            onChange={handleVehicleRegNo}
                            size={"small"}
                        />
                </Grid>
                <Grid item md={3}>
                    <Button
                        className='button'
                        variant="contained"
                        onClick={()=>{ window.confirm('Are you sure you wish to delete this item?') ? onConfirmDelete() : onCancelDelete()}}
                        >
                            Delete Vehicle
                    </Button>
                </Grid>
            </Grid>

        </div>
    )
}

export default DeleteVehicleComponent;