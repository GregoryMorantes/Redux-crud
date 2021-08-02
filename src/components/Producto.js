import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

//Redux
import {useDispatch} from 'react-redux';
import {borrarProductoAction, obtenerProductoEditar} from '../actions/productoActions';

const Producto = ({producto}) => {
    const {nombre, precio, id} = producto;

    const dispatch = useDispatch();
    const history = useHistory(); //habilitar history para redireccion

    //Confirmar si desea eliminarlo
    const confirmarEliminarProducto = id => {

        //Preguntar al usuario 
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un producto que se eliminar no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                //PAsarlo al action
                dispatch(borrarProductoAction(id));
            }
        });

    }

    // función que redirige de forma programada
    const redireccionarEdicion = producto => {
        dispatch( obtenerProductoEditar(producto) );
        history.push(`/productos/editar/${producto.id}`)
    }
    
    return (  
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold"> $ {precio} </span></td>
            <td className="acciones">
                <button 
                    type="button"
                    onClick={ () => redireccionarEdicion(producto) }
                    className="btn btn-warning mr-2">
                    <i class="fas fa-edit"></i>
                </button>
                <button 
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarProducto(id)}
                ><i class="fas fa-trash-alt"></i> </button>
            </td>
        </tr>
    );
}
 
export default Producto;