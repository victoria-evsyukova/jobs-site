import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    
    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>{error.status} {error.statusText}</h1>
                <p>{error.data}</p>
            </div>
        );
    }
    
    return (
        <div>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>
                    {error instanceof Error 
                        ? error.message 
                        : "Unknown error"}
                </i>
            </p>
        </div>
    );
}