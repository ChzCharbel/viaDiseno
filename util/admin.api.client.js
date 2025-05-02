const dotenv = require('dotenv');
dotenv.config(); 

const axios = require('axios');
const NodeCache = require('node-cache');

const cache = new NodeCache();

// Usar la URL de la API desde las variables de entorno
const baseApiUrl = process.env.ADMIN_API_URL || 'https://ivd-qa-0dc175b0ba43.herokuapp.com';
console.log("Usando API URL:", baseApiUrl);

const axiosAdminClient = axios.create({
    baseURL: baseApiUrl,
});

async function getToken() {
    try {
        let token = cache.get("token");

        if (token) {
            return token;
        }

        console.log("Fetching new token");

        // Verificar si se están leyendo las variables del .env correctamente
        console.log("CLIENT_ID:", process.env.ADMIN_API_M2M_CLIENT_ID);
        console.log("CLIENT_SECRET:", process.env.ADMIN_API_M2M_CLIENT_SECRET);

        // Verifica si las variables están definidas
        if (!process.env.ADMIN_API_M2M_CLIENT_ID || !process.env.ADMIN_API_M2M_CLIENT_SECRET) {
            console.error("Error: Missing API credentials. ADMIN_API_M2M_CLIENT_ID and/or ADMIN_API_M2M_CLIENT_SECRET not set.");
            return null;
        }

        const m2m_credentials = {
            client_id: process.env.ADMIN_API_M2M_CLIENT_ID,
            client_secret: process.env.ADMIN_API_M2M_CLIENT_SECRET,
        };

        const response = await axiosAdminClient.post(
            "/m2m/authenticate", m2m_credentials
        );

        token = response.data.token;
        cache.set("token", token);

        console.log(token);

        return token;
    } catch (error) {
        console.error("Error getting authentication token:", error.message);
        return null;
    }
}

function getHeaders(token) {
    return {
        Authorization: `Bearer ${token}`,
    };
}

async function getUserById(id) {
    try {
        const token = await getToken();
        if (!token) {
            console.error("Error: Could not get authentication token");
            return { error: "Authentication failed", data: null };
        }

        const headers = getHeaders(token);
        console.log(headers);

        const response = await axiosAdminClient.get("v1/users/find_one", {
            headers,
            params: {
                ivd_id: id,
            },
        });
        console.log(response.data);

        const jsonString = JSON.stringify(response.data);
        const parsedJson = JSON.parse(jsonString);
        console.log(parsedJson.data.type);
        return parsedJson;
    } catch (error) {
        console.error("Error fetching user by ID:", error.message);
        return { error: error.message, data: null };
    }
}

async function getUserGroups(cycle_id, user_ivd_id) {
    try {
        const token = await getToken();
        if (!token) {
            console.error("Error: Could not get authentication token");
            return { error: "Authentication failed" };
        }

        const headers = getHeaders(token);

        const response = await axiosAdminClient.get("v1/school_cycles/user_groups_index", {
            headers,
            params: {
                id: cycle_id,
                user_ivd_id,
            },
        });
        console.log(response.data);

        const jsonString = JSON.stringify(response.data);
        const parsedJson = JSON.parse(jsonString);
        console.log(parsedJson.data[0]);
        return parsedJson.data[0];
    } catch (error) {
        console.error("Error fetching user groups:", error.message);
        return { error: error.message };
    }
}

