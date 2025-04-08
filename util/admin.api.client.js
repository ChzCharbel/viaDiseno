const axios = require('axios');
const NodeCache = require('node-cache');
const dotenv = require('dotenv').config();

const cache = new NodeCache();

const axiosAdminClient = axios.create({
    baseURL: 'https://ivd-qa-0dc175b0ba43.herokuapp.com',
});

async function getToken() {
    let token = cache.get("token");

    if (token) {
        return token;
    }

    console.log("Fetching new token");
    
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
}

function getHeaders(token) {
    return {
        Authorization: `Bearer ${token}`,
    };
}

async function getUserById(id) {
    const token = await getToken();
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
    // asi obtienes un atributo en especifico
    console.log(parsedJson.data.type);  
    return parsedJson;
}

async function getUserGroups(cycle_id, user_ivd_id) {
    const token = await getToken();
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
};

async function getAcademicHistory(ivd_id){
    const token = await getToken();
    const headers = getHeaders(token);

    const response = await axiosAdminClient.get("v1/students/academic_history", {
        headers,
        params: {
        ivd_id,
        },
    });
    //console.log(response.data);

    const jsonString = JSON.stringify(response.data);
    const parsedJson = JSON.parse(jsonString);
    //console.log(parsedJson.data);
    return parsedJson.data;
};

async function getAllCourses(){
    const token = await getToken();
    const headers = getHeaders(token);

    const response = await axiosAdminClient.get("/v1/courses/all", {
        headers,
    });

    const jsonString = JSON.stringify(response.data);
    const parsedJson = JSON.parse(jsonString);
    //console.log(parsedJson.data);
    return parsedJson.data;
};

async function getAllUsers(userType){
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
    //cada materia es un elemento del arreglo data
    for (materia of alumnoHistorial){
        console.log(materia.course_name);
    }
});

const materias = (async () => {
    const courses = await getAllCourses();
    //cada materia es un elemento del arreglo data
    for (materia of courses){
        if (materia.name != 'Progra' && materia.name != 'Algoritmos'){
            console.log(materia.name);
        }
    }
});

//getUserById(100023);
//console.log(grupo13.room);
module.exports = { getUserById, getUserGroups, getAcademicHistory, getAllCourses, getAllUsers, getToken, getHeaders, axiosAdminClient };