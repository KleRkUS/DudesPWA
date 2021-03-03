import React from 'react';
import {useDispatch} from "react-redux";

import {ProductInterface} from "../../../Utils/Interfaces";
import {InternalAPI} from "../../../Utils/Api";
import {removeProduct, changeProductState} from "../../Pages/Dashboard/ProductsSlice";

const ListElement = (product:ProductInterface) => {
    const hoursGone = new Date(Math.abs(Date.now() - product.time)).getHours();
    const dispatch = useDispatch();

    const removeProductElem = ():void => {
        new Promise<number>(async (resolve, reject) => {
            const request = await InternalAPI.products.removeGood(product.id);

            if (request.ok) {
                resolve(product.id);
            } else {
                reject(request);
            }
        }).then((res:number) => {
            dispatch(removeProduct(res));
        }).catch((err) => {
            console.log(`Error while removing product: ${err}`);
        })
    }

    const changeProductStatus = (e:any):void => {
        new Promise<any>(async (resolve, reject) => {
            const request = await InternalAPI.products.changeGoodStatus(e.target.checked, product.id);

            if (request.ok) {
                resolve({id: product.id, status: e.target.checked});
            } else {
                reject(request);
            }
        }).then(({id, status}) => {
            dispatch(changeProductState({id, status}));
        }).catch((err) => {
            console.log(`Error while changing products status: ${JSON.stringify(err)}`);
        })
    }

    return(
        <li className="list-element flex-between-center">
            <span className="list-element__text">
                {product.name}
            </span>

            <span className={`list-element__text list-element__priority_${product.priority}`}>
                {product.priority}
            </span>

            <span className="list-element__text">
                {product.user}
            </span>

            <span className="list-element__text">
                {`${hoursGone}h ago`}
            </span>

            {/*<label htmlFor={`list-element__label_${product.id}`}>Status</label>*/}
            <input type="checkbox" className="list-element__checkobox" id={`list-element__label_${product.id}`} defaultChecked={product.status} onChange={changeProductStatus}/>

            <button className="list-element__remove button-text" onClick={removeProductElem}>&#10005;</button>
        </li>
    )
}

export default ListElement;