async function getAcademicHistory(ivd_id) {
    try {
        // Si el ID es undefined o null, reportarlo inmediatamente
        if (ivd_id === undefined || ivd_id === null) {
            console.warn(`ID inválido para historial académico: '${ivd_id}', es undefined o null.`);
            return { error: "ID inválido", details: "ID es undefined o null" };
        }
        
        // Intentamos extraer un número del ID (pueden ser IDs como "IVD12345" o "100123")
        // Extraemos solo los dígitos numéricos del ID
        const rawId = String(ivd_id);
        const numericId = rawId.match(/\d+/);
        
        if (!numericId) {
            console.warn(`No se encontraron dígitos en el ID: '${ivd_id}'`);
            return { error: "ID inválido", details: "No se encontraron dígitos en el ID" };
        }
        // Usamos solo la parte numérica para la consulta a la API
        const cleanId = numericId[0];
        console.log(`ID original: '${ivd_id}', ID limpio para API: '${cleanId}'`);

        const token = await getToken();
        if (!token) {
            console.error("Error: Could not get authentication token");
            return { error: "Authentication failed" };
        }

        const headers = getHeaders(token);
        console.log(`Obteniendo historial académico para alumno ID: ${cleanId}`);        const response = await axiosAdminClient.get("v1/students/academic_history", {
            headers,
            params: {
                ivd_id: cleanId, // Usamos el ID limpio, no el original
            },
        });

        // Imprimimos la estructura completa de la respuesta para depuración
        console.log(`Estructura de respuesta para el alumno ${ivd_id}:`, JSON.stringify(response.data, null, 2).substring(0, 300) + '...');
        
        // Para manejar el formato correcto donde los datos están dentro de una propiedad "data"
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
            console.log(`Historial académico encontrado para alumno ${ivd_id}: ${response.data.data.length} materias`);
            return response.data.data; // Devolvemos el array de materias dentro de data
        }
        
        // Si la estructura no es la esperada pero tenemos algo en response.data, verificamos
        if (response.data && Array.isArray(response.data)) {
            console.log(`Historial académico encontrado para alumno ${ivd_id} (formato alternativo): ${response.data.length} materias`);
            return response.data;
        }
        
        // Si no hay datos en el formato esperado, devolvemos un array vacío
        console.log(`No se encontró historial académico para el alumno ${ivd_id} en formato esperado`);
        return [];
    } catch (error) {
        console.error(`Error fetching academic history for student ${ivd_id}:`, error.message);
        
        // Proporcionar más información para depuración
        if (error.response) {
            console.error("Detalles de la respuesta:", {
                status: error.response.status,
                statusText: error.response.statusText,
                data: error.response.data
            });
        }
        
        // Para errores 422, es probable que el formato del ID sea incorrecto o el alumno no exista
        if (error.response && error.response.status === 422) {
            return { 
                error: "ID no válido o alumno no encontrado", 
                details: error.response.data || error.message 
            };
        }
        
        return { error: error.message };
    }
}

async function getAllCourses() {
    try {
        console.log("Obteniendo todas las materias...");
        const token = await getToken();
        if (!token) {
            console.error("Error: No token retrieved");
            return [];
        }

        const headers = getHeaders(token);
        console.log("Headers para la solicitud de materias:", headers);

        console.log("Haciendo solicitud a:", `${axiosAdminClient.defaults.baseURL}/v1/courses/all`);
        const response = await axiosAdminClient.get("/v1/courses/all", {
            headers,
        });

        console.log("Respuesta recibida, status:", response.status);
        
        if (!response.data) {
            console.error("No se recibieron datos de la API");
            return [];
        }

        const jsonString = JSON.stringify(response.data);
        const parsedJson = JSON.parse(jsonString);
        
        if (!parsedJson.data || parsedJson.data.length === 0) {
            console.log("No se encontraron materias en la respuesta");
        } else {
            console.log(`Se encontraron ${parsedJson.data.length} materias`);
        }
        
        return parsedJson.data;
    } catch (error) {
        console.error("Error al obtener las materias:", error.message);
        if (error.response) {
            console.error("Detalles de la respuesta:", {
                status: error.response.status,
                statusText: error.response.statusText,
                data: error.response.data
            });
        }
        return [];
    }
}

async function getAllUsers(userType) {
    try {
        const token = await getToken();
        const headers = getHeaders(token);
        const response = await axiosAdminClient.get("/v1/users/all", {
            headers, params: {
                type: userType || '',
            }
        });

        console.log("Respuesta recibida, status:", response.status);
        
        if (!response.data) {
            console.error("No se recibieron datos de la API");
            return [];
        }

        const jsonString = JSON.stringify(response.data);
        const parsedJson = JSON.parse(jsonString);

        if (!parsedJson.data || parsedJson.data.length === 0) {
            console.log("No se encontraron usuarios en la respuesta");
        } else {
            console.log(`Se encontraron ${parsedJson.data.length} usuarios`);
        }

        return parsedJson.data;
    }
    catch (error) {
        console.error("Error al obtener los usuarios:", error.message);
        if (error.response) {
            console.error("Detalles de la respuesta:", {
                status: error.response.status,
                statusText: error.response.statusText,
                data: error.response.data
            });
        }
        return [];
    }
}

