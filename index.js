require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PinataSDK } = require("pinata-web3");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors()); // Permitir CORS para todas las rutas
app.use(express.json()); // Para poder leer JSON en el body

// Configuración de Pinata
const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.PINATA_GATEWAY,
});

// --- RUTAS ---

/**
 * 1. POST /subirMetadata
 * Recibe un JSON con datos del pedido y lo sube a IPFS.
 * Requisito: Debe contener idPedido, addressCliente, addressAutorizado, timestamp
 */
app.post('/subirMetadata', async (req, res) => {
    try {
        const datosPedido = req.body;

        // Validación básica de campos obligatorios según enunciado
        if (!datosPedido.idPedido || !datosPedido.addressCliente || !datosPedido.addressAutorizado) {
            return res.status(400).json({ error: "Faltan datos obligatorios (idPedido, addressCliente, addressAutorizado)" });
        }

        // Añadimos timestamp si no viene, o usamos el actual
        const metadata = {
            name: `Pedido ${datosPedido.idPedido}`,
            keyvalues: {
                cliente: datosPedido.addressCliente
            },
            ...datosPedido,
            timestamp: datosPedido.timestamp || new Date().toLocaleString()
        };

        // Subida a Pinata usando el SDK
        const upload = await pinata.upload.json(metadata);

        console.log("Archivo subido con CID:", upload.IpfsHash);

        // Devolvemos el Hash (CID)
        res.status(200).json({
            success: true,
            pinHash: upload.IpfsHash,
            gatewayUrl: `https://${process.env.PINATA_GATEWAY}/ipfs/${upload.IpfsHash}`
        });

    } catch (error) {
        console.error("Error al subir a Pinata:", error);
        res.status(500).json({ error: "Error interno al subir metadata", detalle: error.message });
    }
});

/**
 * 2. GET /recuperarMetadata/:cid
 * A partir de un CID, recupera el JSON alojado en IPFS
 */
app.get('/recuperarMetadata/:cid', async (req, res) => {
    try {
        const { cid } = req.params;

        if (!cid) {
            return res.status(400).json({ error: "Debes proporcionar un CID" });
        }

        const data = await pinata.gateways.get(cid);

        res.status(200).json(data.data ? data.data : data);

    } catch (error) {
        console.error("Error al recuperar de Pinata:", error);
        res.status(500).json({ error: "Error al recuperar metadata", detalle: error.message });
    }
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Microservicio IPFS corriendo en http://localhost:${port}`);
});