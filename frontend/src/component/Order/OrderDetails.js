// // import React, { Fragment, useEffect } from 'react';
// // import "./OrderDetails.css";
// // import { useAlert } from 'react-alert';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { getOrderDetails, clearErrors } from "../../actions/orderAction"
// // import Metadata from '../layout/Metadata';
// // import { Typography } from '@material-ui/core';
// // import Loader from '../layout/Loader/Loader';
// // import { Link } from 'react-router-dom';


// // const OrderDetails = () => {

// //     const { order, error, loading } = useSelector(state => state.OrderDetails)
// //     const alert = useAlert()
// //     const dispatch = useDispatch()

// //     useEffect(() => {
// //         if (error) {
// //             alert.error(error)
// //             dispatch(clearErrors())
// //         }
// //         dispatch(getOrderDetails())
// //     }, [alert, dispatch, error])
// //     return (
// //         <Fragment>
// //             {loading ? (<Loader />) : (
// //                 <Fragment>
// //                     <Metadata title="Order Details" />
// //                     <div className="orderDetailsContainer">
// //                         <div className="orderDetailsContainer">
// //                             <Typography component="h1">
// //                                 order # {order && order.id}
// //                             </Typography>
// //                             <Typography>Shipping Info</Typography>
// //                             <div className="orderDetailsContainerBox">
// //                                 <div>
// //                                     <p>Name:</p>
// //                                     <span>{order.user && order.user.name}</span>
// //                                 </div>
// //                                 <div>
// //                                     <p>Phone</p>
// //                                     <span>{order.shippingInfo && order.shippingInfo.Phone}</span>
// //                                 </div>
// //                                 <div>
// //                                     <p>Address:</p>
// //                                     <span>{order.shippingInfo &&
// //                                         `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`
// //                                     }</span>
// //                                 </div>
// //                             </div>
// //                             <Typography>Payment</Typography>
// //                             <div className='orderDetailsContainerBox'>
// //                                 <div>
// //                                     <p className={
// //                                         order.paymentInfo && order.paymentInfo.status === "succeeded"
// //                                             ? "greenColor"
// //                                             : "redColor"
// //                                     }>
// //                                         {order.paymentInfo &&
// //                                             order.paymentInfo.status === "succceded"
// //                                             ? "PAID" : "NOT PAID"}
// //                                     </p>
// //                                 </div>
// //                                 <div>
// //                                     <p>Amount :</p>
// //                                     <span>{order.totalPrice && order.totalPrice}</span>
// //                                 </div>
// //                             </div>
// //                             <Typography>Order Status</Typography>
// //                             <div className="orderDetailsContainerBox">
// //                                 <div>
// //                                     <p
// //                                         className={
// //                                             order.orderStatus && order.orderStatus === "Delivered"
// //                                                 ? "greenColor"
// //                                                 : "redColor"
// //                                         }
// //                                     >
// //                                         {order.orderStatus && order.orderStatus}
// //                                     </p>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                         <div className="orderDetailsCartItems">
// //                             <Typography>Order Items:</Typography>
// //                             <div className="orderDetailsCartItemsContainer">
// //                                 {order.orderItems &&
// //                                     order.orderItems.map((item) => (
// //                                         <div key={item.product}>
// //                                             <img src={item.image} alt="Product" />
// //                                             <Link to={`/product/${item.product}`}>
// //                                                 {item.name}
// //                                             </Link>{" "}
// //                                             <span>
// //                                                 {item.quantity} X ₹{item.price} ={" "}
// //                                                 <b>₹{item.price * item.quantity}</b>
// //                                             </span>
// //                                         </div>
// //                                     ))}
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </Fragment>
// //             )}
// //         </Fragment>
// //     )
// // };

// // export default OrderDetails;

// import React, { Fragment, useEffect } from "react";
// import "./OrderDetails.css";
// import { useSelector, useDispatch } from "react-redux";
// import Metadata from "../layout/Metadata";
// import { Link } from "react-router-dom";
// import { Typography } from "@material-ui/core";
// import { getOrderDetails, clearErrors } from "../../actions/orderAction";
// import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";

// const OrderDetails = ({ match }) => {
//     const { order, error, loading } = useSelector((state) => state.orderDetails);

//     const dispatch = useDispatch();
//     const alert = useAlert();

//     useEffect(() => {
//         if (error) {
//             alert.error(error);
//             dispatch(clearErrors());
//         }

