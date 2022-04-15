import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import Grid from "@material-ui/core/Grid";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import './l5_vehicle_deployment.component.css'
import Box from '@mui/material/Box';
import { postRequest } from "../../api-service";


const formComponent=()=>{

    const HUB_NAMES=['Faridabad','Greater Noida','GurGaon-Kataria Chowk','Gurgaon-SPR', 'Gurgaon-Flipkart','Gurgaon-Hero Honda Chowk','Noida-Sector 80','Noida-Sector 63','Delhi-Ghazipur','Delhi-Wazirpur','Delhi-Dwarka-Matiala','Gurgaon-Wazirabad','Delhi-Punjabi Bagh','Delhi-Peeragarhi','Delhi-Okhla Phase 2','Delhi- Mandoli','Ghaziabad-Mohan Nagar','Haryana Chandu','Noida-Sector 67','Test-Hub'];
    const CLIENT_NAMES=['Euler Lease', 'Big Basket', 'Delhivery', 'Licious', 'ECom', 'Flipkart', 'Jiomart', 'Udaan', 'Peel-Works', 'Panasonic', 'Udaan Electronics', 'Amplus']
    const CLIENT_HUB_NAMES=['Big Basket-Okhla', 'Big Basket-Mohan Estate', 'Big Basket-SPR', 'Big Basket-Wazirabad', 'Big Basket-Katariya', 'Licious-Kalkaji', 'Licious-Lajpat Nagar', 'Licious-Sikanderpur', 'ECom-Mohan Estate', 'ECom-Chakkarpur', 'Flipkart-Hero Honda Chowk', 'Jiomart-Sector 15', 'Jiomart-Sector 31', 'Euler Lease-Okhla', 'Euler Lease-Gurgaon', 'Big Basket-Ghazipur', 'Big Basket-Mohan Nagar', 'Big Basket-Noida Sector 63', 'Big Basket-Noida Sector 80', 'Big Basket-Greater Noida', 'Peel-Works-Mandoli', 'Licious-Ghaziabad', 'Licious-West Vinor Nagar', 'Flipkart-Sahibabad Site 4', 'ECom-Patparganj', 'Euler Lease-Ghazipur', 'Euler Lease-Mandoli', 'Euler Lease-Mohan Nagar', 'Big Basket-Peeragarhi', 'Licious-Patel Nagar', 'Licious-Paschim Vihar', 'Euler Lease-Punjabi Bagh', 'Flipkart-Wazirpur', 'Udaan-Okhla', 'Big Basket-Lawrence Road', 'Udaan-Mandoli', 'Peel-Works-Dwarka', 'Big Basket-Chandu', 'Panasonic-Udyog Vihar-Gurugram', 'Flipkart-Okhla Phase 1', 'Udaan Electronics-Praladpur', 'ECom-Samalka']
    
    const [formData, updateFormData] = useState({
                                                    telemetryIMEI:"",
                                                    vehicleRegNo:"",
                                                    vehicleChassisNo:"",
                                                    batteryEBIN:"",
                                                    chargerSNo:"",
                                                    passCode:"",
                                                    telemetryVendor:"",
                                                    hubName:"",
                                                    clientName:"",
                                                    clientHubName:"",
                                                    registerer:""
                                                });


    const onSubmit=()=>{
        if(formData.telemetryIMEI==null){
            alert('Please Enter Telemetry IMEI')
        }else if(formData.vehicleRegNo==null){
            alert('Please Enter Vehicle Registration Number')
        }else if(formData.vehicleChassisNo==""){
            alert('Please Enter Vehicle Chassis Number')
        }else if(formData.batteryEBIN==""){
            alert('Please Enter Battery EBIN')
        }else if(formData.chargerSNo==""){
            alert("Please Enter Charger Serial Number")
        }else if(formData.passCode==""){
            alert("Please Enter Pass Code")
        }else if(formData.telemetryVendor==""){
            alert("Please Enter Telemetry Vendor")
        }else if(formData.hubName==""){
            alert("Please Enter Hub Name")
        }else if(formData.clientName==""){
            alert("Please Enter Client Name")
        }else if(formData.clientHubName==""){
            alert("Please Enter Client Hub Name")
        }else if(formData.telemetryIMEI.length!=15){
            alert("enter Correct Telemetry IMEI")
        }else{
            postRequest('register',{
                ...formData
            }).then((data)=>{
                //below code will change depending onn the structure of data
                alert(data);
            }) 
        }
    }


    return(
        <Box sx={{marginLeft:20,overflowY:'scroll', maxHeight:'100vh'}}>
        <h2>l-5 Vehicle Deployment Form</h2>
        
        <div className="form-area">
        

        <Grid key={1} container direction={"row"} spacing={3}>
            <Grid item  md={3}>
                <InputLabel id="telemetry-imei">Telemetry IMEI</InputLabel>
            </Grid>
            <Grid item md={3}>
                <TextField
                    title={' Telemetry IMEI: '}
                    placeholder={'Enter Telemetry IMEI here'}
                    helperText="It should be a 10 digit string"
                    type={'text'}
                    value={formData.telemetryIMEI}
                    label={'Enter Telemetry IMEI here'}
                    variant={'outlined'}
                    onChange={e=>updateFormData({...formData,telemetryIMEI:e.target.value})}
                    size={"small"}
                />
            </Grid>
        </Grid>
        <br />
        <Grid key={2} container direction={"row"} spacing={3}>
            <Grid item md={3}>
                <InputLabel id="telemetry-vendor">Telemetry Vendor</InputLabel>
            </Grid>
            <Grid item md={3}>
                <Select
                    labelId="telemetry-vendor-label"
                    id="telemetry-vendor-id"
                    value={formData.telemetryVendor}
                    label="Telemetry Vendor"
                    onChange={e=>updateFormData({...formData,telemetryVendor:e.target.value})}
                    size={"small"}
                    sx={{minWidth: 2/3}}
                >
                    <MenuItem value={'Teltonika'}>Teltonika</MenuItem>
                    <MenuItem value={'Antzer'}>Antzer</MenuItem>
                </Select>
            </Grid>
        </Grid>
        <br />  
        <Grid container direction={"row"} spacing={3}>
                
            <Grid item md={3}>
                <InputLabel id="vehicle-registration-number">Vehicle Registration Number</InputLabel>
            </Grid>
            <Grid item md={3}>
                <TextField
                    title={' Vehicle Registration Number: '}
                    placeholder={'Enter Vehicle Registration Number here'}
                    helperText={"It should be a 9/10 digit string"}
                    type={'text'}
                    value={formData.vehicleRegNo}
                    label={'Enter Vehicle Registration Number here'}
                    variant={'outlined'}
                    onChange={e=>updateFormData({...formData,vehicleRegNo:e.target.value})}
                    size={"small"}
                />
            </Grid>
        </Grid>
        <br />
        <Grid key={3} container direction={"row"} spacing={3}>

            <Grid item md={3}>
                <InputLabel id="vehicle-chassis-number">Vehicle Chassis Number</InputLabel>
            </Grid>
            <Grid item md={3}>
                <TextField
                    title={' Vehicle Chassis Number: '}
                    placeholder={'Enter Vehicle Chassis Number here'}
                    type={'text'}
                    value={formData.vehicleChassisNo}
                    label={'Enter Vehicle Chassis Number here'}
                    variant={'outlined'}
                    onChange={e=>updateFormData({...formData,vehicleChassisNo:e.target.value})}
                    size={"small"}
                />
            </Grid>
        </Grid>
        <br />
        <Grid key={10} container direction={"row"} spacing={3}>
                
            <Grid item md={3}>
                <InputLabel id="battery-ebin">Battery EBIN</InputLabel>
            </Grid>
            <Grid item md={3}>
                <TextField
                    title={' Battery EBIN: '}
                    placeholder={'Enter Battery EBIN here'}
                    type={'text'}
                    value={formData.batteryEBIN}
                    label={'Enter Battery EBIN here'}
                    variant={'outlined'}
                    onChange={e=>updateFormData({...formData,batteryEBIN:e.target.value})}
                    size={"small"}
                />
            </Grid>    
        </Grid>
        <br />
        <Grid key={4} container direction={"row"} spacing={3}>

            <Grid item md={3}>
                <InputLabel id="charger-serial-number">Charger Serial Number</InputLabel>
            </Grid>
            <Grid item md={3}>
                <TextField
                    title={' Charger Serial Number: '}
                    placeholder={'Enter Charger Serial Number here'}
                    type={'text'}
                    value={formData.chargerSNo}
                    label={'Enter Charger Serial Number here'}
                    variant={'outlined'}
                    onChange={e=>updateFormData({...formData,chargerSNo:e.target.value})}
                    size={"small"}
                />
            </Grid>
        </Grid>
        <br />
        <Grid key={5} container direction={"row"} spacing={3}>

            <Grid item md={3} >
                <InputLabel id="hub-name">Hub Name</InputLabel>
            </Grid>
            <Grid item md={3}>
                <Select
                    labelId="hub-name-labelid"
                    id="hub-name-id"
                    value={formData.hubName}
                    label="Hub Name"
                    onChange={e=>updateFormData({...formData,hubName:e.target.value})}
                    size={"small"}
                    sx={{minWidth: 2/3}}
                >
                    {HUB_NAMES.map((x:any,key:any)=>
                        <MenuItem value={x} key={key}>{x}</MenuItem>

                    )}
                    
                    
                </Select>
            </Grid>
        </Grid>
        <br />
        <Grid key={6} container direction={"row"} spacing={3}>

            <Grid item md={3} >
                <InputLabel id="client-name">Client Name</InputLabel>
            </Grid>
            <Grid item md={3}>
                <Select
                    labelId="client-name-labelid"
                    id="client-name-id"
                    value={formData.clientName}
                    label="Client Name"
                    onChange={e=>updateFormData({...formData,clientName:e.target.value})}
                    size={"small"}
                    sx={{minWidth: 2/3}}
                >
                    {CLIENT_NAMES.map((x:any,key:any)=>
                        <MenuItem value={x} key={key}>{x}</MenuItem>

                    )}
                </Select>
            </Grid>
        </Grid>
        <br />
        <Grid  key={7} container direction={"row"} spacing={3}>

            <Grid item md={3}>
                <InputLabel id="client-hub-name">Client Hub Name</InputLabel>
            </Grid>
            <Grid item md={3}>
                <Select
                    labelId="client-hub-name-labelid"
                    id="client-hub-name-id"
                    value={formData.clientHubName}
                    label="Client Hub Name"
                    onChange={e=>updateFormData({...formData,clientHubName:e.target.value})}
                    size={"small"}
                    sx={{minWidth: 2/3}}
                >
                    {CLIENT_HUB_NAMES.map((x:any,key:any)=>
                        <MenuItem value={x} key={key}>{x}</MenuItem>

                    )}

                </Select>
            </Grid>
        </Grid>
        <br />
        <Grid key={8}  container direction={"row"} spacing={3}>
            <Grid item md={3}>
                <InputLabel id="pass-code">Pass Code</InputLabel>
            </Grid>
            <Grid item md={3}>
                <TextField
                    title={' Pass Code to submit data: '}
                    placeholder={'Enter Pass Code here'}
                    type={'text'}
                    value={formData.passCode}
                    label={'Enter Pass Code here'}
                    variant={'outlined'}
                    onChange={e=>updateFormData({...formData,passCode:e.target.value})}
                    size={"small"}
                />
            </Grid>    
        </Grid>

        <br></br>

        <Grid key={9} container direction={"row"} spacing={3}>
            <Grid item  md={3}>
                <InputLabel id="registerer">Registerer</InputLabel>
            </Grid>
            <Grid item md={3}>
                <TextField
                    title={' Registerer: '}
                    placeholder={'Enter Your Name Here'}
                    type={'text'}
                    value={formData.registerer}
                    label={'Enter Your Name here'}
                    variant={'outlined'}
                    onChange={e=>updateFormData({...formData,registerer:e.target.value})}
                    size={"small"}
                />
            </Grid>
        </Grid>
        <br />

        <Button
            className='button'
            variant="contained"
            onClick={onSubmit}
            >
                Submit
        </Button>


        </div>
    </Box>
    )

}

export default formComponent;


