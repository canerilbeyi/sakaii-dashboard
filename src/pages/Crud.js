import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "./crud.css";
export const Crud = () => {
    let emptyProduct = {
        id: null,
        sandboxname: "",
        host: "",
        port: "",
        apitoken: "",
        requesturl: "",
        responseurl: "",
        active: "",
    };
    const x = [
        {
            id: "1000",
            code: "1",
            sandboxname: "SANDBOX1",
            host: "HOST1",
            port: "PORT1",
            apitoken: "API TOKEN1",
            requesturl: "REQUEST URL 1",
            responseurl: "RESPONSE URL 1",
            active: "ACTIVE 1",
        },
        {
            id: "1001",
            code: "2",
            sandboxname: "SANDBOX2",
            host: "HOST2 ",
            port: "PORT2",
            apitoken: "API TOKEN2",
            requesturl: "REQUEST URL 2",
            responseurl: "RESPONSE URL 2",
            active: "ACTIVE 2",
        },
    ];

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        setProducts(x);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (product.sandboxname.trim()) {
            let _products = [...products];
            let _product = { ...product };
            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "Product Updated",
                    life: 3000,
                });
            } else {
                _product.id = createId();
                _products.push(_product);
                toast.current.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "Product Created",
                    life: 3000,
                });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Product Deleted",
            life: 3000,
        });
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = "";
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success mr-2  new-btn" onClick={openNew} />
            </React.Fragment>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="edit-btn" onClick={() => editProduct(rowData)} style={{ height: "2rem", width: "2rem" }} />
                <Button icon="pi pi-trash" className="delete-btn" onClick={() => confirmDeleteProduct(rowData)} style={{ height: "2rem", width: "2rem" }} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Manage Products</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );

    return (
        <div className="wrapper">
            <div className="sidebar"></div>
            <div className="datatable-crud-demo">
                <Toast ref={toast} />

                <div className="card">
                    <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={products}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column field="code" header="ID" sortable style={{ minWidth: "12rem" }}></Column>
                        <Column field="sandboxname" header="Sandbox Name" sortable style={{ minWidth: "16rem" }}></Column>
                        <Column field="host" header="Host" sortable style={{ minWidth: "8rem" }}></Column>
                        <Column field="port" header="Port" sortable style={{ minWidth: "10rem" }}></Column>
                        <Column field="apitoken" header="API Token" sortable style={{ minWidth: "12rem" }}></Column>
                        <Column field="requesturl" header="Request URL" sortable style={{ minWidth: "12rem" }}></Column>
                        <Column field="responseurl" header="Response URL" sortable style={{ minWidth: "12rem" }}></Column>
                        <Column field="active" header="Active " sortable style={{ minWidth: "12rem" }}></Column>
                        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: "8rem" }}></Column>
                    </DataTable>
                </div>

                <Dialog visible={productDialog} style={{ width: "450px" }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                    <div className="field">
                        <label htmlFor="sandboxname">Sandbox Name</label>
                        <InputText
                            id="sandboxname"
                            value={product.sandboxname}
                            onChange={(e) => onInputChange(e, "sandboxname")}
                            required
                            autoFocus
                            className={classNames({
                                "p-invalid": submitted && !product.sandboxname,
                            })}
                        />
                        {submitted && !product.sandboxname && <small className="p-error">Name is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="host">Host</label>
                        <InputText
                            id="host"
                            value={product.host}
                            onChange={(e) => onInputChange(e, "host")}
                            required
                            autoFocus
                            className={classNames({
                                "p-invalid": submitted && !product.host,
                            })}
                        />
                        {submitted && !product.host && <small className="p-error">Name is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="port">Port</label>
                        <InputText
                            id="port"
                            value={product.port}
                            onChange={(e) => onInputChange(e, "port")}
                            required
                            autoFocus
                            className={classNames({
                                "p-invalid": submitted && !product.port,
                            })}
                        />
                        {submitted && !product.port && <small className="p-error">Name is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="apitoken">API Token</label>
                        <InputText
                            id="apitoken"
                            value={product.apitoken}
                            onChange={(e) => onInputChange(e, "apitoken")}
                            required
                            autoFocus
                            className={classNames({
                                "p-invalid": submitted && !product.apitoken,
                            })}
                        />
                        {submitted && !product.apitoken && <small className="p-error">Name is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="requesturl">Request URL</label>
                        <InputText
                            id="requesturl"
                            value={product.requesturl}
                            onChange={(e) => onInputChange(e, "requesturl")}
                            required
                            autoFocus
                            className={classNames({
                                "p-invalid": submitted && !product.requesturl,
                            })}
                        />
                        {submitted && !product.requesturl && <small className="p-error">Name is required.</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="responseurl">Response URL</label>
                        <InputText
                            id="responseurl"
                            value={product.responseurl}
                            onChange={(e) => onInputChange(e, "responseurl")}
                            required
                            autoFocus
                            className={classNames({
                                "p-invalid": submitted && !product.responseurl,
                            })}
                        />
                        {submitted && !product.responseurl && <small className="p-error">Name is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="active">Response URL</label>
                        <InputText
                            id="active"
                            value={product.active}
                            onChange={(e) => onInputChange(e, "active")}
                            required
                            autoFocus
                            className={classNames({
                                "p-invalid": submitted && !product.active,
                            })}
                        />
                        {submitted && !product.active && <small className="p-error">Name is required.</small>}
                    </div>
                </Dialog>

                <Dialog visible={deleteProductDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                        {product && (
                            <span>
                                Are you sure you want to delete <b>{product.name}</b>?
                            </span>
                        )}
                    </div>
                </Dialog>
            </div>
        </div>
    );
};
