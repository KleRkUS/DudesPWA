import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import "./dashboard.scss";
import "../../Blocks/ListElement/list-element.scss";

import ListElement from "../../Blocks/ListElement/ListElement";
import {FetchResponse, ProductInterface} from "../../../Utils/Interfaces";
import {InternalAPI} from "../../../Utils/Api";

import {getProductsRequestState, getProducts, setProducts} from "./ProductsSlice";
import Popup from "../../Blocks/Popup/Popup";
import AddProductPopup from "../../Blocks/AddProductPopup/AddProductPopup";

const Dashboard = () => {
    const [requestError, setRequestError] = useState<boolean>(false);
    const [popupShown, setPopupShown] = useState<boolean>(false);

    const dispatch = useDispatch();
    const productsRequestedState = useSelector(getProductsRequestState);
    const storedProducts = useSelector(getProducts);

    const togglePopup = () => {
        setPopupShown(!popupShown);
    }

    const updateProductsState = ():void => {
        new Promise<Array<ProductInterface>>( async (resolve, reject) => {
            const productsQuery:FetchResponse = await InternalAPI.products.getGoods()

            const products:Array<ProductInterface> = productsQuery.data.data;

            if (productsQuery.ok) {
                resolve(products);
            } else {
                reject();
            }
        }).then((res:Array<ProductInterface>) => {
            dispatch(setProducts(res));
        }).catch(() => {
            setRequestError(true);
        });
    }

    useEffect(() => {
        if (!productsRequestedState) {
            updateProductsState();
        }
    }, [storedProducts]);

    return (
        <section className="dashboard">

            <h2 className="page-title dashboard__title">Products</h2>

            {requestError && <span>Ошибка! Обратись к велику</span>}

            {storedProducts.length === 0 && !requestError && <span className="dashboard__emptiness">
                Продуктов нет
            </span>}

            {storedProducts.length !== 0 && <ul className="dashboard__product-list">
                {storedProducts.map(elem => (
                    <ListElement
                        key={elem.id}
                        id={elem.id}
                        name={elem.name}
                        priority={elem.priority}
                        user={elem.user}
                        time={elem.time}
                        status={elem.status}
                    />
                ))}
            </ul>}

            <button className="dashboard__add btn" onClick={togglePopup}>Add product</button>
            {popupShown && <Popup onClose={togglePopup} title="Add product" implementation={AddProductPopup}/>}
        </section>
    )
}

export default Dashboard;