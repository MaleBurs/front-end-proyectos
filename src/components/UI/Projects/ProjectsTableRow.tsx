import { TableCell, TableRow } from '@mui/material'
import React from 'react'
import { useEffect, useState } from 'react'
import { Project } from '../../types/projectTypes'
import DeleteIcon from '@mui/icons-material/Delete';
interface  ProjectTableRowProps {
    row: Project,
    refresh: () => void
}

const  ProjectTableRow = (props:  ProjectTableRowProps) => {
    const { row, refresh } = props

    const deleteItems = () => {
        fetch(`http://localhost:2000/projects/${row._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( res => refresh() )
        .catch(err => console.log(err))
    }

    const [riskImpact, setRiskImpact] = useState('');

    useEffect(() => {
        //tendria que aparecer en realidad un circulito con color representano el riesgo
        //pero primero veamos si esto funciona
        if(row.risk?.impact == 1){
            setRiskImpact('Bajo');
        }else if (row.risk?.impact == 2){
            setRiskImpact('Medio');
        }else if (row.risk?.impact == 3){
            setRiskImpact('Alto');
        }else {
            setRiskImpact('Critico');
        }
    }, []);

    return (
        <TableRow hover key={row._id}>
            <TableCell align="left">{row._id}</TableCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left">{row.type}</TableCell>
            <TableCell align="left">{row.state}</TableCell>           
            <TableCell align="left">{new Date(row.creationDate).toLocaleDateString('es-AR')}</TableCell>
            <TableCell align="left">{new Date(row.updatedDate).toLocaleDateString('es-AR')}</TableCell>
            <TableCell align="left">{riskImpact}</TableCell>
            <TableCell align="right">
                <div className='hover:text-teal-600 text-slate-600 cursor-pointer' onClick={deleteItems}>
                    <DeleteIcon />
                </div>
            </TableCell>
        </TableRow>
    )
}

export default  ProjectTableRow
