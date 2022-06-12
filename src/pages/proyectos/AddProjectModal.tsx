import { Modal, TextField, Typography, MenuItem, InputAdornment } from '@mui/material';
import { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';

interface AddProjectModalProps {
    onClose: () => void
    onSubmit: () => void
    show: boolean
}

const AddProjectModal = (props: AddProjectModalProps) => {
    const [type, setType] = useState('');
    const [showProductModal, setProductModal] = useState(false)
    const { onSubmit, onClose, show } = props
    const [newProject, setNewProject] = useState({
        name: "",
        description: "",
        id: 0, //realizar un generador de id
        creationDate: new Date().toLocaleDateString('es-AR'),
        updatedDate: new Date().toLocaleDateString('es-AR'),
        type: "",
        state: "No Iniciado",
        client: 0,
        productId: 0,
        iteration: 1,
        phase: 1,
    })

    const types = [{ value: 'desarrollo', label: 'Desarrollo', }, {value: 'soporte', label: 'Soporte'} ];

    const handleChangeText = (e: any) => {
        setNewProject(({ ...newProject, [e.target.name]: e.target.value }))
    };

    const generateProjectUsingAPI = async () => {
        const response = await fetch('http://localhost:2000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(newProject)
        })
        return response
    }

    const handleSubmitProductModal = async () =>{
        const response = await generateProjectUsingAPI()
        if (response.status === 200) {
            onSubmit();
        }
        setProductModal(false);
    }

    const onCloseProductoModal =async () => {
        setProductModal(false);
    }

    const handleSubmit = async () => {
        if(newProject.type == "desarrollo"){
            console.log('si es de desarrollo');
            setProductModal(true);
        }else{
            console.log("no es de desarrollo");
            const response = await generateProjectUsingAPI()
            if (response.status === 200) {
                onSubmit();
            }
        }
    };

    const handleTypeSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value);
        setNewProject(({ ...newProject, [event.target.name]: event.target.value }))
    };

    return (
        <Modal onClose={onClose} open={show} >
            <div className='absolute bg-gray-200  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120vh] h-[85vh] rounded-xl shadow-lg'>
                
                <Modal onClose={onCloseProductoModal} open={showProductModal}>
                    <div className='absolute bg-gray-200  text-slate-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70vh] h-[55vh] rounded-xl shadow-lg'>
                        <Typography variant='h5' className={'m-10'}>Ingrese el poducto correspondiente al proyecto de desarrollo</Typography>
                        <div className='flex mb-6 flex-row ml-[6vh]'>  
                            <TextField required id="outlined-basic" name="productId" className='mr-8 w-80' label="Seleccione el producto asociado al proyecto" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleChangeText} /> 
                        </div>
                        <div className='flex mb-6 flex-row ml-[6vh]'>  </div>
                        <div className="flex flex-row ml-[6vh]" >
                            <div className="text-center mr-8 mb-6 w-52 border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={onCloseProductoModal} >
                                <div className="m-4" > Cancelar</div>
                            </div>
                            <div className="w-10" ></div>
                            <div className="text-center mr-8 mb-6 w-52  border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={handleSubmitProductModal}>
                                <div className="m-4" > Crear Proyecto</div>
                        </div>
                    </div>

                    </div>
                </Modal>

                <Typography variant='h5' className={'m-10'}>Ingrese los datos para el nuevo proyecto</Typography>
                <div className='ml-10 flex flex-col items-center'>
                    <div className='flex mb-6 flex-row'>
                        <TextField required id="outlined-basic" name="name" className='mr-8 w-80' label="Nombre del Proyecto" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleChangeText} />
                        <div className='mr-8 w-80'></div>
                    </div>
                    <div className='flex mb-6 flex-row'>
                        <TextField required select value={type} id="outlined-basic" name="type" className='mr-8 w-80' label="Seleccione el tipo de proyecto" variant="outlined" onChange={handleTypeSelection}>
                            {types.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField required name="client" className='mr-8 w-80' label="Identifique el cliente por nombre o por CUIT" InputLabelProps={{ shrink: true}} variant="outlined" onChange={handleChangeText} 
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle/>
                                </InputAdornment>),}}
                        />
                    </div>
                    <TextField id="outlined-basic" className='mb-6 w-[42rem] mr-8' name='description' label="Descripcion" multiline rows={2} InputLabelProps={{ shrink: true }} variant="outlined" onChange={handleChangeText} />
                    <div className='flex mb-6 flex-row'></div>
                    <div className='flex mb-6 flex-row'>  </div>
                    <div className="flex flex-row" >
                        <div className="text-center mr-8 mb-6 w-52 border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={onClose} >
                            <div className="m-4" > Cancelar</div>
                        </div>
                        <div className="w-56" ></div>
                        <div className="text-center mr-8 mb-6 w-52  border-2 border-slate-400  rounded-xl shadow-lg font-bold text-slate-800 hover:border-teal-600 hover:border-1 hover:bg-gray-200 hover:text-teal-600 transition-all duration-300 cursor-pointer" onClick={handleSubmit}>
                            <div className="m-4" > Siguiente </div>
                        </div>
                    </div>

                </div>

            </div>
        </Modal >
    )
}

export default AddProjectModal

