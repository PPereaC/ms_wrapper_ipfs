# Microservicio Wrapper IPFS (Pinata)

Este microservicio actúa como intermediario entre el Backend Spring y la red descentralizada IPFS utilizando el SDK de Pinata. Su función principal es garantizar la persistencia de los metadatos de los pedidos generados para la aplicación de [AutoriZame](https://github.com/PPereaC/AutoriZame-Backend).

## 📋 Requisitos Previos

* **Node.js**: v18 o superior.
* **NPM**: Gestor de paquetes de Node.
* **Cuenta en Pinata Cloud**: Para obtener las credenciales de API (JWT y Gateway).

## 🚀 Instalación

1.  Accede al directorio del microservicio:
    ```bash
    cd ms_wrapper_ipfs
    ```

2.  Instala las dependencias necesarias:
    ```bash
    npm install
    ```
    *Las dependencias principales incluyen `express`, `dotenv`, `cors` y `pinata-web3`*

## ⚙️ Configuración (.env)

Debes crear un archivo `.env` en la raíz del proyecto (`ms_wrapper_ipfs/.env`) con la siguiente estructura. Sustituye los valores de ejemplo por tus credenciales reales de Pinata.

```env
# Puerto del servidor (Por defecto 3001)
PORT=3001

# Credenciales de Pinata (Obtenidas en [https://app.pinata.cloud/developers/api-keys](https://app.pinata.cloud/developers/api-keys))
# Se requiere un JWT con permisos de Admin para subir archivos.
PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (Tu Token Largo Aquí)

# Dominio del Gateway de Pinata (Sin https://)
# Ejemplo: violet-relevance-123.mypinata.cloud
PINATA_GATEWAY=tu-gateway.mypinata.cloud
