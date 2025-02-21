import net from 'node:net'
import fs from 'node:fs'
// does not work
// have to fix something
export const ping = (ip, callback) => {
    const startTime = process.hrtime()

    const client = net.connect({ port: 80, host: ip }, () => {
        client.end()
        // return { time: process.hrtime(startTime), ip }
        callback(null, { time: process.hrtime(startTime), ip })
    })

    client.on('error', (err) => {
        callback(err)
        // throw err
        client.end()
    })
}

ping('midu.dev', (err, info) => {
    if (err) console.error(err)
    console.log(info)
})

// ---- 2
export const obtenerDatosPromise = () => {

    return new Promise((resolve => {
        setTimeout(() => {
            resolve({ data: 'datos importantes' });
        }, 2000);
    }))

}
// ---- 3

export function procesarArchivo(callback) {
    fs.readFile('input.txt', 'utf8', (error, contenido) => {
        if (error) {
            console.error('Error leyendo archivo:', error.message);
            // return false;
            callback(error)
        }

        // setTimeout(() => {
        const textoProcesado = contenido.toUpperCase();

        fs.writeFile('output.txt', textoProcesado, error => {
            if (error) {
                console.error('Error guardando archivo:', error.message);
                // return false;
                callback(error)
            }

            console.log('Archivo procesado y guardado con éxito');
            // return true
            callback(null)
        });

        // }, 1000);
    });
}


export function procesarArchivo2(callback) {

    const handleWrite = error => {
        if (error) {
            console.error('Error guardando archivo:', error.message);
            // return false;
            callback(error)
        }

        console.log('Archivo procesado y guardado con éxito');
        // return true
        callback(null)
    }


    const handleReadFile = (error, contenido) => {
        if (error) {
            console.error('Error leyendo archivo:', error.message);
            // return false;
            callback(error)
        }

        // setTimeout(() => {
        const textoProcesado = contenido.toUpperCase();

        fs.writeFile('output.txt', textoProcesado, handleWrite);

        // }, 1000);
    }

    fs.readFile('input.txt', 'utf8', handleReadFile);
}

export async function procesarArchivoPromise() {
    let contenido = ''

    // try {
    //     contenido = await fs.promises.readFile('input.txt', 'utf8')
    // } catch (error) {
    //     throw e
    // }

    contenido = await fs.promises.readFile('input.txt', 'utf8')
        .catch(e => {
            console.log('error');
            return ''
        })

    const textoProcesado = contenido.toUpperCase()

    try {
        await fs.promises.writeFile('output.txt', textoProcesado)
    } catch (error) {
        throw e
    }

}

// ---- 4

export async function leerArchivos() {
    const archivo1 = await fs.promises.readFile('archivo1.txt', 'utf8');
    const archivo2 = await fs.promises.readFile('archivo2.txt', 'utf8');
    const archivo3 = await fs.promises.readFile('archivo3.txt', 'utf8');

    return `${archivo1} ${archivo2} ${archivo3}`
}

export async function leerArchivos2() {

    const [archivo1, archivo2, archivo3] = await Promise.all(
        fs.promises.readFile('archivo1.txt', 'utf8'),
        fs.promises.readFile('archivo2.txt', 'utf8'),
        fs.promises.readFile('archivo3.txt', 'utf8')
    )

    return `${archivo1} ${archivo2} ${archivo3}`
}

leerArchivos();

// --- 5 
export async function delay() {
    return new Promise(resolve => {

        setTimeout(() => {
            console.log('Hola mundo')
            resolve
        }, 3000)
    }
    )
}

delay(3000).then(() => console.log('Hola mundo'));
// o..
await delay(3000)
console.log('Hola mundo')