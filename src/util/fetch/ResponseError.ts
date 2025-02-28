function JSONstringifyResponse(response: Response) {
    // response object refuses to be stringified directly, so rebuild it first
    const reResponse = {
        //body: response.body, // deferred evaluation; will always be empty
        headers: response.headers,
        ok: response.ok,
        redirected: response.redirected,
        status: response.status,
        statusText: response.statusText,
        url: response.url
    };
    
    return JSON.stringify(reResponse);
}

class ResponseError extends Error {
    public response: Response;
    
    constructor(response: Response) {
        super(JSONstringifyResponse(response)); // 'Error' breaks prototype chain here
        
        Object.setPrototypeOf(this, (new.target) ? new.target.prototype : ResponseError.prototype); // restore prototype chain
        
        this.response = response;
    }
}

export default ResponseError;