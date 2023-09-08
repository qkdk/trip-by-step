import axios from 'axios';
import router from "@/router";

// const baseURL = "http://192.168.208.55:8080/enjoytrip";
const baseURL = 'http://localhost:8080/enjoytrip';

const http = axios.create({
    baseURL: `${baseURL}`,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
});

function axiosBuilderWithJwt() {
    const aa = axios.create({
        baseURL: `${baseURL}`,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
    });

    aa.interceptors.response.use(
        response => response,
        error => {
            if (error.response.status === 401) {
                if (window.location.pathname !== '/autherror') {
                    router.push("/autherror");
                }
            } else {
                return Promise.reject(error);
            }
        }
    );

    return aa;
}

http.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            if (window.location.pathname !== '/autherror') {
                router.push("/autherror");
            }
        } else {
            return Promise.reject(error);
        }
    }
);


export {baseURL, http, axiosBuilderWithJwt};
