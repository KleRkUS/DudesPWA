import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsers, getUsersRequestState, setUsers} from "../../Pages/Dashboard/UsersSlice";
import {addProduct, getProductsAmount} from "../../Pages/Dashboard/ProductsSlice";
import {FetchResponse, ProductInterface} from "../../../Utils/Interfaces";
import {InternalAPI} from "../../../Utils/Api";
import {Dudes} from "../../../Core/dudes";

const AddProductPopup = ({render, onClose}:Dudes.ChildrenPopupProps) => {
    const [usersArray, updateUsersArray] = useState<Array<any>>([]);
    const [name, setName] = useState<boolean | string>(false);

    const priorityRef = useRef(null);
    const userRef = useRef(null);

    const dispatch = useDispatch();
    const usersRequestedState = useSelector(getUsersRequestState);
    const storedUsers = useSelector(getUsers);

    const productsAmount = useSelector(getProductsAmount);

    useEffect(() => {
        if (!usersRequestedState && usersArray.length === 0) {

            new Promise<Array<object>>( async (resolve, reject) => {
                const request:FetchResponse = await InternalAPI.users.getAllUsers()

                const users:Array<object> = request.data.data;

                if (request.ok) {
                    resolve(users);
                } else {
                    reject(request);
                }
            }).then((res:Array<object>) => {
                dispatch(setUsers(res));
            }).catch((request:FetchResponse) => {
                console.log(`Error while getting all users: ${request}`);
            });

        } else {
            updateUsersArray(storedUsers);
        }
    }, []);

    const addProductFromPopup = () => {

        if (typeof name === "string") {
            new Promise<ProductInterface>(async (resolve, reject) => {
                const product:ProductInterface = {
                    name: name,
                    //@ts-ignore
                    priority: priorityRef.current.value,
                    //@ts-ignore
                    user: userRef.current.value,
                    time: Date.now(),
                    id: productsAmount,
                    status: false
                }

                const request:FetchResponse = await InternalAPI.products.addGood(product);

                if (request.ok) {
                    resolve(product);
                } else {
                    reject();
                }
            }).then((product:ProductInterface) => {
                dispatch(addProduct(product));
            }).catch(() => {});
        }
    }

    const content = <div className="popup__content">
        <input type="text" className="popup__input-text input-text" placeholder="Name" onChange={e => setName(e.target.value)}/>

        <select className="popup__input-select input-select" defaultValue="Low" ref={priorityRef}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>

        {storedUsers.length === 0 && <span>Unable to get users, sorry!</span>}
        {storedUsers.length !== 0 && <select className="popup__input-select input-select" defaultValue={storedUsers[0].name} ref={userRef}>
            {storedUsers.map(elem => (
                <option value={elem.name} key={elem._id}>
                    {elem.name}
                </option>
            ))}
        </select>}

        <button className="btn popup__button" onClick={addProductFromPopup}>Add</button>
    </div>;

    return render(content);
}

export default AddProductPopup;