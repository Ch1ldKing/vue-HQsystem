import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};
export const fetchStudentData = query => {
    return request({
        url: './students.json',
        method: 'get',
        params: query
    });
};