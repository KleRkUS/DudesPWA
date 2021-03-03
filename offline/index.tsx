import React, {useEffect, useState} from "react";
import {FetchResponse, ProductInterface} from "../src/Utils/Interfaces";
import {InternalAPI} from "../src/Utils/Api";
import ListElement from "../src/Components/Blocks/ListElement/ListElement";
import ReactDOM from "react-dom";

const App = () => {
    const [products, setProducts] = useState<Array<ProductInterface>>([]);

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
            setProducts(res);
        }).catch(() => {
            alert(`Error when getting products`);
        });
    }

    useEffect(() => {
        updateProductsState();
    }, [])

    return(
        <section className="offline-page">
            <h1 className="page-title offline-page__title">You are currently offline</h1>
            <span className="offline-page__notice">If you were logged in, cached shopping list appears here</span>

            {products.length !== 0 && <ul className="dashboard__product-list">
                {products.map(elem => (
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

        </section>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));