//         dispatch(getOrderDetails(match.params.id));
//     }, [dispatch, alert, error, match.params.id]);
//     return (
//         <Fragment>
//             {loading ? (
//                 <Loader />
//             ) : (
//                 <Fragment>
//                     <Metadata title="Order Details" />
//                     <div className="orderDetailsPage">
//                         <div className="orderDetailsContainer">
//                             <Typography component="h1">
//                                 Order #{order && order._id}
//                             </Typography>
//                             <Typography>Shipping Info</Typography>
//                             <div className="orderDetailsContainerBox">
//                                 <div>
//                                     <p>Name:</p>
//                                     <span>{order.user && order.user.name}</span>
//                                 </div>
//                                 <div>
//                                     <p>Phone:</p>
//                                     <span>
//                                         {order.shippingInfo && order.shippingInfo.phoneNo}
//                                     </span>
//                                 </div>
//                                 <div>
//                                     <p>Address:</p>
//                                     <span>
//                                         {order.shippingInfo &&
//                                             `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
//                                     </span>
//                                 </div>
//                             </div>
//                             <Typography>Payment</Typography>
//                             <div className="orderDetailsContainerBox">
//                                 <div>
//                                     <p
//                                         className={
//                                             order.paymentInfo &&
//                                                 order.paymentInfo.status === "succeeded"
//                                                 ? "greenColor"
//                                                 : "redColor"
//                                         }
//                                     >
//                                         {order.paymentInfo &&
//                                             order.paymentInfo.status === "succeeded"
//                                             ? "PAID"
//                                             : "NOT PAID"}
//                                     </p>
//                                 </div>

//                                 <div>
//                                     <p>Amount:</p>
//                                     <span>{order.totalPrice && order.totalPrice}</span>
//                                 </div>
//                             </div>

//                             <Typography>Order Status</Typography>
//                             <div className="orderDetailsContainerBox">
//                                 <div>
//                                     <p
//                                         className={
//                                             order.orderStatus && order.orderStatus === "Delivered"
//                                                 ? "greenColor"
//                                                 : "redColor"
//                                         }
//                                     >
//                                         {order.orderStatus && order.orderStatus}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="orderDetailsCartItems">
//                             <Typography>Order Items:</Typography>
//                             <div className="orderDetailsCartItemsContainer">
//                                 {order.orderItems &&
//                                     order.orderItems.map((item) => (
//                                         <div key={item.product}>
//                                             <img src={item.image} alt="Product" />
//                                             <Link to={`/product/${item.product}`}>
//                                                 {item.name}
//                                             </Link>{" "}
//                                             <span>
//                                                 {item.quantity} X ₹{item.price} ={" "}
//                                                 <b>₹{item.price * item.quantity}</b>
//                                             </span>
//                                         </div>
//                                     ))}
//                             </div>
//                         </div>
//                     </div>
//                 </Fragment>
//             )}
//         </Fragment>
//     );
// };

// export default OrderDetails;

import React, { Fragment, useEffect } from 'react';
import "./OrderDetails.css"
import { useSelector, useDispatch } from 'react-redux';
import Metadata from '../layout/Metadata';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';

const OrderDetails = ({ match }) => {
    const { order, error, loading } = useSelector((state) => state.orderDetails)

    const dispatch = useDispatch()
    const alert = useAlert()
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch(getOrderDetails(match.params.id))
    }, [alert, dispatch, error, match.params.id])
    return (
        <Fragment>
            {loading ? (<Loader />) : (
                <Fragment>
                    <Metadata title="Order Details" />
                    <div className="orderDetailsPage">
                        <div className="orderDetailsContainer">
                            <Typography component="h1">
                                Order # {order && order._id}
                            </Typography>
                            <div className='orderDetailsContainer'>
                                <div>
                                    <p>Name:</p>
                                    <span>{order.user && order.user.name}</span>
                                </div>
                                <div>
                                    <p>Phone :</p>
                                    <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                                </div>
                                <div>
                                    <p>Address:
                                    </p>
                                    <span>{order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}</span>
                                </div>
                            </div>

                            <Typography>Payment</Typography>
                            <div className='orderDetailsContainerBox'>
                                <div>
                                    <p className={order.paymentInfo &&
                                        order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"}>
                                        {order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}
                                    </p>
                                </div>

                                <div>
                                    <p>Amount:</p>
                                    <span>{order.totalPrice && order.totalPrice}</span>
                                </div>
                            </div>

                            <Typography>Order Status</Typography>

                            <div className='orderDetailsContainerBox'>
                                <div>
                                    <p className={order.orderStatus && order.orderStatus === "Delivered" ? "greenColor" : "redColor"}>
                                        {order.orderStatus && order.orderStatus}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="orderDetailsCartItems">
                            <Typography>Order Items:</Typography>
                            <div className="orderDetailsCartItemsContainer">
                                {order.orderItems &&
                                    order.orderItems.map((item) => (
                                        <div key={item.product}>
                                            <img src={item.image} alt="Product" />
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>{" "}
                                            <span>
                                                {item.quantity} X ₹{item.price} ={" "}
                                                <b>₹{item.price * item.quantity}</b>
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
};

export default OrderDetails;


