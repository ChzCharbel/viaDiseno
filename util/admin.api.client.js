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
        const token = await getToken();
        if (!token) {
            console.error("Error: Could not get authentication token");
            return { error: "Authentication failed" };
        }

        const headers = getHeaders(token);

        const response = await axiosAdminClient.get("v1/students/academic_history", {
            headers,
            params: {
                ivd_id,
            },
        });

        const jsonString = JSON.stringify(response.data);
        const parsedJson = JSON.parse(jsonString);
        return parsedJson.data;
    } catch (error) {
        console.error("Error fetching academic history:", error.message);
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
    const token = await getToken();
    const headers = getHeaders(token);
    const response = await axiosAdminClient.get("/v1/users/all", {
        headers, params: {
            type: userType || '',
        }
    });
    const jsonString = JSON.stringify(response.data);
    const parsedJson = JSON.parse(jsonString);
    return parsedJson.data;
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

module.exports = {
    getUserById,
    getUserGroups,
    getAcademicHistory,
    getAllCourses,
    getAllUsers,
    getToken,
    getHeaders,
    axiosAdminClient
};