async function getAllDegrees() {
    try {
        const token = await getToken();
    const headers = getHeaders(token);
    const response = await axiosAdminClient.get("/v1/degrees/index", {
        headers,
    })

    console.log("Respuesta recibida, status:", response.status);
        
    if (!response.data) {
        console.error("No se recibieron datos de la API");
        return [];
    }

    const jsonString = JSON.stringify(response.data);
    const parsedJson = JSON.parse(jsonString);

    if (!parsedJson.data || parsedJson.data.length === 0) {
        console.log("No se encontraron planes en la respuesta");
    } else {
        console.log(`Se encontraron ${parsedJson.data.length} planes`);
    }

    return parsedJson.data;
    }
    catch (error) {
        console.error("Error al obtener los planes:", error.message);
        if (error.response) {
            console.error("Detalles de la respuesta:", {
                status: error.response.status,
                statusText: error.response.statusText,
                data: error.response.data
            });
        }
        return [];
    }
    
}

async function getCiclosEscolares(){
    try {
        const token = await getToken();
        const headers = getHeaders(token);
        const response = await axiosAdminClient.get("/v1/school_cycles/index", {
        headers,
    })

    console.log("Respuesta recibida, status:", response.status);
        
    if (!response.data) {
        console.error("No se recibieron datos de la API");
        return [];
    }

    const jsonString = JSON.stringify(response.data);
    const parsedJson = JSON.parse(jsonString);

    if (!parsedJson.data || parsedJson.data.length === 0) {
        console.log("No se encontraron ciclos en la respuesta");
    } else {
        console.log(`Se encontraron ${parsedJson.data.length} ciclos`);
    }

    return parsedJson.data;
    }
    catch (error) {
        console.error("Error al obtener los ciclos:", error.message);
        if (error.response) {
            console.error("Detalles de la respuesta:", {
                status: error.response.status,
                statusText: error.response.statusText,
                data: error.response.data
            });
        }
        return [];
    }
    

}

const grupo13 = (async () => {
    const cuarto = await getUserGroups(13, 100007);
    console.log(cuarto.room);
});

const historial100123 = (async () => {
    const alumnoHistorial = await getAcademicHistory(100123);
    for (materia of alumnoHistorial) {
        console.log(materia.course_name);
    }
});

const materias = (async () => {
    const courses = await getAllCourses();
    for (materia of courses) {
        if (materia.name != 'Progra' && materia.name != 'Algoritmos') {
            console.log(materia.name);
        }
    }
});

/**
 * Crea un nuevo grupo
 * grupoData - Datos del grupo a crear
 * grupoData.school_cycle_id - ID del ciclo escolar
 * grupoData.professor_id - ID del profesor
 * grupoData.course_id - ID del curso
 * grupoData.name - Nombre del grupo
 * grupoData.room - Salón asignado
 * @returns Respuesta de la API
 */
async function createGrupo(grupoData) {
    try {
        const token = await getToken();
        if (!token) {
            console.error("Error: Could not get authentication token");
            return { error: "Authentication failed" };
        }

        const headers = getHeaders(token);
        
        const response = await axiosAdminClient.post("/v1/groups", grupoData, {
            headers,
        });

        console.log("Grupo creado con éxito:", response.status);
        return response.data;
    } catch (error) {
        console.error("Error al crear grupo:", error.message);
        if (error.response) {
            console.error("Detalles de la respuesta:", {
                status: error.response.status,
                statusText: error.response.statusText,
                data: error.response.data
            });
        }
        return { error: error.message };
    }
}

module.exports = {
    getUserById,
    getUserGroups,
    getAcademicHistory,
    getAllCourses,
    getAllUsers,
    getToken,
    getHeaders,
    axiosAdminClient,
    getAllDegrees,
    getCiclosEscolares,
    createGrupo,
};  