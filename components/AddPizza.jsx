import { useState } from "react";
import styles from "../styles/Add.module.css";
import { Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import UploadButton from '../components/UploadButton'
import axios from "axios";
import { useRouter } from "next/router";

export default function AddPizza({ setClose }) {

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [prices, setPrices] = useState([]);
    const [extraOptions, setExtraOptions] = useState([]);
    const [extra, setExtra] = useState(null);

    const changePrice = (e, index) => {
        const currentPrices = prices;
        currentPrices[index] = e.target.value;
        setPrices(currentPrices);
    };

    const handleExtraInput = (e) => {
        setExtra({ ...extra, [e.target.name]: e.target.value });
    };

    const handleExtra = (e) => {
        setExtraOptions((prev) => [...prev, extra]);
    };

    const handleClose = () => {
        setClose(true)
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "uploads");
        try {
            const uploadRes = await axios.post(
                `https://api.cloudinary.com/v1_1/dhbiouaym/upload`,
                data
            );
            const { url } = uploadRes.data;
            const newProduct = {
                title,
                desc,
                prices,
                extraOptions,
                img: url,
            };

            await axios.post("http://localhost:3000/api/products", newProduct);
            setClose(true);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle style={{ fontWeight: "bold", fontSize: "2rem", paddingBottom: "0rem" }}>Add New Pizza</DialogTitle>
            <form onSubmit={handleSubmit} >
                <DialogContent style={{ paddingTop: "0.5rem" }}>
                    <DialogContentText style={{ marginBottom: "0.5rem" }}>
                        Fill the following Details toadd new Pizza
                    </DialogContentText>

                    <TextField inputProps={{ minLength: 3 }} required color="bg_color" margin="dense" label="Title" value={title} onChange={(evt) => (setTitle(evt.target.value))} type="text" fullWidth variant="standard" style={{ marginBottom: "0.5rem" }} />
                    <TextField inputProps={{ minLength: 3 }} required color="bg_color" margin="dense" label="Description" value={desc} onChange={(evt) => (setDesc(evt.target.value))} type="text" fullWidth variant="standard" style={{ marginBottom: "0.5rem" }} />
                    <div style={{ marginBottom: "1rem", marginTop: "0.5rem" }} className={styles.prices}>
                        <label htmlFor="prices" style={{ display: "inline-block", marginRight: "1rem" }}>Prices</label>
                        <br />
                        <TextField className={styles.input} required color="bg_color" margin="dense" label="small" value={prices[0]} onChange={(evt) => (changePrice(evt, 0))} type="number" variant="standard" />
                        <TextField className={styles.input} required color="bg_color" margin="dense" label="medium" value={prices[1]} onChange={(evt) => (changePrice(evt, 1))} type="number" variant="standard" />
                        <TextField className={styles.input} required color="bg_color" margin="dense" label="large" value={prices[2]} onChange={(evt) => (changePrice(evt, 2))} type="number" variant="standard" />
                    </div>
                    <div style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }} className={styles.extras}>
                        <label htmlFor="Extras" style={{ display: "inline-block" }}>
                            Extras
                        </label>
                        <br />
                        <TextField className={styles.input} name="text" required color="bg_color" margin="dense" label="text" onChange={handleExtraInput} type="text" variant="standard" />
                        <TextField className={styles.input} name="price" required color="bg_color" margin="dense" label="price" onChange={handleExtraInput} type="number" variant="standard" />
                        <Button variant="outlined" color="bg_color" onClick={handleExtra} style={{ textTransform: "none", }}>Add Extra</Button>
                    </div>
                    <div className={styles.extraItems} style={{ marginBottom: "0.5rem", }}>
                        {extraOptions.map((option) => (
                            <span key={option.text} className={styles.extraItem}>
                                {option.text}
                            </span>
                        ))}
                    </div>
                    <UploadButton file={file} setFile={setFile} />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="bg_color" onClick={handleClose} style={{ textTransform: "none", }}>Cancel</Button>
                    <Button variant="contained" color="bg_color" type="submit" style={{ textTransform: "none" }}>Save Details</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

