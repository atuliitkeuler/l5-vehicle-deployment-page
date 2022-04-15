import React,{useState} from 'react';
import {Button, TextField} from "@mui/material";
import { postRequest } from "../../api-service";
import Grid from "@material-ui/core/Grid";
import InputLabel from '@mui/material/InputLabel';
import UpdateForm from './update_form.component';


const UpdateVehicleComponent=()=>{

    const [vehicleRegNo, updateVehicleRegNo] = useState("")

    const handleVehicleRegNo=(event:any)=>{
        updateVehicleRegNo(event.target.value)
    }
    const [changeVehicleDetails, updateChangeVehicleDetails]=useState(false)

    const onConfirmUpdate=()=>{
        postRequest('verifyregno',{
            "vehicle_registration_number": vehicleRegNo
        }).then((response)=>{
            if(response["data"]=="Vehicle with this reg no is not present"){
                alert("Wrong Registration Number")
            }else{
                updateChangeVehicleDetails(true)
            }
            }
        )
    }

    const onCancelUpdate=()=>{
        return(
            <>
            </>
        );
    }

    return(
        <div>
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
                        onClick={()=>{ window.confirm('Are you sure you wish to update this vehicle?') ? onConfirmUpdate() : onCancelUpdate()}}
                        >
                            Update Vehicle
                    </Button>
                </Grid>
            </Grid>
            <UpdateForm allowed={changeVehicleDetails} />
        </div>
    );
}
export default UpdateVehicleComponent;
