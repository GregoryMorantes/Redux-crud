import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTO_EXITO,
    DESCARGA_PRODUCTO_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

//Crear nuevo productos
export function crearNuevoProdudctoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto());

        try {
            //Inserta en la API
            await clienteAxios.post('/productos', producto);

            //Si todo sale bien, actualiza el state
            dispatch(agregarProductoExito(producto));

            //Alerta de Swal
            Swal.fire(
                'Correcto',
                'El producto se agrego correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            //Si hay un error cambiar el state
            dispatch(agregarProductoError(true));

            //Alerta de error de Swal
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

//Si el producto se guarda en la base de datos
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

//Si hubo un error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

//Funcion que descarga los productos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProducto());

        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch(descargaProductoExitosa(respuesta.data));
        } catch (error) {
            dispatch(descargaProductoError());
        }
    }
}

const descargarProducto = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductoExitosa = (producto) => ({
    type: DESCARGA_PRODUCTO_EXITO,
    payload: producto
});

const descargaProductoError = () => ({
    type: DESCARGA_PRODUCTO_ERROR,
    payload: true
})

//Selecciona eliminar producto
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        
        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());

            //Si se eliminar
            Swal.fire(
                'Eliminado',
                'El producto se elimino correctamente',
                'success'
            )
        } catch (error) {
            dispatch(eliminarProductoError());
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
});

//Colocar producto en accion
export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch (obtenerProductoEditarAction(producto))
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

//Editar un registro en la API y state
export function EditarProductoAction(producto) {
    return async (dispatch) => {
        dispatch(EditarProducto());
        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch(EditarProductoExito(producto));
             
        } catch (error) {
            dispatch(editarProductoError());
        }
    }
}

const EditarProducto = () => ({
    type:COMENZAR_EDICION_PRODUCTO
});

const EditarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
});

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})