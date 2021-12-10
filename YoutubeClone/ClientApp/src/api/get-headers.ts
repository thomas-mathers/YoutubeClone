function getHeaders(token: string | null = null, contentType: string = 'application/json') {
    let headers = new Headers();
    headers.append('Content-Type', contentType);
    if (token !== null) {
        headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
}

export { getHeaders }