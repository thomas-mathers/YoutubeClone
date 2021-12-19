function getHeaders(token: string | null = null, contentType: string | null = 'application/json') {
    let headers = new Headers();

    if (contentType !== null) {
        headers.append('Content-Type', contentType);
    }

    if (token !== null) {
        headers.append('Authorization', `Bearer ${token}`);
    }

    return headers;
}

export { getHeaders }